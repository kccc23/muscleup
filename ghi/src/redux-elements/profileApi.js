import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from './profileSlice';
import { authApiSlice } from "./authApi";

export const profileApiSlice = createApi({
    reducerPath: "ProfileAPI",
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
    tagTypes: ["ProfileForm"],
    endpoints: (builder) => ({
        get: builder.query({
            query: () => ({
                url: "/api/trainee_profiles",
                credentials: "include",
            }),
            providesTags: ["ProfileForm"],
        }),

        createProfile: builder.mutation({
            query: (info) => {
                console.log(info)
                info.weight = parseFloat(info.weight).toFixed(2)
                info.goal_weight = parseFloat(info.goal_weight).toFixed(2)
                info.height_ft = parseInt(info.height_ft)
                info.height_in = parseInt(info.height_in)
                info.height = Math.round((info.height_ft * 12 + info.height_in) * 2.54)
                info.weight = (info.weight * 0.453592).toFixed(2)
                info.goal_weight = (info.goal_weight * 0.453592).toFixed(2)
                delete info.height_ft
                delete info.height_in
                return ({
                    url: "/api/trainee_profiles",
                    method: "post",
                    body: info,
                    credentials: "include",
                })
            },
            providesTags: ["ProfileForm"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    console.log(response)
                    // dispatch(clearForm());
                } catch (err) {
                    console.error("you got an error", err)
                }
            },
        }),
    })
});

export const {
    useCreateProfileMutation,
    useGetQuery,
} = profileApiSlice;

