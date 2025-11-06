"use client";

import CourseCard from "./CourseCard";
import { Course } from "@/lib/types";

interface CourseListProps {
  courses: Course[];
  selectedCourses: { courseId: string; quantity: number }[];
  toggleCourseSelection: (courseId: string) => void;
  updateCourseQuantity: (courseId: string, delta: number) => void;
}

export default function CourseList({
  courses,
  selectedCourses,
  toggleCourseSelection,
  updateCourseQuantity,
}: CourseListProps) {
  return (
    <div className="grid grid-cols-3 gap-10 max-[1825px]:grid-cols-2 max-[1210px]:grid-cols-1 my-5">
      {courses.map((courseListData) => {
        const selected = selectedCourses.find(
          (item) => item.courseId === courseListData.id
        );
        return (
          <CourseCard
            key={courseListData.id}
            id={courseListData.id}
            level={courseListData.level}
            imageUrl={courseListData.imageUrl}
            description={courseListData.description}
            title={courseListData.title}
            courseDuration={courseListData.courseDuration}
            price={courseListData.price}
            difficultyrating={courseListData.rating}
            tags={courseListData.tags}
            reviews={courseListData.reviews}
            features={courseListData.features}
            graduates={courseListData.graduates}
            isSelected={!!selected}
            quantity={selected?.quantity || 1}
            onToggleSelect={() => toggleCourseSelection(courseListData.id)}
            onIncreaseQuantity={() =>
              updateCourseQuantity(courseListData.id, 1)
            }
            onDecreaseQuantity={() =>
              updateCourseQuantity(courseListData.id, -1)
            }
          />
        );
      })}
    </div>
  );
}
