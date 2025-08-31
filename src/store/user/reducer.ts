import { createSlice } from "@reduxjs/toolkit";

import { SLICE_NAMES } from "../actionTypes";
import type { UserState } from "./type";

const initialState: UserState = {
  user: null,
};

const slice = createSlice({
  name: SLICE_NAMES.MY_USER,
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearMyUser(state) {
      state.user = null;
    },
  },
});
export const { setUser, clearMyUser } = slice.actions;

export default slice.reducer;
