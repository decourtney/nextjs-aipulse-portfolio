"use client";

import { ArtworkDocument } from "@/models/Artwork";
import { Card, CardBody, Image } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { ArtworkContext } from "../ArtworkContext";

// Number of columns for the masonry grid matching Tailwind default breakpoints
const breakpointColumnsObj = {
  default: 5,
  1280: 4,
  1024: 3,
  768: 2,
  640: 2,
};

const ArtworkGrid = ({
  artworks,
  hasMore: more,
  currentPage: page,
}: {
  artworks: ArtworkDocument[];
  hasMore: boolean;
  currentPage: number;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const artworkContext = useContext(ArtworkContext);

  const {
    artworkList,
    setArtworkList,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = artworkContext;

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

  useEffect(() => {
    if (!hasMore) return;

    // Prevent duplicates by checking existing IDs
    const existingIds = new Set(artworkList.map((art) => art._id));
    const newArtworks = artworks.filter((art) => !existingIds.has(art._id));

    setArtworkList([...artworkList, ...newArtworks]);
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

    if (!artworkContext) return null;

  /**
   *  Since the initial fetch of X number of artworks might not fill the viewport,
   *  we need to compare the current content height to the viewport height and fetch more if necessary
   */
    console.log(artworkList);

  return (
    <div ref={containerRef}>
      <InfiniteScroll
        dataLength={artworkList.length}
        next={getNextPage}
        hasMore={hasMore}
        loader={<></>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="p-0"
        >
          {artworkList.map((art: ArtworkDocument, index: number) => (
            <Card
              key={index}
              className="group w-full bg-transparent rounded-none shadow-none select-none"
              isPressable
              isHoverable
              onPress={() => router.push(`${pathName}/${art.filename}`)}
            >
              <CardBody className="relative p-0 transition scale-100 hover:scale-105 duration-[4000ms] hover:duration-[2000ms] ease-out">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_AWS_S3_THUMBNAIL_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/pulsePortfolio/thumbnail-${art.src}`}
                  alt={art.description}
                  width="100%"
                  radius="none"
                  className="object-cover"
                  onContextMenu={(event) => event.preventDefault()}
                  draggable={false}
                />
                <div className="absolute inset-0 flex justify-center items-center w-full h-full z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.7))] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="hsl(var(--nextui-content1))"
                    className="w-[64px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  >
                    <path d="M483.18-280q12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63Zm-3.2-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
                  </svg>
                </div>
              </CardBody>
            </Card>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default ArtworkGrid;
