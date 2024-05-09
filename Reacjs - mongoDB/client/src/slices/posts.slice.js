import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

const PostSlices = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.user = action.payload;
    },
    clearPost: (state) => {
      state.user = null;
    },
  },
});

export const { setPost, clearPost } = PostSlices.actions;
export default PostSlices.reducer;
