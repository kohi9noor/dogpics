"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion as m, AnimatePresence, useDragControls } from "motion/react";
import { MinimizeIcon, ChevronUp, ChevronDown } from "lucide-react";
import { useAppContext } from "@/provider/app-provider";

const ImageViewer = () => {
  const {
    goToPrev,
    goToNext,
    fullScreen,
    openFullscreen,
    closeFullscreen,
    loading,
    current,
    animateY,
    setAnimateY,
    yDelta,
    setYDelta,
  } = useAppContext();

  const imageUrl = current?.url;

  const documentRef = useRef(null);
  const dragControls = useDragControls();
  const [dragDirection, setDragDirection] = useState<"none" | "up" | "down">(
    "none"
  );
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const dragThreshold = 20;

  const [randomStyle, setRandomStyle] = useState({});

  useEffect(() => {
    if (current && current.size) {
      const shadowOpacity = (0.2 + Math.random() * 0.3).toFixed(2);

      setRandomStyle({
        boxShadow: `0 5px 15px rgba(0, 0, 0, ${shadowOpacity})`,
        borderRadius: `${8 + Math.random() * 8}px`,
      });
    }
  }, [current]);

  const handleNext = useCallback(() => {
    if (loading) return;
    setAnimateY(true);
    setYDelta(60);
    setTimeout(() => {
      goToNext();
    }, Math.floor(Math.random() * 100) + 60);
  }, [goToNext, setAnimateY, setYDelta, loading]);

  const handlePrev = useCallback(() => {
    if (loading) return;
    setAnimateY(true);
    setYDelta(-60);
    setTimeout(() => {
      goToPrev();
    }, Math.floor(Math.random() * 100) + 60);
  }, [goToPrev, setAnimateY, setYDelta, loading]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === " ") {
        handleNext();
      } else if (event.key === "ArrowUp") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      setAnimateY(false);
    };
  }, [handleNext, handlePrev, setAnimateY]);

  useEffect(() => {
    if (animateY) {
      const timer = setTimeout(() => {
        setAnimateY(false);
        setYDelta(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animateY, setAnimateY, setYDelta]);

  useEffect(() => {
    setAnimateY(false);
    setYDelta(0);
  }, [current?.url, setAnimateY, setYDelta]);

  const [wheelIsThrottled, setWheelIsThrottled] = useState(false);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (loading || wheelIsThrottled) return;

      const thresHold = 40;
      if (Math.abs(e.deltaY) <= thresHold) return;

      setWheelIsThrottled(true);

      if (e.deltaY > thresHold) {
        setAnimateY(true);
        setYDelta(60);
        setTimeout(() => {
          goToNext();
        }, Math.floor(Math.random() * 100) + 60);
      } else if (e.deltaY < -thresHold) {
        setAnimateY(true);
        setYDelta(-60);
        setTimeout(() => {
          goToPrev();
        }, Math.floor(Math.random() * 100) + 60);
      }

      setTimeout(() => {
        setWheelIsThrottled(false);
      }, 500);
    },
    [loading, goToNext, goToPrev, setAnimateY, setYDelta, wheelIsThrottled]
  );

  const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) => {
    const clientY =
      "clientY" in _event
        ? _event.clientY
        : (_event as TouchEvent).touches?.[0]?.clientY || 0;
    setDragStartY(clientY);
    setDragDirection("none");
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent) => {
    if (dragStartY === null) return;

    const clientY =
      "clientY" in _event
        ? _event.clientY
        : (_event as TouchEvent).touches?.[0]?.clientY || 0;

    const deltaY = dragStartY - clientY;

    if (Math.abs(deltaY) > dragThreshold) {
      if (deltaY > 0) {
        setDragDirection("down");
      } else {
        setDragDirection("up");
      }
    } else {
      setDragDirection("none");
    }
  };

  const handleDragEnd = () => {
    if (loading) return;

    if (dragDirection === "up") {
      goToPrev();
    } else if (dragDirection === "down") {
      goToNext();
    }

    setDragStartY(null);
    setDragDirection("none");
  };

  return (
    <>
      <div
        ref={documentRef}
        className=" flex flex-col items-center justify-center w-full h-full"
      >
        <div className="relative">
          <div
            onClick={openFullscreen}
            className="cursor-pointer relative transition-transform hover:scale-105 duration-300"
            style={{ minHeight: 400, minWidth: 400, position: "relative" }}
          >
            {loading && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md bg-zinc-100/90 text-zinc-900 text-sm font-medium shadow-md dark:bg-zinc-900/80 dark:text-zinc-100">
                Loading...
              </div>
            )}
            <m.div
              onWheel={handleWheel}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              animate={{
                y: animateY ? yDelta : 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              {imageUrl && (
                <div style={randomStyle}>
                  <Image
                    src={imageUrl!}
                    width={current?.size?.width || 400}
                    height={current?.size?.height || 400}
                    loading="lazy"
                    alt="Dog image"
                    className={`rounded-xl transition-opacity duration-300`}
                  />
                </div>
              )}

              <AnimatePresence>
                {dragDirection !== "none" && (
                  <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-950/60 border border-white/5 shadow-md hover:bg-zinc-950/80 active:scale-95 transition-all duration-150 focus:outline-none"
                      style={{ minWidth: 110 }}
                      tabIndex={-1}
                      type="button"
                    >
                      {dragDirection === "up" ? (
                        <>
                          <ChevronUp size={22} className=" animate-bounce" />
                          <span className=" text-sm font-semibold">
                            Previous
                          </span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={22} className=" animate-bounce" />
                          <span className=" text-sm font-semibold">Next</span>
                        </>
                      )}
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </div>
        </div>

        <AnimatePresence>
          {fullScreen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-muted/80 dark:bg-zinc-950/80 flex items-center justify-center z-50"
              onClick={closeFullscreen}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                {loading && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 border-4 border-t-[#FCE0C2] border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
                      <p className="text-[#FCE0C2] text-sm font-medium">
                        Loading...
                      </p>
                    </div>
                  </div>
                )}

                <div style={randomStyle}>
                  <Image
                    src={imageUrl!}
                    width={current?.size?.fullWidth || 800}
                    height={current?.size?.fullHeight || 800}
                    alt="Dog image fullscreen"
                    className={`rounded-xl transition-opacity duration-300 `}
                    loading="lazy"
                  />
                </div>

                <button
                  onClick={closeFullscreen}
                  className="fixed top-4 right-4 p-2 backdrop-blur-md hover:border hover:bg-muted/60 rounded-md active:scale-95 transition-all duration-150"
                >
                  <MinimizeIcon size={18} />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ImageViewer;
