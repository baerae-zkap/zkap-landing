"use client";

import { useTranslations } from "next-intl";
import LegalPageLayout from "@/components/LegalPageLayout";
import { LEGAL_DOCS } from "@/config/legal-versions";

function Clause({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="inline-block w-6 text-slate-400 font-medium select-none">
        {num}
      </span>{" "}
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <LegalPageLayout
      title={t("title")}
      config={LEGAL_DOCS.privacy}
      currentVersionKey="v1_0"
    >
      <p className="text-slate-500 text-sm mb-8">{t("effectiveDate")}</p>

      {/* 제1조 개인정보의 처리목적과 수집항목 */}
      <h2>{t("article1.title")}</h2>
      <p>{t("article1.intro")}</p>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="mt-5 pl-4 border-l-2 border-slate-200">
          <h3 className="!border-l-0 !pl-0">{t(`article1.categories.${i}.name`)}</h3>
          <p>
            <span className="text-slate-500 text-sm font-medium">목적 &mdash;</span>{" "}
            {t(`article1.categories.${i}.purpose`)}
          </p>
          <p>
            <span className="text-slate-500 text-sm font-medium">수집항목 &mdash;</span>{" "}
            {t(`article1.categories.${i}.items`)}
          </p>
        </div>
      ))}

      {/* 제2조 개인정보의 처리 및 보유기간 */}
      <h2>{t("article2.title")}</h2>
      <Clause num="①">{t("article2.intro")}</Clause>
      <Clause num="②">각각의 개인정보 처리 및 보유기간은 다음과 같습니다.</Clause>
      <ol>
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>{t(`article2.periods.${i}`)}</li>
        ))}
      </ol>
      <Clause num="③">{t("article2.notice")}</Clause>

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
        <Clause key={i} num={"①②"[i]}>
          {t(`article4.items.${i}`)}
        </Clause>
      ))}

      {/* 제5조 개인정보의 파기 절차 및 방법 */}
      <h2>{t("article5.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article5.items.${i}`)}
        </Clause>
      ))}

      {/* 제6조 이용자의 권리 및 행사 방법 */}
      <h2>{t("article6.title")}</h2>
      {[0, 1, 2].map((i) => (
        <Clause key={i} num={"①②③"[i]}>
          {t(`article6.items.${i}`)}
        </Clause>
      ))}

      {/* 제7조 개인정보의 안전성 확보조치 */}
      <h2>{t("article7.title")}</h2>
      {[0, 1].map((i) => (
        <Clause key={i} num={"①②"[i]}>
          {t(`article7.items.${i}`)}
        </Clause>
      ))}

      {/* 제8조 쿠키 등 자동수집장치의 설치·운영 */}
      <h2>{t("article8.title")}</h2>
      <p>{t("article8.content")}</p>

      {/* 제9조 개인정보 보호책임자 및 문의처 */}
      <h2>{t("article9.title")}</h2>
      <Clause num="①">{t("article9.intro")}</Clause>
      <div className="my-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 space-y-1 not-prose">
        <div><span className="text-slate-400 w-14 inline-block">성명</span>{t("article9.officer.name")}</div>
        <div><span className="text-slate-400 w-14 inline-block">직책</span>{t("article9.officer.title")}</div>
        <div><span className="text-slate-400 w-14 inline-block">연락처</span>{t("article9.officer.contact")}</div>
      </div>
      <Clause num="②">{t("article9.notice")}</Clause>

      {/* 제10조 권익침해 구제방법 */}
      <h2>{t("article10.title")}</h2>
      <p>{t("article10.intro")}</p>
      <div className="space-y-3 not-prose text-sm">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-slate-50 p-4">
            <p className="font-medium text-slate-800 mb-1">
              {t(`article10.agencies.${i}.name`)}
            </p>
            <p className="text-slate-500">
              홈페이지: {t(`article10.agencies.${i}.website`)} &middot; 전화: {t(`article10.agencies.${i}.phone`)}
            </p>
          </div>
        ))}
      </div>

      {/* 제11조 개인정보처리방침 변경 */}
      <h2>{t("article11.title")}</h2>
      <p>{t("article11.content")}</p>

      {/* 부칙 */}
      <h2>부칙</h2>
      <p>{t("addendum")}</p>
    </LegalPageLayout>
  );
}
