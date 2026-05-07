"use client";

import { useLocale } from "next-intl";
import PrivacyV1Body from "@/components/legal/PrivacyV1Body";

export default function PrivacyV1Page() {
  const locale = useLocale();
  const namespace = locale === "ko" ? "privacy_v1" : "privacy";
  return <PrivacyV1Body namespace={namespace} />;
}
