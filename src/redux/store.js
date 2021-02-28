import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';

const rootReducer = combineReducers({
    token: tokenReducer
})

export default configureStore({
  reducer: rootReducer,
})