import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice.js';
import messagesReducer from './MessagesSlice.js';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedUserReducer = persistReducer(persistConfig, UserSlice);

export const store = configureStore({
  reducer: {
    UserShop: persistedUserReducer,
    messages: messagesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

