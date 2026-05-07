"use client";

import { useLocale } from "next-intl";
import MarketingConsentV1Body from "@/components/legal/MarketingConsentV1Body";

export default function MarketingConsentPage() {
  const locale = useLocale();
  // v1 and v2 share the same JSX layout (4-row table); only content differs by namespace
  return (
    <MarketingConsentV1Body
      namespace="marketingConsent"
      currentVersionKey={locale === "ko" ? "v2_0" : "v1_0"}
    />
  );
}
