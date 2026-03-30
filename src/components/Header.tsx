"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-content mx-auto px-5 h-16 flex items-center justify-between">
        <Image src="/images/logo.svg" alt="ZKAP" width={80} height={28} />

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            {t("langToggle")}
          </button>
          <a
            href="#download"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
