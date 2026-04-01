import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#f5f6f8] text-slate-500 py-8 md:py-12">
      <div className="lg:max-w-[1100px] lg:mx-auto px-6">
        {/* Company name */}
        <div className="text-sm font-bold text-slate-600 mb-3">
          {t("companyName")}
        </div>

        {/* Company info */}
        <div className="text-[13px] text-slate-400 leading-relaxed mb-4 space-y-0.5">
          <div>{t("bizNumber")}</div>
          <div>{t("address")}</div>
          <div>{t("contact")}</div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm mb-5">
          <a href="#" className="text-slate-500 font-medium hover:text-slate-700 transition-colors">
            {t("privacy")}
          </a>
          <a href="#" className="text-slate-500 font-medium hover:text-slate-700 transition-colors">
            {t("terms")}
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3 mb-6">
          <a
            href="https://x.com/zkap_baerae"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center hover:bg-slate-400 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://baerae.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center hover:bg-slate-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="3" y="2" width="18" height="3.5"/>
              <rect x="3" y="8" width="18" height="3.5"/>
              <path d="M3 14h18v9.5l-9-5.5-9 5.5V14z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[12px] text-slate-400">{t("copyright")}</div>
      </div>
    </footer>
  );
}
