"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import useMeasure from "react-use-measure";
import { Target, Variants, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const springConfig = { stiffness: 200, damping: 20, bounce: 0.2 };

interface ExpandableContextType {
  isExpanded: boolean; // Indicates whether the component is expanded
  toggleExpand: () => void; // Function to toggle the expanded state
  expandDirection: "vertical" | "horizontal" | "both"; // Direction of expansion
  expandBehavior: "replace" | "push"; // How the expansion affects surrounding content
  transitionDuration: number; // Duration of the expansion/collapse animation
  easeType:
    | "easeInOut"
    | "easeIn"
    | "easeOut"
    | "linear"
    | [number, number, number, number]; // Easing function for the animation
  initialDelay: number; // Delay before the animation starts
  onExpandEnd?: () => void; // Callback function when expansion ends
  onCollapseEnd?: () => void; // Callback function when collapse ends
}

// Create a context with default values
const ExpandableContext = createContext<ExpandableContextType>({
  isExpanded: false,
  toggleExpand: () => {},
  expandDirection: "vertical", // 'vertical' | 'horizontal' | 'both' // Direction of expansion
  expandBehavior: "replace", // How the expansion affects surrounding content
  transitionDuration: 0.3, // Duration of the expansion/collapse animation
  easeType: "easeInOut" as const, // Easing function for the animation
  initialDelay: 0,
});

// Custom hook to use the ExpandableContext
const useExpandable = () => useContext(ExpandableContext);

type ExpandablePropsBase = Omit<HTMLMotionProps<"div">, "children">;

interface ExpandableProps extends ExpandablePropsBase {
  children: ReactNode | ((props: { isExpanded: boolean }) => ReactNode);
  expanded?: boolean;
  onToggle?: () => void;
  transitionDuration?: number;
  easeType?:
    | "easeInOut"
    | "easeIn"
    | "easeOut"
    | "linear"
    | [number, number, number, number];
  expandDirection?: "vertical" | "horizontal" | "both";
  expandBehavior?: "replace" | "push";
  initialDelay?: number;
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
  onCollapseStart?: () => void;
  onCollapseEnd?: () => void;
}
// ROOT Expand component
const Expandable = React.forwardRef<HTMLDivElement, ExpandableProps>(
  (
    {
      children,
      expanded,
      onToggle,
      transitionDuration = 0.3,
      easeType = "easeInOut" as const,
      expandDirection = "vertical",
      expandBehavior = "replace",
      initialDelay = 0,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      ...props
    },
    ref
  ) => {
    // Internal state for expansion when the component is uncontrolled
    const [isExpandedInternal, setIsExpandedInternal] = useState(false);

    // Use the provided expanded prop if available, otherwise use internal state
    const isExpanded = expanded !== undefined ? expanded : isExpandedInternal;

    // Use the provided onToggle function if available, otherwise use internal toggle function
    const toggleExpand =
      onToggle || (() => setIsExpandedInternal((prev) => !prev));

    // Effect to call onExpandStart or onCollapseStart when isExpanded changes
    useEffect(() => {
      if (isExpanded) {
        onExpandStart?.();
      } else {
        onCollapseStart?.();
      }
    }, [isExpanded, onExpandStart, onCollapseStart]);

    // Create the context value to be provided to child components
    const contextValue: ExpandableContextType = {
      isExpanded,
      toggleExpand,
      expandDirection,
      expandBehavior,
      transitionDuration,
      easeType,
      initialDelay,
      onExpandEnd,
      onCollapseEnd,
    };

    return (
      <ExpandableContext.Provider value={contextValue}>
        <motion.div
          ref={ref}
          initial={false}
          transition={{
            duration: transitionDuration,
            ease: easeType,
            delay: initialDelay,
          }}
          {...props}
        >
          {/* Render children as a function if provided, otherwise render as is */}
          {typeof children === "function" ? children({ isExpanded }) : children}
        </motion.div>
      </ExpandableContext.Provider>
    );
  }
);

Expandable.displayName = "Expandable";

// Simplify animation types
type AnimationPreset = {
  initial: Target;
  animate: Target;
  exit: Target;
};

// Update ANIMATION_PRESETS type
const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 },
  },
  "blur-sm": {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  "blur-md": {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  "blur-lg": {
    initial: { opacity: 0, filter: "blur(16px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(16px)" },
  },
};

// Props for defining custom animations. Accept either a subset of MotionProps
// (initial/animate/exit/transition) or a Variants map.
type AnimationProps =
  | Partial<Pick<MotionProps, "initial" | "animate" | "exit" | "transition">>
  | Variants;

// Inside ExpandableContent component
type AnimResultVariants = {
  kind: "variants";
  variants: Variants;
  initialLabel: string;
  animateLabel: string;
  exitLabel: string;
};

type AnimResultTargets = {
  kind: "targets";
  initial: Target;
  animate: Target;
  exit: Target;
};

type AnimResult = AnimResultVariants | AnimResultTargets;

const getAnimationProps = (
  preset: keyof typeof ANIMATION_PRESETS | undefined,
  animateIn?: AnimationProps,
  animateOut?: AnimationProps
): AnimResult => {
  const defaultAnimation = {
    initial: {},
    animate: {},
    exit: {},
  };

  const presetAnimation = preset ? ANIMATION_PRESETS[preset] : defaultAnimation;

  // Detect if animateIn is a Variants map by checking typical keys.
  const isVariantsInput =
    animateIn &&
    typeof animateIn === "object" &&
    ("hidden" in (animateIn as object) ||
      "visible" in (animateIn as object) ||
      "exit" in (animateIn as object));

  if (isVariantsInput) {
    const maybeVariants = animateIn as Variants;
    const keys = Object.keys(maybeVariants);
    const hasHidden = keys.includes("hidden");
    const hasVisible = keys.includes("visible");
    const hasExit = keys.includes("exit");

    const initialLabel = hasHidden ? "hidden" : keys[0] || "hidden";
    const animateLabel = hasVisible
      ? "visible"
      : keys[1] || keys[0] || "visible";
    const exitLabel = hasExit
      ? "exit"
      : hasHidden
      ? "hidden"
      : keys[0] || "exit";

    return {
      kind: "variants",
      variants: maybeVariants,
      initialLabel,
      animateLabel,
      exitLabel,
    };
  }

  // Fallback: use explicit target objects from preset or animateIn
  const animatedIn = animateIn as
    | Partial<Pick<MotionProps, "initial" | "animate" | "exit" | "transition">>
    | undefined;
  const animatedOut = animateOut as
    | Partial<Pick<MotionProps, "initial" | "animate" | "exit" | "transition">>
    | undefined;

  return {
    kind: "targets",
    initial:
      (animatedIn && (animatedIn.initial as Target)) || presetAnimation.initial,
    animate:
      (animatedIn && (animatedIn.animate as Target)) || presetAnimation.animate,
    exit: (animatedOut && (animatedOut.exit as Target)) || presetAnimation.exit,
  };
};

// Wrap this around items in the card that you want to be hidden then animated in on expansion
/**
 * `ExpandableContent` is a React component that animates the expansion and collapse of its children.
 * It uses Framer Motion for smooth height transitions and supports custom animation presets, variants, and staggered child animations.
 *
 * @template T - HTMLDivElement
 * @param props - Component props.
 * @param props.preset - Optional animation preset key from `ANIMATION_PRESETS`.
 * @param props.animateIn - Custom animation props or variants for entering.
 * @param props.animateOut - Custom animation props or variants for exiting.
 * @param props.stagger - If true, applies staggered animation to children.
 * @param props.staggerChildren - Delay (in seconds) between staggered child animations.
 * @param props.keepMounted - If true, keeps content mounted when collapsed.
 * @param props.children - Content to be expanded/collapsed and animated.
 * @param ref - Forwarded ref to the outer motion div.
 *
 * @returns A motion.div that animates its height and child transitions based on expansion state.
 */
const ExpandableContent = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & {
    preset?: keyof typeof ANIMATION_PRESETS;
    animateIn?: AnimationProps | Variants;
    animateOut?: AnimationProps | Variants;
    stagger?: boolean;
    staggerChildren?: number;
    keepMounted?: boolean;
  }
>(
  (
    {
      children,
      preset,
      animateIn,
      animateOut,
      stagger = false,
      staggerChildren = 0.1,
      keepMounted = false,
      ...props
    },
    ref
  ) => {
    const { isExpanded, transitionDuration, easeType } = useExpandable();
    // useMeasure is used to measure the height of the content
    const [measureRef, { height: measuredHeight }] = useMeasure();
    // useMotionValue creates a value that can be animated smoothly
    const animatedHeight = useMotionValue(0);
    // useSpring applies a spring animation to the height value
    const smoothHeight = useSpring(animatedHeight, springConfig);

    useEffect(() => {
      // Animate the height based on whether the content is expanded or collapsed
      if (isExpanded) {
        animatedHeight.set(measuredHeight);
      } else {
        animatedHeight.set(0);
      }
    }, [isExpanded, measuredHeight, animatedHeight]);

    const animationProps = getAnimationProps(preset, animateIn, animateOut);
    const isVariants = animationProps.kind === "variants";

    return (
      // This motion.div animates the height of the content
      <motion.div
        ref={ref}
        style={{
          height: smoothHeight,
          overflow: "hidden",
        }}
        transition={{ duration: transitionDuration, ease: easeType }}
        {...props}
      >
        {/* AnimatePresence handles the entering and exiting of components */}
        <AnimatePresence initial={false}>
          {(isExpanded || keepMounted) && (
            // This motion.div handles the animation of the content itself
            <motion.div
              ref={measureRef}
              {...(isVariants
                ? {
                    variants: animationProps.variants,
                    initial: animationProps.initialLabel,
                    animate: animationProps.animateLabel,
                    exit: animationProps.exitLabel,
                  }
                : {
                    initial: animationProps.initial,
                    animate: animationProps.animate,
                    exit: animationProps.exit,
                  })}
              transition={{ duration: transitionDuration, ease: easeType }}
            >
              {stagger ? (
                // If stagger is true, we apply a staggered animation to the children
                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: staggerChildren,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {React.Children.map(
                    children as React.ReactNode,
                    (child, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        {child}
                      </motion.div>
                    )
                  )}
                </motion.div>
              ) : (
                children
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
ExpandableContent.displayName = "ExpandableContent";

interface ExpandableCardProps {
  children: ReactNode;
  className?: string;
  collapsedSize?: { width?: number; height?: number }; // Size when collapsed
  expandedSize?: { width?: number; height?: number }; // Size when expanded
  hoverToExpand?: boolean; // Whether to expand on hover
  expandDelay?: number; // Delay before expanding
  collapseDelay?: number; // Delay before collapsing
}

const ExpandableCard = React.forwardRef<HTMLDivElement, ExpandableCardProps>(
  (
    {
      children,
      className = "",
      collapsedSize = { width: 320, height: 211 },
      expandedSize = { width: 480, height: undefined },
      hoverToExpand = false,
      expandDelay = 0,
      collapseDelay = 0,
      ...props
    },
    ref
  ) => {
    // Get the expansion state and toggle function from the ExpandableContext
    const { isExpanded, toggleExpand, expandDirection } = useExpandable();

    // Use useMeasure hook to get the dimensions of the content
    const [measureRef, { width, height }] = useMeasure();

    // Create motion values for width and height
    const animatedWidth = useMotionValue(collapsedSize.width || 0);
    const animatedHeight = useMotionValue(collapsedSize.height || 0);

    // Apply spring animation to the motion values
    const smoothWidth = useSpring(animatedWidth, springConfig);
    const smoothHeight = useSpring(animatedHeight, springConfig);

    // Effect to update the animated dimensions when expansion state changes
    useEffect(() => {
      if (isExpanded) {
        animatedWidth.set(expandedSize.width || width);
        animatedHeight.set(expandedSize.height || height);
      } else {
        animatedWidth.set(collapsedSize.width || width);
        animatedHeight.set(collapsedSize.height || height);
      }
    }, [
      isExpanded,
      collapsedSize,
      expandedSize,
      width,
      height,
      animatedWidth,
      animatedHeight,
    ]);

    // Handler for hover start event
    const handleHover = () => {
      if (hoverToExpand && !isExpanded) {
        setTimeout(toggleExpand, expandDelay);
      }
    };

    // Handler for hover end event
    const handleHoverEnd = () => {
      if (hoverToExpand && isExpanded) {
        setTimeout(toggleExpand, collapseDelay);
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn("cursor-pointer", className)}
        style={{
          // Set width and height based on expansion direction
          width:
            expandDirection === "vertical" ? collapsedSize.width : smoothWidth,
          height:
            expandDirection === "horizontal"
              ? collapsedSize.height
              : smoothHeight,
        }}
        transition={springConfig}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        {...props}
      >
        <div
          className={cn(
            "grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-4xl",
            "shadow-[inset_0_0_1px_1px_#ffffff4d] sm:shadow-[inset_0_0_2px_1px_#ffffff4d]",
            "ring-1 ring-black/5",
            "max-w-[calc(100%)] sm:max-w-[calc(100%-200px)]]",
            "transition-all duration-300 ease-in-out"
          )}
        >
          {/* Nested divs purely for styling and layout (the shadow ring around the card) */}
          <div className="grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-4xl p-1 sm:p-1.5 md:p-2 shadow-md shadow-black/5">
            <div className="p-2 bg-white rounded-md shadow-xl sm:rounded-lg md:rounded-3xl sm:p-3 md:p-4 ring-1 ring-black/5">
              <div className="w-full h-full overflow-hidden">
                {/* Ref for measuring content dimensions (so we can let framer know to animate into the dimensions) */}
                <div ref={measureRef} className="flex flex-col h-full">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ExpandableCard.displayName = "ExpandableCard";

// I'm telling you we just have to expand 🤌💵
const ExpandableTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { toggleExpand } = useExpandable();
  return (
    <div ref={ref} onClick={toggleExpand} className="cursor-pointer" {...props}>
      {children}
    </div>
  );
});

ExpandableTrigger.displayName = "ExpandableTrigger";

const ExpandableCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    <motion.div layout className="flex items-start justify-between">
      {children}
    </motion.div>
  </div>
));

ExpandableCardHeader.displayName = "ExpandableCardHeader";

const ExpandableCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 px-4 overflow-hidden grow", className)}
    {...props}
  >
    <motion.div layout>{children}</motion.div>
  </div>
));
ExpandableCardContent.displayName = "ExpandableCardContent";

const ExpandableCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
));
ExpandableCardFooter.displayName = "ExpandableCardFooter";

export {
  Expandable,
  useExpandable,
  ExpandableCard,
  ExpandableContent,
  ExpandableContext,
  ExpandableTrigger,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
};
