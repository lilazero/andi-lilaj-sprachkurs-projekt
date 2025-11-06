"use client";
import CourseList from "@/components/CourseList";
import {
  BannerClose,
  BannerLocal,
  BannerTitle,
} from "@/components/ui/kibo-banner";
import { BannerIcon } from "../components/ui/kibo-banner";
import { CircleAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen mt-20 justify-center w-full bg-zinc-50 max-w-[80%] font-sans dark:bg-black relative">
      {/* course list */}
      <CourseList />
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
        <BannerLocal>
          <BannerIcon icon={CircleAlert} />
          <BannerTitle>
            This Website uses Cookies to facilitate the User Experience. Like
            Remembering you closing this Banner. By continuing to use this site,
            you agree to our use of cookies.
          </BannerTitle>
          <BannerClose />
        </BannerLocal>
      </div>
    </div>
  );
}
