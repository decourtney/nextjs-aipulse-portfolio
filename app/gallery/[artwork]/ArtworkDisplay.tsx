"use client";

import React, { useState } from "react";
import { ArtworkDocument } from "@/models/Artwork";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import PaginationButton from "./PaginationButton";
import { useDevice } from "../../providers";
import { useSwipeable } from "react-swipeable";
import Tooltip from "@/app/components/Tooltip";

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

  /**
   * Not currently using a tooltip for this build.
   * However, it will be utilized in a client build.
   * Leaving here for easy implementation.
   *  */
  // const [tooltipVisible, setTooltipVisible] = useState(false);
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const swipeableHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipeClickNext(),
    onSwipedRight: () => handleSwipeClickPrev(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleSwipeClickNext = () => {
    router.push(`/gallery/${nextArtworkFilename}`);
  };
  const handleSwipeClickPrev = () => {
    router.push(`/gallery/${prevArtworkFilename}`);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    // setTooltipPosition({ x: event.clientX, y: event.clientY });
    // setTooltipVisible(true);
  };

  const closeTooltip = () => {
    // setTooltipVisible(false);
  };

  return (
    <div {...swipeableHandlers} className="relative">
      {/* Not currently using a tooltip for this build. however, it will be utilized in a client build. Leaving here for easy implementation */}
      {/* {tooltipVisible && (
        <Tooltip
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          onClose={closeTooltip}
        >
          <p className="text-sm">
            Right-click is disabled to protect the artwork.
          </p>
        </Tooltip>
      )} */}

      <Card className="bg-transparent shadow-none rounded-none">
        <CardBody className="grid grid-cols-12 gap-2 content-center">
          <div className="mx-auto col-span-12 lg:col-span-6 lg:col-start-2">
            <Image
              className="w-[1024px] h-auto object-cover aspect-square"
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/${artwork.src}`}
              alt={artwork.alt}
              radius="none"
              onContextMenu={handleContextMenu}
              draggable={false}
            />

            {isMobile && (
              <div className="relative w-full h-6 mt-2">
                <PaginationButton
                  direction={"left"}
                  handleOnClick={handleSwipeClickPrev}
                />
                <PaginationButton
                  direction={"right"}
                  handleOnClick={handleSwipeClickNext}
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
            direction={"left"}
            handleOnClick={handleSwipeClickPrev}
          />
          <PaginationButton
            direction={"right"}
            handleOnClick={handleSwipeClickNext}
          />
        </>
      )}
    </div>
  );
};

export default ArtworkDisplay;
