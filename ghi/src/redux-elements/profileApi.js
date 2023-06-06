import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./profileSlice";

export const profileApiSlice = createApi({
	reducerPath: "ProfileAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ["ProfileInformation"],
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => {
				return {
					url: "/api/trainee_profiles",
					credentials: "include",
				};
			},
			providesTags: ["ProfileInformation"],
		}),
		createProfile: builder.mutation({
			query: (info) => {
				info.weight = parseFloat(info.weight);
				info.goal_weight = parseFloat(info.goal_weight);
				info.height_ft = parseInt(info.height_ft);
				info.height_in = parseInt(info.height_in);
				info.height = Math.round((info.height_ft * 12 + info.height_in));
				delete info.height_ft;
				delete info.height_in;
				return {
					url: "/api/trainee_profiles",
					method: "post",
					body: info,
					credentials: "include",
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {
					console.error("you got an error", err);
				}
			},
			invalidatesTags: ["ProfileInformation"],
		}),
		updateWeightProfile: builder.mutation({
			query: (info) => {
				const weight_info = {
					"goal" : "",
					"height" : null,
					"weight" : info.log_weight,
					"goal_weight": null,
					"date_of_birth": "",
					"gender" : "",
				}
				return {
					url: "/api/trainee_profiles",
					method : "put",
					body : weight_info,
					credentials : "include",

				}
			},
			invalidatesTags: ["ProfileInformation"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {}
			},

		}

		)
	}),
});

export const { useCreateProfileMutation, useGetProfileQuery, useUpdateWeightProfileMutation } = profileApiSlice;
