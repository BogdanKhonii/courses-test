import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/reducer";
import { SLICE_NAMES } from "./actionTypes";

const store = configureStore({
  reducer: {
    [SLICE_NAMES.MY_USER]: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
