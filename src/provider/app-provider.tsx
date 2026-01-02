"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

interface AppContextType {
  fullScreen: boolean;
  openFullscreen: () => void;
  closeFullscreen: (e: React.MouseEvent | React.TouchEvent | undefined) => void;
  current: ImageNode | null;
  setCurrent: React.Dispatch<React.SetStateAction<ImageNode | null>>;
  goToNext: () => void;
  goToPrev: () => void;
  saveFavorite: () => void;
  removeFavorite: () => void;
  isFavorite: boolean;
  favorites: Set<string>;
  totalImages: number;
  displayIndex: number;
  loading: boolean;
  downloadImage: () => void;
  animateY: boolean;
  setAnimateY: React.Dispatch<React.SetStateAction<boolean>>;
  yDelta: number;
  setYDelta: React.Dispatch<React.SetStateAction<number>>;
}

interface ImageNode {
  url: string;
  prev?: ImageNode;
  next?: ImageNode;
  size?: {
    width: number;
    height: number;
    fullWidth: number;
    fullHeight: number;
  };
}

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateRandomSize = () => {
  const baseWidth = 500;
  const minScale = 0.85;
  const maxScale = 1.15;

  const scale = minScale + Math.random() * (maxScale - minScale);
  const width = Math.round(baseWidth * scale);
  const height = Math.round(baseWidth * scale);

  const fullScale = 2;
  const fullWidth = Math.round(width * fullScale);
  const fullHeight = Math.round(height * fullScale);

  return {
    width,
    height,
    fullWidth,
    fullHeight,
  };
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animateY, setAnimateY] = useState(false);
  const [yDelta, setYDelta] = useState(0);
  const [current, setCurrent] = useState<ImageNode | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          return new Set(parsedFavorites.state || []);
        } catch (error) {
          console.error("Error parsing favorites from localStorage:", error);
        }
      }
    }
    return new Set<string>();
  });

  const totalImages = 16124;

  const openFullscreen = useCallback(() => setFullScreen(true), []);
  const closeFullscreen = useCallback(
    (e: React.MouseEvent | React.TouchEvent | undefined) => {
      if (e) e.stopPropagation();
      setFullScreen(false);
    },
    []
  );

  const isFavorite = useMemo(() => {
    return current ? favorites.has(current.url) : false;
  }, [current, favorites]);
  const fetchImage = useCallback(async (): Promise<string> => {
    const response = await axios.get(
      `https://api.dogpix.lol/api/images/random?t=${Date.now()}`,
      { responseType: "arraybuffer" }
    );

    const random = Math.floor(Math.random() * 200);
    await delay(100 + random);
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  }, []);
  useEffect(() => {
    if (displayIndex === 0) {
      const getImage = async () => {
        setLoading(true);
        const imageUrl = await fetchImage();
        const newNode: ImageNode = {
          url: imageUrl,
          size: generateRandomSize(),
        };
        setCurrent(newNode);
        setDisplayIndex((prev) => prev + 1);

        setLoading(false);
      };

      getImage();
    }
  }, [displayIndex, fetchImage]);

  const goToNext = useCallback(async () => {
    if (!current || totalImages <= 0 || displayIndex > totalImages) return;
    setLoading(true);
    setAnimateY(true);
    setYDelta(60);
    if (current.next) {
      setCurrent(current.next);
      setDisplayIndex((prev) => prev + 1);
    } else {
      const getImage = await fetchImage();
      const newNode: ImageNode = {
        url: getImage,
        size: generateRandomSize(),
        prev: current,
      };
      current.next = newNode;
      setCurrent(newNode);
      setDisplayIndex((prev) => prev + 1);
    }
    setLoading(false);
  }, [current, fetchImage, displayIndex, totalImages]);

  const goToPrev = useCallback(async () => {
    if (!current) return;
    setLoading(true);
    setAnimateY(true);
    setYDelta(-60);
    if (current.prev) {
      setCurrent(current.prev);
      setDisplayIndex((prev) => prev - 1);
    } else {
      const randomIndex = Math.floor(Math.random() * 10);
      const imageUrl = await fetchImage();
      const newNode: ImageNode = {
        url: imageUrl,
        size: generateRandomSize(),
      };
      setCurrent(newNode);
      setDisplayIndex(randomIndex);
    }
    setLoading(false);
  }, [current, fetchImage]);

  const saveFavorite = useCallback(() => {
    if (current && !favorites.has(current.url)) {
      const newFavorites = new Set(favorites);
      newFavorites.add(current.url);
      setFavorites(newFavorites);
      localStorage.setItem(
        "favorites",
        JSON.stringify({ state: Array.from(newFavorites) })
      );
    }
  }, [current, favorites]);

  const removeFavorite = useCallback(() => {
    if (current && favorites.has(current.url)) {
      const newFavorites = new Set(favorites);
      newFavorites.delete(current.url);
      setFavorites(newFavorites);
      localStorage.setItem(
        "favorites",
        JSON.stringify({ state: Array.from(newFavorites) })
      );
    }
  }, [current, favorites]);

  const downloadImage = useCallback(() => {
    if (!current) return;
    const link = document.createElement("a");
    link.href = current.url;
    link.download = `dog-image.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [current]);

  return (
    <AppContext.Provider
      value={{
        fullScreen,
        openFullscreen,
        closeFullscreen,
        current,
        setCurrent,
        goToNext,
        goToPrev,
        saveFavorite,
        removeFavorite,
        isFavorite,
        downloadImage,
        favorites,
        totalImages,
        displayIndex,
        loading,
        animateY,
        setAnimateY,
        yDelta,
        setYDelta,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
