// ArtworkGrid.tsx
"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { ArtworkContext } from "../ArtworkContext";
import { ArtworkDocument } from "@/models/Artwork";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Masonry from "react-masonry-css";
import { usePathname, useRouter } from "next/navigation";
import { useDevice } from "../providers";

const ArtworkGrid = ({
  artworks,
  hasMore: more,
  currentPage: page,
}: {
  artworks: ArtworkDocument[];
  hasMore: boolean;
  currentPage: number;
}) => {
  const { isMobile } = useDevice();
  const router = useRouter();
  const pathName = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const artworkContext = useContext(ArtworkContext);
  if (!artworkContext) return null;
  const {
    artworkList,
    setArtworkList,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = artworkContext;

  // Number of columns for the masonry grid matching Tailwind default breakpoints
  const breakpointColumnsObj = {
    default: 6,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
  };

  useEffect(() => {
    if (!hasMore) return;

    setArtworkList([...artworkList, ...artworks]);
    setCurrentPage(page);
    setHasMore(more);

    window.history.replaceState(null, "", `${pathName}`);
  }, [artworks, pathName]);

  const getNextPage = () => {
    if (!hasMore) return;
    router.replace(`${pathName}?page=${currentPage + 1}`, {
      scroll: false,
    });
  };

  /**
   *  Since the initial fetch of X number of artworks might not fill the viewport,
   *  we need to compare the current content height to the viewport height and fetch more if necessary
   */
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
          columnClassName="p-2"
        >
          {artworkList.map((art: ArtworkDocument, index: number) => (
            <Card
              key={index}
              className="my-4"
              isPressable
              fullWidth
              isHoverable
              onPress={() => router.push(`${pathName}/${art.filename}`)}
              // onMouseOver={() => console.log("Hovered")}
            >
              <CardHeader
                className={`absolute w-full h-full z-20 top-0 font-black text-content4 text-left text-lg sm:text-4xl md:text-2xl xl:text-3xl break-words bg-gradient-to-b to-content1/0 to-50% ${
                  isMobile
                    ? "text-opacity-90 from-secondary/100 from-5%"
                    : "text-opacity-30 hover:text-opacity-90 from-secondary/30 from-0% hover:from-secondary/100 hover:from-10%"
                } `}
              >
                <h3 className="w-full h-full">{art.name}</h3>
              </CardHeader>
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
