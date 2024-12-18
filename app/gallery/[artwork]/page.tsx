import Artwork, { ArtworkDocument } from "@/models/Artwork";
import { notFound } from "next/navigation";
import ArtworkDisplay from "./ArtworkDisplay";

const ArtworkPage = async ({ params }: { params: { artwork: string } }) => {
  const { artwork: artworkFilename } = params;
  const decodedArtworkFilename = decodeURIComponent(artworkFilename);

  if (!decodedArtworkFilename) return notFound();

  // Fetch all artworks to enable navigation between artworks
  const artworksData = await Artwork.find().sort({ name: 1 }); // Adjust sorting as needed
  const artworks: ArtworkDocument[] = JSON.parse(JSON.stringify(artworksData));

  // Find the index of the currently displayed artwork
  const index = artworks.findIndex(
    (art) => art.filename === decodedArtworkFilename
  );

  if (index === -1) {
    // If the artwork is not found, return a 404 page
    return notFound();
  }

  const artwork = artworks[index];
  const prevArtworkFilename = index > 0 ? artworks[index - 1].filename : null;
  const nextArtworkFilename =
    index < artworks.length - 1 ? artworks[index + 1].filename : null;

  return (
    <section
      id="artwork-page"
      className="flex lg:items-center min-h-[calc(100dvh-116px)] lg:min-h-[calc(100dvh-164px)]"
    >
      <ArtworkDisplay
        artwork={artwork}
        prevArtworkFilename={prevArtworkFilename}
        nextArtworkFilename={nextArtworkFilename}
      />
    </section>
  );
};

export default ArtworkPage;
