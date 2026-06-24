import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://baerae.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ko`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
