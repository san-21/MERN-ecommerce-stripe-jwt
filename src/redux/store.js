import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/auth/authReducer";
import authModalReducer from "./slices/auth/authModalReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authenticatedReducer from "./slices/auth/authenticateReducer";

const persistConfig = {
  key: "root",
  whitelist: ["cart", "auth", "authenticate", "product"],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  authenticate: authenticatedReducer,
  cart: cartSlice,
  product: productReducer,
  authModal: authModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
