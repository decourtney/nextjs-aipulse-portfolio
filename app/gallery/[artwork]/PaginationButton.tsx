import { Link } from "@nextui-org/react";
import React from "react";

const PaginationButton = ({
  artworkFilename,
  direction,
}: {
  artworkFilename: string | null;
  direction: "left" | "right";
}) => {
  return (
    <div
      className={`${
        !artworkFilename ? "hidden" : ""
      } absolute top-0 ${direction}-0 h-full content-center text-center overflow-clip z-50`}
    >
      <Link
        href={`/gallery/${artworkFilename}`}
        className="group w-6 lg:w-24 h-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          height="100%"
          width="100%"
          fill="#e8eaed"
          className={`${
            direction === "left"
              ? "scale-x-100 active:scale-x-125"
              : "-scale-x-100 active:-scale-x-125"
          } group-hover:scale-y-150 transition ease-out opacity-10 hover:opacity-50 hover:duration-300`}
        >
          <path
            className="transform translate-x-[50px] translate-y-[100px] scale-x-[.9] scale-y-[1.2]"
            d="m424.15-480 170.93 170.92q8.3 8.31 8.5 18.39.19 10.07-8.5 18.77-8.7 8.69-18.58 8.69-9.88 0-18.91-9.03L372.15-457.69q-4.61-5.02-6.92-10.55-2.31-5.53-2.31-11.96 0-6.43 2.31-11.96 2.31-5.53 6.92-10.15l185.44-185.43q8.64-8.64 18.72-8.84 10.07-.19 18.77 8.5 8.69 8.7 8.69 18.58 0 9.88-8.69 18.58L424.15-480Z"
          />
          <path
            className="transform group-hover:-translate-x-[150px] transition ease-out group-hover:duration-1000"
            d="m424.15-480 170.93 170.92q8.3 8.31 8.5 18.39.19 10.07-8.5 18.77-8.7 8.69-18.58 8.69-9.88 0-18.91-9.03L372.15-457.69q-4.61-5.02-6.92-10.55-2.31-5.53-2.31-11.96 0-6.43 2.31-11.96 2.31-5.53 6.92-10.15l185.44-185.43q8.64-8.64 18.72-8.84 10.07-.19 18.77 8.5 8.69 8.7 8.69 18.58 0 9.88-8.69 18.58L424.15-480Z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default PaginationButton;
