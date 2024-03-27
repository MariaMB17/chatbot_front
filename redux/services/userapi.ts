import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
    id: number;
    email: string;
}

type UserByEmail = {
    message: string;
    statusCode: number;
    data: {
        id: number;
        Member: {
            id: number;
            company: {
                id: number;
                name: string;
            };
        };
        Profile: {
            id: number;
            firstname: string;
            lastname: string;
        }
    }
}

export const userApi = createApi({
    reducerPath: "userApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], null>({
            query: () => 'users',
        }),
        getUserByEmail: builder.query<UserByEmail, string>({
            query: (email) => `users/unique/${email}`,
        }),
    }),
});

export const { useGetUsersQuery, useGetUserByEmailQuery } = userApi;