"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AppDownloadButtons from "@/components/AppDownloadButtons";

const CARDS = [
  { label: "Binance", color: "#F3BA2F", textColor: "#fff" },
  { label: "Bybit", color: "#F7A600", textColor: "#fff" },
  { label: "OKX", color: "#121212", textColor: "#fff" },
  { label: "Coinbase", color: "#0052FF", textColor: "#fff" },
  { label: "Bitcoin", color: "#F7931A", textColor: "#fff" },
  { label: "Ethereum", color: "#627EEA", textColor: "#fff" },
  { label: "Solana", color: "#9945FF", textColor: "#fff" },
];

type Pos = { x: number; y: number; rotate: number; scale: number };

const HIDDEN: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 450, rotate: -9 + i * 3, scale: 1 - (CARDS.length - 1 - i) * 0.02,
}));

const STACKED: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 0, rotate: -9 + i * 3, scale: 1 - (CARDS.length - 1 - i) * 0.02,
}));

const SHRUNK: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 0, rotate: -9 + i * 3, scale: 0.92 - (CARDS.length - 1 - i) * 0.02,
}));

const FANNED: Pos[] = [
  { x: -400, y: 30, rotate: -18, scale: 0.85 },
  { x: -250, y: -20, rotate: -10, scale: 0.88 },
  { x: -110, y: 15, rotate: -3, scale: 0.92 },
  { x: 0, y: -10, rotate: 0, scale: 0.95 },
  { x: 110, y: 20, rotate: 4, scale: 0.91 },
  { x: 250, y: -15, rotate: 10, scale: 0.87 },
  { x: 400, y: 25, rotate: 17, scale: 0.84 },
];

// Scroll phase 1: gather back to center
const GATHERED: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 0, rotate: -6 + i * 2, scale: 0.90 - (CARDS.length - 1 - i) * 0.015,
}));

