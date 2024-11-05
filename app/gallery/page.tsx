import React from "react";
import ArtworkGrid from "./ArtworkGrid";
import Artwork from "@/models/Artwork";

const artworkPerPage = 6;

const GalleryPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: string };
}) => {
  const page = parseInt(searchParams.page || "1", 10);
  const skip = (page - 1) * artworkPerPage;
  const adjustedArtworkPerPage = artworkPerPage + 1; // Fetch artworks up to the current page plus 1 to determine if there are more documents

  const artworksData = await Artwork.find()
    .skip(skip)
    .limit(adjustedArtworkPerPage)
    .sort({ name: 1 }) // Adjust the sort field as needed
    .lean();

  const artworks = JSON.parse(JSON.stringify(artworksData));

  const hasMore = artworks.length === adjustedArtworkPerPage;
  if (hasMore) {
    artworks.pop(); // Remove the 'extra' last document
  }

  return (
    <div id="gallery-page" className="min-h-screen">
      <div className="max-w-[1024px] h-auto mx-auto px-4 py-24 lg:py-48">
        <p className="text-2xl lg:text-5xl font-semibold text-content2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
          optio labore culpa, excepturi ipsa omnis fuga ipsum a odit blanditiis
          ratione vitae possimus aspernatur repellendus nulla, cupiditate eius
          unde! Ullam!
        </p>
      </div>

      <div className="w-full mx-auto">
        <ArtworkGrid artworks={artworks} hasMore={hasMore} currentPage={page} />
      </div>
    </div>
  );
};

export default GalleryPage;
