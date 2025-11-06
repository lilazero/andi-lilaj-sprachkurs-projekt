import { courseList } from "@/lib/mockData";
import CourseCard from "./CourseCard";

export default function CourseList() {
  return (
    <div className="">
      <h3 className="text-2xl font-bold">Unsere Kurse:</h3>
      {/* responsive grid layout */}
      <div className="grid  grid-cols-3 gap-10 max-[1825px]:grid-cols-2 max-[1210px]:grid-cols-1 my-5">
        {courseList.map((courseListData) => (
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
          />
        ))}
      </div>
    </div>
  );
}