// Scroll phase 2+3 combined: move down + spread right simultaneously
// Cards fan out to the right with staggered heights while moving down
const SPREAD: Pos[] = [
  { x: -180, y: 40, rotate: -4, scale: 0.92 },
  { x: -60, y: 80, rotate: -2, scale: 0.94 },
  { x: 60, y: 50, rotate: -1, scale: 0.96 },
  { x: 180, y: 85, rotate: 0, scale: 0.98 },
  { x: 300, y: 55, rotate: 2, scale: 0.96 },
  { x: 420, y: 80, rotate: 3, scale: 0.94 },
  { x: 540, y: 50, rotate: 5, scale: 0.92 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function lerpPos(from: Pos, to: Pos, t: number): Pos {
  return {
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    rotate: lerp(from.rotate, to.rotate, t),
    scale: lerp(from.scale, to.scale, t),
  };
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto intro phases: 0=hidden, 1=stacked, 2=shrunk, 3=fanned
  const [autoPhase, setAutoPhase] = useState(0);
  const [autoDone, setAutoDone] = useState(false);

  // Scroll progress (0~2): 0→1 gather center, 1→2 spread right+down
  const [scrollP, setScrollP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (autoDone) {
      setScrollP(v * 2);
    }
  });

  // Auto-play on mount
  useEffect(() => {
    const timers = [
      setTimeout(() => setAutoPhase(1), 100),
      setTimeout(() => setAutoPhase(2), 1000),
      setTimeout(() => setAutoPhase(3), 1600),
      setTimeout(() => setAutoDone(true), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const getCardPos = (i: number): Pos => {
    if (!autoDone) {
      if (autoPhase === 0) return HIDDEN[i];
      if (autoPhase === 1) return STACKED[i];
      if (autoPhase === 2) return SHRUNK[i];
      return FANNED[i];
    }
    if (scrollP <= 1) return lerpPos(FANNED[i], GATHERED[i], scrollP);
    return lerpPos(GATHERED[i], SPREAD[i], scrollP - 1);
  };

  // Title: fade in with auto, fade out when scroll starts
  const titleVisible = !autoDone ? autoPhase >= 1 : scrollP < 0.5;
  const titleOpacity = !autoDone
    ? (autoPhase >= 1 ? 1 : 0)
    : Math.max(0, 1 - scrollP / 0.5);

  // Phase 2 text: visible after cards spread
  const phase2Opacity = !autoDone ? 0 : (scrollP < 1.3 ? 0 : Math.min(1, (scrollP - 1.3) / 0.3));

  return (
    <div ref={containerRef} style={{ height: "450vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Title — top center, fades out on scroll */}
        <motion.div
          className="absolute inset-x-0 top-0 pt-[14vh] text-center px-5 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: titleOpacity, y: titleVisible ? 0 : -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
            {t("badge")}
          </span>
          <h1
            className="whitespace-pre-line sm:text-[56px]"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 48 }}
          >
            {t("title")}
          </h1>
          <p style={{ marginTop: 16, fontWeight: 600, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards — single set, auto then scroll driven */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{ x: autoDone && scrollP > 0.8 ? "10vw" : "0vw" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <div className="relative" style={{ width: 150, height: 200 }}>
            {/* ZKAP hub + curved connections — appears when cards spread */}
            {autoDone && scrollP > 1.4 && (() => {
              const connOpacity = Math.min(1, (scrollP - 1.4) / 0.3);
              // Center X of spread cards
              const centerX = (SPREAD[0].x + SPREAD[SPREAD.length - 1].x + 150) / 2;
              const hubX = centerX;
              const hubY = -140;

              return (
                <>
                  {/* SVG curved lines */}
                  <motion.svg
                    className="absolute pointer-events-none"
                    style={{
                      left: 0,
                      top: 0,
                      overflow: "visible",
                      width: "100%",
                      height: "100%",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: connOpacity }}
                  >
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    {SPREAD.map((pos, i) => {
                      const cardCenterX = pos.x + 75;
                      const cardTopY = pos.y - 10;
                      const cp1x = hubX;
                      const cp1y = hubY + 60;
                      const cp2x = cardCenterX;
                      const cp2y = cardTopY - 60;

                      return (
                        <motion.path
                          key={i}
                          d={`M ${hubX} ${hubY + 40} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cardCenterX} ${cardTopY}`}
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth={2}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: scrollP > 1.5 + i * 0.04 ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      );
                    })}
                  </motion.svg>

                  {/* ZKAP hub icon — centered above cards */}
                  <motion.div
                    className="absolute flex flex-col items-center gap-2 z-20"
                    style={{ left: hubX - 32, top: hubY }}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: connOpacity, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  >
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl shadow-lg shadow-primary-200 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ZKAP</span>
                    </div>
                  </motion.div>
                </>
              );
            })()}

            {CARDS.map((card, i) => {
              const pos = getCardPos(i);
              return (
                <motion.div
                  key={card.label}
                  className="absolute top-0 left-0 w-[150px] h-[200px] rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3"
                  style={{ backgroundColor: card.color }}
                  initial={{
                    x: HIDDEN[i].x,
                    y: HIDDEN[i].y,
                    rotate: HIDDEN[i].rotate,
                    scale: HIDDEN[i].scale,
                    opacity: 0,
                  }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                    scale: pos.scale,
                    opacity: autoPhase >= 1 ? 1 : 0,
                  }}
                  transition={
                    !autoDone
                      ? { type: "spring", stiffness: 70, damping: 18 }
                      : { type: "spring", stiffness: 100, damping: 22 }
                  }
                >
                  <span className="text-xl font-bold" style={{ color: card.textColor, opacity: 0.9 }}>
                    {card.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Phase 2: "하나로 연결합니다" — left side, vertically centered */}
        {phase2Opacity > 0 && (
        <motion.div
          className="absolute left-8 sm:left-16 lg:left-[8vw] top-1/2 -translate-y-1/2 z-20 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: phase2Opacity,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: phase2Opacity > 0.5 ? "auto" : "none" }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#f2f4f6",
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
              ZKAP
            </span>
          </div>
          <h2
            className="whitespace-pre-line"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 40, marginBottom: 16 }}
          >
            {"흩어진 거래소,\n하나로 연결합니다"}
          </h2>
          <p style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            Binance, Bybit, OKX, Coinbase{"\n"}
            모든 해외 거래소 자산을 한 곳에서 관리하세요
          </p>
          <div className="mt-8">
            <AppDownloadButtons size="md" />
          </div>
        </motion.div>
        )}
      </div>
    </div>
  );
}
