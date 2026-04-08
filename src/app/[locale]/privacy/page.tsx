"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.privacy}
      currentVersionKey="v2_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      {/* 제1조 개인정보의 처리목적과 수집항목 */}
      <h2>{t("article1.title")}</h2>
      <p>{t("article1.intro")}</p>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="mt-4">
          <h3>{t(`article1.categories.${i}.name`)}</h3>
          <p>
            <strong>목적:</strong> {t(`article1.categories.${i}.purpose`)}
          </p>
          <p>
            <strong>수집항목:</strong> {t(`article1.categories.${i}.items`)}
          </p>
        </div>
      ))}

      {/* 제2조 개인정보의 처리 및 보유기간 */}
      <h2>{t("article2.title")}</h2>
      <p>① {t("article2.intro")}</p>
      <p>② 각각의 개인정보 처리 및 보유기간은 다음과 같습니다.</p>
      <ol>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article2.periods.${i}`)}</li>
        ))}
      </ol>
      <p>③ {t("article2.notice")}</p>

      {/* 제3조 개인정보의 제3자 제공 */}
      <h2>{t("article3.title")}</h2>
      <p>{t("article3.intro")}</p>
      <ol>
        {[0, 1, 2].map((i) => (
          <li key={i}>{t(`article3.items.${i}`)}</li>
        ))}
      </ol>

      {/* 제4조 개인정보 처리의 위탁 */}
      <h2>{t("article4.title")}</h2>
      {[0, 1].map((i) => (
        <p key={i}>
          {"①②"[i]} {t(`article4.items.${i}`)}
        </p>
      ))}

      {/* 제5조 개인정보의 파기 절차 및 방법 */}
      <h2>{t("article5.title")}</h2>
      {[0, 1].map((i) => (
        <p key={i}>
          {"①②"[i]} {t(`article5.items.${i}`)}
        </p>
      ))}

      {/* 제6조 이용자의 권리 및 행사 방법 */}
      <h2>{t("article6.title")}</h2>
      {[0, 1, 2].map((i) => (
        <p key={i}>
          {"①②③"[i]} {t(`article6.items.${i}`)}
        </p>
      ))}

      {/* 제7조 개인정보의 안전성 확보조치 */}
      <h2>{t("article7.title")}</h2>
      {[0, 1].map((i) => (
        <p key={i}>
          {"①②"[i]} {t(`article7.items.${i}`)}
        </p>
      ))}

      {/* 제8조 쿠키 등 자동수집장치의 설치·운영 */}
      <h2>{t("article8.title")}</h2>
      <p>{t("article8.content")}</p>

      {/* 제9조 개인정보 보호책임자 및 문의처 */}
      <h2>{t("article9.title")}</h2>
      <p>① {t("article9.intro")}</p>
      <ul>
        <li>성명: {t("article9.officer.name")}</li>
        <li>직책: {t("article9.officer.title")}</li>
        <li>연락처: {t("article9.officer.contact")}</li>
      </ul>
      <p>② {t("article9.notice")}</p>

      {/* 제10조 권익침해 구제방법 */}
      <h2>{t("article10.title")}</h2>
      <p>{t("article10.intro")}</p>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="mt-3">
          <p className="font-medium">{t(`article10.agencies.${i}.name`)}</p>
          <ul>
            <li>홈페이지: {t(`article10.agencies.${i}.website`)}</li>
            <li>전화: {t(`article10.agencies.${i}.phone`)}</li>
          </ul>
        </div>
      ))}

      {/* 제11조 개인정보처리방침 변경 */}
      <h2>{t("article11.title")}</h2>
      <p>{t("article11.content")}</p>

      {/* 부칙 */}
      <h2>부칙</h2>
      <p>{t("addendum")}</p>
    </LegalPageLayout>
  );
}
