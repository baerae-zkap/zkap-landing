# ZKAP Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing CRA landing page with a Next.js-based, scroll-animated landing page focused on overseas crypto tax reporting.

**Architecture:** Next.js App Router with next-intl for i18n (ko/en), Tailwind CSS for styling, Framer Motion for scroll-triggered animations and a custom scroll frame sequence component. 9 sections following a psychological narrative arc (fear → personalization → relief → solution → trust → action).

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, next-intl, react-ga4, lucide-react

**Design Spec:** `docs/superpowers/specs/2026-03-30-landing-page-redesign-design.md`

---

## File Structure

```
zkap-landing/          (existing repo — contents replaced)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        # Locale-aware layout (fonts, metadata)
│   │   │   └── page.tsx          # Main page — composes all 9 sections
│   │   ├── globals.css           # Tailwind directives + custom base styles
│   │   └── layout.tsx            # Root layout (html lang)
│   ├── components/
│   │   ├── Header.tsx            # Fixed header: logo + lang toggle + CTA
│   │   ├── Footer.tsx            # Company info, legal links, SNS
│   │   ├── ScrollReveal.tsx      # Reusable scroll-triggered fade-in wrapper
│   │   ├── ScrollFrameSequence.tsx  # Scroll-driven frame sequence player
│   │   ├── AppDownloadButtons.tsx   # Reusable App Store / Google Play buttons
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── RiskWarningSection.tsx
│   │       ├── SelfDiagnosisSection.tsx
│   │       ├── ReliefSection.tsx
│   │       ├── ExchangeAssetSection.tsx
│   │       ├── ProcessSection.tsx
│   │       ├── TrustSection.tsx
│   │       ├── FAQSection.tsx
│   │       └── FinalCTASection.tsx
│   ├── lib/
│   │   └── ga.ts                 # GA4 init + event helpers
│   ├── i18n/
│   │   ├── request.ts            # next-intl getRequestConfig
│   │   └── routing.ts            # Locale routing config
│   └── messages/
│       ├── ko.json               # Korean translations
│       └── en.json               # English translations
├── public/
│   ├── images/
│   │   ├── exchanges/            # Binance.svg, Bybit.svg, OKX.svg, Coinbase.svg
│   │   ├── mockup/               # frame-001.webp ~ frame-060.webp (placeholder)
│   │   ├── app-store-badge.svg
│   │   ├── google-play-badge.svg
│   │   └── logo.svg
│   ├── favicon.ico
│   └── robots.txt
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── .gitignore
```

---

## Task 0: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `.gitignore`, `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 0.1: Initialize Next.js project in a clean branch**

We're replacing the CRA project. Create a new branch, remove old source files, and init Next.js.

```bash
cd /Users/jaden/repos/baerae-zkap/zkap-landing
git checkout -b feat/landing-redesign
```

- [ ] **Step 0.2: Remove old CRA files and init Next.js**

```bash
cd /Users/jaden/repos/baerae-zkap/zkap-landing
# Remove old CRA source files (keep docs/, .git/)
rm -rf src/ public/index.html public/manifest.json public/logo*.png
rm -f package.json package-lock.json

# Create Next.js project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

When prompted, accept defaults. If it asks about overwriting, say yes.

- [ ] **Step 0.3: Install additional dependencies**

```bash
npm install framer-motion next-intl react-ga4 lucide-react
```

- [ ] **Step 0.4: Configure Tailwind with custom theme**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          900: "#7f1d1d",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 0.5: Set up global CSS**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-white text-slate-900;
  }

  /* Korean text handling */
  p, li, span {
    word-break: keep-all;
  }
}
```

- [ ] **Step 0.6: Set up root layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZKAP - 해외 가상자산 세금 신고",
  description:
    "해외 거래소 자산, 쉽고 정확하게 신고하세요. Binance, Bybit, OKX, Coinbase 자동 연동.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 0.7: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts on localhost:3000 with the default Next.js page.

- [ ] **Step 0.8: Commit**

```bash
git add -A
git commit -m "chore: replace CRA with Next.js + Tailwind + Framer Motion scaffold"
```

---

