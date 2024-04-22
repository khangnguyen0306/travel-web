import { flowerApi } from "../services/flowerApi";
import { userAPI } from "../services/userAPI";
import { authApi } from "../services/AuthApi";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// ...import { persistStore, persistReducer } from 'redux-persist';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import flowerReducer from "../slices/flower.slice";
import userReducer from "../slices/user.slice";
import authReducer from "../slices/auth.slice";
const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const persistedReducer = persistReducer(persistConfig, flowerReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {

    [flowerApi.reducerPath]: flowerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    flower: persistedReducer,
    user: persistedUserReducer,
    auth: persistedAuthReducer,
    ...staticReducers
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(
    userAPI.middleware,
    authApi.middleware,
    flowerApi.middleware,
  ), 
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return asyncReducer;
};

function createReducer(asyncReducers = {}) {
  if (Object.keys(asyncReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }
}

export const Persister = persistStore(store);
