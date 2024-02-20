import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk }  from 'redux-thunk';
import authSlice from './features/authSlice';
import userSlice from './features/userSlice';

const rootReducers = combineReducers({
  auth: authSlice,
  user: userSlice

})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'], // Lista de reducers que deseas persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const makeStore = () => {
  const store = config
  return store
}
const config = configureStore({
  reducer:persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).prepend([thunk]),
})
export const persistor = persistStore(config);
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
/*export const makeStore = () => {

  const persistedReducer = persistReducer(persistConfig, combineReducers({
    counter: counterSlice,
    auth: authSlice,
    user: userSlice,
  }));
  
  return configureStore({
    reducer:persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend([thunk]),
  })
}
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

const store = makeStore();
export const persistor = persistStore(store);*/