## Task 1: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/request.ts`, `src/i18n/routing.ts`, `src/messages/ko.json`, `src/messages/en.json`, `src/middleware.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1.1: Create i18n routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
});
```

- [ ] **Step 1.2: Create i18n request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "ko" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 1.3: Create middleware for locale detection**

Create `src/middleware.ts`:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|robots.txt).*)"],
};
```

- [ ] **Step 1.4: Update next.config.ts for next-intl**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 1.5: Create Korean translation file**

Create `src/messages/ko.json`:

```json
{
  "header": {
    "cta": "앱 다운로드",
    "langToggle": "EN"
  },
  "hero": {
    "title": "해외 거래소 자산,\n'몰랐다'는 통하지 않습니다",
    "subtitle": "5억 이상 해외 금융자산, 신고는 의무입니다",
    "cta": "무료로 시작하기"
  },
  "risk": {
    "title": "신고 안 하면 어떻게 되나요?",
    "penalty": "미신고 시 과태료",
    "penaltyRate": "최대 20%",
    "criminal": "2년 이하 징역 또는 2억원 이하 벌금",
    "example": "10억 미신고 시",
    "exampleResult": "과태료 최대 2억",
    "source": "국제조세조정에 관한 법률 제34조, 제35조"
  },
  "diagnosis": {
    "title": "혹시 나도 신고 대상?",
    "items": [
      "해외 거래소에 자산을 보유하고 있다",
      "작년 중 자산 총액이 5억을 넘은 적이 있다",
      "여러 거래소에 분산되어 총액 파악이 어렵다"
    ],
    "conclusion": "하나라도 해당되면, 지금 확인이 필요합니다"
  },
  "relief": {
    "title": "복잡한 해외 자산 신고,\nZKAP 하나면 충분합니다",
    "subtitle": "흩어진 거래소 자산을 모아보고, 전문가와 신고까지 한 번에"
  },
  "exchange": {
    "title": "거래소 연결 한 번이면 끝",
    "subtitle": "4대 해외 거래소 자산을 한눈에 확인하세요",
    "exchanges": ["Binance", "Bybit", "OKX", "Coinbase"],
    "dashboardTitle": "내 해외 자산 현황",
    "totalLabel": "총 해외 자산",
    "totalAmount": "₩ 823,450,000",
    "monthEnd": "2025년 12월 말 기준"
  },
  "process": {
    "title": "3단계로 끝나는 세금 신고",
    "steps": [
      {
        "number": "1",
        "title": "거래소 연결",
        "description": "로그인 한 번으로 연동"
      },
      {
        "number": "2",
        "title": "자산 확인",
        "description": "전체 자산 한눈에 파악"
      },
      {
        "number": "3",
        "title": "전문가와 신고",
        "description": "세무사가 신고 대행"
      }
    ]
  },
  "trust": {
    "title": "전문 세무사가 끝까지 책임집니다",
    "subtitle": "복잡한 서류 작업은 전문가에게 맡기세요",
    "badges": [
      {
        "title": "전문 세무사 매칭",
        "description": "가상자산 전문 세무사가 신고를 대행합니다"
      },
      {
        "title": "개인정보 보호",
        "description": "금융 수준의 암호화로 데이터를 안전하게 보호합니다"
      },
      {
        "title": "정확한 신고",
        "description": "자동 수집된 데이터로 누락 없이 정확하게 신고합니다"
      }
    ]
  },
  "faq": {
    "title": "자주 묻는 질문",
    "items": [
      {
        "question": "신고 대상인지 어떻게 알 수 있나요?",
        "answer": "매년 6월 1일 기준으로, 해외 금융계좌 잔액의 합이 5억원을 초과하는 경우 신고 의무가 발생합니다. ZKAP에서 거래소를 연동하면 자동으로 확인할 수 있습니다."
      },
      {
        "question": "어떤 거래소를 지원하나요?",
        "answer": "현재 Binance, Bybit, OKX, Coinbase 4개 거래소를 지원합니다."
      },
      {
        "question": "수수료는 얼마인가요?",
        "answer": "앱 다운로드와 거래소 연동, 자산 조회는 무료입니다. 세무사 신고 대행 서비스는 별도 안내드립니다."
      },
      {
        "question": "개인정보는 안전한가요?",
        "answer": "ZKAP은 금융 수준의 암호화를 적용하며, 수집된 데이터는 신고 목적으로만 사용됩니다."
      },
      {
        "question": "신고 기한은 언제까지인가요?",
        "answer": "해외금융계좌 신고는 매년 6월 1일부터 6월 30일까지입니다. 기한 내 신고하지 않으면 과태료가 부과됩니다."
      }
    ]
  },
  "finalCta": {
    "title": "과태료 걱정 없는\n가장 쉬운 방법",
    "subtitle": "지금 ZKAP으로 시작하세요",
    "cta": "앱 다운로드"
  },
  "footer": {
    "companyName": "주식회사 배래",
    "companyNameEn": "Baerae Co., Ltd.",
    "copyright": "© 2026 Baerae Co., Ltd. All rights reserved.",
    "privacy": "개인정보처리방침",
    "terms": "이용약관"
  }
}
```

