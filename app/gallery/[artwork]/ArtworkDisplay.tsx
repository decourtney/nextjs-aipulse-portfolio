"use client";

import React from "react";
import { ArtworkDocument } from "@/models/Artwork";
import { Button, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";

const ArtworkDisplay = ({
  artwork,
  prevArtworkFilename,
  nextArtworkFilename,
}: {
  artwork: ArtworkDocument;
  prevArtworkFilename: string | null;
  nextArtworkFilename: string | null;
}) => {
  const router = useRouter();
  const params = useParams(); // Get the current category and artworkName from params

  // Helper function to construct a new URL by replacing only the artworkName
  const updateArtworkInParams = (newArtworkName: string) => {
    return `/gallery/${newArtworkName}`; // Construct a new URL with the updated artworkName
  };

  return (
    <>
      {/* Display the artwork */}
      <h1>{artwork.name}</h1>
      <Image
        src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/${artwork.src}`}
        alt={artwork.alt}
      />

      {/* Navigation links */}
      <Button
        isDisabled={!prevArtworkFilename}
        onPress={() => {
          router.replace(updateArtworkInParams(prevArtworkFilename || "")); // Navigate to the previous artwork
        }}
      >
        Previous
      </Button>

      <Button
        isDisabled={!nextArtworkFilename}
        onPress={() => {
          router.replace(updateArtworkInParams(nextArtworkFilename || "")); // Navigate to the next artwork
        }}
      >
        Next
      </Button>
    </>
  );
};

export default ArtworkDisplay;
