"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

export default function PrivacyV1Page() {
  const t = useTranslations("privacy_v1_0");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.privacy}
      currentVersionKey="v1_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      <p>{t("intro")}</p>

      {/* 1. 수집하는 개인정보 */}
      <h2>{t("section1.title")}</h2>
      <h3>{t("section1.requiredTitle")}</h3>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`section1.required.${i}`)}</li>
        ))}
      </ul>
      <h3>{t("section1.optionalTitle")}</h3>
      <ul>
        <li>{t("section1.optional.0")}</li>
      </ul>

      {/* 2. 금융 데이터 수집 */}
      <h2>{t("section2.title")}</h2>
      <p>{t("section2.intro")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`section2.items.${i}`)}</li>
        ))}
      </ul>
      <p>{t("section2.consent")}</p>

      {/* 3. 개인정보 이용 목적 */}
      <h2>{t("section3.title")}</h2>
      <ul>
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i}>{t(`section3.items.${i}`)}</li>
        ))}
      </ul>

      {/* 4. 개인정보 보유 기간 */}
      <h2>{t("section4.title")}</h2>
      <p>{t("section4.intro")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`section4.items.${i}`)}</li>
        ))}
      </ul>

      {/* 5. 개인정보 수집 및 이용 동의 */}
      <h2>{t("section5.title")}</h2>
      <h3>{t("section5.collectTitle")}</h3>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`section5.collectItems.${i}`)}</li>
        ))}
      </ul>
      <h3>{t("section5.purposeTitle")}</h3>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`section5.purposeItems.${i}`)}</li>
        ))}
      </ul>
      <h3>{t("section5.retentionTitle")}</h3>
      <p>{t("section5.retention")}</p>
      <p>{t("section5.refusal")}</p>

      {/* 6. 마케팅 정보 수신 동의 */}
      <h2>{t("section6.title")}</h2>
      <p>{t("section6.intro")}</p>
      <ul>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`section6.purposes.${i}`)}</li>
        ))}
      </ul>
      <h3>{t("section6.collectTitle")}</h3>
      <ul>
        {[0, 1].map((i) => (
          <li key={i}>{t(`section6.collectItems.${i}`)}</li>
        ))}
      </ul>
      <h3>{t("section6.retentionTitle")}</h3>
      <p>{t("section6.retention")}</p>
      <p>{t("section6.optOut")}</p>

      {/* 7. 계정 연동 및 금융 데이터 접근 동의 */}
      <h2>{t("section7.title")}</h2>
      <p>{t("section7.intro")}</p>
      <p>{t("section7.consent")}</p>
      <ul>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`section7.items.${i}`)}</li>
        ))}
      </ul>
      <p>{t("section7.purpose")}</p>
      <p>{t("section7.disconnect")}</p>
    </LegalPageLayout>
  );
}
