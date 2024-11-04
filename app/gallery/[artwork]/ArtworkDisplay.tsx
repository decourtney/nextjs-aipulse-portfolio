"use client";

import React from "react";
import { ArtworkDocument } from "@/models/Artwork";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import PaginationButton from "./PaginationButton";
import { useDevice } from "../../providers";
import { useSwipeable } from "react-swipeable";

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
  const { isMobile } = useDevice();

  const swipeableHandlers = useSwipeable({
    onSwipedLeft: () => router.push(`/gallery/${nextArtworkFilename}`),
    onSwipedRight: () => router.push(`/gallery/${prevArtworkFilename}`),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...swipeableHandlers} className="relative">
      <Card className="bg-transparent shadow-none rounded-none">
        <CardBody className="grid grid-cols-12 gap-4 content-center">
          <div className="mx-auto col-span-12 lg:col-span-6 lg:col-start-2">
            <Image
              className="w-[1024px] h-auto object-cover aspect-square"
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/${artwork.src}`}
              alt={artwork.alt}
              radius="none"
            />

            {isMobile && (
              <div className="relative w-full h-7 mt-2">
                <PaginationButton
                  artworkFilename={prevArtworkFilename}
                  direction={"left"}
                />
                <PaginationButton
                  artworkFilename={nextArtworkFilename}
                  direction={"right"}
                />
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-4 my-auto">
            <div className="content-center">
              <h3 className="font-black text-3xl lg:text-6xl text-content4 text-center lg:text-left">
                {artwork.name}
              </h3>
            </div>

            <p className=" font-semibold lg:text-2xl text-content1">
              {artwork.description}
            </p>
          </div>
        </CardBody>
      </Card>

      {!isMobile && (
        <>
          <PaginationButton
            artworkFilename={prevArtworkFilename}
            direction={"left"}
          />
          <PaginationButton
            artworkFilename={nextArtworkFilename}
            direction={"right"}
          />
        </>
      )}
    </div>
  );
};

export default ArtworkDisplay;
