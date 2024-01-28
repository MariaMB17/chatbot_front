import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "@/app/lib/features/counter";
import authSlice from "@/app/lib/features/auth";
import userSlice from "@/app/lib/features/user";

export const makeStore = () => {
  
  return configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']