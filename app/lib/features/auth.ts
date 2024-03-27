import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

const initialState = {
    token: '',
    userEmail: '',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userEmail', action.payload.email)
            setCookie("token", action.payload.token, { maxAge: 60 * 6 * 24 });
            return {
                ...state,
                token: state.token,
                userEmail: state.userEmail,
            };
        },
        getToken: (state) => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('userEmail');
            if (token) {
                setCookie("token", token, { maxAge: 60 * 6 * 24 });
            }
            return {
                ...state,
                token: token || '',
                userEmail: email || '',
            };
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

export const { setToken, getToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
