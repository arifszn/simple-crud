import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        saveUser: (state, action) => {
            state.value = action.payload;
        },
        removeUser: (state) => {
            state.value = null;
        }
    }
})

export const { saveUser, removeUser } = userSlice.actions

export default userSlice.reducer;