import AnimatedCircles from "./components/AnimatedCircles";
import ElectricHeartbeat from "./components/ElectricHeartbeat";
import { Link } from "@nextui-org/react";

const LandingPage = () => {
  return (
    <section className="relative h-[calc(100dvh-80px)] overflow-clip">
      <div className="flex flex-col justify-center items-center h-[80%] text-center z-50">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif">
          Art Interpreting the Pulse of Our World
        </h1>
        <p className="mx-auto mt-4 text-sm lg:text-lg opacity-75 w-[80%] max-w-xl">
          AI-generated visuals interpreting current events, news, and popular
          culture. Dive into a unique blend of art and technology.
        </p>
        <Link
          href="/gallery"
          className="inline-block mt-8 px-8 transition-transform duration-200 transform hover:scale-105 z-50"
        >
          <p className="underline text-sm lg:text-lg text-content4 hover:text-content3 font-black">
            Explore the Gallery
          </p>
        </Link>
        <p className="font-bold text-red-300 ">Images may contain nudity</p>
      </div>

      <ElectricHeartbeat />
      <AnimatedCircles />
    </section>
  );
};

export default LandingPage;
