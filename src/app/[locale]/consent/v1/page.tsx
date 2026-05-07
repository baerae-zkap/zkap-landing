"use client";

import { useLocale } from "next-intl";
import ConsentV1Body from "@/components/legal/ConsentV1Body";

export default function ConsentV1Page() {
  const locale = useLocale();
  const namespace = locale === "ko" ? "consent_v1" : "consent";
  return <ConsentV1Body namespace={namespace} />;
}
