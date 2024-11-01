// context/ArtworkContext.tsx
"use client";

import React, { createContext, useState } from "react";
import { ArtworkDocument } from "@/models/Artwork";

interface ArtworkContextType {
  artworkList: ArtworkDocument[];
  setArtworkList: React.Dispatch<React.SetStateAction<ArtworkDocument[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArtworkContext = createContext<ArtworkContextType | null>(null);

export const ArtworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [artworkList, setArtworkList] = useState<ArtworkDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  return (
    <ArtworkContext.Provider
      value={{
        artworkList,
        setArtworkList,
        currentPage,
        setCurrentPage,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};
