"use client";
import React from "react";
import {
  ArrowDown,
  ArrowUpIcon,
  DownloadIcon,
  FlagIcon,
  FullscreenIcon,
  HeartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/provider/app-provider";
const Sidebar = () => {
  const {
    fullScreen,
    isFavorite,
    openFullscreen,
    goToNext,
    goToPrev,
    saveFavorite,
    removeFavorite,
    downloadImage,
    setAnimateY,
    setYDelta,
    loading,
  } = useAppContext();

  const handleArrowDownClick = () => {
    if (loading) return;
    setAnimateY(true);
    setYDelta(40);
    setTimeout(() => {
      goToNext();
    }, Math.floor(Math.random() * 100) + 60);
  };
  const handleArrowUpClick = () => {
    if (loading) return;
    setAnimateY(true);
    setYDelta(-40);
    setTimeout(() => {
      goToPrev();
    }, Math.floor(Math.random() * 100) + 60);
  };

  const buttons = [
    {
      Icon: FlagIcon,
      onClick: undefined,
      className:
        "dark:hover:text-orange-400 hover:text-orange-400 text-[#582D1D] dark:text-[#F4DAD3]",
    },
    {
      Icon: HeartIcon,
      onClick: isFavorite ? removeFavorite : saveFavorite,
      className:
        "dark:hover:text-rose-400 hover:text-rose-400  text-[#582D1D] dark:text-[#F4DAD3]",
    },
    {
      Icon: ArrowUpIcon,
      onClick: handleArrowUpClick,
      className:
        "dark:hover:text-blue-400 hover:text-blue-400 text-[#582D1D] dark:text-[#F4DAD3]",
    },
    {
      Icon: ArrowDown,
      onClick: handleArrowDownClick,
      className:
        "dark:hover:text-blue-400 hover:text-blue-400 text-[#582D1D] dark:text-[#F4DAD3]",
    },
    {
      Icon: DownloadIcon,
      onClick: downloadImage,
      className:
        "dark:hover:text-green-400 hover:text-green-400 text-[#582D1D] dark:text-[#F4DAD3]",
    },
    {
      Icon: FullscreenIcon,
      onClick: openFullscreen,
      className:
        "dark:hover:text-blue-400 hover:text-blue-400 text-[#582D1D] dark:text-[#F4DAD3]",
    },
  ];

  return (
    !fullScreen && (
      <div className="absolute right-4 z-50 h-auto w-[40px] flex flex-col items-center gap-1">
        {buttons.map(({ Icon, onClick, className }, index) => {
          const isHeart = Icon === HeartIcon;
          return (
            <div
              key={index}
              onClick={onClick}
              className={`w-10 h-10 p-2 ${className} flex items-center justify-center rounded-md hover:bg-accent/80`}
            >
              <Icon
                size={16}
                className={cn(
                  isHeart && isFavorite
                    ? "fill-rose-400 border-none text-rose-400"
                    : ""
                )}
              />
            </div>
          );
        })}
      </div>
    )
  );
};

export default Sidebar;
