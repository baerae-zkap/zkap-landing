import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import RiskWarningSection from "@/components/sections/RiskWarningSection";
import SelfDiagnosisSection from "@/components/sections/SelfDiagnosisSection";
import ReliefSection from "@/components/sections/ReliefSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <RiskWarningSection />
        <SelfDiagnosisSection />
        <ReliefSection />
      </main>
    </>
  );
}
