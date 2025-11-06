"use client";

import CourseCard from "./CourseCard";
import { Course } from "@/lib/types";

interface CourseListProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourses: Set<string>;
  toggleCourseSelection: (courseId: string) => void;
}

export default function CourseList({
  courses,
  selectedCourses,
  toggleCourseSelection,
}: CourseListProps) {
  return (
    <div className="">
      {/* responsive grid layout */}
      <div className="grid  grid-cols-3 gap-10 max-[1825px]:grid-cols-2 max-[1210px]:grid-cols-1 my-5">
        {courses.map((courseListData) => (
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
            isSelected={selectedCourses.has(courseListData.id)}
            onToggleSelect={() => toggleCourseSelection(courseListData.id)}
          />
        ))}
      </div>
    </div>
  );
}
