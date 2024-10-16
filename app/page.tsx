"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const LandingPage: React.FC = () => {
  // Refs for the animated circles
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);

  // Ref for the SVG container
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate circle1
    gsap.to(circle1Ref.current!, {
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
    gsap.to(circle2Ref.current!, {
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

    // Define an array of electrical colors
    const electricalColors: string[] = [
      "#00FFFF", // Aqua
      "#7FFFD4", // Aquamarine
      "#1E90FF", // Dodger Blue
      "#FFFFFF", // White
      "#FFD700", // Gold
      "#FF69B4", // Hot Pink
      "#FF1493", // Deep Pink
      "#8A2BE2", // Blue Violet
      "#9400D3", // Dark Violet
      "#00CED1", // Dark Turquoise
    ];

    interface Point {
      x: number;
      y: number;
    }

    const chanceOfMultipleStrikes = 0.5; // 50% chance of multiple strikes

    // Function to trigger the electric heartbeat animation
    const triggerHeartbeat = () => {
      if (!circle1Ref.current || !circle2Ref.current || !svgRef.current) return;

      const rect1 = circle1Ref.current.getBoundingClientRect();
      const rect2 = circle2Ref.current.getBoundingClientRect();

      // Centers of the circles
      const x1 = rect1.left + rect1.width / 2;
      const y1 = rect1.top + rect1.height / 2;
      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      // Calculate angle and distance between circles
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // Convert to degrees

      // Create a group to apply transformations (no ID)
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute(
        "transform",
        `translate(${x1}, ${y1}) rotate(${angle})`
      );

      svgRef.current.appendChild(group);

      // Define line reduction percentage (e.g., 20% shorter)
      const lineReductionPercentage = 0.2; // 20%

      // Create a timeline for the group
      const groupTimeline = gsap.timeline({
        onComplete: () => {
          // After all animations are complete, remove the group
          if (svgRef.current?.contains(group)) {
            svgRef.current.removeChild(group);
          }
        },
      });

      // Generate multiple heartbeat paths with variations
      const numLines = 5; // Number of overlaid lines
      for (let i = 0; i < numLines; i++) {
        const pathElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        const isMainLine = i === 0;
        const variation = isMainLine ? 0 : (i / numLines) * 20;

        // Random offsets for additional lines' starting and ending points
        const startPointOffset: Point = isMainLine
          ? { x: 0, y: 0 }
          : {
              x: (Math.random() - 0.5) * (distance * 0.02),
              y: (Math.random() - 0.5) * 10,
            };
        const endPointOffset: Point = isMainLine
          ? { x: 0, y: 0 }
          : {
              x: (Math.random() - 0.5) * (distance * 0.02),
              y: (Math.random() - 0.5) * 10,
            };

        const pathData = generateHeartbeatPath(
          distance,
          variation,
          !isMainLine,
          startPointOffset,
          endPointOffset,
          lineReductionPercentage
        );

        // Select a random color for the line
        const colorIndex = Math.floor(Math.random() * electricalColors.length);
        const lineColor = electricalColors[colorIndex];

        pathElement.setAttribute("d", pathData);
        pathElement.setAttribute("stroke", lineColor);
        pathElement.setAttribute("stroke-width", "2");
        pathElement.setAttribute("fill", "none");

        // Apply drop-shadow filter for glow effect
        (
          pathElement.style as CSSStyleDeclaration
        ).filter = `drop-shadow(0px 0px 6px ${lineColor})`;

        group.appendChild(pathElement);

        const pathLength = pathElement.getTotalLength();
        const visibleLength = pathLength * 0.3; // Limited length of the line

        // Animate the line with limited length and trailing effect
        const tl = gsap.timeline({
          delay: i * 0.02,
          onComplete: () => {
            // Remove the path after animation
            if (group.contains(pathElement)) {
              group.removeChild(pathElement);
            }
          },
        });

        tl.fromTo(
          pathElement,
          {
            strokeDasharray: `${visibleLength} ${pathLength}`,
            strokeDashoffset: pathLength,
            opacity: 0,
          },
          {
            strokeDashoffset: -visibleLength,
            duration: 0.4, // Faster animation
            ease: "power2.out",
            opacity: 1,
            immediateRender: true,
          }
        );

        // Fade in at the beginning
        tl.fromTo(
          pathElement,
          { opacity: 0 },
          { opacity: 1, duration: 0.1, ease: "power1.inOut" },
          0 // Start at the beginning of the timeline
        );

        // Fade out at the end
        tl.to(
          pathElement,
          { opacity: 0, duration: 0.1, ease: "power1.inOut" },
          0.3 // Start fade out near the end of the animation
        );

        // Add the line animation timeline to the group timeline
        groupTimeline.add(tl, 0);
      }

      // Animate circles to flash and change size/color
      const circleAnimationDuration = 0.4;

      // Circle 1 Animation
      gsap.fromTo(
        circle1Ref.current!,
        {
          scale: 1,
          backgroundColor: "var(--nextui-primary)",
        } as gsap.TweenVars,
        {
          scale: 1.1,
          backgroundColor: "#FFD700", // Gold
          duration: circleAnimationDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        } as gsap.TweenVars
      );

      // Circle 2 Animation
      gsap.fromTo(
        circle2Ref.current!,
        {
          scale: 1,
          backgroundColor: "var(--nextui-primary)",
        } as gsap.TweenVars,
        {
          scale: 1.1,
          backgroundColor: "#FFD700", // Gold
          duration: circleAnimationDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        } as gsap.TweenVars
      );
    };

    // Function to generate the heartbeat path along the x-axis
    const generateHeartbeatPath = (
      length: number,
      variation: number,
      isErratic: boolean,
      startPointOffset: Point,
      endPointOffset: Point,
      lineReductionPercentage: number
    ): string => {
      const amplitudeBase = 50; // Base amplitude
      const amplitude = amplitudeBase + variation; // Adjusted amplitude

      // Calculate reduction amount
      const reductionAmount = length * (lineReductionPercentage / 2);
      const reducedStartX = reductionAmount + startPointOffset.x;
      const reducedEndX = length - reductionAmount + endPointOffset.x;
      const adjustedLength = reducedEndX - reducedStartX;

      // Define key points along the adjusted length
      const points: Point[] = [
        { x: reducedStartX, y: 0 + startPointOffset.y }, // Start point
        { x: reducedStartX + adjustedLength * 0.3, y: 0 }, // Move towards center
        { x: reducedStartX + adjustedLength * 0.4, y: -amplitude }, // First peak
        {
          x: reducedStartX + adjustedLength * 0.5,
          y: amplitude,
        }, // Valley (centered)
        {
          x: reducedStartX + adjustedLength * 0.6,
          y: -amplitude * 0.6,
        }, // Second peak
        { x: reducedStartX + adjustedLength * 0.7, y: 0 }, // Move towards end
        { x: reducedEndX, y: 0 + endPointOffset.y }, // End point
      ];

      if (isErratic) {
        // Introduce randomness to points for erratic effect
        points.forEach((point, index) => {
          if (index !== 0 && index !== points.length - 1) {
            // Skip the first and last points
            const randomOffsetX = (Math.random() - 0.5) * variation * 0.2;
            const randomOffsetY = (Math.random() - 0.5) * variation * 2;
            point.x += randomOffsetX;
            point.y += randomOffsetY;
          }
        });
      }

      // Build the path string
      let path = `M ${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x},${points[i].y}`;
      }

      return path;
    };

    // Start the heartbeat animation loop
    let heartbeatTimeoutId: ReturnType<typeof setTimeout>;

    const startHeartbeatLoop = () => {
      // Decide how many strikes to schedule
      const chanceOfMultipleStrikes = 0.5; // 50% chance
      const numberOfStrikes =
        Math.random() < chanceOfMultipleStrikes
          ? Math.floor(Math.random() * 3) + 1 // 1 to 3 strikes
          : 1;

      for (let i = 0; i < numberOfStrikes; i++) {
        const strikeDelay = i === 0 ? 0 : Math.random() * 300 + 100; // Delays between strikes
        setTimeout(triggerHeartbeat, strikeDelay);
      }

      // Schedule the next heartbeat loop after a random delay
      const minDelay = 1000; // Minimum delay in milliseconds (1 second)
      const maxDelay = 7000; // Maximum delay in milliseconds (7 seconds)
      const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;

      heartbeatTimeoutId = setTimeout(startHeartbeatLoop, nextDelay);
    };

    // Start the loop
    startHeartbeatLoop();

    // Cleanup function
    return () => {
      clearTimeout(heartbeatTimeoutId);
      gsap.killTweensOf(svgRef.current!);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] h-[calc(100vh-5rem)] overflow-hidden bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-full px-4 text-center">
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

        {/* Abstract Background Shapes with GSAP Circular Motion */}
        <div
          ref={circle1Ref}
          className="absolute top-1/2 left-[20%] w-[500px] h-[500px] opacity-10 rounded-full blur-3xl"
        ></div>
        <div
          ref={circle2Ref}
          className="absolute top-0 right-[20%] w-[300px] h-[300px] opacity-10 rounded-full blur-3xl"
        ></div>

        {/* SVG for Electric Heartbeat */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ></svg>
      </section>
    </div>
  );
};

export default LandingPage;
