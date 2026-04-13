"use client";

import { useTranslations } from "next-intl";
import { Phone, MessageSquare, BadgeCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type TaxAgent = {
  id: string;
  name: string;
  firm: string;
  badge: string;
  bio: string;
  phone: string;
  sms: string;
  kakao: string;
};

type TaxAgentCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  agentSuffix: string;
  agents: TaxAgent[];
  kakao: string;
  sms: string;
  call: string;
  trust: string[];
};

function AgentCard({ agent, copy }: { agent: TaxAgent; copy: TaxAgentCopy }) {
  // Generate initials fallback from agent name (first char only)
  const initial = agent.name.trim().charAt(0);

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white border border-primary-100 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(51,61,75,0.15)] hover:border-primary-200">
      {/* Badge */}
      <div className="inline-flex items-center self-start gap-1 px-3 py-1 text-[11px] font-bold text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-5">
        <BadgeCheck className="w-3 h-3" />
        <span>{agent.badge}</span>
      </div>

      {/* Profile image placeholder */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 border border-primary-100 mb-5 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-primary-400 select-none">
          {initial}
        </span>
        {/* Subtle "사진 영역" hint marker (dev mockup) */}
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-primary-200" aria-hidden />
      </div>

      {/* Name + firm */}
      <div className="mb-3">
        <h3 className="text-xl sm:text-2xl font-bold text-primary-600 leading-tight">
          {agent.name} <span className="text-primary-400 font-medium text-base">{copy.agentSuffix}</span>
        </h3>
        <p className="text-sm text-primary-500 mt-1">{agent.firm}</p>
      </div>

      {/* Bio */}
      <p className="text-[14px] sm:text-[15px] text-primary-500 leading-relaxed mb-6 flex-1">
        {agent.bio}
      </p>

      {/* Divider */}
      <div className="border-t border-primary-100 -mx-6 sm:-mx-7 mb-4" />

      {/* Phone number line */}
      <p className="text-xs text-primary-400 mb-3 font-mono tracking-tight">{agent.phone}</p>

      {/* CTA buttons */}
      <div className="grid grid-cols-3 gap-2">
        <a
          href={agent.kakao}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#FEE500] text-[#3C1E1E] text-[12px] font-bold transition-transform active:scale-95 hover:brightness-95"
        >
          <KakaoIcon className="w-4 h-4" />
          <span>{copy.kakao}</span>
        </a>
        <a
          href={`sms:${agent.sms}`}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary-50 text-primary-600 text-[12px] font-bold border border-primary-100 transition-transform active:scale-95 hover:bg-primary-100"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{copy.sms}</span>
        </a>
        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary-600 text-white text-[12px] font-bold transition-transform active:scale-95 hover:bg-primary-700"
        >
          <Phone className="w-4 h-4" />
          <span>{copy.call}</span>
        </a>
      </div>
    </div>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.79 1.87 5.23 4.67 6.6-.2.73-.73 2.71-.84 3.13-.13.52.19.51.4.37.17-.11 2.67-1.81 3.75-2.55.67.1 1.36.15 2.02.15 5.52 0 10-3.48 10-7.8S17.52 3 12 3z" />
    </svg>
  );
}

export default function TaxAgentSection() {
  const t = useTranslations("taxAgent");
  const copy: TaxAgentCopy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    subtitle: t("subtitle"),
    agentSuffix: t("agentSuffix"),
    agents: t.raw("agents") as TaxAgent[],
    kakao: t("kakao"),
    sms: t("sms"),
    call: t("call"),
    trust: t.raw("trust") as string[],
  };

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-primary-50/40">
      <div className="max-w-content mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 text-xs font-bold text-primary-600 bg-white border border-primary-200 rounded-full mb-5">
              {copy.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600 leading-tight mb-4">
              {copy.title}
            </h2>
            <p className="text-base sm:text-lg text-primary-500 max-w-2xl mx-auto leading-relaxed">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {copy.agents.map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.12}>
              <AgentCard agent={agent} copy={copy} />
            </ScrollReveal>
          ))}
        </div>

        {/* Trust strip */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-12 text-xs sm:text-sm text-primary-400">
            {copy.trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-primary-500" />
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
