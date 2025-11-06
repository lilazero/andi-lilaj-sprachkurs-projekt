"use client";
import React from "react";
import Image from "next/image";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "./ui/expandable";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Book,
  Laptop,
  BookAIcon,
  Fingerprint,
  Mic,
  Target,
  Check,
  Minus,
  Plus,
} from "lucide-react";

type Feature = {
  icon: string;
  text: string;
};

interface CourseCardProps {
  id: string;
  title: string;
  level?: string;
  imageUrl?: string;
  courseDuration: string;
  description: string;
  price: number;
  difficultyrating: number;
  graduates?: number;
  tags?: string[];
  reviews?: number;
  features?: Feature[];
  isSelected?: boolean;
  quantity?: number;
  onToggleSelect?: () => void;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
}

export default function CourseCard(props: CourseCardProps) {
  const {
    title,
    imageUrl,
    description,
    price,
    difficultyrating,
    tags,
    reviews,
    features,
    isSelected = false,
    quantity = 1,
    onToggleSelect,
    onIncreaseQuantity,
    onDecreaseQuantity,
  } = props;

  // Map of icon name (as stored in mock data) to lucide-react components.
  const ICON_MAP: Record<string, React.ElementType> = {
    Laptop,
    BookAIcon,
    Fingerprint,
    Mic,
    Book,
  };

  // Default image if none provided
  const displayImageUrl =
    imageUrl || "https://via.placeholder.com/200x180?text=No+Image";

  return (
    <Expandable
      expandDirection="vertical"
      expandBehavior="push"
      onExpandStart={() => console.log("Expanding product card...")}
      onExpandEnd={() => console.log("Product card expanded!")}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className=""
            collapsedSize={{ width: 480, height: 260 }}
            expandedSize={{ width: 480, height: 520 }}
            hoverToExpand={false}
            expandDelay={500}
            collapseDelay={700}
          >
            <ExpandableCardHeader>
              <div className="flex items-center justify-between">
                {tags && tags.length > 0 ? (
                  <Badge
                    variant="secondary"
                    className="text-blue-800 bg-blue-100"
                  >
                    {tags[0]}
                  </Badge>
                ) : null}
                <Badge variant="outline" className="ml-2">
                  {`€${price.toFixed(2)}`}
                </Badge>
              </div>
            </ExpandableCardHeader>
            <ExpandableCardContent>
              <div className="flex gap-3 items-start ">
                <div className="w-[250px] h-[140px]  ">
                  <Image
                    src={displayImageUrl}
                    alt={title}
                    width={200}
                    height={180}
                    className="rounded-md max-h-full "
                  />
                </div>
                <div className="flex-1 ">
                  <h3
                    className="font-medium tracking-tight text-gray-800 transition-all duration-300 dark:text-white"
                    style={{
                      fontSize: isExpanded ? "24px" : "18px",
                      fontWeight: isExpanded ? "700" : "400",
                    }}
                  >
                    {title}
                  </h3>
                  <div className="flex items-center mt-1">
                    {/*✨ Colored difficulty indicators ✨*/}
                    {Array.from({ length: difficultyrating }, (_, index) => {
                      const startColor = [34, 197, 94];
                      const endColor = [239, 68, 68];
                      const ratio =
                        difficultyrating === 1 ? 0 : (difficultyrating - 1) / 7;
                      const r = Math.round(
                        startColor[0] + (endColor[0] - startColor[0]) * ratio
                      );
                      const g = Math.round(
                        startColor[1] + (endColor[1] - startColor[1]) * ratio
                      );
                      const b = Math.round(
                        startColor[2] + (endColor[2] - startColor[2]) * ratio
                      );
                      const color = `rgb(${r},${g},${b})`;
                      return (
                        <Book
                          key={index}
                          className="w-4 h-4"
                          style={{ color }}
                        />
                      );
                    })}
                    <AnimatePresence mode="wait">
                      {/* number of reviews */}
                      {isExpanded ? (
                        <motion.span
                          key="expanded"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 overflow-hidden text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                        >
                          {reviews} Reviews
                        </motion.span>
                      ) : (
                        // only (number) of reviews
                        <motion.span
                          key="collapsed"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 overflow-hidden text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                        >
                          ({reviews})
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <ExpandableContent preset="fade" keepMounted={false}>
                <p className="max-w-xs mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
                <div className="space-y-3">
                  {features?.map((feature, idx) => {
                    const Icon = ICON_MAP[feature.icon];
                    return (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
                        <span>{feature.text}</span>
                      </div>
                    );
                  })}
                  {/* BUTTONS AREA*/}
                  {!isSelected ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect?.();
                      }}
                      className="w-full mb-4 text-white cursor-pointer transition-colors bg-blue-600 hover:bg-blue-800"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      SELECT
                    </Button>
                  ) : (
                    <TooltipProvider>
                      <div className="w-full h-full grid grid-cols-2 gap-0">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSelect?.();
                          }}
                          className="col-span-2 text-white cursor-pointer transition-colors bg-green-600 hover:bg-green-700 rounded-b-none"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          SELECTED ({quantity}{" "}
                          {quantity === 1 ? "Person" : "People"})
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDecreaseQuantity?.();
                              }}
                              className="text-white mb-2 cursor-pointer transition-colors bg-red-400 hover:bg-red-500 rounded-t-none rounded-r-none"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove Person</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                onIncreaseQuantity?.();
                              }}
                              className="text-white mb-2 cursor-pointer transition-colors bg-blue-600 hover:bg-blue-800 rounded-t-none rounded-l-none"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Person</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  )}
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400">
                  <span>2 day Free Trial</span>
                  <span>If you don&apos;t like it, cancel within 2 days</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}
