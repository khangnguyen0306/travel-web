import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flower: null,
};

const flowerSlice = createSlice({
  name: "flower",
  initialState,
  reducers: {
    setFlower: (state, action) => {
      state.user = action.payload;
    },
    clearFlower: (state) => {
      state.user = null;
    },
  },
});

export const { setFlower, clearFlower } = flowerSlice.actions;
export default flowerSlice.reducer;
