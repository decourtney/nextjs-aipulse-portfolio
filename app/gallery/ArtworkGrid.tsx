// ArtworkGrid.tsx
"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArtworkDocument } from "@/models/Artwork";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardBody, Image } from "@nextui-org/react";
import Masonry from "react-masonry-css";
import { usePathname, useRouter } from "next/navigation";

const ArtworkGrid = ({
  artworks,
  hasMore,
  currentPage,
}: {
  artworks: ArtworkDocument[];
  hasMore: boolean;
  currentPage: number;
}) => {
  const [artworkList, setArtworkList] = useState<ArtworkDocument[]>([]);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const router = useRouter();
  const pathName = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setArtworkList([...artworkList, ...artworks]);
    setCurrentPageState(currentPage);
    window.history.replaceState(null, "", `${pathName}`);
  }, [artworks, pathName, currentPage]);

  const getNextPage = () => {
    if (!hasMore) return;
    router.replace(`${pathName}?page=${currentPageState + 1}`, {
      scroll: false,
    });
  };

  useLayoutEffect(() => {
    const checkContentHeight = () => {
      if (containerRef.current) {
        const contentHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        if (contentHeight < viewportHeight && hasMore) {
          getNextPage();
        }
      }
    };

    // Initial check
    checkContentHeight();

    // Check when images load
    const images = containerRef.current?.getElementsByTagName("img");
    if (images) {
      let imagesLoaded = 0;

      const onImageLoad = () => {
        imagesLoaded += 1;
        if (imagesLoaded === images.length) {
          checkContentHeight();
        }
      };

      for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
          imagesLoaded += 1;
        } else {
          images[i].addEventListener("load", onImageLoad);
        }
      }

      if (imagesLoaded === images.length) {
        checkContentHeight();
      }

      return () => {
        for (let i = 0; i < images.length; i++) {
          images[i].removeEventListener("load", onImageLoad);
        }
      };
    }
  }, [artworkList, hasMore]);

  if (artworkList.length === 0) return <p>No artwork available.</p>;

  const breakpointColumnsObj = {
    default: 6,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
  };

  return (
    <div ref={containerRef}>
      <InfiniteScroll
        dataLength={artworkList.length}
        next={getNextPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto"
          columnClassName="p-1"
        >
          {artworkList.map((art: ArtworkDocument, index: number) => (
            <Card
              key={index}
              isPressable
              fullWidth
              onPress={() => router.replace(`${pathName}/${art.filename}`)}
              className="my-2"
            >
              <CardBody className="p-0">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_AWS_S3_THUMBNAIL_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/thumbnail-${art.src}`}
                  alt={art.description}
                  width={"100%"}
                />
              </CardBody>
            </Card>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default ArtworkGrid;
