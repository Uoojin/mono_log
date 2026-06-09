import React from "react";
import { motion } from "framer-motion";

const colors = {
  primary: "#b3b1ff",
  secondary: "#7A75FF",
  dark: "rgb(139, 135, 255)",
  lavender: "#A4A0FF",
  muted: "#D8DCE6",
  light: "#EBEBFF",
};

const rainXs = [100, 128, 156, 184, 212, 240, 268, 296, 324];

function DynamicBlobEngine({ blobPreset }) {
  switch (blobPreset) {
    // 사르르
    case "blobPreset01":
      return (
        <g filter="url(#gooey-fluid)">
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={150 + i * 38}
              cy={78}
              r={18 + i * 2}
              fill={i % 2 ? colors.secondary : colors.primary}
              variants={{
                rest: { scale: 0.65, opacity: 0.14, x: 0 },
                hover: {
                  scale: [0.65, 1.35, 1.7, 1.15, 0.65],
                  x: [0, 10, 24, 14, 0],
                  opacity: [0.14, 0.38, 0.28, 0.2, 0.14],
                  transition: {
                    repeat: Infinity,
                    duration: 5.2 + i * 0.25,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 두근두근
    case "blobPreset02":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="76"
              r="22"
              fill="none"
              stroke={colors.primary}
              strokeWidth="3"
              variants={{
                rest: { scale: 0.5, opacity: 0 },
                hover: {
                  scale: [0.45, 1.8, 0.55, 2.25, 0.5],
                  opacity: [0, 0.8, 0, 0.6, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.75,
                    delay: i * 0.25,
                    times: [0, 0.16, 0.32, 0.5, 1],
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
          <motion.circle
            cx="200"
            cy="76"
            r="17"
            fill={colors.secondary}
            variants={{
              rest: { scale: 1, opacity: 0.55 },
              hover: {
                scale: [1, 1.28, 1, 1.2, 1],
                opacity: [0.55, 0.95, 0.65, 0.85, 0.55],
                transition: {
                  repeat: Infinity,
                  duration: 1.75,
                  times: [0, 0.16, 0.32, 0.5, 1],
                  ease: "easeInOut",
                },
              },
            }}
          />
        </g>
      );

    // 주룩주룩
    case "blobPreset03":
      return (
        <g>
          {rainXs.map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y="-70"
              width="3"
              height={90 + (i % 3) * 16}
              rx="1.5"
              fill={colors.secondary}
              variants={{
                rest: { y: 18, opacity: 0.2, scaleY: 0.65 },
                hover: {
                  y: [-75, 165],
                  scaleY: [0.75, 1.75, 1],
                  opacity: [0, 1, 0.9, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.9 + (i % 3) * 0.08,
                    delay: i * 0.045,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 반짝반짝
    case "blobPreset04":
      return (
        <g>
          {[
            [126, 50, 13],
            [185, 38, 10],
            [255, 62, 14],
            [155, 100, 9],
            [225, 96, 12],
            [302, 47, 8],
          ].map(([x, y, size], i) => (
            <motion.g
              key={i}
              style={{ originX: `${x}px`, originY: `${y}px` }}
              variants={{
                rest: { opacity: 0.22, scale: 0.65, rotate: 0 },
                hover: {
                  opacity: [0.1, 1, 0.15, 0.9, 0.1],
                  scale: [0.45, 1.5, 0.6, 1.25, 0.45],
                  rotate: [0, 45, -20, 20, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.05 + i * 0.1,
                    delay: i * 0.07,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <path
                d={`M ${x} ${y - size} L ${x + size * 0.28} ${y - size * 0.28} L ${x + size} ${y} L ${x + size * 0.28} ${y + size * 0.28} L ${x} ${y + size} L ${x - size * 0.28} ${y + size * 0.28} L ${x - size} ${y} L ${x - size * 0.28} ${y - size * 0.28} Z`}
                fill={colors.primary}
              />
            </motion.g>
          ))}
        </g>
      );

    // 소곤소곤
    case "blobPreset05":
      return (
        <g filter="url(#gooey-fluid)">
          {[180, 220].map((cx, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy="76"
              r={i ? 13 : 15}
              fill={i ? colors.secondary : colors.primary}
              variants={{
                rest: { x: 0, scale: 0.85, opacity: 0.25 },
                hover: {
                  x: i ? [0, -16, -8, -12, 0] : [0, 16, 8, 12, 0],
                  y: [0, -2, 1, -1, 0],
                  scale: [0.85, 1.08, 0.9, 1.02, 0.85],
                  opacity: [0.25, 0.58, 0.34, 0.5, 0.25],
                  transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                },
              }}
            />
          ))}
        </g>
      );

    // さらさら
    case "blobPreset06":
      return (
        <g>
          {[46, 63, 80, 97].map((y, i) => (
            <motion.path
              key={i}
              d={`M 80 ${y} C 130 ${y - 16}, 180 ${y + 16}, 235 ${y} S 310 ${y - 8}, 355 ${y}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={{
                rest: { pathLength: 0.2, pathOffset: 0, opacity: 0.18 },
                hover: {
                  pathLength: [0.2, 0.72, 0.2],
                  pathOffset: [0, 0.65, 1.2],
                  opacity: [0.15, 0.62, 0.15],
                  transition: {
                    repeat: Infinity,
                    duration: 2.7 + i * 0.18,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // しとしと
    case "blobPreset07":
      return (
        <g>
          {[
            [130, 30],
            [178, 50],
            [218, 34],
            [266, 55],
            [156, 70],
            [240, 74],
          ].map(([x, y], i) => (
            <motion.ellipse
              key={i}
              cx={x}
              cy={y}
              rx="2"
              ry="5"
              fill={colors.secondary}
              variants={{
                rest: { y: 10, opacity: 0.12 },
                hover: {
                  y: [-18, 78],
                  opacity: [0, 0.5, 0.5, 0],
                  scaleY: [0.6, 1, 0.7],
                  transition: {
                    repeat: Infinity,
                    duration: 2.35 + i * 0.18,
                    delay: i * 0.12,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // ふわふわ
    case "blobPreset08":
      return (
        <g filter="url(#gooey-fluid)">
          {[
            [140, 72, 17],
            [184, 86, 23],
            [228, 58, 18],
            [270, 78, 15],
          ].map(([x, y, r], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={colors.primary}
              opacity="0.34"
              variants={{
                rest: { y: 0, x: 0, scale: 0.9 },
                hover: {
                  y: [0, -22, 5, -12, 0],
                  x: [0, 10, -7, 5, 0],
                  scale: [0.9, 1.12, 0.92, 1.05, 0.9],
                  transition: {
                    repeat: Infinity,
                    duration: 3.7 + i * 0.32,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // ころころ
    case "blobPreset09":
      return (
        <g>
          <line x1="95" y1="96" x2="325" y2="96" stroke={colors.muted} strokeWidth="1.5" strokeDasharray="4 5" />
          <motion.circle
            cx="120"
            cy="78"
            r="18"
            fill={colors.primary}
            variants={{
              rest: { x: 0, y: 0, rotate: 0 },
              hover: {
                x: [0, 45, 90, 145, 190, 0],
                y: [0, -10, 0, -7, 0, 0],
                rotate: [0, 140, 280, 430, 580, 0],
                transition: { repeat: Infinity, duration: 2.15, ease: "easeInOut" },
              },
            }}
          />
          <motion.circle
            cx="120"
            cy="78"
            r="5"
            fill="#fff"
            opacity="0.75"
            variants={{
              rest: { x: 0, y: 0 },
              hover: {
                x: [0, 45, 90, 145, 190, 0],
                y: [0, -10, 0, -7, 0, 0],
                transition: { repeat: Infinity, duration: 2.15, ease: "easeInOut" },
              },
            }}
          />
        </g>
      );

    // ゆらゆら
    case "blobPreset10":
      return (
        <g>
          <motion.path
            d="M 90 76 Q 145 42 200 76 T 310 76"
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              rest: { y: 0, rotate: 0 },
              hover: {
                d: [
                  "M 90 76 Q 145 42 200 76 T 310 76",
                  "M 90 76 Q 145 108 200 76 T 310 76",
                  "M 90 76 Q 145 42 200 76 T 310 76",
                ],
                y: [-2, 3, -2],
                rotate: [-2, 2, -2],
                transition: { repeat: Infinity, duration: 3.4, ease: "easeInOut" },
              },
            }}
          />
        </g>
      );

    // 沙沙
    case "blobPreset11":
      return (
        <g>
          {[
            [120, 55],
            [162, 75],
            [205, 45],
            [248, 86],
            [145, 38],
            [225, 70],
            [285, 58],
          ].map(([x, y], i) => (
            <motion.line
              key={i}
              x1={x}
              y1={y}
              x2={x + 20}
              y2={y + 4}
              stroke={colors.secondary}
              strokeWidth="2"
              strokeLinecap="round"
              variants={{
                rest: { x: 0, y: 0, opacity: 0.2 },
                hover: {
                  x: [0, 28, -8, 16, 0],
                  y: [0, 5, -3, 4, 0],
                  opacity: [0.2, 0.7, 0.25, 0.52, 0.2],
                  transition: {
                    repeat: Infinity,
                    duration: 1.9 + i * 0.1,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 哗啦啦
    case "blobPreset12":
      return (
        <g>
          {rainXs.map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y="-85"
              width={i % 2 ? 4 : 3}
              height={110 + (i % 4) * 12}
              rx="1.5"
              fill={i % 2 ? colors.primary : colors.secondary}
              variants={{
                rest: { y: 25, opacity: 0.22, scaleY: 0.55 },
                hover: {
                  y: [-90, 170],
                  scaleY: [0.65, 1.95, 0.8],
                  opacity: [0, 1, 0.95, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.48 + (i % 3) * 0.06,
                    delay: i * 0.025,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 滴答
    case "blobPreset13":
      return (
        <g>
          <motion.path
            d="M 200 18 C 192 34, 190 46, 200 60 C 210 46, 208 34, 200 18 Z"
            fill={colors.primary}
            variants={{
              rest: { y: -12, opacity: 0, scale: 0.7 },
              hover: {
                y: [-15, 60, 60],
                opacity: [0, 1, 0],
                scale: [0.7, 1.05, 0.55],
                transition: {
                  repeat: Infinity,
                  duration: 1.35,
                  times: [0, 0.68, 1],
                  ease: "easeInOut",
                },
              },
            }}
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="118"
              r="7"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="1.4"
              variants={{
                rest: { scale: 0, opacity: 0 },
                hover: {
                  scale: [0, 0, 1.5 + i * 0.65],
                  opacity: [0, 0, 0.58, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.35,
                    delay: i * 0.05,
                    times: [0, 0.62, 0.76, 1],
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 扑通
    case "blobPreset14":
      return (
        <g>
          <motion.circle
            cx="200"
            cy="30"
            r="13"
            fill={colors.primary}
            variants={{
              rest: { y: -22, opacity: 0 },
              hover: {
                y: [0, 60, 60],
                scale: [1, 1.12, 0],
                opacity: [0, 1, 0],
                transition: {
                  repeat: Infinity,
                  duration: 1.65,
                  times: [0, 0.42, 0.52],
                },
              },
            }}
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="94"
              r="7"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="2"
              variants={{
                rest: { scale: 0, opacity: 0 },
                hover: {
                  scale: [0, 0, 2.4 + i * 0.9],
                  opacity: [0, 0, 0.8, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.65,
                    delay: i * 0.07,
                    times: [0, 0.42, 0.72, 1],
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 轻飘飘
    case "blobPreset15":
      return (
        <g>
          {[
            [132, 66, 6],
            [174, 44, 8],
            [216, 76, 7],
            [258, 55, 5],
            [156, 90, 6],
            [294, 82, 5],
          ].map(([x, y, r], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={colors.primary}
              opacity="0.3"
              variants={{
                rest: { x: 0, y: 0, opacity: 0.22 },
                hover: {
                  x: [0, 18, -12, 10, 0],
                  y: [0, -30, -12, -26, 0],
                  opacity: [0.22, 0.48, 0.26, 0.42, 0.22],
                  transition: {
                    repeat: Infinity,
                    duration: 4.3 + i * 0.25,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // murmur
    case "blobPreset16":
      return (
        <g>
          {[0, 1].map((i) => (
            <motion.path
              key={i}
              d={`M 85 ${74 + i * 12} C 135 ${94 + i * 4}, 170 ${56 + i * 4}, 215 ${76 + i * 4} C 260 ${96 + i * 4}, 295 ${56 + i * 4}, 345 ${76 + i * 4}`}
              fill="none"
              stroke={i ? colors.lavender : colors.secondary}
              strokeWidth={i ? "1.7" : "2.5"}
              strokeLinecap="round"
              opacity="0.35"
              style={{ filter: "blur(1px)" }}
              variants={{
                rest: { opacity: i ? 0.12 : 0.22 },
                hover: {
                  d: [
                    `M 85 ${74 + i * 12} C 135 ${94 + i * 4}, 170 ${56 + i * 4}, 215 ${76 + i * 4} C 260 ${96 + i * 4}, 295 ${56 + i * 4}, 345 ${76 + i * 4}`,
                    `M 85 ${74 + i * 12} C 135 ${56 + i * 4}, 170 ${96 + i * 4}, 215 ${76 + i * 4} C 260 ${56 + i * 4}, 295 ${96 + i * 4}, 345 ${76 + i * 4}`,
                    `M 85 ${74 + i * 12} C 135 ${94 + i * 4}, 170 ${56 + i * 4}, 215 ${76 + i * 4} C 260 ${96 + i * 4}, 295 ${56 + i * 4}, 345 ${76 + i * 4}`,
                  ],
                  opacity: i ? [0.12, 0.28, 0.12] : [0.22, 0.48, 0.22],
                  transition: { repeat: Infinity, duration: 4.4 + i * 0.4, ease: "easeInOut" },
                },
              }}
            />
          ))}
        </g>
      );

    // glimmer
    case "blobPreset17":
      return (
        <g>
          {[
            [142, 50],
            [184, 70],
            [226, 42],
            [268, 82],
            [164, 94],
            [305, 55],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="#fff"
              stroke={colors.primary}
              strokeWidth="1"
              variants={{
                rest: { scale: 0.35, opacity: 0.08 },
                hover: {
                  scale: [0.35, 1.2, 0.5, 0.35],
                  opacity: [0.08, 0.88, 0.16, 0.08],
                  transition: {
                    repeat: Infinity,
                    duration: 1.4 + i * 0.16,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // patter
    case "blobPreset18":
      return (
        <g>
          {[
            [120, 78],
            [148, 62],
            [176, 84],
            [204, 56],
            [232, 74],
            [260, 52],
            [288, 78],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3.2"
              fill={colors.primary}
              variants={{
                rest: { y: 0, scale: 1, opacity: 0.3 },
                hover: {
                  y: [0, -25, 0, -12, 0],
                  scaleY: [1, 1.5, 0.65, 1.25, 1],
                  opacity: [0.32, 0.95, 0.5, 0.82, 0.32],
                  transition: {
                    repeat: Infinity,
                    duration: 0.6 + (i % 3) * 0.07,
                    delay: i * 0.035,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // hush
    case "blobPreset19":
      return (
        <g filter="url(#gooey-fluid)">
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={190 + i * 10}
              cy="76"
              r={32 - i * 6}
              fill={i === 1 ? colors.secondary : colors.primary}
              variants={{
                rest: { scale: 1, opacity: 0.18 },
                hover: {
                  scale: [1.35, 0.82, 0.45, 1.35],
                  opacity: [0.28, 0.14, 0.015, 0.28],
                  transition: {
                    repeat: Infinity,
                    duration: 4.6 + i * 0.35,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // ripple
    case "blobPreset20":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="76"
              r="11"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1.6"
              variants={{
                rest: { scale: 0.7, opacity: 0 },
                hover: {
                  scale: [0.7, 3.8],
                  opacity: [0.7, 0.28, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.9,
                    delay: i * 0.34,
                    ease: "easeOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 몽글몽글
    case "blobPreset21":
      return (
        <g filter="url(#gooey-fluid)">
          {[
            [150, 78, 24],
            [198, 70, 31],
            [246, 82, 23],
            [220, 100, 18],
          ].map(([x, y, r], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={colors.primary}
              opacity="0.42"
              variants={{
                rest: { scale: 1, y: 0 },
                hover: {
                  scale: [1, 1.32, 0.9, 1.2, 1],
                  y: [0, -7, 4, -4, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 2.7 + i * 0.22,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // ざわざわ
    case "blobPreset22":
      return (
        <g>
          {[
            [138, 55],
            [172, 75],
            [206, 50],
            [240, 86],
            [158, 92],
            [220, 40],
            [270, 65],
            [298, 92],
          ].map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="5"
              height="5"
              fill={colors.secondary}
              variants={{
                rest: { x: 0, y: 0, rotate: 0, opacity: 0.35 },
                hover: {
                  x: [-5, 5, -3, 4, 0],
                  y: [2, -4, 5, -1, 0],
                  rotate: [0, 65, -50, 25, 0],
                  opacity: [0.35, 0.95, 0.45, 0.82, 0.35],
                  transition: {
                    repeat: Infinity,
                    duration: 0.26 + i * 0.02,
                    ease: "linear",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 咚咚
    case "blobPreset23":
      return (
        <g>
          <motion.circle
            cx="200"
            cy="76"
            r="36"
            fill={colors.primary}
            variants={{
              rest: { scale: 1, opacity: 0.45 },
              hover: {
                scale: [1, 1.4, 1.03, 1.33, 1],
                opacity: [0.45, 0.82, 0.52, 0.74, 0.45],
                transition: {
                  repeat: Infinity,
                  duration: 1.7,
                  times: [0, 0.16, 0.34, 0.52, 1],
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.circle
            cx="200"
            cy="76"
            r="42"
            fill="none"
            stroke={colors.secondary}
            strokeWidth="2"
            variants={{
              rest: { scale: 0.8, opacity: 0 },
              hover: {
                scale: [0.8, 1.5, 0.8, 1.35, 0.8],
                opacity: [0, 0.55, 0, 0.38, 0],
                transition: {
                  repeat: Infinity,
                  duration: 1.7,
                  times: [0, 0.16, 0.34, 0.52, 1],
                  ease: "easeInOut",
                },
              },
            }}
          />
        </g>
      );

    // swish
    case "blobPreset24":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d="M 65 52 Q 150 126 355 42"
              fill="none"
              stroke={i === 0 ? colors.primary : colors.lavender}
              strokeWidth={i === 0 ? "4" : "2"}
              strokeLinecap="round"
              variants={{
                rest: { pathLength: 0, pathOffset: 0, opacity: 0.12 },
                hover: {
                  pathLength: [0.02, 0.4, 0.1],
                  pathOffset: [0, 0.8, 1.2],
                  opacity: [0.1, i === 0 ? 1 : 0.45, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 0.72,
                    delay: i * 0.07,
                    ease: "easeOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    // 찰랑찰랑
    case "blobPreset25":
      return (
        <g>
          {[54, 70, 86, 102].map((y, i) => (
            <motion.path
              key={i}
              d={`M 85 ${y} C 120 ${y - 18}, 155 ${y + 18}, 190 ${y} S 260 ${y - 18}, 335 ${y}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity={0.7 - i * 0.1}
              variants={{
                rest: { x: 0 },
                hover: {
                  d: [
                    `M 85 ${y} C 120 ${y - 18}, 155 ${y + 18}, 190 ${y} S 260 ${y - 18}, 335 ${y}`,
                    `M 85 ${y} C 120 ${y + 18}, 155 ${y - 18}, 190 ${y} S 260 ${y + 18}, 335 ${y}`,
                    `M 85 ${y} C 120 ${y - 18}, 155 ${y + 18}, 190 ${y} S 260 ${y - 18}, 335 ${y}`,
                  ],
                  x: [0, 10, -10, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.35 + i * 0.08,
                    ease: "easeInOut",
                  },
                },
              }}
            />
          ))}
        </g>
      );

    default:
      return <circle cx="200" cy="76" r="25" fill={colors.muted} />;
  }
}

function SoundBlobShape({ blobPreset }) {
  return (
    <svg
      className="sound_blob_svg"
      viewBox="0 0 420 152"
      aria-hidden="true"
      style={{
        overflow: "visible",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <defs>
        <pattern
          id="halftone-dot"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="5" r="1.2" fill="#352EFB" opacity="0.05" />
        </pattern>

        <filter id="gooey-fluid" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>

      <rect width="420" height="152" fill="url(#halftone-dot)" rx="16" />
      <DynamicBlobEngine blobPreset={blobPreset} />
    </svg>
  );
}

export default SoundBlobShape;