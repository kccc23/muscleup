import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trainerApiSlice = createApi({
    reducerPath: "TrainerAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ["Trainers"],
    endpoints: (builder) => ({
		getAllTrainers: builder.query({
			query: () => {
				return {
					url: "/api/trainers",
				};
			},
			providesTags: ["Trainers"],
		}),
        getOneTrainer: builder.query({
			query: (trainer_id) => {
				return {
					url: `/api/trainers/${trainer_id}`,
				};
			},
		}),
        createTrainer: builder.mutation({
			query: (info) => {
                info.price = parseInt(info.price);
                info.tags = info.tags.split(" ")
				return {
					url: "/api/trainers",
					method: "post",
					body: info,
					credentials: "include",
				};
			},
            invalidatesTags: ["trainers"],
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (err) {}
			},
		}),
    }),
});

export const {
    useGetAllTrainersQuery,
    useGetOneTrainerQuery,
    useCreateTrainerMutation,
} = trainerApiSlice;
