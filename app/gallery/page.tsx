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
    <div id="gallery-page" className="min-h-screen p-2">
      {/* <div className="w-full flex items-center justify-center my-12">
        <h1 className="text-4xl font-semibold text-gray-700">Gallery</h1>
      </div> */}
      <div className="w-full mx-auto">
        <ArtworkGrid artworks={artworks} hasMore={hasMore} currentPage={page} />
      </div>
    </div>
  );
};

export default GalleryPage;
