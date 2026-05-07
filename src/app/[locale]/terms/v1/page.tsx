"use client";

import { useLocale } from "next-intl";
import TermsV1Body from "@/components/legal/TermsV1Body";

export default function TermsV1Page() {
  const locale = useLocale();
  // KR has v1 archived in `terms_v1`; EN has only v1 in main `terms` namespace
  const namespace = locale === "ko" ? "terms_v1" : "terms";
  return <TermsV1Body namespace={namespace} />;
}
