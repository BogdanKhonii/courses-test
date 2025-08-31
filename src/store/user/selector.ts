import { SLICE_NAMES } from "../actionTypes";
import { createSelector } from "reselect";

import type { RootState } from "..";
import type { UserState } from "./type";

const selectUserStore = (state: RootState): UserState =>
  state[SLICE_NAMES.MY_USER];

export const selectUser = createSelector(
  selectUserStore,
  (state) => state.user
);
