import { useEffect, useState } from "react";
import { toast } from "sonner";

import { axiosInstance } from "@/shared/utils";

import type { Course } from "@/shared/types";

export const useGetCourses = () => {
  const [courses, setCourses] = useState<Course[] | null>([]);

  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/courses");
      setCourses(response.data);

      setLoading(false);
    } catch (e: Error | unknown) {
      toast.error(
        `Failed to fetch courses: ${(e as Error).message ?? "Unknown error"}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const isEmpty = !loading && courses && courses.length === 0;

  return { courses, loading, isEmpty };
};
