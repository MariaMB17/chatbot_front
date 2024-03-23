import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
    id: number;
    email: string;
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
    };
}

// type User = {
//     id: number;
//     name: string;
//     email: number;
// };

export const userApi = createApi({
    reducerPath: "userApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getUserByEmail: builder.query<User, { email: string }>({
            query: ({ email }) => `users/unique/${email}`,
        }),
    }),
});

export const { useGetUserByEmailQuery } = userApi;