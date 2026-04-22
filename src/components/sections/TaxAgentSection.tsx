"use client";

import { useTranslations } from "next-intl";
import { Phone, MessageSquare, BadgeCheck, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type TaxAgent = {
  id: string;
  name: string;
  title: string;
  firm: string;
  badge: string;
  bio: string;
  image: string;
  phone: string;
  sms: string;
  kakao?: string;
  blog?: string;
  website?: string;
  contact?: string;
};

type TaxAgentCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  agents: TaxAgent[];
  kakao: string;
  blog: string;
  website: string;
  sms: string;
  call: string;
  trust: string[];
  disclaimer: string;
};

function AgentCard({ agent, copy }: { agent: TaxAgent; copy: TaxAgentCopy }) {
  return (
    <div className="group relative flex flex-col h-full rounded-3xl bg-white border border-primary-100 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(51,61,75,0.15)] hover:border-primary-200">
      {/* Badge */}
      <div className="inline-flex items-center self-start gap-1 px-3 py-1 text-[11px] font-bold text-primary-600 bg-primary-50 border border-primary-100 rounded-full mb-5">
        <BadgeCheck className="w-3 h-3" />
        <span>{agent.badge}</span>
      </div>

      {/* Profile image */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 border border-primary-100 mb-5">
        <img
          src={agent.image}
          alt={`${agent.name} ${agent.title}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Name + firm */}
      <div className="mb-3">
        <h3 className="text-xl sm:text-2xl font-bold text-primary-600 leading-tight">
          {agent.name} <span className="text-primary-400 font-medium text-base">{agent.title}</span>
        </h3>
        <p className="text-sm text-primary-500 mt-1">{agent.firm}</p>
      </div>

      {/* Bio */}
      <p className="text-[14px] sm:text-[15px] text-primary-500 leading-relaxed mb-6 flex-1">
        {agent.bio}
      </p>

      {/* Divider */}
      <div className="border-t border-primary-100 -mx-6 sm:-mx-7 mb-4" />

      {/* CTA buttons */}
      <div className={`grid gap-2 ${agent.kakao || agent.blog || agent.website ? "grid-cols-3" : "grid-cols-2"}`}>
        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary-600 text-white text-[12px] font-bold transition-transform active:scale-95 hover:bg-primary-700"
        >
          <Phone className="w-4 h-4" />
          <span>{copy.call}</span>
        </a>
        <a
          href={`sms:${agent.sms}`}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary-50 text-primary-600 text-[12px] font-bold border border-primary-100 transition-transform active:scale-95 hover:bg-primary-100"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{copy.sms}</span>
        </a>
        {agent.kakao ? (
          <a
            href={agent.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#FEE500] text-[#3C1E1E] text-[12px] font-bold transition-transform active:scale-95 hover:brightness-95"
          >
            <KakaoIcon className="w-4 h-4" />
            <span>{copy.kakao}</span>
          </a>
        ) : agent.blog ? (
          <a
            href={agent.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#E9F6EE] text-[#03C75A] text-[12px] font-bold border border-[#C8E6D0] transition-transform active:scale-95 hover:bg-[#D9F0E1]"
          >
            <NaverBlogIcon className="w-4 h-4" />
            <span>{copy.blog}</span>
          </a>
        ) : agent.website ? (
          <a
            href={agent.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-[#EEF2F7] text-[#4A6FA5] text-[12px] font-bold border border-[#D4DDE9] transition-transform active:scale-95 hover:bg-[#E2E9F1]"
          >
            <Globe className="w-4 h-4" />
            <span>{copy.website}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

function NaverBlogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-3 -3 30 30" fill="currentColor" aria-hidden>
      <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845Z" />
    </svg>
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
    agents: t.raw("agents") as TaxAgent[],
    kakao: t("kakao"),
    blog: t("blog"),
    website: t("website"),
    sms: t("sms"),
    call: t("call"),
    trust: t.raw("trust") as string[],
    disclaimer: t("disclaimer"),
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
            <p className="whitespace-pre-line text-base sm:text-lg text-primary-500 max-w-2xl mx-auto leading-relaxed">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {copy.agents.map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.12} className="h-full">
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

        {/* Regulatory disclaimer */}
        <ScrollReveal delay={0.5}>
          <p className="whitespace-pre-line mt-6 text-[11px] sm:text-xs text-primary-400/80 leading-relaxed text-center max-w-2xl mx-auto px-4">
            {copy.disclaimer}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
