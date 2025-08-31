import { useState } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { simulateRequest } from "@/shared/helpers";

import { selectCourseById } from "@/store/course/selector";
import { addCourse } from "@/store/course/reducer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { CourseProps } from "./CourseCard.types";

const CourseCard = ({ course, onViewClick }: CourseProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const purchasedCourse = useAppSelector(selectCourseById(course.id));

  const handlePurchase = async () => {
    setLoading(true);
    const status = await simulateRequest();
    if (status) {
      dispatch(addCourse(course));
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Card key={course.id} className="rounded-2xl overflow-hidden">
      <div className="w-full h-40 bg-muted overflow-hidden">
        <img
          src={course.previewUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate">
          {course.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">${course.price}</p>
          {purchasedCourse ? (
            <Button variant="outline" onClick={() => onViewClick(course.id)}>
              View
            </Button>
          ) : (
            <Button
              disabled={loading}
              loading={loading}
              onClick={handlePurchase}
            >
              Buy
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
