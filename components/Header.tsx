"use client";
import { useContext } from "react";
import { Button as ShoppingButton } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddSpecialCourse from "./AddSpecialCourse";
import { Course } from "@/lib/types";
import { CartContext } from "@/context/CourseSelectionContext";

interface HeaderProps {
  onAddCourse: (course: Course) => void;
}

export default function Header({ onAddCourse }: HeaderProps) {
  const { totalPersons } = useContext(CartContext);

  return (
    <header className="w-full py-4 bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Course Platform
        </h1>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <ShoppingButton
              className="bg-blue-600 hover:bg-blue-800 text-white"
              variant="outline"
              onClick={console.log}
            >
              <ShoppingCart />
              Cart
            </ShoppingButton>
            {totalPersons > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-0.5 text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center">
                {totalPersons}
              </Badge>
            )}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus />
                Neuer Kurs
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Neuen Spezialkurs hinzufügen</DialogTitle>
              </DialogHeader>
              <AddSpecialCourse onAddCourse={onAddCourse} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
