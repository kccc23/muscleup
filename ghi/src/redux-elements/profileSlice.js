import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goal: "",
    height_ft: "",
    height_in: "",
    weight: "",
    goal_weight: "",
    date_of_birth: "",
    gender: "",
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        clearForm: () => {
            return initialState;
        },
    },
});

export const { clearForm, updateField } = profileSlice.actions;