- [ ] **Step 1.6: Create English translation file**

Create `src/messages/en.json`:

```json
{
  "header": {
    "cta": "Download App",
    "langToggle": "KR"
  },
  "hero": {
    "title": "Overseas Exchange Assets?\n'I Didn't Know' Won't Cut It",
    "subtitle": "Reporting overseas financial assets over 500M KRW is mandatory",
    "cta": "Get Started Free"
  },
  "risk": {
    "title": "What Happens If You Don't Report?",
    "penalty": "Penalty for non-reporting",
    "penaltyRate": "Up to 20%",
    "criminal": "Up to 2 years imprisonment or 200M KRW fine",
    "example": "1B KRW unreported",
    "exampleResult": "Penalty up to 200M KRW",
    "source": "International Tax Coordination Act, Articles 34 & 35"
  },
  "diagnosis": {
    "title": "Could You Be Required to Report?",
    "items": [
      "You hold assets on overseas exchanges",
      "Your total assets exceeded 500M KRW last year",
      "Assets are spread across multiple exchanges, making totals hard to track"
    ],
    "conclusion": "If any of these apply, it's time to check now"
  },
  "relief": {
    "title": "Complex overseas asset reporting?\nZKAP makes it simple",
    "subtitle": "View all exchange assets in one place and file with an expert"
  },
  "exchange": {
    "title": "One Login, All Connected",
    "subtitle": "View assets across 4 major exchanges at a glance",
    "exchanges": ["Binance", "Bybit", "OKX", "Coinbase"],
    "dashboardTitle": "My Overseas Assets",
    "totalLabel": "Total Overseas Assets",
    "totalAmount": "₩ 823,450,000",
    "monthEnd": "As of end of December 2025"
  },
  "process": {
    "title": "File Your Taxes in 3 Steps",
    "steps": [
      {
        "number": "1",
        "title": "Connect Exchange",
        "description": "One login to sync"
      },
      {
        "number": "2",
        "title": "Review Assets",
        "description": "See everything at a glance"
      },
      {
        "number": "3",
        "title": "File with Expert",
        "description": "Tax pro handles the rest"
      }
    ]
  },
  "trust": {
    "title": "Expert Tax Professionals Handle Everything",
    "subtitle": "Leave the complex paperwork to the experts",
    "badges": [
      {
        "title": "Matched Tax Expert",
        "description": "Crypto-specialized tax professionals handle your filing"
      },
      {
        "title": "Data Protection",
        "description": "Financial-grade encryption keeps your data safe"
      },
      {
        "title": "Accurate Filing",
        "description": "Auto-collected data ensures nothing is missed"
      }
    ]
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "items": [
      {
        "question": "How do I know if I need to report?",
        "answer": "If your combined overseas financial account balances exceed 500 million KRW as of June 1st each year, you are required to report. Link your exchanges on ZKAP to check automatically."
      },
      {
        "question": "Which exchanges are supported?",
        "answer": "We currently support Binance, Bybit, OKX, and Coinbase."
      },
      {
        "question": "How much does it cost?",
        "answer": "The app download, exchange linking, and asset viewing are free. Tax filing service fees are provided separately."
      },
      {
        "question": "Is my data safe?",
        "answer": "ZKAP applies financial-grade encryption. Collected data is used solely for tax reporting purposes."
      },
      {
        "question": "When is the reporting deadline?",
        "answer": "Overseas financial account reporting is from June 1 to June 30 each year. Failure to report within the deadline results in penalties."
      }
    ]
  },
  "finalCta": {
    "title": "The Easiest Way to\nAvoid Penalties",
    "subtitle": "Start with ZKAP today",
    "cta": "Download App"
  },
  "footer": {
    "companyName": "Baerae Co., Ltd.",
    "companyNameEn": "Baerae Co., Ltd.",
    "copyright": "© 2026 Baerae Co., Ltd. All rights reserved.",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  }
}
```

