import { createSlice } from '@reduxjs/toolkit';


const tokenValue = (sessionStorage.getItem("token") !== 'undefined' && sessionStorage.getItem("token") !== null) ?
                    sessionStorage.getItem("token") :
                    ((localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== null) ?
                        localStorage.getItem("token") : null
                    );

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: tokenValue
    },
    reducers: {
        saveToken: (state, action) => {
            const {remember} = action.payload;
            const {token} = action.payload;

            if (remember) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            state.value = token;
        },
        removeToken: (state) => {
            if (sessionStorage.getItem("token") !== 'undefined' && sessionStorage.getItem("token") !== null) {
                sessionStorage.removeItem("token");
            } else if (localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== null) {
                localStorage.removeItem("token");
            }
            
            state.value = null;
        }
    }
})

export const { saveToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer;