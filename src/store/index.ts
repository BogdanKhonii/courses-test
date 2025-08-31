import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/reducer";
import coursesReducer from "./course/reducer";
import { SLICE_NAMES } from "./actionTypes";

const rootReducer = combineReducers({
  [SLICE_NAMES.MY_USER]: userReducer,
  [SLICE_NAMES.COURSES]: coursesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
