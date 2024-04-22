import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
    