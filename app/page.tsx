import CourseList from "@/components/CourseList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center w-full bg-zinc-50 max-w-[80%] font-sans dark:bg-black">
      {/* course list */}
      <CourseList />
    </div>
  );
}
