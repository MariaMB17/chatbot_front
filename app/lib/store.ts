import authSlice from "@/app/lib/features/auth";
import counterSlice from "@/app/lib/features/counter";
import userSlice from "@/app/lib/features/user";
import { userApi } from "@/redux/services/userapi";
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {

  return configureStore({
    reducer: {
      counter: counterSlice,
      auth: authSlice,
      user: userSlice,
      [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([userApi.middleware]),
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().prepend(),
  })
}

setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
