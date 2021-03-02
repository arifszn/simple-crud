import axios from "axios";
import { useHistory } from "react-router-dom";
import Constants from "../helpers/Constants";
import Routes from "../helpers/Routes";
import Utils from "../helpers/Utils";
import { removeToken, saveToken } from "../redux/slices/tokenSlice";
import { removeUser } from "../redux/slices/userSlice";

/**
 * Custom axios instance with interceptor
 */
const HTTP = axios.create();

const refreshToken = async (store) => {
    const token = (sessionStorage.getItem("token") !== 'undefined' && sessionStorage.getItem("token") !== null) ?
                    sessionStorage.getItem("token") :
                    ((localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== null) ?
                        localStorage.getItem("token") : null
                    );
    
    if (token) {
        return await HTTP.post(Routes.api.refreshToken, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            Utils.handleSuccessResponse(response, () => {
                let remember = (sessionStorage.getItem("token") !== 'undefined' && sessionStorage.getItem("token") !== null) ? false : true;
                store.dispatch(saveToken({
                    token: response.data.payload.access_token,
                    remember: remember
                }));
            })
        })
        .catch(error => {
            Utils.handleException(error);
        });
    }
}

export const setupInterceptors = (store) => {
    const authEnabled = (config={}) => {
        return (config.hasOwnProperty('authEnabled') && !config.authEnabled) ? false : true
    }

    // Add interceptors
    HTTP.interceptors.request.use(
        request => requestHandler(request)
    )

    HTTP.interceptors.response.use(
        response => successHandler(response),
        error => errorHandler(error)
    )

    //Sending request
    const requestHandler = (request) => {
        if (authEnabled(request)) {
            const token = (sessionStorage.getItem("token") !== 'undefined' && sessionStorage.getItem("token") !== null) ?
                    sessionStorage.getItem("token") :
                    ((localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== null) ?
                        localStorage.getItem("token") : null
                    );
            
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return request
    }

    //Request failed
    const errorHandler = async (error) => {
        if (authEnabled(error.config)) {
            
            let responseStatus = (typeof error.response !== 'undefined' && typeof error.response.data.status !== 'undefined') ? error.response.data.status : (typeof error.response.status !== 'undefined' ? error.response.status : Constants.STATUS_CODE_SUCCESS);
            
            if (responseStatus === Constants.STATUS_CODE_ERROR) {
                if (typeof error.response.data.payload !== 'undefined' && error.response.data.payload === 'invalid_token') {
                    store.dispatch(removeToken());
                    store.dispatch(removeUser());
                }
            } else if (responseStatus === Constants.STATUS_CODE_UNAUTHORIZED_ERROR) {
                if (typeof error.response.data.payload !== 'undefined' && error.response.data.payload === 'expired_token') {
                    //refresh token
                    const originalRequest = error.config;
                    await refreshToken(store);
                    return HTTP(originalRequest);
                }
            }
        }
        return Promise.reject({ ...error })
    }

    //Request succeeded
    const successHandler = (response) => {
        if (authEnabled(response.config)) {
            //
        }
        return response
    }
}

export default HTTP;