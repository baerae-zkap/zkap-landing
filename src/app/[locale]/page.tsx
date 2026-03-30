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
