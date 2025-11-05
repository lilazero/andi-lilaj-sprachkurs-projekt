import { courseList } from "@/lib/mockData";
import CourseCard from "./CourseCard";

export default function CourseList() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {courseList.map((c) => (
        <CourseCard
          key={c.id}
          id={c.id}
          level={c.level}
          imageUrl={c.imageUrl}
          description={c.description}
          title={c.title}
          courseDuration={c.courseDuration}
          price={c.price}
        />
      ))}
    </div>
  );
}
