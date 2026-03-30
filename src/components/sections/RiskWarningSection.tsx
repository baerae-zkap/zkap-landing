"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const STEPS = 4;

const STEP_IMAGES = [
  null,
  "/images/risk/penalty.jpg",
  "/images/risk/prison.jpg",
  "/images/risk/fine.jpg",
];

export default function RiskWarningSection() {
  const t = useTranslations("risk");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.floor(v * STEPS);
    setCurrentStep(Math.min(step, STEPS - 1));
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#f8fafc", "#0f172a", "#0f172a", "#0f172a", "#0f172a"]
  );

  return (
    <div ref={containerRef} style={{ height: `${STEPS * 100}vh` }}>
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Background images */}
        {STEP_IMAGES.map((src, i) =>
          src ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: currentStep === i ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-black/80" />
            </motion.div>
          ) : null
        )}

        {/* Step 0: Title */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8"
          animate={{
            opacity: currentStep === 0 ? 1 : 0,
            scale: currentStep === 0 ? 1 : 0.9,
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 text-center">
            {t("title")}
          </h2>
        </motion.div>

        {/* Step 1: 과태료 20% */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
          animate={{ opacity: currentStep === 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm sm:text-base text-slate-400 font-medium tracking-widest mb-4"
            animate={currentStep === 1 ? { opacity: [0, 1], y: [10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {t("penalty")}
          </motion.p>
          <motion.p
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white"
            animate={currentStep === 1 ? { scale: [0.3, 1.03, 1], opacity: [0, 1] } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            최대 20%
          </motion.p>
        </motion.div>

        {/* Step 2: 징역 2년 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
          animate={{ opacity: currentStep === 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm sm:text-base text-slate-400 font-medium tracking-widest mb-4"
            animate={currentStep === 2 ? { opacity: [0, 1], y: [10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            징역형
          </motion.p>
          <motion.p
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white"
            animate={currentStep === 2 ? { scale: [0.3, 1.03, 1], opacity: [0, 1] } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            최대 2년
          </motion.p>
        </motion.div>

        {/* Step 3: 벌금 2억 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
          animate={{ opacity: currentStep === 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm sm:text-base text-slate-400 font-medium tracking-widest mb-4"
            animate={currentStep === 3 ? { opacity: [0, 1], y: [10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            벌금
          </motion.p>
          <motion.p
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white"
            animate={currentStep === 3 ? { scale: [0.3, 1.03, 1], opacity: [0, 1] } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            최대 2억
          </motion.p>
        </motion.div>

        {/* Source — pinned to bottom of sticky container */}
        <motion.p
          className="absolute bottom-8 left-0 right-0 text-center text-xs text-slate-500"
          animate={{ opacity: currentStep === 3 ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {t("source")}
        </motion.p>
      </motion.div>
    </div>
  );
}
