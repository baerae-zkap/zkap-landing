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
