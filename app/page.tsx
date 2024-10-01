"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const LandingPage = () => {
  // Refs for the animated circles
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(circle1Ref.current, {
      duration: 60,
      repeat: -1,
      ease: "linear",
      motionPath: {
        alignOrigin: [0.5, 0.5],
        path: "M 0, 0 A 500,500 0 1,1 0.1,0 Z",
        autoRotate: false,
        curviness: 1.25, 
      },
    });

    gsap.to(circle2Ref.current, {
      duration: 60,
      repeat: -1,
      ease: "linear",
      motionPath: {
        alignOrigin: [0.5, 0.5],
        path: "M 0, 0 A -400,-400 0 1,1 -0.1,0 Z",
        autoRotate: false,
        curviness: 1.25,
      },
    });
  }, []);

 return (
   <div className="min-h-[calc(100dvh-5rem)] h-[calc(100dvh-5rem)] overflow-hidden bg-gray-900 text-white">
     {/* Hero Section */}
     <section className="relative flex flex-col items-center justify-center h-full px-4 text-center">
       {/* <div className="mb-10"> */}
       <h1 className="text-4xl font-bold">
         Art Interpreting the Pulse of Our World
       </h1>
       <p className="mt-4 text-lg opacity-75 max-w-xl">
         AI-generated visuals interpreting current events, news, and popular
         culture. Dive into a unique blend of art and technology.
       </p>

       {/* Call to Action - Button to Gallery */}
       <a
         href="/gallery"
         className="mt-8 inline-block px-8 py-4 bg-indigo-600 text-white rounded-md text-lg tracking-wide hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105"
       >
         Explore the Gallery
       </a>
       {/* </div> */}

       {/* Abstract Background Shapes with GSAP Circular Motion */}
       {/* <div
         ref={circle1Ref}
         className="absolute top-1/2 left-[20%] w-[500px] h-[500px] bg-indigo-400 opacity-10 rounded-full blur-3xl"
       ></div>
       <div
         ref={circle2Ref}
         className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-red-400 opacity-10 rounded-full blur-3xl"
       ></div> */}
     </section>
   </div>
 );

};

export default LandingPage;
