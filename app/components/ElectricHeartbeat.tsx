"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ElectricHeartbeat = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cloudColor = "#111827";
  const sparkColor = "#FFD700";

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

  useEffect(() => {
    const circle1 = document.querySelector("#circle1") as HTMLElement;
    const circle2 = document.querySelector("#circle2") as HTMLElement;

    if (!circle1 || !circle2) return;

    const triggerHeartbeat = () => {
      if (!circle1 || !circle2 || !svgRef.current) return;

      const rect1 = circle1.getBoundingClientRect();
      const rect2 = circle2.getBoundingClientRect();

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
            duration: 0.4,
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
          0
        );

        // Fade out at the end
        tl.to(
          pathElement,
          { opacity: 0, duration: 0.1, ease: "power1.inOut" },
          0.3
        );

        // Add the line animation timeline to the group timeline
        groupTimeline.add(tl, 0);
      }

      // Animate circles to flash and change size/color
      const circleAnimationDuration = 0.4;

      // Circle 1 Animation
      gsap.fromTo(
        circle1,
        {
          scale: 0.1,
          backgroundColor: cloudColor,
        } as gsap.TweenVars,
        {
          scale: 1,
          backgroundColor: sparkColor,
          duration: circleAnimationDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        } as gsap.TweenVars
      );

      // Circle 2 Animation
      gsap.fromTo(
        circle2,
        {
          scale: 0.1,
          backgroundColor: cloudColor,
        } as gsap.TweenVars,
        {
          scale: 1,
          backgroundColor: sparkColor,
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
      const amplitudeBase = 50;
      const amplitude = amplitudeBase + variation;

      // Calculate reduction amount
      const reductionAmount = length * (lineReductionPercentage / 2);
      const reducedStartX = reductionAmount + startPointOffset.x;
      const reducedEndX = length - reductionAmount + endPointOffset.x;
      const adjustedLength = reducedEndX - reducedStartX;

      // Define key points along the adjusted length
      const points: Point[] = [
        { x: reducedStartX, y: 0 + startPointOffset.y },
        { x: reducedStartX + adjustedLength * 0.3, y: 0 },
        { x: reducedStartX + adjustedLength * 0.4, y: -amplitude },
        { x: reducedStartX + adjustedLength * 0.5, y: amplitude },
        { x: reducedStartX + adjustedLength * 0.6, y: -amplitude * 0.6 },
        { x: reducedStartX + adjustedLength * 0.7, y: 0 },
        { x: reducedEndX, y: 0 + endPointOffset.y },
      ];

      if (isErratic) {
        points.forEach((point, index) => {
          if (index !== 0 && index !== points.length - 1) {
            const randomOffsetX = (Math.random() - 0.5) * variation * 0.2;
            const randomOffsetY = (Math.random() - 0.5) * variation * 2;
            point.x += randomOffsetX;
            point.y += randomOffsetY;
          }
        });
      }

      let path = `M ${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x},${points[i].y}`;
      }

      return path;
    };

    // Start the heartbeat animation loop
    let heartbeatTimeoutId: ReturnType<typeof setTimeout>;

    const startHeartbeatLoop = () => {
      const chanceOfMultipleStrikes = 0.5;
      const numberOfStrikes =
        Math.random() < chanceOfMultipleStrikes
          ? Math.floor(Math.random() * 3) + 1
          : 1;

      for (let i = 0; i < numberOfStrikes; i++) {
        const strikeDelay = i === 0 ? 0 : Math.random() * 300 + 100;
        setTimeout(triggerHeartbeat, strikeDelay);
      }

      const minDelay = 1000;
      const maxDelay = 7000;
      const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;

      heartbeatTimeoutId = setTimeout(startHeartbeatLoop, nextDelay);
    };

    startHeartbeatLoop();

    // Cleanup function
    return () => {
      clearTimeout(heartbeatTimeoutId);
      gsap.killTweensOf(svgRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none blur-sm -z-10"
    />
  );
};

export default ElectricHeartbeat;
