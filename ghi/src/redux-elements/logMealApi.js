import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealApiSlice = createApi({
    reducerPath: "logMeal",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    tagTypes: ["MealsList"],
    endpoints: (builder) => ({
        getMeals: builder.query({
            query: () => {
                return {
                    url: "/api/meals",
                    credentials: 'include',
                };
            },
            providesTags: ["MealsList"],
        }),
        createMeal: builder.mutation({
            query: (info) => {
                return {
                    url: "/api/meals",
                    method: "post",
                    body: info,
                    credentials: "include",
                };
            },
            invalidatesTags: ["MealsList"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                } catch (err) {
                    return err;
                }
            }
        }),
        deleteMeal: builder.mutation({
            query: (mealId) => {
                return {
                    url: `/api/meals/${mealId}`,
                    method: "delete",
                    credentials: "include",
                };
            },
            invalidatesTags: ["MealsList"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    // return {"message": "meal successfully deleted"}
                } catch (err) {
                    return err;
                }
            }
        }),
    }),
});

export const { useGetMealsQuery, useCreateMealMutation, useDeleteMealMutation } = mealApiSlice;