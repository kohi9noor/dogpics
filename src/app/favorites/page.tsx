"use client";
import React, { useState, useEffect } from "react";
import { motion as m } from "motion/react";
import { Heart, MinimizeIcon, X } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/provider/app-provider";

const Page = () => {
  const { favorites } = useAppContext();
  const [favoriteImages, setFavoriteImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setFavoriteImages(Array.from(favorites));
  }, [favorites]);

  const openFullscreen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const handleRemoveFavorite = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const newFavorites = new Set(favorites);
    newFavorites.delete(url);

    localStorage.setItem(
      "favorites",
      JSON.stringify({ state: Array.from(newFavorites) })
    );

    setFavoriteImages(Array.from(newFavorites));
  };

  return (
    <div className="pt-8 px-4 md:px-0 flex flex-col items-center">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl dark:bg-zinc-950/60 bg-foreground/10 backdrop-blur-md border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#582D1D] dark:text-[#F4DAD3]">
            Your Favorites
          </h1>
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-rose-400 fill-rose-400" />
            <span className="text-sm text-[#582D1D] dark:text-[#F4DAD3]">
              {favoriteImages.length} images
            </span>
          </div>
        </div>

        {favoriteImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500 dark:text-[#FCE0C2]/50">
            <Heart size={40} className="mb-4" />
            <p className="text-center">
              You haven&apos;t saved any favorites yet
            </p>
            <p className="text-center text-sm mt-2">
              Browse through the images and click the heart icon to add to
              favorites
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {favoriteImages.map((url, index) => (
              <m.div
                key={url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openFullscreen(url)}
              >
                <Image
                  src={url}
                  alt={`Favorite dog ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <button
                    onClick={(e) => handleRemoveFavorite(url, e)}
                    className="ml-auto p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </m.div>
            ))}
          </div>
        )}
      </m.div>

      {selectedImage && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeFullscreen}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Fullscreen dog"
              width={1000}
              height={1000}
              className="rounded-xl max-h-[90vh] w-auto"
              style={{ objectFit: "contain" }}
            />
            <button
              onClick={closeFullscreen}
              className="fixed top-4 right-4 p-2 backdrop-blur-md hover:bg-muted/40 rounded-sm transition-all duration-150 text-white"
            >
              <MinimizeIcon size={18} />
            </button>
          </div>
        </m.div>
      )}
    </div>
  );
};

export default Page;
