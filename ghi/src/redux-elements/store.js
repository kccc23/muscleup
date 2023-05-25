import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";

export const store = configureStore({
	reducer: {
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[accountSlice.name]: accountSlice.reducer,
	},
	middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
		.concat(authApiSlice.middleware);
	},
});

setupListeners(store.dispatch);