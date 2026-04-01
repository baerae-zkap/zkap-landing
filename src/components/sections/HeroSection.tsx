"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AppDownloadButtons from "@/components/AppDownloadButtons";
import { EXCHANGE_DATA } from "@/components/sections/ExchangeAssetSection";
import useIsMobile from "@/hooks/useIsMobile";

const E = EXCHANGE_DATA;
const CARDS = [
  { ...E.bybit, balance: "₩ 183,000,000" },
  { ...E.binance, balance: "₩ 532,950,000" },
  { ...E.okx, balance: "₩ 178,400,000" },
  { ...E.coinbase, balance: "₩ 87,300,000" },
  { ...E.upbit, balance: "₩ 82,300,000" },
  { ...E.bithumb, balance: "₩ 45,100,000" },
  { ...E.coinone, balance: "₩ 28,700,000" },
];

type Pos = { x: number; y: number; rotate: number; scale: number };

const HIDDEN: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 450, rotate: -9 + i * 3, scale: 1 - (CARDS.length - 1 - i) * 0.02,
}));

const STACKED: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 80, rotate: -9 + i * 3, scale: 1 - (CARDS.length - 1 - i) * 0.02,
}));

const SHRUNK: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 80, rotate: -9 + i * 3, scale: 0.92 - (CARDS.length - 1 - i) * 0.02,
}));

const FANNED: Pos[] = [
  { x: -400, y: 150, rotate: -18, scale: 0.85 },
  { x: -250, y: 100, rotate: -10, scale: 0.88 },
  { x: -110, y: 135, rotate: -3, scale: 0.92 },
  { x: 0, y: 110, rotate: 0, scale: 0.95 },
  { x: 110, y: 140, rotate: 4, scale: 0.91 },
  { x: 250, y: 105, rotate: 10, scale: 0.87 },
  { x: 400, y: 145, rotate: 17, scale: 0.84 },
];

const FANNED_M: Pos[] = [
  // Row 1 (top 2)
  { x: -55, y: 0, rotate: -6, scale: 0.84 },
  { x: 55, y: 10, rotate: 5, scale: 0.83 },
  // Row 2 (middle 2)
  { x: -50, y: 110, rotate: 4, scale: 0.87 },
  { x: 50, y: 120, rotate: -5, scale: 0.88 },
  // Row 3 (bottom 3)
  { x: -80, y: 220, rotate: -4, scale: 0.84 },
  { x: 10, y: 230, rotate: 3, scale: 0.86 },
  { x: 90, y: 215, rotate: -3, scale: 0.83 },
];

// Scroll phase 1: gather back to center
const GATHERED: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 0, rotate: -6 + i * 2, scale: 0.90 - (CARDS.length - 1 - i) * 0.015,
}));

const GATHERED_M: Pos[] = CARDS.map((_, i) => ({
  x: 0, y: 0, rotate: -6 + i * 2, scale: 0.90 - (CARDS.length - 1 - i) * 0.015,
}));

// Overseas cards (0-3): spread wider & larger, Domestic (4-6): drift down to fade out
const SPREAD: Pos[] = [
  { x: -120, y: 40, rotate: -4, scale: 1.02 },
  { x: 60, y: 70, rotate: -1, scale: 1.05 },
  { x: 240, y: 45, rotate: 1, scale: 1.02 },
  { x: 420, y: 70, rotate: 3, scale: 1.05 },
  { x: 200, y: 200, rotate: 2, scale: 0.8 },
  { x: 350, y: 220, rotate: 3, scale: 0.8 },
  { x: 500, y: 210, rotate: 5, scale: 0.8 },
];

