import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { profileApiSlice } from "./profileApi";
import { profileSlice } from "./profileSlice";
import { mealApiSlice } from "./logMealApi";
import { weightApiSlice } from "./logWeightApi";
import { exerciseApiSlice } from "./logExerciseApi";

export const store = configureStore({
	reducer: {
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[accountSlice.name]: accountSlice.reducer,
		[profileApiSlice.reducerPath]: profileApiSlice.reducer,
		[profileSlice.name]: profileSlice.reducer,
		[mealApiSlice.reducerPath]: mealApiSlice.reducer,
		[weightApiSlice.reducerPath]: weightApiSlice.reducer,
		[exerciseApiSlice.reducerPath]: exerciseApiSlice.reducer,


	},
	middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
		.concat(authApiSlice.middleware)
		.concat(profileApiSlice.middleware)
		.concat(mealApiSlice.middleware)
		.concat(weightApiSlice.middleware)
		.concat(exerciseApiSlice.middleware)
	},
});

setupListeners(store.dispatch);