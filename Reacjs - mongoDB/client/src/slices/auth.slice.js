import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            // localStorage.setItem("token", action.payload);
          },
          setUser: (state, action) => {
            state.user = action.payload;
          },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
    },
    selectors: {
        selectTokens: (auth) => auth.token,
      },
})

export const {setToken, setUser, setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrenToken = (state) => state.auth.token
export const { selectTokens } = authSlice.selectors;