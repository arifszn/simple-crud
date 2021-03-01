import { notification } from 'antd';
import Constants from './Constants';
import Data from './Data';

/**
 * Display notification
 * 
 * @param string message 
 * @param string type 
 * @param string/null title 
 * @param boolean sticky 
 */
const showNotification = (message = 'Something went wrong', type = 'error', title = null, sticky = false) => {
    notification[type]({
        message: title ? title : type[0].toUpperCase() + type.slice(1),
        description: message,
        duration: sticky ? 0 : 4.5
    });
};

/**
 * Return app name
 */
const getAppName = () => {
    return Data.appName;
}

/**
 * Ellipse long test
 * 
 * @param string str 
 * @param number length 
 * @param string ending 
 */
const textEllipsis = (str, length, ending = '...') => {
    if (length == null) {
      length = 100;
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
};

/**
 * Return a random color code in hex format
 */
const randomHexColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

/**
 * Handle error exception
 * 
 * @param Error error 
 * @param Function/null callback 
 */
const handleException = (error, callback = null) => {
    console.error(error);

    let errorMessage = 'Something went wrong';

    if (typeof error.message !== 'undefined') {
        errorMessage = error.message;
    }

    if (typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined') {
        console.error(error.response.data);
        
        if (typeof error.response.data.message !== 'undefined') {
            if ((typeof error.response.data.status !== 'undefined') && (error.response.data.status === Constants.STATUS_CODE_VALIDATION_ERROR)) {
                handleValidationError(error.response.data.payload);
            } else if ((typeof error.response.data.status !== 'undefined') && (error.response.data.status !== Constants.STATUS_CODE_SUCCESS)) {
                showNotification(error.response.data.message, 'error');
            } else {
                showNotification(error.response.data.message, 'error');
            }
        }
    } else {
         showNotification(errorMessage, 'error');
    }

    if (callback) {
        return callback();
    }
}

/**
 * Handle success Response
 * 
 * @param Response response 
 * @param Function successCallback
 * @param Function/null errorCallback 
 */
const handleSuccessResponse = (response, successCallback, errorCallback = null) => {
    if ((typeof response.data.status !== 'undefined') && (response.data.status === Constants.STATUS_CODE_VALIDATION_ERROR)) {
        handleValidationError(response.data.payload);
    } else if ((typeof response.data.status !== 'undefined') && (response.data.status !== Constants.STATUS_CODE_SUCCESS)) {
        showNotification(response.data.message, 'error');
        
        if (errorCallback) {
            return errorCallback();
        }
    } else if ((typeof response.data.status !== 'undefined') && (response.data.status === Constants.STATUS_CODE_SUCCESS)) {
        return successCallback();
    }
}

/**
 * Handle validation error
 * 
 * @param errorObject 
 */
const handleValidationError = (errorObject) => {
    for (var key of Object.keys(errorObject)) {
        let errors = errorObject[key];
        errors.forEach(error => {
            showNotification(error, 'error', false);
        });
    }
}

/**
 * Change ant theme color
 * @param string colorCode 
 * @param string colorVar 
 */
const changeAntdThemeColor = (colorCode, colorVar = '@primary-color') => {
  window.less.modifyVars({
    [colorVar]: colorCode
  });     
}

/**
 * Utility helper
 */
const Utils = {
    serverURL: window.location.origin,
    apiUrl: Data.apiUrl,
    apiVersion: 'v1',
    showNotification,
    textEllipsis,
    randomHexColor,
    handleException,
    handleValidationError,
    handleSuccessResponse,
    getAppName,
    changeAntdThemeColor
}

export default Utils;