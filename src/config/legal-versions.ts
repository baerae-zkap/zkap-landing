export type LegalDocType = "terms" | "privacy" | "consent" | "marketing-consent" | "marketing-receive";

export interface LegalVersion {
  key: string;
  label: string;
  path: string;
  /** Locales this version is available in; omitted means all locales */
  locales?: string[];
}

export interface LegalDocConfig {
  type: LegalDocType;
  versions: LegalVersion[];
}

export const LEGAL_DOCS: Record<LegalDocType, LegalDocConfig> = {
  terms: {
    type: "terms",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/terms", locales: ["ko"] },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/terms/v1" },
    ],
  },
  privacy: {
    type: "privacy",
    versions: [
      { key: "v2_2", label: "v2.2 (2026.11.03)", path: "/privacy" },
      { key: "v2_1", label: "v2.1 (2026.10.20)", path: "/privacy/v2-1" },
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/privacy/v2" },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/privacy/v1" },
    ],
  },
  consent: {
    type: "consent",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/consent", locales: ["ko"] },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/consent/v1" },
    ],
  },
  "marketing-consent": {
    type: "marketing-consent",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/marketing-consent", locales: ["ko"] },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/marketing-consent/v1" },
    ],
  },
  "marketing-receive": {
    type: "marketing-receive",
    versions: [
      { key: "v1_0", label: "v1.0 (2026.05.07)", path: "/marketing-receive" },
    ],
  },
};
