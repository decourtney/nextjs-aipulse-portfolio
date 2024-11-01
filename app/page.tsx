import AnimatedCircles from "./components/AnimatedCircles";
import ElectricHeartbeat from "./components/ElectricHeartbeat";

const LandingPage = () => {
  return (
    <section id="landing-page" className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[calc(100dvh-80px)] px-4 text-center">
        <h1 className="text-4xl font-bold">
          Art Interpreting the Pulse of Our World
        </h1>
        <p className="mt-4 text-lg opacity-75 max-w-xl">
          AI-generated visuals interpreting current events, news, and popular
          culture. sectione into a unique blend of art and technology.
        </p>

        {/* Call to Action - Button to Gallery */}
        <a
          href="/gallery"
          className="mt-8 inline-block px-8 py-4 bg-indigo-600 text-white rounded-md text-lg tracking-wide hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105"
        >
          Explore the Gallery
        </a>

        {/* Include Client Components */}
        <ElectricHeartbeat />
        <AnimatedCircles />
      </div>
    </section>
  );
};

export default LandingPage;
