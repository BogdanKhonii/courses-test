import { createSlice } from "@reduxjs/toolkit";

import { SLICE_NAMES } from "../actionTypes";

import type { CoursesState } from "./type";

const initialState: CoursesState = {
  courses: [],
};

const slice = createSlice({
  name: SLICE_NAMES.COURSES,
  initialState,
  reducers: {
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    updateCourseById(state, action) {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    clearCourses(state) {
      state.courses = [];
    },
  },
});
export const { addCourse, updateCourseById, clearCourses } = slice.actions;

export default slice.reducer;
