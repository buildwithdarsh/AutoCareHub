import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/mechanic", "/garage", "/history", "/tracking"],
    },
    sitemap: "https://autocarehub.in/sitemap.xml",
  };
}
