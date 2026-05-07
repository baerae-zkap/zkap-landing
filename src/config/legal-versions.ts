export type LegalDocType = "terms" | "privacy" | "consent" | "marketing-consent" | "marketing-receive";

export interface LegalVersion {
  key: string;
  label: string;
  path: string;
}

export interface LegalDocConfig {
  type: LegalDocType;
  versions: LegalVersion[];
}

export const LEGAL_DOCS: Record<LegalDocType, LegalDocConfig> = {
  terms: {
    type: "terms",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/terms" },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/terms/v1" },
    ],
  },
  privacy: {
    type: "privacy",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/privacy" },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/privacy/v1" },
    ],
  },
  consent: {
    type: "consent",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/consent" },
      { key: "v1_0", label: "v1.0 (2026.04.10)", path: "/consent/v1" },
    ],
  },
  "marketing-consent": {
    type: "marketing-consent",
    versions: [
      { key: "v2_0", label: "v2.0 (2026.05.07)", path: "/marketing-consent" },
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
