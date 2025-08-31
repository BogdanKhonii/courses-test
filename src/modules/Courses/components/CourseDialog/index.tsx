import { toast } from "sonner";
import { useRef } from "react";

import { selectCourseById } from "@/store/course/selector";
import { updateCourseById } from "@/store/course/reducer";

import { useAppDispatch, useAppSelector } from "@/hooks";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { CourseDialogProps } from "./CourseDialog.types";

const CourseDialog = ({ open, onClose, courseId }: CourseDialogProps) => {
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectCourseById(courseId));

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = () => {
    dispatch(
      updateCourseById({
        ...course,
        currentTime: videoRef.current?.currentTime || 0,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course?.title}</DialogTitle>
          <DialogDescription>{course?.description}</DialogDescription>
        </DialogHeader>

        <div className="w-full my-4">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            controls
            autoPlay
            preload="metadata"
            src={`${course?.videoUrl}#t=${course?.currentTime || 0}`}
            onError={(e) => {
              console.log("Video error", e);
              toast.error("Failed to load video");
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
