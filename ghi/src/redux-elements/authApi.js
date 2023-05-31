import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const authApiSlice = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	endpoints: (builder) => ({
		getToken: builder.query({
			query: () => ({
				url: "/token",
				credentials: "include",
			}),
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
			async onQueryStarted(arg, { dispatch, queryFulfilled, query }) {
				try {
					const response = await queryFulfilled;
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
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const response = await queryFulfilled;
					dispatch(clearForm());
				} catch (err) {
					console.error("you got an error", err);
				}
			},
		}),
	}),
});

export const { useGetTokenQuery, useLogInMutation, useLogOutMutation, useSignUpMutation } = authApiSlice;
