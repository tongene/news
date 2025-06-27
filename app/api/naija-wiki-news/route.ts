import { netflixNews } from "@/app/netflix-naija/netflix-news";
import { FeedProps } from "@/app/types";
import { NextResponse } from 'next/server';  
const generateNewsSitemap = (content_posts: Post[]) => {
    const xmlContent = content_posts
      .map((post) => {
        const news =  post?.news[0]; 
   const escapeXml =(unsafe: string)=>   
      unsafe
        ?.replace(/&/g, "&amp;")
        ?.replace(/</g, "&lt;")
        ?.replace(/>/g, "&gt;")
        ?.replace(/"/g, "&quot;")
        ?.replace(/'/g, "&apos;")
        // ?.replace(/á/g,'')
        //  'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
        // 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        // 'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        // 'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
        // 'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        // 'ç': 'c', 'ñ': 'n',
        // '%20': ' ', '@': '', '#': '', '!': '', ',': '', '.': '', '_': ' ',  
      
        return  `
  <url>
    <loc>${post.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(news.publication?.name)}</news:name>
        <news:language>${news.publication?.language}</news:language>
      </news:publication>
      <news:publication_date>${news.publication_date}</news:publication_date>
      <news:title>${escapeXml(news.article_title)}</news:title>
    </news:news>
    ${post.images?.map((img) => `<image:image><image:loc>${img}</image:loc></image:image>`).join('\n') || ''}
  
    <lastmod>${post.lastModified.toISOString()}</lastmod>
    <changefreq>${post.changeFrequency}</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
      })
      .join('\n');
  
    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${xmlContent}
  </urlset>`;
  };
  type Post = {
    url: string;
    lastModified: Date;
    changeFrequency: string;
    priority: number;
    images?: string[];
    videos?:  {
      title: string,
      thumbnail_loc: string,
      description:  string,    
    }[];
    news: {
      publication: { name: string; language: string };
      publication_date: string;
      article_title: string;
    }[];
  };
  
  export async function GET() { 
  const netflix_News:FeedProps[] = await netflixNews() 
  const news_blog =netflix_News?.map((ex)=> ex?.node.naijaOnNetflix).map((xy)=> (xy?.nodes??{})).flat()
 
    const content_posts: Post[] = news_blog.map((post) => ({ 
      url: `https://culturays.com/netflix-naija/news/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'always',
      priority: 0.8,
      images: [post?.featuredImage?.node?.sourceUrl],
      news: [
        {
          publication: {
          name: 'Urban Naija News',
          language: 'en',
        },
          publication_date: new Date(post.date).toISOString(),
          article_title: post.title,
        },
      ],
    })); 
   
  const xml = generateNewsSitemap(content_posts);
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    } );
  }
