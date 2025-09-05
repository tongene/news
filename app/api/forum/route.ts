import { NextResponse } from 'next/server';  
import { FeedProps, PostProps } from '@/app/types'; 
import { getPosts } from '@/app/forum/actions/loadPosts';
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
const generateNewsSitemap = (content_posts:Post[]) => {
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

  <lastmod>${new Date(post.lastModified).toISOString()}</lastmod>
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
    const initialPostsD = await getPosts(0, 20)
    const escapeXml =(unsafe: string)=>   
        unsafe
          ?.replace(/&/g, "&amp;")
          ?.replace(/</g, "&lt;")
          ?.replace(/>/g, "&gt;")
          ?.replace(/"/g, "&quot;")
          ?.replace(/'/g, "&apos;")
          ?.replace(/-/g, " ")
  const content_posts =(initialPostsD as PostProps[]).map((post) => ({
    url: `https://culturays.com/forum/post/${post.slug}/${post.id}/`,
    lastModified: new Date(post.created_at as string),
    changeFrequency: 'always',
    priority: 0.8,
    images:  [`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${(post?.files as PostProps[])[0]}`||'/culturays.png'], 
    news: [
      {
          publication: {
          name: 'Urban Naija News',
          language: 'en',
        },
        publication_date: new Date(post.created_at  as string).toISOString(),
        article_title: post.title || escapeXml(post.article_title?.toUpperCase() as string),
      },
    ],
  }));
  

const xml = generateNewsSitemap(content_posts as Post[]);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  } );
}