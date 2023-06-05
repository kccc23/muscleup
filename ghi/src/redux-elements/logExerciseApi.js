import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exerciseApiSlice = createApi({
    reducerPath: "logExercise",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    tagTypes: ["ExercisesList"],
    endpoints: (builder) => ({
        getExercise: builder.query({
            query: () => {
                return {
                    url: "/api/exercises",
                    credentials: 'include',
                };
            },
            providesTags: ["ExercisesList"],
        }),
        createExercise: builder.mutation({
            query: (info) => {
                return {
                    url: "/api/exercises",
                    method: "post",
                    body: info,
                    credentials: "include",
                };
            },
            invalidatesTags: ["ExercisesList"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                } catch (err) {
                    return err;
                }
            }
        }),
        deleteExercise: builder.mutation({
            query: (exercise_id) => {
                return {
                    url: `/api/exercises/${exercise_id}`,
                    method: "delete",
                    credentials: "include",
                };
            },
            invalidatesTags: ["ExercisesList"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    return {"message": "excercise successfully deleted"}
                } catch (err) {
                    return err;
                }
            }
        }),
    }),
});

export const { useGetExerciseQuery, useCreateExerciseMutation, useDeleteExerciseMutation } = exerciseApiSlice;