"use client";

import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const CARDS = [
  { label: "Upbit", color: "#093687", x: -480, y: -310, logo: "/images/exchanges/Upbit.svg" },
  { label: "Bithumb", color: "#F37321", x: -240, y: -340, logo: "/images/exchanges/Bithumb.svg" },
  { label: "MEXC", color: "#2354E6", x: 0, y: -360 },
  { label: "Gate.io", color: "#2354E6", x: 240, y: -340 },
  { label: "HTX", color: "#1A3D7D", x: 480, y: -310 },
  { label: "Kraken", color: "#5741D9", x: -560, y: -100, logo: "/images/exchanges/Kraken.svg" },
  { label: "Bybit", color: "#F7A600", x: -330, y: -120, logo: "/images/exchanges/Bybit.svg" },
  { label: "OKX", color: "#121212", x: 330, y: -120, logo: "/images/exchanges/OKX.svg" },
  { label: "Coinbase", color: "#0052FF", x: 560, y: -100, logo: "/images/exchanges/Coinbase.svg" },
  { label: "KuCoin", color: "#23AF91", x: -560, y: 120, logo: "/images/exchanges/KuCoin.svg" },
  { label: "Gemini", color: "#00DCFA", x: -330, y: 130 },
  { label: "Crypto.com", color: "#002D74", x: 330, y: 130 },
  { label: "Bitget", color: "#00F0FF", x: 560, y: 120 },
  { label: "Bitstamp", color: "#5BBF2D", x: -480, y: 310 },
  { label: "BitMEX", color: "#FF0000", x: -240, y: 340 },
  { label: "Deribit", color: "#5AE4CC", x: 0, y: 360 },
  { label: "Phemex", color: "#1C1C3A", x: 240, y: 340 },
  { label: "WOO X", color: "#1C1C3A", x: 480, y: 310 },
] as const;

const SELECTED = { label: "Binance", color: "#F3BA2F" };

