 import { NextResponse } from 'next/server';  
 import { FeedProps } from '@/app/types';
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
   const vidFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       videos  {
       nodes {
         date
         contentTypeName 
           id
           title
           slug 
            author {
           node {
             name
             slug
           }
         }
               featuredImage {
           node {
             altText
             sourceUrl
           }
         }
         }  
       }
      }`})
       
       }).then(response => response.json())   
       .then(data => data.data.videos.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
 const generateVidSitemap = (content_posts: Post[]) => {
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
   
        return ` <url>
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
     ${
            post.videos?.map(
              (vid) => `<video:video><video:thumbnail_loc>${vid.thumbnail_loc}</video:thumbnail_loc><video:title>${vid.title}</video:title><video:description>${vid.description}</video:description></video:video>`
            ).join('\n') || ''
          }
  
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
   const videoData:FeedProps[]=await vidFeed()   
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string?.replace(regex, "");
    return newString
     }
     
    const dataVideo = videoData.map((post)=>({
        title:post.title,
        url:`https://culturays.com/news/video/${post.slug}/`,
        lastModified:new Date(post.date),
        changeFrequency:'always', 
        priority:0.8,
        news: [
            {
              publication: {
                name: 'Urban Naija News | Videos',
                language: 'en',
              },
              publication_date: new Date(post.date).toISOString(),
              article_title: post.title,
            },
          ],
        videos: [
         {
           title: post.title,
           thumbnail_loc: post.featuredImage.node.sourceUrl,
           description: replaceHTMLTags(post.excerpt) ,
         },
       ],

     }) )  
  const xml = generateVidSitemap(dataVideo);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  } ) ;
}