"use client";
import { useAppContext } from "@/provider/app-provider";
import React from "react";

const ImageNumberCounter = () => {
  const { fullScreen, displayIndex, totalImages } = useAppContext();
  return (
    !fullScreen && (
      <>
        <div className="absolute top-4 px-3 py-2 rounded-full dark:bg-zinc-950/60 border dark:border-white/5 text-sm">
          {displayIndex}/{totalImages}
        </div>
        <div className="absolute top-4 text-xs  right-4 px-4 py-1.5 bg-white/80 dark:bg-zinc-950/60 rounded-md border dark:border-white/5">
          Use ↑↓ keys, scroll, or drag
        </div>
      </>
    )
  );
};

export default ImageNumberCounter;
