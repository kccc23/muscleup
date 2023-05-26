import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from './accountSlice';

export const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = authApiSlice.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set("Authorization", `Bearer ${tokenData.access_token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Account", "Token"],
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
            providesTags: ['Account'],
            invalidatesTags: (result) => {
                return (result && ["Token"]) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearForm());
                } catch (err) {}
            },
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/token",
                method: "delete",
                credentials: "include",
            }),
            invalidatesTags: ["Account", "Token"],
            }),
        getToken: builder.query({
            query: () => ({
                url: "/token",
                credentials: "include",
            }),
            providesTags: ["Token"],
        }),
        signUp: builder.mutation({
            query: (info) => {
                // let jsonBody = {
                //     username: formData.get("username"),
                //     email: formData.get("email"),
                //     password: formData.get("password"),
                //     first_name: formData.get("first_name"),
                //     last_name: formData.get("last_name"),
                // };
                // console.log(JSON.stringify(jsonBody));
                console.log(info)
                return ({
                    url: "/api/accounts",
                    method: "post",
                    body: info,
                    credentials: "include",
                });
            },
            providesTags: ['Account'],
            invalidatesTags: result => {
                return (result && ['Token']) || [];
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                await queryFulfilled;
                dispatch(clearForm());
                } catch (err) {
                    console.error("give me this", err)
                }
            },
        }),
    }),
});

export const {
    useGetTokenQuery,
    useLogInMutation,
    useLogOutMutation,
    useSignUpMutation,
} = authApiSlice;