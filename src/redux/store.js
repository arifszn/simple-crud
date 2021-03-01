import { combineReducers, configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
})

//to persist store
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['token']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})