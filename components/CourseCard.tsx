"use client";
import Image from "next/image";
interface CourseCardProps {
  id: string;
  title: string;
  level: string;
  imageUrl: string;
  courseDuration: string;
  description: string;
  price: number;
}

export default function CourseCard({
  id,
  title,
  level,
  imageUrl,
  courseDuration,
  description,
  price,
}: CourseCardProps) {
  return (
    <div className="overflow-hidden bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">
      <Image
        src={imageUrl}
        alt={description}
        height={200}
        width={300}
        className="w-full h-48 "
      />
      <div className="px-3">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
