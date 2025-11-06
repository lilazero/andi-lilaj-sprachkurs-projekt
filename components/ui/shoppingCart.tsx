"use client";

import React, { useState } from "react";
import { Course } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Plus, Minus } from "lucide-react";

interface ShoppingCartProps {
  courses: Course[];
  selectedCourses: { courseId: string; quantity: number }[];
}

export const ShoppingCart = ({
  courses,
  selectedCourses,
}: ShoppingCartProps) => {
  const [accommodationCount, setAccommodationCount] = useState(0);
  const accommodationPrice = 500;

  if (selectedCourses.length === 0) {
    return <p className="text-center text-gray-500 py-8">Your cart is empty</p>;
  }

  const coursesTotal = selectedCourses.reduce((total, item) => {
    const course = courses.find((c) => c.id === item.courseId);
    return total + (course?.price || 0) * item.quantity;
  }, 0);

  const totalWithAccommodation =
    coursesTotal + accommodationCount * accommodationPrice;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Persons</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCourses.map((item) => {
            const course = courses.find((c) => c.id === item.courseId);
            if (!course) return null;
            return (
              <TableRow key={item.courseId}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${course.price * item.quantity}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                Accommodation
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      setAccommodationCount(Math.max(0, accommodationCount - 1))
                    }
                    disabled={accommodationCount === 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      setAccommodationCount(accommodationCount + 1)
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>${accommodationPrice}</TableCell>
            <TableCell className="text-right">{accommodationCount}</TableCell>
            <TableCell className="text-right">
              ${accommodationPrice * accommodationCount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="font-bold text-right">
              Grand Total
            </TableCell>
            <TableCell className="text-right font-bold">
              ${totalWithAccommodation}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ShoppingCart;
