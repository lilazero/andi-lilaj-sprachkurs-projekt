"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type LucideIcon, XIcon } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  useContext,
  useState,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BannerContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const BannerContext = createContext<BannerContextProps>({
  show: true,
  setShow: () => {},
});

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  visible?: boolean;
  defaultVisible?: boolean;
  onClose?: () => void;
  inset?: boolean;
};

export const Banner = ({
  children,
  visible,
  defaultVisible = true,
  onClose,
  className,
  inset = false,
  ...props
}: BannerProps) => {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  if (!show) {
    return null;
  }

  return (
    <BannerContext.Provider value={{ show, setShow }}>
      <div
        className={cn(
          "flex w-full items-center justify-between gap-2 bg-primary px-4 py-2 text-primary-foreground",
          inset && "rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </BannerContext.Provider>
  );
};

export type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
  icon: LucideIcon;
};

export const BannerIcon = ({
  icon: Icon,
  className,
  ...props
}: BannerIconProps) => (
  <div
    className={cn(
      "rounded-full border border-background/20 bg-background/10 p-1 shadow-sm",
      className
    )}
    {...props}
  >
    <Icon size={16} />
  </div>
);

export type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerTitle = ({ className, ...props }: BannerTitleProps) => (
  <p className={cn("flex-1 text-sm", className)} {...props} />
);

export type BannerActionProps = ComponentProps<typeof Button>;

export const BannerAction = ({
  variant = "outline",
  size = "sm",
  className,
  ...props
}: BannerActionProps) => (
  <Button
    className={cn(
      "shrink-0 bg-transparent hover:bg-background/10 hover:text-background",
      className
    )}
    size={size}
    variant={variant}
    {...props}
  />
);

export type BannerCloseProps = ComponentProps<typeof Button>;

export const BannerClose = ({
  variant = "ghost",
  size = "icon",
  onClick,
  className,
  ...props
}: BannerCloseProps) => {
  const { setShow } = useContext(BannerContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setShow(false);
    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        "shrink-0 bg-transparent hover:bg-background/10 hover:text-background",
        className
      )}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      <XIcon size={18} />
    </Button>
  );
};

export const BannerLocal = ({
  storageKey = "site:banner:closed",
  children,
  defaultVisible = true,
  expiresDays = null,
  expired = false,
  ...props
}: {
  storageKey?: string;
  /* * Number of days after which the dismissal expires and the banner is shown again. If null, 
  never expires. */
  expiresDays?: number | null;
  /** When true, treat the stored dismissal as expired (clear storage) and show the banner.
   * So i can programatically reset. */
  expired?: boolean;
} & BannerProps) => {
  const [show, setShow] = useState<boolean | null>(null);

  // Initialize client-only state after mount to avoid SSR/client mismatch.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        Promise.resolve().then(() => setShow(defaultVisible));
        return;
      }
      const data = JSON.parse(raw);
      if (data && typeof data.closedAt === "number") {
        if (typeof expiresDays === "number") {
          const ms = expiresDays * 24 * 60 * 60 * 1000;
          if (Date.now() - data.closedAt > ms) {
            // expired — clear stored flag and show
            localStorage.removeItem(storageKey);
            Promise.resolve().then(() => setShow(defaultVisible));
            return;
          }
          // not expired — keep hidden
          Promise.resolve().then(() => setShow(false));
          return;
        }
        // no expiry configured — keep hidden
        Promise.resolve().then(() => setShow(false));
        return;
      }
      Promise.resolve().then(() => setShow(defaultVisible));
    } catch {
      Promise.resolve().then(() => setShow(defaultVisible));
    }
  }, [storageKey, expiresDays, defaultVisible]);

  // If parent explicitly marks as expired, clear storage and show again.
  useEffect(() => {
    if (!expired) return;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    Promise.resolve().then(() => setShow(defaultVisible));
  }, [expired, storageKey, defaultVisible]);

  const handleClose = () => {
    try {
      const payload = JSON.stringify({ closedAt: Date.now() });
      localStorage.setItem(storageKey, payload);
    } catch {
      // ignore quota errors
    }
    setShow(false);
  };

  // avoid flashing before localStorage is checked
  if (show === null) return null;

  return (
    <Banner visible={show} onClose={handleClose} {...props}>
      {children}
    </Banner>
  );
};
