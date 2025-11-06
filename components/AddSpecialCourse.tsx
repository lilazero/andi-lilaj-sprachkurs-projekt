"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Course } from "@/lib/types";

interface AddSpecialCourseProps {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

export default function AddSpecialCourse({
  setCourses,
}: AddSpecialCourseProps) {
  const [specialCourses, setSpecialCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 1000,
    courseDuration: "1",
    level: "",
    difficultyrating: 1,
    imageUrl: "",
    graduates: 0,
    tags: "",
    reviews: 0,
    features: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `special-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      courseDuration: formData.courseDuration,
      level: formData.level || undefined,
      rating: formData.difficultyrating,
      imageUrl: formData.imageUrl || undefined,
      graduates: formData.graduates || undefined,
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim())
        : undefined,
      reviews: formData.reviews || undefined,
      features: formData.features
        ? formData.features.split(";").map((f) => {
            const [icon, text] = f.split(":").map((s) => s.trim());
            return { icon: icon || "Info", text: text || "" };
          })
        : undefined,
    };

    // Add to local display
    setSpecialCourses([...specialCourses, newCourse]);

    // Add to main course list
    setCourses((prevCourses) => [...prevCourses, newCourse]);

    setFormData({
      title: "",
      description: "",
      price: 1000,
      courseDuration: "1",
      level: "",
      difficultyrating: 1,
      imageUrl: "",
      graduates: 0,
      tags: "",
      reviews: 0,
      features: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Überschrift</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Beschreibung</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preis (€)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dauer</label>
          <input
            type="text"
            value={formData.courseDuration}
            onChange={(e) =>
              setFormData({
                ...formData,
                courseDuration: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="z.B. 2 weeks, 1 Month, 1 Year"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Level (optional)
          </label>
          <input
            type="text"
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="z.B. Beginner, Intermediate, Advanced"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Bewertung (1-10)
          </label>
          <input
            type="number"
            value={formData.difficultyrating}
            onChange={(e) =>
              setFormData({
                ...formData,
                difficultyrating: parseInt(e.target.value),
              })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            min="1"
            max="10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Bild URL (optional)
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Absolventen (optional)
          </label>
          <input
            type="number"
            value={formData.graduates}
            onChange={(e) =>
              setFormData({
                ...formData,
                graduates: parseInt(e.target.value),
              })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Bewertungen (optional)
          </label>
          <input
            type="number"
            value={formData.reviews}
            onChange={(e) =>
              setFormData({
                ...formData,
                reviews: parseInt(e.target.value),
              })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tags (optional, kommagetrennt)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="z.B. available online, introductory, books included"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Features (optional, Semikolon-getrennt, Format: Icon:Text)
          </label>
          <textarea
            value={formData.features}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            placeholder="z.B. Laptop:Online course; BookAIcon:E-books; Mic:Questions in English"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            Hinzufügen
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="flex-1">
              Abbrechen
            </Button>
          </DialogClose>
        </div>
      </form>

      {specialCourses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Hinzugefügte Spezialkurse
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {specialCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
                price={course.price}
                courseDuration={course.courseDuration}
                level={course.level}
                difficultyrating={course.rating}
                graduates={course.graduates}
                tags={course.tags}
                reviews={course.reviews}
                features={course.features}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
