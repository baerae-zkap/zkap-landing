"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [dark, setDark] = useState(false);
  const [storeUrl, setStoreUrl] = useState("https://apps.apple.com");

  const switchHref = locale === "ko" ? "/en" : "/ko";

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setStoreUrl(/android/i.test(ua) ? "https://play.google.com" : "https://apps.apple.com");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const riskSection = document.querySelector("[data-risk-section]");
      if (!riskSection) return;
      const rect = riskSection.getBoundingClientRect();
      setDark(rect.top <= 64 && rect.bottom > 64);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: dark ? "transparent" : "rgba(255,255,255,0.8)",
        borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(241,245,249,1)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <img
          src="/images/logo.svg"
          alt="ZKAP"
          width={100}
          height={35}
          className="transition-all duration-300"
          style={{ filter: dark ? "brightness(0) invert(1)" : "none" }}
        />

        <div className="flex items-center gap-3">
          <a
            href={switchHref}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 ${
              dark
                ? "hover:bg-white/10 active:bg-white/20"
                : "hover:bg-black/5 active:bg-black/10"
            }`}
            aria-label="Switch language"
          >
            {locale === "ko" ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={dark ? "#fff" : "#333d4b"} strokeWidth="1.35">
                <path d="M19.353 9.914c0 5.213-4.226 9.438-9.438 9.438-5.213 0-9.438-4.225-9.438-9.438C.477 4.702 4.702.477 9.915.477c5.212 0 9.438 4.225 9.438 9.437z"/>
                <path strokeLinejoin="round" d="M13.662 9.914c0 5.213-3.748 9.438-3.748 9.438s-3.747-4.225-3.747-9.438c0-5.212 3.747-9.437 3.747-9.437s3.748 4.225 3.748 9.437z"/>
                <path d="M.876 7.018h18.076M.876 12.811h18.076"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={dark ? "#fff" : "#333d4b"} strokeWidth="1.5">
                <path d="M19.353 9.914c0 5.213-4.226 9.438-9.438 9.438-5.213 0-9.438-4.225-9.438-9.438C.477 4.702 4.702.477 9.915.477c5.212 0 9.438 4.225 9.438 9.437z"/>
                <path d="M19.205 11.52c-.451-2.769-2.357-4.129-4.643-4.227-2.434-.023-3.491 1.71-4.267 2.615l-.594.69c-1.361 1.238-2.384 1.633-3.876 1.588C2.897 12.153.888 9.456.888 7.224"/>
              </svg>
            )}
          </a>

          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-[130px] px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              dark
                ? "bg-white text-slate-900 hover:bg-white/90"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
