import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { profileApiSlice } from "./profileApi";
import { profileSlice } from "./profileSlice";

export const store = configureStore({
	reducer: {
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[accountSlice.name]: accountSlice.reducer,
		[profileApiSlice.reducerPath]: profileApiSlice.reducer,
		[profileSlice.name]: profileSlice.reducer,

	},
	middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
		.concat(authApiSlice.middleware)
		.concat(profileApiSlice.middleware)
	},
});

setupListeners(store.dispatch);