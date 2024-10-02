/**
 * categorypage currently fetches all artwork in a category
 * the route accepts limit and offset query params to fetch a
 * subset of artwork for pagination.
 *
 * TODO - might want to add filters in which case the route will
 * need to be updated to accept filter query params
 *
 * OR fetch all artwork from the category with no filters then
 * filter on the client side.
 *
 *
 */

import React from "react";
import ArtworkGrid from "./ArtworkGrid";
import Artwork from "@/models/Artwork";

const artworkPerPage = 10;

const GalleryPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: string };
}) => {
  const page = parseInt(searchParams.page || "1", 10);
  const adjustedArtworkPerPage = artworkPerPage * page + 1; // Fetch artworks up to the current page plus 1 to determine if there are more documents

  // const res = await fetch(
  //   `http://localhost:3000/api/gallery/${category}?limit=${artworkPerPage}`
  // );
  // const data = await res.json();
  // const artworks: ArtworkDocument[] = data.artworks;
  // const hasMore: boolean = data.hasMore;

  const artworksData = await Artwork.find()
    .limit(adjustedArtworkPerPage)
    .sort({ name: 1 }) // Adjust the sort field as needed
    .lean();

  const artworks = JSON.parse(JSON.stringify(artworksData));

  const hasMore = artworks.length === adjustedArtworkPerPage;
  if (hasMore) {
    artworks.pop(); // Remove the 'extra' last document
  }

  return (
    <section className="min-h-dvh">
      <div className="w-full items-center my-12 text-9xl text-center text-[hsl(var(--nextui-primary))]">
        <h1>GALLERY</h1>
      </div>
      <div className="w-3/4 mx-auto">
        <ArtworkGrid artworks={artworks} hasMore={hasMore} currentPage={page} />
      </div>
    </section>
  );
};

export default GalleryPage;
