"use client";

import { ArtworkDocument } from "@/models/Artwork";
import React, { createContext, useState } from "react";

interface ArtworkContextType {
  artworkList: ArtworkDocument[];
  setArtworkList: React.Dispatch<React.SetStateAction<ArtworkDocument[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArtworkContext = createContext<ArtworkContextType>({
  artworkList: [],
  setArtworkList: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  hasMore: true,
  setHasMore: () => {},
});

export const ArtworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
