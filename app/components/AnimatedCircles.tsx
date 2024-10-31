"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const AnimatedCircles = () => {
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate circle1
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

    // Animate circle2
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

    // Cleanup function
    return () => {
      gsap.killTweensOf(circle1Ref.current);
      gsap.killTweensOf(circle2Ref.current);
    };
  }, []);

  return (
    <>
      <div
        id="circle1"
        ref={circle1Ref}
        className="absolute top-1/2 left-[20%] w-[500px] h-[500px] opacity-10 rounded-full blur-3xl"
      ></div>
      <div
        id="circle2"
        ref={circle2Ref}
        className="absolute top-0 right-[20%] w-[300px] h-[300px] opacity-10 rounded-full blur-3xl"
      ></div>
    </>
  );
};

export default AnimatedCircles;
