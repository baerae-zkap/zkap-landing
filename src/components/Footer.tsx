import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#f5f6f8] text-slate-500 py-8 md:py-12">
      <div className="lg:max-w-[1100px] lg:mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Left — Logo + Company info */}
          <div>
            <img src="/images/baerae-logo.svg" alt="Baerae" className="h-5 md:h-6 mb-4" />
            <div className="text-[13px] text-slate-500 leading-relaxed space-y-0.5">
              <div>{t("bizNumber")}</div>
              <div>{t("address")}</div>
              <div>{t("contact")}</div>
            </div>
            <div className="text-[12px] text-slate-400 mt-4">{t("copyright")}</div>
          </div>

          {/* Right — Links + Social */}
          <div className="flex flex-col items-start lg:items-end lg:justify-end gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <Link href="/privacy" className="text-slate-600 font-medium hover:text-slate-800 transition-colors">
                {t("privacy")}
              </Link>
              <Link href="/terms" className="text-slate-600 font-medium hover:text-slate-800 transition-colors">
                {t("terms")}
              </Link>
              <Link href="/consent" className="text-slate-600 font-medium hover:text-slate-800 transition-colors">
                {t("consent")}
              </Link>
              <Link href="/marketing-consent" className="text-slate-600 font-medium hover:text-slate-800 transition-colors">
                {t("marketingConsent")}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/zkap_baerae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-400 flex items-center justify-center hover:bg-slate-500 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://baerae.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-400 flex items-center justify-center hover:bg-slate-500 transition-colors"
                aria-label="Substack"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <rect x="3" y="2" width="18" height="3.5"/>
                  <rect x="3" y="8" width="18" height="3.5"/>
                  <path d="M3 14h18v9.5l-9-5.5-9 5.5V14z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
