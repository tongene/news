import { MetadataRoute } from "next";
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots>  {
  // const res = await fetch(
  //   `https://content.culturays.com/robots.txt`,
  //   { cache: "no-store" },
  // );

  // const text = await res.text();

  // const lines = text.split("\n");

  // const userAgent = lines
  //   .find((line) => line.startsWith("User-agent: "))
  //   ?.replace("User-agent: ", "");
  // const allow = lines
  //   .find((line) => line.startsWith("Allow: "))
  //   ?.replace("Allow: ", "");
  // const disallow = lines
  //   .find((line) => line.startsWith("Disallow: "))
  //   ?.replace("Disallow: ", "");
  // const sitemap = lines
  //   .find((line) => line.startsWith("Sitemap: "))
  //   ?.replace("Sitemap: ", "");
    return {
      rules: {
        userAgent: '*', 
        allow: '/',
        disallow:[ '/privacy-policy/','/rss-home/', "/404", "/sign-in/"]
      },
      sitemap:['https://culturays.com/sitemap.xml/','https://culturays.com/api/forum/', 'https://culturays.com/api/naija-wiki-news/','https://culturays.com/api/netflix-naija-news/', 'https://culturays.com/api/news-sitemap/','https://culturays.com/api/sitemap/','https://culturays.com/api/videos/' , 'https://culturays.com/naija-wiki/sitemap.xml/','https://culturays.com/topic/sitemap.xml/']
      
    }
  } 