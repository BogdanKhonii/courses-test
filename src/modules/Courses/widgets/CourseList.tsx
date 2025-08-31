import { useState } from "react";

import { CourseCard, CourseDialog } from "../components";
import { useGetCourses } from "../hooks";

const CourseList = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const { courses, loading, isEmpty } = useGetCourses();

  const onViewClick = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading && <p>Loading...</p>}
      {isEmpty && <p>No courses found.</p>}{" "}
      {courses &&
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewClick={onViewClick}
          />
        ))}
      {selectedCourseId ? (
        <CourseDialog
          open={!!selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
          courseId={selectedCourseId}
        />
      ) : null}
    </div>
  );
};

export default CourseList;
