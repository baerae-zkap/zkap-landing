"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const STEPS = 3;

const STEP_IMAGES = [
  null,
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
    // step 0: 0→0.2, step 1(징역): 0.2→0.7, step 2(과태료): 0.7→1
    const step = v < 0.2 ? 0 : v < 0.7 ? 1 : 2;
    setCurrentStep(step);
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#f8fafc", "#0f172a", "#0f172a", "#0f172a"]
  );

  return (
    <div ref={containerRef} data-risk-section style={{ height: `${STEPS * 110}vh` }}>
      <motion.div
        className="sticky top-0 overflow-hidden"
        style={{ backgroundColor: bgColor, height: "100dvh" }}
      >

        {/* Background images */}
        {STEP_IMAGES.map((src, i) =>
          src ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: currentStep === 0 ? 1 : 0,
            scale: currentStep === 0 ? 1 : 0.9,
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 text-center whitespace-pre-line md:whitespace-normal">
            {t("title")}
          </h2>
        </motion.div>

        {/* Step 1: 징역형 최대 2년 */}
        <motion.div
          className="absolute inset-0 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep === 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="absolute left-0 right-0 text-center text-base sm:text-lg text-slate-300 font-semibold tracking-widest"
            style={{ top: "calc(50% - 40px)" }}
            initial={{ opacity: 0 }}
            animate={currentStep === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {t("step1Label")}
          </motion.p>
          <motion.p
            className="absolute left-0 right-0 text-center text-6xl sm:text-7xl lg:text-8xl font-black text-white"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={currentStep === 1 ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("step1Value")}
          </motion.p>
        </motion.div>

        {/* Step 2: 과태료 + 벌금 */}
        <motion.div
          className="absolute inset-0 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep === 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="absolute left-0 right-0 text-center text-base sm:text-lg text-slate-300 font-semibold tracking-widest px-4"
            style={{ top: "calc(50% - 40px)" }}
            initial={{ opacity: 0 }}
            animate={currentStep === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {t("step2Label")}
          </motion.p>
          <motion.p
            className="absolute left-0 right-0 text-center text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={currentStep === 2 ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("step2Value")}
          </motion.p>
        </motion.div>

        {/* Source — pinned to bottom */}
        <motion.p
          className="absolute bottom-10 left-0 right-0 text-center text-sm text-slate-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {t("source")}
        </motion.p>
      </motion.div>
    </div>
  );
}
