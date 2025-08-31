import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Course } from "@/shared/types";

import { CourseCard, CourseDialog } from "../components";

const CourseList = () => {
  const [courses, setCourses] = useState<Course[] | null>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://68b38577c28940c9e69f09ba.mockapi.io/api/courses"
      );
      const data = await response.json();
      setCourses(data);

      setLoading(false);
    } catch (e: Error | unknown) {
      toast.error(
        `Failed to fetch courses: ${(e as Error).message ?? "Unknown error"}`
      );
      setLoading(false);
    }
  };

  const onViewClick = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading && <p>Loading...</p>}
      {!loading && courses && courses.length === 0 && <p>No courses found.</p>}
      {courses &&
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewClick={onViewClick}
          />
        ))}

      {selectedCourseId !== null ? (
        <CourseDialog
          open={selectedCourseId !== null}
          onClose={() => setSelectedCourseId(null)}
          courseId={selectedCourseId}
        />
      ) : null}
    </div>
  );
};

export default CourseList;
