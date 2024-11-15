"use client";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
    onTouchStartOrOnMouseDown: () => {},
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleSwipeClickPrev = () => {
    if (!prevArtworkFilename) return;
    router.replace(`/gallery/${prevArtworkFilename}`);
  };

  const handleSwipeClickNext = () => {
    if (!nextArtworkFilename) return;
    router.replace(`/gallery/${nextArtworkFilename}`);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    // setTooltipPosition({ x: event.clientX, y: event.clientY });
    // setTooltipVisible(true);
  };

  {
    /* Not currently using a tooltip for this build. however, it will be utilized in a client build. Leaving here for easy implementation */
  }
  const closeTooltip = () => {
    // setTooltipVisible(false);
  };

  return (
    <div
      {...swipeableHandlers}
      className="relative"
    >
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

      <div className="grid grid-cols-12 gap-2 content-center select-none">
        <div className="relative mx-auto col-span-12 xl:col-span-6 xl:col-start-2">
          <Image
            className="w-[1024px] h-auto aspect-square"
            src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/${artwork.src}`}
            alt={artwork.alt}
            onContextMenu={handleContextMenu}
            draggable={false}
            radius="none"
            shadow="md"
          />

          {isMobile && (
            <>
              <div className="w-full h-auto">
                {prevArtworkFilename && (
                  <PaginationButton
                    direction={"left"}
                    handleOnClick={handleSwipeClickPrev}
                  />
                )}
                {nextArtworkFilename && (
                  <PaginationButton
                    direction={"right"}
                    handleOnClick={handleSwipeClickNext}
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-4 my-auto px-4 py-4">
          <div className="content-center">
            <h3 className="xl:w-3/4 font-black text-3xl lg:text-5xl 2xl:text-6xl text-content4 text-center xl:text-left">
              {artwork.name}
            </h3>
          </div>

          <p className="md:w-3/4 xl:w-full mx-auto font-semibold lg:text-2xl text-content1">
            {artwork.description}
          </p>
        </div>
      </div>

      {!isMobile && (
        <>
          {prevArtworkFilename && (
            <PaginationButton
              direction={"left"}
              handleOnClick={handleSwipeClickPrev}
            />
          )}
          {nextArtworkFilename && (
            <PaginationButton
              direction={"right"}
              handleOnClick={handleSwipeClickNext}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArtworkDisplay;
