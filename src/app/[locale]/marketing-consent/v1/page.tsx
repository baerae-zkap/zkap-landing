"use client";

import { useLocale } from "next-intl";
import MarketingConsentV1Body from "@/components/legal/MarketingConsentV1Body";

export default function MarketingConsentV1Page() {
  const locale = useLocale();
  const namespace = locale === "ko" ? "marketingConsent_v1" : "marketingConsent";
  return <MarketingConsentV1Body namespace={namespace} />;
}