const ASSETS = [
  { coin: "BTC", amount: "9.24 BTC", krw: "₩ 147,000,000" },
  { coin: "ETH", amount: "56.7 ETH", krw: "₩ 208,200,000" },
  { coin: "SOL", amount: "222 SOL", krw: "₩ 50,900,000" },
  { coin: "USDT", amount: "50,000 USDT", krw: "₩ 68,350,000" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function ExchangeAssetSection() {
  const t = useTranslations("exchange");
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v * 6);
  });

  // === Phase 1: Cards spread (0→1) — center is same size as others ===
  const spreadP = Math.min(1, Math.max(0, (progress - 0.2) / 0.8));
  const titleOpacity = Math.min(1, progress / 0.3);

  // === Phase 2: Selection (1→2) — Binance grows, others dim ===
  const selectP = Math.min(1, Math.max(0, (progress - 1.0) / 0.8));
  const surroundDim = lerp(0.6, 0.25, selectP); // others get dimmer
  const centerGrow = lerp(0.45, 1.0, selectP);  // center grows from small to full

  // === Phase 3: Others fade, card moves left (2→3) ===
  const fadeOutP = Math.min(1, Math.max(0, (progress - 2.0) / 0.6));
  const surroundOpacity = spreadP * surroundDim * (1 - fadeOutP);

  // === Phase 4: "자산 확인" (2.8→4) ===
  const assetP = Math.min(1, Math.max(0, (progress - 2.8) / 0.5));
  const assetFadeOut = Math.min(1, Math.max(0, (progress - 3.8) / 0.4));

  // === Phase 5: "전문가 신고" (4→6) ===
  // filingP controls the card entrance (0→1 quickly)
  const filingP = Math.min(1, Math.max(0, (progress - 4.0) / 0.5));
  // stepsP controls the sequential step completion (spreads over more scroll)
  const stepsP = Math.min(1, Math.max(0, (progress - 4.3) / 1.5));

  // Center card position through phases
  // Phase 1: small (same as surrounding) → Phase 2: selected (grows)
  const phase12Scale = centerGrow;
  // Phase 3: move left
  const phase3X = lerp(0, -320, fadeOutP);
  const phase3Scale = lerp(phase12Scale, 1.0, fadeOutP);

  // Phase 5: card flies away
  const flyP = Math.min(1, Math.max(0, (progress - 4.0) / 0.6));
  const flyX = lerp(phase3X, 600, flyP);
  const flyY = lerp(0, -400, flyP);
  const flyScale = lerp(phase3Scale, 0.3, flyP);
  const flyRotate = lerp(0, 15, flyP);
  const flyOpacity = 1 - Math.min(1, Math.max(0, (flyP - 0.5) / 0.5));

  const finalX = progress < 2 ? 0 : progress < 4 ? phase3X : flyX;
  const finalY = progress < 4 ? 0 : flyY;
  const finalScale = progress < 2 ? phase12Scale : progress < 4 ? phase3Scale : flyScale;
  const finalRotate = progress < 4 ? 0 : flyRotate;
  const cardOpacity = progress < 4 ? 1 : flyOpacity;

  // Check badge & glow appear during selection
  const selectVisuals = selectP;

  const step = progress < 2.5 ? 1 : progress < 4 ? 2 : 3;

  return (
    <div ref={containerRef} style={{ height: "450vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Grid bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Step indicator — visible from start */}
        <div
          className="absolute top-[5vh] left-0 right-0 flex justify-center gap-4 z-30"
          style={{ opacity: titleOpacity }}
        >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: step >= s ? "#4f46e5" : "#e5e7eb",
                    color: step >= s ? "#fff" : "#9ca3af",
                  }}
                >
                  {s}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: step >= s ? "#333d4b" : "#9ca3af" }}
                >
                  {s === 1 ? "거래소 연결" : s === 2 ? "자산 확인" : "전문가 신고"}
                </span>
                {s < 3 && <div className="w-10 h-px bg-slate-200 ml-2" />}
              </div>
            ))}
        </div>

        {/* Mosaic area */}
        <div className="relative" style={{ width: "100vw", height: "80vh" }}>
          {/* Surrounding cards — full brand color */}
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="absolute rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{
                width: 180,
                height: 200,
                left: "50%",
                top: "50%",
                marginLeft: -90,
                marginTop: -100,
                transform: `translate(${card.x * spreadP}px, ${card.y * spreadP}px) scale(${0.7 + 0.3 * spreadP})`,
                opacity: surroundOpacity,
                backgroundColor: card.color,
                boxShadow: `0 8px 24px ${card.color}40`,
              }}
            >
              {"logo" in card && card.logo ? (
                <img src={card.logo} alt={card.label} className="w-10 h-10 object-contain" />
              ) : null}
              <span className="text-white text-base font-bold">{card.label}</span>
            </div>
          ))}

          {/* === Center Binance card === */}
          <div
            className="absolute z-10"
            style={{
              width: 360,
              height: 480,
              left: "50%",
              top: "50%",
              marginLeft: -180,
              marginTop: -240,
              transform: `translate(${finalX}px, ${finalY}px) scale(${finalScale}) rotate(${finalRotate}deg)`,
              opacity: cardOpacity,
            }}
          >
            <div
              className="absolute -inset-8 rounded-[44px] blur-3xl"
              style={{ backgroundColor: SELECTED.color + "20", opacity: selectVisuals * cardOpacity }}
            />
            <div
              className="relative w-full h-full rounded-[28px] flex flex-col items-center justify-center gap-3 shadow-2xl overflow-hidden"
              style={{
                backgroundColor: SELECTED.color,
                boxShadow: `0 20px 60px ${SELECTED.color}50`,
              }}
            >
              <div
                className="absolute top-5 right-5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                style={{ opacity: selectVisuals, transform: `scale(${0.5 + 0.5 * selectVisuals})` }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={SELECTED.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">
                <img src="/images/exchanges/Binance.svg" alt="Binance" className="w-12 h-12" />
              </div>
              <span className="text-white text-2xl font-bold">{SELECTED.label}</span>
              <span className="text-white/60 text-sm font-medium">해외 거래소</span>

              {/* Asset list — phase 2 */}
              <div
                className="w-full px-6 mt-4 space-y-2"
                style={{ opacity: assetP * (1 - assetFadeOut) }}
              >
                {ASSETS.map((a) => (
                  <div key={a.coin} className="flex items-center justify-between bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                    <span className="text-white text-sm font-bold">{a.coin}</span>
                    <div className="text-right">
                      <span className="text-white text-sm font-bold">{a.krw}</span>
                      <div className="text-white/50 text-[10px]">{a.amount}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 mx-1 flex items-center justify-between border-t border-white/20">
                  <span className="text-white/60 text-sm">합계</span>
                  <span className="text-white text-xl font-bold">₩ 474,450,000</span>
                </div>
              </div>

              {/* Connected badge — appears after selection, hides on asset view */}
              <div
                className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full"
                style={{ opacity: selectVisuals * (1 - assetP) }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/80 text-xs font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: "자산 확인" text */}
        <div
          className="absolute z-20 top-1/2 max-w-[420px]"
          style={{
            right: "8vw",
            opacity: assetP * (1 - assetFadeOut),
            transform: `translateY(calc(-50% + ${(1 - assetP) * 40}px))`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "6px 16px",
              borderRadius: 100,
              backgroundColor: "#f2f4f6",
              marginBottom: 20,
            }}
          >
            <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
              자산 확인
            </span>
          </div>
          <h2 style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 44, marginBottom: 20 }}>
            보유 자산을{"\n"}자동으로 조회
          </h2>
          <p style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.8, fontSize: 16 }}>
            연동된 거래소의 월말 잔고를 자동으로 불러오고,{"\n"}
            원화 환산까지 한 번에 처리합니다.
          </p>
        </div>

        {/* Phase 3: "전문가 신고" — full center layout */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{
            opacity: filingP,
            pointerEvents: filingP > 0.5 ? "auto" : "none",
          }}
        >
          {/* Flying document trail effect */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              opacity: filingP * 0.15,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-2xl border-2 border-primary-300"
                style={{
                  width: 80 + i * 40,
                  height: 100 + i * 50,
                  left: `${50 + (i - 1) * 15}%`,
                  top: `${50 + (i - 1) * 10}%`,
                  transform: `translate(-50%, -50%) rotate(${-10 + i * 10}deg)`,
                  opacity: 0.3 + i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div
            className="text-center mb-10"
            style={{
              transform: `translateY(${(1 - filingP) * 40}px)`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: 100,
                backgroundColor: "#f2f4f6",
                marginBottom: 20,
              }}
            >
              <span style={{ fontWeight: "bold", color: "rgba(0,12,30,0.8)", fontSize: 15 }}>
                전문가 신고
              </span>
            </div>
            <h2 style={{ fontWeight: "bold", color: "#333d4b", lineHeight: 1.3, fontSize: 48, marginBottom: 16 }}>
              전문 세무사가{"\n"}신고까지 완료
            </h2>
            <p style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.8, fontSize: 16 }}>
              수집된 자산 데이터를 바탕으로{"\n"}세무사가 해외 금융계좌 신고를 대행합니다
            </p>
          </div>

          {/* Filing completion card */}
          <div
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 w-[540px]"
            style={{
              transform: `translateY(${(1 - filingP) * 60}px) scale(${0.9 + 0.1 * filingP})`,
            }}
          >
            {/* Big check circle — grows as steps complete */}
            <div className="flex justify-center mb-6">
              <div
                className="relative flex items-center justify-center"
                style={{ width: 80, height: 80 }}
              >
                {/* Background circle */}
                <svg width="80" height="80" viewBox="0 0 80 80" className="absolute">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle
                    cx="40" cy="40" r="36"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - stepsP)}`}
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                {/* Check icon — appears when all done */}
                <div
                  style={{
                    opacity: stepsP > 0.95 ? 1 : 0,
                    transform: `scale(${stepsP > 0.95 ? 1 : 0.5})`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#4f46e5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                {/* Percentage when not complete */}
                {stepsP <= 0.95 && (
                  <span className="text-lg font-bold text-primary-600 absolute">
                    {Math.round(stepsP * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <div className="text-sm font-bold text-slate-800">2025년 해외금융계좌 신고</div>
              <div className="text-xs text-slate-400 mt-1">
                {stepsP > 0.95 ? "신고 완료" : "진행 중..."}
              </div>
            </div>

            {/* Progress gauge bar */}
            <div className="mb-6">
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${stepsP * 100}%`,
                    background: stepsP > 0.95
                      ? "linear-gradient(90deg, #4f46e5, #22c55e)"
                      : "linear-gradient(90deg, #4f46e5, #818cf8)",
                  }}
                />
              </div>
            </div>

            {/* Steps — complete one by one */}
            <div className="space-y-3">
              {[
                { label: "거래소 자산 자동 취합", sub: "4개 거래소 · 12종 코인" },
                { label: "원화 환산 및 집계 완료", sub: "총 ₩823,450,000" },
                { label: "전문 세무사 검토 완료", sub: "김세무 세무사" },
                { label: "국세청 전자 제출 완료", sub: "접수번호 2025-XXXX-XXXX" },
              ].map((item, i) => {
                // Each step completes at stepsP = (i+1)/4
                const stepDone = stepsP >= (i + 1) / 4;
                const stepActive = stepsP >= i / 4 && stepsP < (i + 1) / 4;
                const stepGauge = stepActive
                  ? (stepsP - i / 4) / 0.25
                  : stepDone ? 1 : 0;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: stepDone ? "#f0fdf4" : stepActive ? "#fafbfc" : "#fafbfc",
                      border: stepActive ? "1px solid #e0e7ff" : "1px solid transparent",
                    }}
                  >
                    {/* Step indicator */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: stepDone ? "#22c55e" : stepActive ? "#4f46e5" : "#e5e7eb",
                      }}
                    >
                      {stepDone ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ) : stepActive ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <span className="text-slate-400 text-xs font-bold">{i + 1}</span>
                      )}
                    </div>

                    {/* Text + mini gauge */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-bold"
                          style={{ color: stepDone ? "#16a34a" : stepActive ? "#333d4b" : "#9ca3af" }}
                        >
                          {item.label}
                        </span>
                        {stepDone && (
                          <span className="text-[10px] font-bold text-green-500">완료</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                      {/* Mini progress bar for active step */}
                      {stepActive && (
                        <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${stepGauge * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phase 1 subtitle */}
        <div
          className="absolute bottom-[10vh] left-0 right-0 text-center px-5"
          style={{
            opacity: Math.min(1, Math.max(0, (progress - 1.5) / 0.3)) * (1 - fadeOutP),
          }}
        >
          <p style={{ fontWeight: 500, color: "#4e5968", lineHeight: 1.6, fontSize: 15 }}>
            {t("subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
