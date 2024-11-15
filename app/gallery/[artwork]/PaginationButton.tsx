import { Button } from "@nextui-org/react";

const PaginationButton = ({
  direction,
  handleOnClick,
}: {
  direction: "left" | "right";
  handleOnClick: () => void;
}) => {
  return (
    <div
      className={`absolute top-0 ${direction}-0 w-1/2 h-full overflow-clip z-10`}
    >
      <Button
        disableAnimation
        className="group w-full h-full bg-transparent"
        onPress={handleOnClick}
        size="lg"
        radius="none"
        isIconOnly
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="hsl(var(--nextui-content1))"
          className={`w-[48px] md:w-[72px] lg:w-[96px] h-auto ${
            direction === "left"
              ? "scale-x-100 active:scale-x-125 mr-auto"
              : "-scale-x-100 active:-scale-x-125 ml-auto"
          } group-hover:scale-y-150 opacity-10 group-hover:opacity-80 group- transition ease-out hover:duration-300`}
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
      </Button>
    </div>
  );
};

export default PaginationButton;