const SPREAD_M: Pos[] = [
  { x: -105, y: -5, rotate: -3, scale: 0.92 },
  { x: -30, y: 15, rotate: -1, scale: 0.95 },
  { x: 45, y: -5, rotate: 1, scale: 0.92 },
  { x: 120, y: 15, rotate: 3, scale: 0.95 },
  { x: -50, y: 160, rotate: 2, scale: 0.7 },
  { x: 30, y: 170, rotate: 3, scale: 0.7 },
  { x: 110, y: 160, rotate: 5, scale: 0.7 },
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
  const mobile = useIsMobile();

  const [autoPhase, setAutoPhase] = useState(0);
  const [autoDone, setAutoDone] = useState(false);
  const [scrollP, setScrollP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (autoDone) setScrollP(v * 3.2);
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setAutoPhase(1), 100),
      setTimeout(() => setAutoPhase(2), 1000),
      setTimeout(() => setAutoPhase(3), 1600),
      setTimeout(() => setAutoDone(true), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fanned = mobile ? FANNED_M : FANNED;
  const spread = mobile ? SPREAD_M : SPREAD;
  const gathered = mobile ? GATHERED_M : GATHERED;

  const getCardPos = (i: number): Pos => {
    if (!autoDone) {
      if (autoPhase === 0) return HIDDEN[i];
      if (autoPhase === 1) return STACKED[i];
      if (autoPhase === 2) return SHRUNK[i];
      return fanned[i];
    }
    if (scrollP <= 1) return lerpPos(fanned[i], gathered[i], scrollP);
    return lerpPos(gathered[i], spread[i], scrollP - 1);
  };

  const titleVisible = !autoDone ? autoPhase >= 1 : scrollP < 0.5;
  const titleOpacity = !autoDone
    ? (autoPhase >= 1 ? 1 : 0)
    : Math.max(0, 1 - scrollP / 0.5);

  const phase2Opacity = !autoDone ? 0 : (scrollP < 1.3 ? 0 : Math.min(1, (scrollP - 1.3) / 0.3));

  // Domestic cards (indices 4-6) fade out during spread phase
  const domesticFadeOut = !autoDone ? 0 : Math.min(1, Math.max(0, (scrollP - 1.0) / 0.5));

  const cardW = mobile ? 120 : 140;
  const cardH = mobile ? 150 : 175;

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "100dvh" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Title */}
        <motion.div
          className="absolute inset-x-0 top-0 pt-[4vh] md:pt-[8vh] text-center px-5 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: titleOpacity, y: titleVisible ? 0 : -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-5 text-sm font-bold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
            {t("badge")}
          </span>
          <h1
            className="whitespace-pre-line text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px]"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3 }}
          >
            {t("title")}
          </h1>
          <p className="text-[13px] sm:text-[15px]" style={{ marginTop: 16, fontWeight: 600, color: "#4e5968", lineHeight: 1.6 }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={mobile ? { marginTop: "-8vh" } : undefined}
          animate={{ x: autoDone && scrollP > 0.8 ? (mobile ? "0vw" : "10vw") : "0vw" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <div className="relative" style={{ width: cardW + 10, height: cardH + 25 }}>
            {/* ZKAP hub */}
            {autoDone && scrollP > 1.4 && (() => {
              const connOpacity = Math.min(1, (scrollP - 1.4) / 0.3);
              const s = mobile ? spread : SPREAD;
              const cw = mobile ? cardW : 150;
              const centerX = (s[0].x + s[s.length - 1].x + cw) / 2;
              const hubX = centerX;
              const hubY = mobile ? -120 : -140;
              const hubSize = mobile ? 64 : 88;
              const linePositions = mobile ? spread : SPREAD;
              const lineCardHalfW = mobile ? cardW / 2 : 75;
              return (
                <>
                  <motion.svg
                    className="absolute pointer-events-none"
                    style={{ left: 0, top: 0, overflow: "visible", width: "100%", height: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: connOpacity }}
                  >
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    {linePositions.slice(0, 4).map((pos, i) => {
                      const cardCenterX = pos.x + lineCardHalfW;
                      const cardTopY = pos.y - 10;
                      return (
                        <motion.path
                          key={i}
                          d={`M ${hubX} ${hubY + 40} C ${hubX} ${hubY + 60}, ${cardCenterX} ${cardTopY - 60}, ${cardCenterX} ${cardTopY}`}
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth={mobile ? 1.5 : 2}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: scrollP > 1.5 + i * 0.04 ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      );
                    })}
                  </motion.svg>
                  <motion.div
                    className="absolute flex flex-col items-center gap-2 z-20"
                    style={{ left: hubX - hubSize / 2, top: hubY - 10 }}
                    initial={{ opacity: 0, scale: 0.3, y: 30 }}
                    animate={{ opacity: connOpacity, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    <div className="absolute -inset-4 rounded-3xl blur-xl bg-primary-400" style={{ opacity: connOpacity * 0.3 }} />
                    <div className="relative rounded-3xl shadow-xl shadow-primary-300/40 flex items-center justify-center bg-primary-600" style={{ width: hubSize, height: hubSize }}>
                      <img src="/images/zkap-logo.svg" alt="ZKAP" className="w-10 h-8 md:w-12 md:h-10 object-contain brightness-0 invert" />
                    </div>
                  </motion.div>
                </>
              );
            })()}

            {CARDS.map((card, i) => {
              const pos = getCardPos(i);
              const isDomestic = i >= 4;
              const cardOpacity = autoPhase >= 1 ? (isDomestic ? 1 - domesticFadeOut : 1) : 0;
              return (
                <motion.div
                  key={card.label}
                  className="absolute top-0 left-0 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ backgroundColor: card.color, width: cardW, height: cardH }}
                  initial={{ x: HIDDEN[i].x, y: HIDDEN[i].y, rotate: HIDDEN[i].rotate, scale: HIDDEN[i].scale, opacity: 0 }}
                  animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale, opacity: cardOpacity }}
                  transition={!autoDone ? { type: "spring", stiffness: 70, damping: 18 } : { type: "spring", stiffness: 100, damping: 22 }}
                >
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <img src={card.logo} alt={card.label} className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg object-cover" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                    <div className="text-white text-[11px] sm:text-[15px] font-bold leading-tight">{card.balance}</div>
                    <div className="text-white/50 text-[9px] sm:text-[11px] font-medium mt-0.5">{card.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Phase 2 text */}
        {phase2Opacity > 0 && (
        <motion.div
          className="absolute z-20 md:left-8 md:sm:left-16 md:lg:left-[8vw] md:top-1/2 md:-translate-y-1/2 md:max-w-sm
                     inset-x-0 bottom-[10vh] px-6 md:pb-0 md:px-0 md:inset-x-auto md:bottom-auto text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase2Opacity, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: phase2Opacity > 0.5 ? "auto" : "none" }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
              ZKAP
            </span>
          </div>
          <h2
            className="whitespace-pre-line text-[28px] md:text-[44px]"
            style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, marginBottom: 16 }}
          >
            {t("phase2Title")}
          </h2>
          <p className="whitespace-pre-line" style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            {t("phase2Subtitle")}
          </p>
          {!mobile && (
            <div className="mt-8">
              <AppDownloadButtons size="md" />
            </div>
          )}
        </motion.div>
        )}
      </div>
    </div>
  );
}
