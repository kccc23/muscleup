import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weightApiSlice = createApi({
    reducerPath: "logWeight",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    tagTypes: ["WeightsList"],
    endpoints: (builder) => ({
        getWeights: builder.query({
            query: () => {
                return {
                    url: "/api/weights",
                    credentials: 'include',
                };
            },
            providesTags: ["WeightsList"],
        }),
        createWeight: builder.mutation({
            query: (info) => {
                return {
                    url: "/api/weights",
                    method: "post",
                    body: info,
                    credentials: "include",
                };
            },
            invalidatesTags: ["WeightsList"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                } catch (err) {
                    return err;
                }
            }
        }),
    }),
});

export const {useGetWeightsQuery, useCreateWeightMutation,} = weightApiSlice;