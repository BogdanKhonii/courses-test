import type { Course } from "@/shared/types";

export interface ExtendedCourse extends Course {
  currentTime?: number;
}

export interface CoursesState {
  courses: ExtendedCourse[];
}
