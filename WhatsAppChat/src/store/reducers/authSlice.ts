import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Login } from "../../types/types";

interface AuthItem {
  item: Login
}

const initialState: AuthItem = {
  item: {
    phone: "",
    user_id: "",
    user_token: ""
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.item = action.payload
    }
  }
});

export const { setAuthData } = authSlice.actions;

export const selectAuthData = (state: RootState) => state.auth.item;

export default authSlice.reducer;