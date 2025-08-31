import type { Course } from "@/shared/types";

export interface CourseProps {
  course: Course;
  onViewClick: (courseId: string) => void;
}
