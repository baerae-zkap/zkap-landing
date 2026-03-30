import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-content mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-semibold text-sm mb-1">
              {t("companyName")}
            </div>
            <div className="text-xs">{t("copyright")}</div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors opacity-50 cursor-default">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-white transition-colors opacity-50 cursor-default">
              {t("terms")}
            </a>
            <a
              href="https://x.com/zkap_baerae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href="https://medium.com/baerae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Medium
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
