"use client";
import {
  HeartIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UploadIcon,
  UserIcon,
} from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Bottombar = () => {
  interface BottomBarNavigationType {
    Icon: LucideIcon;
    toolTip: string;
    href?: string;
    onClick?: () => void;
  }

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const bottomBarNavigation: BottomBarNavigationType[] = [
    { Icon: HomeIcon, toolTip: "Home", href: "/" },
    { Icon: UploadIcon, toolTip: "Submit", href: "/submit" },
    { Icon: HeartIcon, toolTip: "Favorites", href: "/favorites" },
    { Icon: UserIcon, toolTip: "About Me", href: "/about" },
    {
      Icon: mounted ? (theme === "dark" ? SunIcon : MoonIcon) : SunIcon,
      toolTip: theme === "dark" ? "Light" : "Dark",
      onClick: toggleTheme,
    },
  ];

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Auto-dismiss tooltip after a timeout (for mobile devices)
  useEffect(() => {
    if (activeTooltip) {
      const timer = setTimeout(() => {
        setActiveTooltip(null);
      }, 2000); // 2 seconds timeout

      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  const NavItem = ({ item }: { item: BottomBarNavigationType }) => {
    const content = (
      <m.div
        whileHover={{ scale: 1.15 }}
        className="text-[#582D1D] dark:text-[#F4DAD3] cursor-pointer relative flex items-center justify-center"
        onMouseEnter={() => setActiveTooltip(item.toolTip)}
        onMouseLeave={() => setActiveTooltip(null)}
        onTouchStart={() => setActiveTooltip(item.toolTip)}
        onClick={item.onClick}
      >
        <m.div
          initial={{ y: 0 }}
          whileHover={{
            scale: 1.1,
            transition: { ease: "linear", stiffness: 100 },
          }}
        >
          <item.Icon size={20} />
        </m.div>

        <AnimatePresence>
          {activeTooltip === item.toolTip && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-[10px] bg-accent/60 backdrop-blur-md rounded-sm border border-border text-[#582D1D] dark:text-[#F4DAD3] whitespace-nowrap"
            >
              {item.toolTip}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    );

    return item.href ? (
      <Link key={item.toolTip} href={item.href}>
        {content}
      </Link>
    ) : (
      <div key={item.toolTip}>{content}</div>
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto h-[60px] gap-7 rounded-xl flex items-center px-4 dark:bg-zinc-950/60 bg-foreground/10 backdrop-blur-lg border border-border">
      {bottomBarNavigation.map((item) => (
        <NavItem key={item.toolTip} item={item} />
      ))}
    </div>
  );
};

export default Bottombar;
