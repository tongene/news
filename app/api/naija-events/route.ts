import { NextResponse } from 'next/server';  
import { EventsProps, FeedProps } from '@/app/types';
import { createClient } from '@/utils/supabase/server';

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
 
 const forumEvents =async ()=>{
 const supabase =await createClient()  
 const today = new Date()
 const monthName = today.toLocaleString('default', { month: 'long' })  
 const { data: events, error } = await supabase
   .from('events')
   .select('*')  
 if (error) {
     throw new Error(error.message) 
  }
    const since = new Date(Date.now() - 24 * 60 * 60 * 5000).toISOString();
    await supabase.from('events').delete().lte('created_at', since);
 return events
     
 }
 
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
  const eventFeed:EventsProps[]=await forumEvents()  
 
  const events_posts = eventFeed.map((post) => ({
    url: `https://culturays.com/event/${post.slug}/`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'always',
    priority: 0.8,
    images: [`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${post.img_url}`],
    news: [
      {
        publication: {
          name: 'Urban Naija News',
          language: 'en',
        },
        publication_date: new Date(post.created_at).toISOString(),
        article_title: post.title,
      },
    ],
  })); 

 
 
const xml = generateNewsSitemap(events_posts);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  } );
}