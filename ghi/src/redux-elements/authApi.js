import { createApi, fetchBaseQuery } from "@reduxjs/toolkit";

export const authApiSlice = createApi({
    reducerPath: "authentication",
    tagTypes: ["Token"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_ACCOUNTS_HOST,
    }),
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: (info) => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append("username", info.email);
                    formData.append("password", info.password);
                }
                return {
                    url: "/token",
                    method: "post",
                    body: formData,
                    credentials: "include",
                };
            },
            // providesTags: ['Account'],
            invalidatesTags: (result) => {
                return (result && ["Token"]) || [];
            },
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/token",
                method: "delete",
                credentials: "include",
            }),
            invalidatesTags: ['Token'],
        }),
        getToken: builder.query({
            query: () => ({
                url: "/token",
                credentials: "include",
            }),
            providesTags: ["Token"],
        }),
    }),
});

export const {
    useGetTokenQuery,
    useLoginMutation,
    useLogOutMutation,
} = authApiSlice;