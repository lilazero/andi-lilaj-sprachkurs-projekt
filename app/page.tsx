"use client";
import { useState } from "react";
import CourseList from "@/components/CourseList";
import Header from "@/components/Header";
import {
  BannerClose,
  BannerLocal,
  BannerTitle,
} from "@/components/ui/kibo-banner";
import { BannerIcon } from "../components/ui/kibo-banner";
import { CircleAlert } from "lucide-react";
import { courseList as initialCourses } from "@/lib/mockData";
import { Course } from "@/lib/types";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
    new Set()
  );

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  return (
    <>
      <Header setCourses={setCourses} selectedCount={selectedCourses.size} />
      <div className="min-h-vh mt-20 justify-center w-full bg-zinc-50 max-w-[80%] font-sans dark:bg-black relative">
        {/* course list */}
        <CourseList
          courses={courses}
          setCourses={setCourses}
          selectedCourses={selectedCourses}
          toggleCourseSelection={toggleCourseSelection}
        />
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
          <BannerLocal>
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>
              This Website uses Cookies to facilitate the User Experience. Like
              Remembering you closing this Banner. By continuing to use this
              site, you agree to our use of cookies. Pictures are courtesy of
              mathewbrowne, analogicus, monika1607, Sprachschuleaktiv per
              Pixabay.com
            </BannerTitle>
            <BannerClose />
          </BannerLocal>
        </div>
      </div>
    </>
  );
}
