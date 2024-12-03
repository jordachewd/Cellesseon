import React from "react";

interface BgAnimationProps {
  colors?: {
    gradient1: [string, string];
    gradient2: [string, string];
    gradient3: [string, string];
  };
  speeds?: {
    gradient1?: {
      fx?: string;
      x?: string;
      y?: string;
      rotation?: string;
    };
    gradient2?: {
      fx?: string;
      x?: string;
      y?: string;
      rotation?: string;
    };
    gradient3?: {
      fx?: string;
      x?: string;
      y?: string;
      rotation?: string;
    };
  };
}

export default function BgAnimation({
  colors = {
    // gradient1: ["rgba(255, 0, 255, 1)", "rgba(255, 0, 255, 0)"],
    // gradient2: ["rgba(255, 255, 0, 1)", "rgba(255, 255, 0, 0)"],
    //  gradient3: ["rgba(0, 255, 255, 1)", "rgba(0, 255, 255, 0)"],
    gradient1: [
      "rgba(var(--mui-palette-primary-mainChannel) / 1)",
      "rgba(var(--mui-palette-primary-mainChannel) / 0)",
    ],
    gradient2: [
      "rgba(var(--mui-palette-action-activeChannel) / 1)",
      "rgba(var(--mui-palette-action-activeChannel) / 0)",
    ],
    gradient3: [
      "rgba(var(--mui-palette-secondary-mainChannel) / 1)",
      "rgba(var(--mui-palette-secondary-mainChannel) / 0)",
    ],
  },
  speeds = {
    gradient1: { fx: "51s", x: "30s", y: "32s", rotation: "11s" },
    gradient2: { fx: "36s", x: "35s", y: "37s", rotation: "18s" },
    gradient3: { fx: "32s", x: "38s", y: "18s", rotation: "14s" },
  },
}: BgAnimationProps) {
  return (
    <div
      id="BgAnimation"
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient
            id="Gradient1"
            cx="50%"
            cy="50%"
            fx="0.441602%"
            fy="50%"
            r=".5"
          >
            <animate
              attributeName="fx"
              dur={speeds.gradient1?.fx || "34s"}
              values="0%;3%;0%"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor={colors.gradient1[0]} />
            <stop offset="100%" stopColor={colors.gradient1[1]} />
          </radialGradient>
          <radialGradient
            id="Gradient2"
            cx="50%"
            cy="50%"
            fx="2.68147%"
            fy="50%"
            r=".5"
          >
            <animate
              attributeName="fx"
              dur={speeds.gradient2?.fx || "23.5s"}
              values="0%;3%;0%"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor={colors.gradient2[0]} />
            <stop offset="100%" stopColor={colors.gradient2[1]} />
          </radialGradient>
          <radialGradient
            id="Gradient3"
            cx="50%"
            cy="50%"
            fx="0.836536%"
            fy="50%"
            r=".5"
          >
            <animate
              attributeName="fx"
              dur={speeds.gradient3?.fx || "21.5s"}
              values="0%;3%;0%"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor={colors.gradient3[0]} />
            <stop offset="100%" stopColor={colors.gradient3[1]} />
          </radialGradient>
        </defs>
        <rect
          x="13.744%"
          y="1.18473%"
          width="100%"
          height="100%"
          fill="url(#Gradient1)"
          transform="rotate(334.41 50 50)"
        >
          <animate
            attributeName="x"
            dur={speeds.gradient1?.x || "20s"}
            values="25%;0%;25%"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            dur={speeds.gradient1?.y || "21s"}
            values="0%;25%;0%"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={speeds.gradient1?.rotation || "7s"}
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="-2.17916%"
          y="35.4267%"
          width="100%"
          height="100%"
          fill="url(#Gradient2)"
          transform="rotate(255.072 50 50)"
        >
          <animate
            attributeName="x"
            dur={speeds.gradient2?.x || "23s"}
            values="-25%;0%;-25%"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            dur={speeds.gradient2?.y || "24s"}
            values="0%;50%;0%"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={speeds.gradient2?.rotation || "12s"}
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="9.00483%"
          y="14.5733%"
          width="100%"
          height="100%"
          fill="url(#Gradient3)"
          transform="rotate(139.903 50 50)"
        >
          <animate
            attributeName="x"
            dur={speeds.gradient3?.x || "25s"}
            values="0%;25%;0%"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            dur={speeds.gradient3?.y || "12s"}
            values="0%;25%;0%"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur={speeds.gradient3?.rotation || "9s"}
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}