- [ ] **Step 1.7: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ko" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 1.8: Create placeholder page**

Create `src/app/[locale]/page.tsx`:

```typescript
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold whitespace-pre-line text-center">
        {t("title")}
      </h1>
    </main>
  );
}
```

- [ ] **Step 1.9: Remove the default app/page.tsx if it exists**

```bash
rm -f src/app/page.tsx
```

- [ ] **Step 1.10: Verify i18n works**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/ko` and show the Korean hero title.
Visit `http://localhost:3000/en` — should show the English hero title.

- [ ] **Step 1.11: Commit**

```bash
git add -A
git commit -m "feat: add next-intl i18n setup with ko/en translations"
```

---

## Task 2: Shared Components (Header, ScrollReveal, AppDownloadButtons)

**Files:**
- Create: `src/components/Header.tsx`, `src/components/ScrollReveal.tsx`, `src/components/AppDownloadButtons.tsx`
- Create: `public/images/logo.svg`

- [ ] **Step 2.1: Copy logo from old assets**

```bash
cp /Users/jaden/repos/baerae-zkap/zkap-landing/src/assets/images/logo.svg /Users/jaden/repos/baerae-zkap/zkap-landing/public/images/logo.svg 2>/dev/null || echo "Will create placeholder"
```

If the file doesn't exist at the old location (since we deleted src/), create a simple SVG placeholder:

```bash
mkdir -p public/images
```

Create `public/images/logo.svg` — a simple ZKAP text logo placeholder (replace with real logo later).

- [ ] **Step 2.2: Create ScrollReveal component**

Create `src/components/ScrollReveal.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2.3: Create AppDownloadButtons component**

Create `src/components/AppDownloadButtons.tsx`:

```typescript
import Image from "next/image";

interface AppDownloadButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { height: 40, width: 135 },
  md: { height: 48, width: 162 },
  lg: { height: 56, width: 189 },
};

export default function AppDownloadButtons({
  className = "",
  size = "md",
}: AppDownloadButtonsProps) {
  const { height, width } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          width={width}
          height={height}
        />
      </a>
      <a
        href="https://play.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/google-play-badge.svg"
          alt="Get it on Google Play"
          width={width}
          height={height}
        />
      </a>
    </div>
  );
}
```

Note: Store badge SVGs will be placeholder files. Replace `href` values with actual store URLs when available.

- [ ] **Step 2.4: Create placeholder store badge SVGs**

Create `public/images/app-store-badge.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="162" height="48" viewBox="0 0 162 48" fill="none">
  <rect width="162" height="48" rx="8" fill="#0A0A0A"/>
  <text x="81" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-size="12" font-weight="600">App Store</text>
</svg>
```

Create `public/images/google-play-badge.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="162" height="48" viewBox="0 0 162 48" fill="none">
  <rect width="162" height="48" rx="8" fill="#0A0A0A"/>
  <text x="81" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-size="12" font-weight="600">Google Play</text>
</svg>
```

- [ ] **Step 2.5: Create Header component**

Create `src/components/Header.tsx`:

```typescript
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-content mx-auto px-5 h-16 flex items-center justify-between">
        <Image src="/images/logo.svg" alt="ZKAP" width={80} height={28} />

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            {t("langToggle")}
          </button>
          <a
            href="#download"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2.6: Verify components render**

Update `src/app/[locale]/page.tsx` temporarily:

