import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#f5f6f8] text-slate-500 py-8 md:py-12">
      <div className="lg:max-w-[1100px] lg:mx-auto px-6">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-6">
          <div className="text-left">
            <img src="/images/baerae-logo.svg" alt="Baerae" className="h-5 md:h-7 mb-2 md:mb-3" />
            <div className="text-sm text-slate-400">{t("copyright")}</div>
          </div>

          <div className="flex items-center gap-6 text-sm flex-wrap">
            <a href="#" className="hover:text-slate-700 transition-colors">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-slate-700 transition-colors">
              {t("terms")}
            </a>
            <a
              href="https://x.com/zkap_baerae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://baerae.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="2" width="18" height="3.5"/>
                <rect x="3" y="8" width="18" height="3.5"/>
                <path d="M3 14h18v9.5l-9-5.5-9 5.5V14z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
