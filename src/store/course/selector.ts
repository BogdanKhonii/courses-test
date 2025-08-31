import { SLICE_NAMES } from "../actionTypes";
import { createSelector } from "reselect";

import type { RootState } from "..";
import type { CoursesState } from "./type";

const selectCourseStore = (state: RootState): CoursesState =>
  state[SLICE_NAMES.COURSES];

export const selectCourses = createSelector(
  selectCourseStore,
  (state) => state.courses
);

export const selectCourseById = (courseId: string) =>
  createSelector(selectCourses, (courses) =>
    courses.find((course) => course.id === courseId)
  );