```typescript
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <>
      <Header />
      <main className="pt-16">
        <ScrollReveal>
          <section className="flex min-h-screen items-center justify-center">
            <h1 className="text-4xl font-bold whitespace-pre-line text-center">
              {t("title")}
            </h1>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
```

```bash
npm run dev
```

Expected: Header renders with logo and language toggle. Hero text fades in on scroll.

- [ ] **Step 2.7: Commit**

```bash
git add -A
git commit -m "feat: add Header, ScrollReveal, AppDownloadButtons shared components"
```

---

## Task 3: Section 1 — Hero

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 3.1: Create HeroSection**

Create `src/components/sections/HeroSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AppDownloadButtons from "@/components/AppDownloadButtons";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-content mx-auto px-5 py-24 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-200 rounded-full">
              세금 신고 시즌 오픈
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-slate-500 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <AppDownloadButtons size="lg" />
          </motion.div>
        </div>

        {/* App mockup placeholder — replace with real image */}
        <motion.div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-72 h-[580px] bg-slate-100 rounded-[40px] border-4 border-slate-200 flex items-center justify-center">
            <span className="text-slate-400 text-sm">App Mockup</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Wire into page**

Update `src/app/[locale]/page.tsx`:

```typescript
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
      </main>
    </>
  );
}
```

- [ ] **Step 3.3: Verify and commit**

```bash
npm run dev
```

Expected: Hero section renders with staggered fade-in text, subtitle, download buttons, and a phone mockup placeholder.

```bash
git add -A
git commit -m "feat: add HeroSection with staggered animations"
```

---

## Task 4: Section 2 — Risk Warning

**Files:**
- Create: `src/components/sections/RiskWarningSection.tsx`

- [ ] **Step 4.1: Create RiskWarningSection**

Create `src/components/sections/RiskWarningSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function RiskWarningSection() {
  const t = useTranslations("risk");

  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-danger-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-danger-500" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {t("penalty")}
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-danger-600">
                <CountUp target={20} suffix="%" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-2xl border border-danger-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-danger-500" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  {t("criminal")}
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {t("example")}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-danger-600 mt-1">
                {t("exampleResult")}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-slate-400">
            {t("source")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.2: Add to page and commit**

Add `import RiskWarningSection from "@/components/sections/RiskWarningSection";` to page.tsx and add `<RiskWarningSection />` after HeroSection.

```bash
git add -A
git commit -m "feat: add RiskWarningSection with count-up animation"
```

---

## Task 5: Section 3 — Self-Diagnosis

**Files:**
- Create: `src/components/sections/SelfDiagnosisSection.tsx`

- [ ] **Step 5.1: Create SelfDiagnosisSection**

Create `src/components/sections/SelfDiagnosisSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckSquare } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function SelfDiagnosisSection() {
  const t = useTranslations("diagnosis");
  const items: string[] = t.raw("items");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="max-w-xl mx-auto space-y-5">
          {items.map((item: string, i: number) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 bg-amber-50/50 border border-amber-200/50 rounded-xl p-5"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.3 + 0.2 }}
              >
                <CheckSquare className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
              </motion.div>
              <span className="text-base sm:text-lg text-slate-700">
                {item}
              </span>
            </motion.div>
          ))}

          <motion.p
            className="text-center text-lg font-semibold text-amber-700 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: items.length * 0.3 + 0.2 }}
          >
            {t("conclusion")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2: Add to page and commit**

Add to page.tsx after RiskWarningSection.

```bash
git add -A
git commit -m "feat: add SelfDiagnosisSection with scroll-triggered checkmarks"
```

---

## Task 6: Section 4 — Relief Transition

**Files:**
- Create: `src/components/sections/ReliefSection.tsx`

- [ ] **Step 6.1: Create ReliefSection**

Create `src/components/sections/ReliefSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";

export default function ReliefSection() {
  const t = useTranslations("relief");

  return (
    <section className="py-28 sm:py-36 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-content mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-6">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-lg sm:text-xl text-slate-500 max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.2: Add to page and commit**

```bash
git add -A
git commit -m "feat: add ReliefSection transition"
```

---

## Task 7: Section 5 — Exchange + Asset (Scroll Frame Sequence)

**Files:**
- Create: `src/components/ScrollFrameSequence.tsx`, `src/components/sections/ExchangeAssetSection.tsx`
- Create: `public/images/mockup/` directory with placeholder frames
- Create: `public/images/exchanges/` directory with exchange logo SVGs

- [ ] **Step 7.1: Create exchange logo SVG placeholders**

```bash
mkdir -p public/images/exchanges public/images/mockup
```

Create `public/images/exchanges/Binance.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
  <rect width="120" height="40" rx="8" fill="#F3BA2F" fill-opacity="0.1"/>
  <text x="60" y="24" text-anchor="middle" fill="#F3BA2F" font-family="system-ui" font-size="14" font-weight="700">Binance</text>
</svg>
```

Create `public/images/exchanges/Bybit.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
  <rect width="120" height="40" rx="8" fill="#F7A600" fill-opacity="0.1"/>
  <text x="60" y="24" text-anchor="middle" fill="#F7A600" font-family="system-ui" font-size="14" font-weight="700">Bybit</text>
</svg>
```

Create `public/images/exchanges/OKX.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
  <rect width="120" height="40" rx="8" fill="#000000" fill-opacity="0.05"/>
  <text x="60" y="24" text-anchor="middle" fill="#000000" font-family="system-ui" font-size="14" font-weight="700">OKX</text>
</svg>
```

Create `public/images/exchanges/Coinbase.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
  <rect width="120" height="40" rx="8" fill="#0052FF" fill-opacity="0.1"/>
  <text x="60" y="24" text-anchor="middle" fill="#0052FF" font-family="system-ui" font-size="14" font-weight="700">Coinbase</text>
</svg>
```

- [ ] **Step 7.2: Generate placeholder mockup frames**

Create a script to generate simple placeholder frames. These will be replaced with real screenshots later.

```bash
# Create 30 placeholder WebP-compatible PNGs (frame-001 to frame-030)
# Using simple numbered placeholder images
for i in $(seq -w 1 30); do
  cat > "public/images/mockup/frame-${i}.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="375" height="812" viewBox="0 0 375 812" fill="none">
  <rect width="375" height="812" rx="20" fill="#F8FAFC"/>
  <rect x="16" y="60" width="343" height="60" rx="12" fill="#EEF2FF"/>
  <rect x="16" y="140" width="343" height="200" rx="12" fill="#E0E7FF"/>
  <rect x="16" y="360" width="160" height="80" rx="12" fill="#F1F5F9"/>
  <rect x="192" y="360" width="167" height="80" rx="12" fill="#F1F5F9"/>
  <rect x="16" y="460" width="343" height="120" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
SVGEOF
done
```

Note: In production, these will be replaced with actual PNG/WebP app screenshots. The ScrollFrameSequence component reads from an array of image paths, so swapping is trivial.

- [ ] **Step 7.3: Create ScrollFrameSequence component**

Create `src/components/ScrollFrameSequence.tsx`:

```typescript
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ScrollFrameSequenceProps {
  frames: string[];
  className?: string;
}

export default function ScrollFrameSequence({
  frames,
  className = "",
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      const frameIndex = Math.min(
        frames.length - 1,
        Math.floor(progress * frames.length)
      );
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${frames.length * 60 + 100}vh` }}
    >
      <div className="sticky top-1/2 -translate-y-1/2 flex justify-center">
        <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[660px] bg-slate-900 rounded-[40px] p-3 shadow-2xl">
          <div className="w-full h-full rounded-[32px] overflow-hidden bg-slate-100 relative">
            {frames.map((frame, i) => (
              <Image
                key={frame}
                src={frame}
                alt={`App screen ${i + 1}`}
                fill
                className={`object-cover transition-opacity duration-200 ${
                  i === currentFrame ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7.4: Create ExchangeAssetSection**

Create `src/components/sections/ExchangeAssetSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";

const EXCHANGE_LOGOS = [
  "/images/exchanges/Binance.svg",
  "/images/exchanges/Bybit.svg",
  "/images/exchanges/OKX.svg",
  "/images/exchanges/Coinbase.svg",
];

// Replace these with actual app screenshot paths
const MOCKUP_FRAMES = Array.from(
  { length: 30 },
  (_, i) => `/images/mockup/frame-${String(i + 1).padStart(2, "0")}.svg`
);

export default function ExchangeAssetSection() {
  const t = useTranslations("exchange");

  return (
    <section className="bg-slate-50">
      {/* Exchange logos intro */}
      <div className="py-24 sm:py-32">
        <div className="max-w-content mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-slate-500 mb-12">{t("subtitle")}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {EXCHANGE_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 px-6 py-3 shadow-sm"
                >
                  <Image
                    src={logo}
                    alt={t(`exchanges.${i}`)}
                    width={120}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll frame sequence — app walkthrough */}
      <ScrollFrameSequence frames={MOCKUP_FRAMES} />
    </section>
  );
}
```

- [ ] **Step 7.5: Add to page and commit**

```bash
git add -A
git commit -m "feat: add ExchangeAssetSection with scroll frame sequence"
```

---

## Task 8: Section 6 — Process 3-Step

**Files:**
- Create: `src/components/sections/ProcessSection.tsx`

- [ ] **Step 8.1: Create ProcessSection**

Create `src/components/sections/ProcessSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, Eye, UserCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const STEP_ICONS = [Link2, Eye, UserCheck];

export default function ProcessSection() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div
          ref={containerRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4"
        >
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={i} className="flex items-center gap-4 sm:gap-4">
                <motion.div
                  className="flex flex-col items-center text-center w-48"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.25 }}
                >
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="text-sm font-bold text-primary-600 mb-1">
                    Step {step.number}
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-1">
                    {step.title}
                  </div>
                  <div className="text-sm text-slate-500">
                    {step.description}
                  </div>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden sm:block w-12 h-0.5 bg-primary-200"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.25 + 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8.2: Add to page and commit**

```bash
git add -A
git commit -m "feat: add ProcessSection with sequential step animation"
```

---

## Task 9: Section 7 — Trust

**Files:**
- Create: `src/components/sections/TrustSection.tsx`

- [ ] **Step 9.1: Create TrustSection**

Create `src/components/sections/TrustSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { UserCheck, ShieldCheck, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BADGE_ICONS = [UserCheck, ShieldCheck, Target];

export default function TrustSection() {
  const t = useTranslations("trust");
  const badges = t.raw("badges") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-slate-500 text-center mb-16">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i];
            return (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center h-full">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 9.2: Add to page and commit**

```bash
git add -A
git commit -m "feat: add TrustSection with trust badges"
```

---

## Task 10: Section 8 — FAQ

**Files:**
- Create: `src/components/sections/FAQSection.tsx`

- [ ] **Step 10.1: Create FAQSection**

Create `src/components/sections/FAQSection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-slate-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-slate-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem question={item.question} answer={item.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 10.2: Add to page and commit**

```bash
git add -A
git commit -m "feat: add FAQSection with accordion animation"
```

---

## Task 11: Section 9 — Final CTA + Footer

**Files:**
- Create: `src/components/sections/FinalCTASection.tsx`, `src/components/Footer.tsx`

- [ ] **Step 11.1: Create FinalCTASection**

Create `src/components/sections/FinalCTASection.tsx`:

```typescript
"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButtons from "@/components/AppDownloadButtons";

export default function FinalCTASection() {
  const t = useTranslations("finalCta");

  return (
    <section
      id="download"
      className="py-28 sm:py-36 bg-gradient-to-b from-primary-50/50 to-white"
    >
      <div className="max-w-content mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-4">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg text-slate-500 mb-10">{t("subtitle")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <AppDownloadButtons size="lg" className="justify-center" />
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 11.2: Create Footer**

Create `src/components/Footer.tsx`:

```typescript
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-content mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-semibold text-sm mb-1">
              {t("companyName")}
            </div>
            <div className="text-xs">{t("copyright")}</div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              {t("terms")}
            </a>
            <a
              href="https://x.com/zkap_baerae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href="https://medium.com/baerae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Medium
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 11.3: Add to page and commit**

```bash
git add -A
git commit -m "feat: add FinalCTASection and Footer"
```

---

## Task 12: Assemble Full Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 12.1: Wire all sections together**

Replace `src/app/[locale]/page.tsx`:

```typescript
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RiskWarningSection from "@/components/sections/RiskWarningSection";
import SelfDiagnosisSection from "@/components/sections/SelfDiagnosisSection";
import ReliefSection from "@/components/sections/ReliefSection";
import ExchangeAssetSection from "@/components/sections/ExchangeAssetSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <RiskWarningSection />
        <SelfDiagnosisSection />
        <ReliefSection />
        <ExchangeAssetSection />
        <ProcessSection />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 12.2: Run dev server and verify full page**

```bash
npm run dev
```

Walk through the entire page:
1. Header sticks at top with language toggle
2. Hero fades in with staggered text + mockup
3. Risk cards with count-up animation
4. Checkmarks animate in on scroll
5. Relief section — clean typographic break
6. Exchange logos → scroll frame sequence in phone mockup
7. 3-step process with sequential animation
8. Trust badges grid
9. FAQ accordion opens/closes
10. Final CTA with download buttons
11. Footer with links

- [ ] **Step 12.3: Commit**

```bash
git add -A
git commit -m "feat: assemble all sections into full landing page"
```

---

## Task 13: GA4 Analytics

**Files:**
- Create: `src/lib/ga.ts`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 13.1: Create GA4 utility**

Create `src/lib/ga.ts`:

```typescript
import ReactGA from "react-ga4";

const GA_ID = "G-2TB2G9PKB0";

export function initGA() {
  ReactGA.initialize(GA_ID);
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: "pageview", page: path });
}
```

- [ ] **Step 13.2: Create GA4 provider component**

Create `src/components/GAProvider.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGA, trackPageView } from "@/lib/ga";

export default function GAProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
```

- [ ] **Step 13.3: Add GAProvider to locale layout**

In `src/app/[locale]/layout.tsx`, add:

```typescript
import GAProvider from "@/components/GAProvider";
```

And inside the body, before `{children}`:

```typescript
<GAProvider />
```

- [ ] **Step 13.4: Commit**

```bash
git add -A
git commit -m "feat: add GA4 analytics tracking"
```

---

## Task 14: Build Verification & Polish

**Files:**
- Modify: various files for fixes found during build

- [ ] **Step 14.1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Fix any TypeScript or build errors.

- [ ] **Step 14.2: Run linter**

```bash
npm run lint
```

Expected: No errors. Fix any lint issues.

- [ ] **Step 14.3: Test responsive breakpoints**

```bash
npm run dev
```

Check in browser at these widths:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)

Verify all sections render correctly at each breakpoint.

- [ ] **Step 14.4: Add .superpowers to .gitignore**

Append to `.gitignore`:

```
# Superpowers brainstorm files
.superpowers/
```

- [ ] **Step 14.5: Final commit**

```bash
git add -A
git commit -m "chore: build verification, responsive polish, update .gitignore"
```

- [ ] **Step 14.6: Verify final build**

```bash
npm run build
```

Expected: Clean build with no warnings or errors. The `out/` or `.next/` directory contains the production build ready for deployment.

---

## Summary

| Task | Section | Key Feature |
|------|---------|-------------|
| 0 | Scaffold | Next.js + Tailwind + Framer Motion setup |
| 1 | i18n | next-intl with ko/en translations |
| 2 | Shared | Header, ScrollReveal, AppDownloadButtons |
| 3 | Hero | Staggered fade-in, phone mockup |
| 4 | Risk Warning | Count-up animation, danger cards |
| 5 | Self-Diagnosis | Scroll-triggered checkmarks |
| 6 | Relief | Typographic break, gradient transition |
| 7 | Exchange + Asset | Scroll frame sequence, exchange logos |
| 8 | Process | 3-step sequential animation |
| 9 | Trust | Trust badge grid |
| 10 | FAQ | Accordion with AnimatePresence |
| 11 | Final CTA + Footer | Download CTA, company info |
| 12 | Assembly | Wire all sections together |
| 13 | Analytics | GA4 tracking |
| 14 | Polish | Build verification, responsive check |
