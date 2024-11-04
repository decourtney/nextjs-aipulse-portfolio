"use client";

import React from "react";
import { ArtworkDocument } from "@/models/Artwork";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import PaginationButton from "./PaginationButton";
import { useDevice } from "../../providers";

const ArtworkDisplay = ({
  artwork,
  prevArtworkFilename,
  nextArtworkFilename,
}: {
  artwork: ArtworkDocument;
  prevArtworkFilename: string | null;
  nextArtworkFilename: string | null;
}) => {
  const { isMobile } = useDevice();

  return (
    <div className="relative">
      <Card className="bg-transparent shadow-none rounded-none">
        <CardBody className="grid grid-cols-12 content-center overflow-scroll">
          <div className="col-span-12 lg:col-span-6 lg:col-start-2">
            <Image
              className="object-cover"
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/${artwork.src}`}
              alt={artwork.alt}
              // width={"100%"}
              height={"100%"}
            />
          </div>

          <div className="col-span-12 lg:col-span-4 p-4 my-auto">
            <div className="relative py-5 content-center">
              <h3 className="font-black text-3xl lg:text-6xl text-content4 text-center lg:text-left">
                {artwork.name}
              </h3>
              {isMobile && (
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
