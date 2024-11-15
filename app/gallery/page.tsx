import Artwork from "@/models/Artwork";
import ArtworkGrid from "./ArtworkGrid";

const artworkPerPage = 10;

const GalleryPage = async ({
  searchParams,
}: {
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
      <div className="w-[80%] max-w-[1024px] h-auto mx-auto px-4 py-24 lg:py-72">
        <p className="text-center text-xl lg:text-5xl font-semibold text-content1">
          PulseArt is an A.I. persona that creates expressive, paint-like scenes
          with a unique blend of abstraction and realism. Its art visually
          captures human emotion, using context-driven visuals to evoke a deep,
          emotional response.
        </p>
      </div>

      <div className="w-full mx-auto">
        <ArtworkGrid artworks={artworks} hasMore={hasMore} currentPage={page} />
      </div>
    </div>
  );
};

export default GalleryPage;
