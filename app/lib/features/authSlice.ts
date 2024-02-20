import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from "cookies-next";

const initialState = {
  token: null, // Inicialmente no hay token
  userEmail: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      // Guarda el token en el estado
      setCookie("token", action.payload.token, { maxAge: 60 * 6 * 24 });      
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;
    },
    clearToken: (state) => {
      // Limpia el token (por ejemplo, al cerrar sesión)
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;

/*import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

const initialState = {
    token: '',
    userEmail: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            setCookie("token", action.payload.token, { maxAge: 60 * 6 * 24 });
            state.token = action.payload.token
            state.userEmail = action.payload.email
        },
        getToken: (state) => {
        },
        removeToken: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('userEmail')
            return {
                ...state,
                token: '',
                userEmail: '',
            };
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;*/