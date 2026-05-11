"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { type LegalDocConfig } from "@/config/legal-versions";

interface LegalPageLayoutProps {
  title: string;
  config: LegalDocConfig;
  currentVersionKey: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  config,
  currentVersionKey,
  children,
}: LegalPageLayoutProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  // EN locale only has v1.0 content; hide v2.0 from dropdown
  const visibleVersions = locale === "ko"
    ? config.versions
    : config.versions.filter((v) => v.key === "v1_0");
  const current =
    visibleVersions.find((v) => v.key === currentVersionKey) ??
    visibleVersions[0];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="relative mb-8">
          <button
            onClick={() => visibleVersions.length > 1 && setOpen(!open)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 transition-colors ${
              visibleVersions.length > 1 ? "hover:bg-slate-50 cursor-pointer" : "cursor-default"
            }`}
          >
            {current.label}
            {visibleVersions.length > 1 && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            )}
          </button>
          {open && visibleVersions.length > 1 && (
            <div className="absolute top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              {visibleVersions.map((v) => (
                <Link
                  key={v.key}
                  href={`/${locale}${v.path}`}
                  onClick={() => setOpen(false)}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                    v.key === currentVersionKey
                      ? "text-blue-600 font-medium"
                      : "text-slate-700"
                  }`}
                >
                  {v.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <article className="legal-prose prose prose-slate max-w-none prose-headings:text-slate-900 prose-h2:text-lg prose-h2:font-bold prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-600 prose-p:leading-[1.8] prose-li:text-slate-600 prose-li:leading-[1.8] prose-ol:my-3 prose-ul:my-3">
          {children}
        </article>
      </main>
    </div>
  );
}
