 
import { newsbyComingtoCategory, newsbyNewOnCategory } from "@/app/netflix-naija/netflix-news";
import { FeedProps } from "@/app/types";
import { NextResponse } from 'next/server';
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

  
  export async function GET() { 
       const netflix__News:FeedProps[] = await newsbyNewOnCategory([]) 
            const coming_to_netflix_naija:FeedProps[] = await newsbyComingtoCategory([]) 
            const netflixFeed =netflix__News?.map((ex)=> ex.node.naijaOnNetflix.edges).flat() 
            const netflixFeed2 =coming_to_netflix_naija?.map((ex)=> ex.node.naijaOnNetflix.edges).flat()  
    
    const content_posts: Post[] = netflixFeed.map((post) => ({
      url: `https://culturays.com/new-on-netflix/${post.node.slug}/`,
      lastModified: new Date(post.node.date),
      changeFrequency: 'always',
      priority: 0.8,
      images: [post?.node?.featuredImage?.node?.sourceUrl],
      news: [
        {
          publication: {
          name: 'Urban Naija News',
          language: 'en',
        },
          publication_date: new Date(post.node.date).toISOString(),
          article_title: post.node.title,
        },
      ],
    })); 
    const content2_posts: Post[] = netflixFeed2.map((post) => ({
        url: `https://culturays.com/coming-to-netflix/${post.node.slug}/`,
        lastModified: new Date(post.node.date),
        changeFrequency: 'always',
        priority: 0.8,
        images: [post?.node?.featuredImage?.node?.sourceUrl],
        news: [
          {
            publication: {
              name: 'Urban Naija News',
              language: 'en',
            },
            publication_date: new Date(post.node.date).toISOString(),
            article_title: post.node.title,
          },
        ],
      }));
    
  
  const allPosts = [...content_posts, ...content2_posts]; 
  const xml = generateNewsSitemap(allPosts);
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    } );
  }
