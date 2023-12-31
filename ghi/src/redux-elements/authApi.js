import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const authApiSlice = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ["Token"],
	endpoints: (builder) => ({
		getToken: builder.query({
			query: () => ({
				url: "/token",
				credentials: "include",
			}),
			providesTags: ["Token"],
		}),
		updateAvatar: builder.mutation({
			query: (info) => {
				const avatar_info = {
					username: "",
					first_name: "",
					last_name: "",
					avatar: info.avatar_url,
				};
				return {
					url: "/api/accounts",
					method: "put",
					body: avatar_info,
					credentials: "include",
				};
			},
			invalidatesTags: ["Token"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {}
			},
		}),
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
			invalidateTags: ["Token"],
			async onQueryStarted(arg, { dispatch, queryFulfilled, query }) {
				try {
					await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {
					return err;
				}
			},
		}),
		logOut: builder.mutation({
			query: () => ({
				url: "/token",
				method: "delete",
				credentials: "include",
			}),
			invalidateTags: ["Token"],
		}),
		signUp: builder.mutation({
			query: (info) => {
				return {
					url: "/api/accounts",
					method: "post",
					body: info,
					credentials: "include",
				};
			},
			invalidateTags: ["Token"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {
					console.error(err);
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
	useUpdateAvatarMutation,
} = authApiSlice;
