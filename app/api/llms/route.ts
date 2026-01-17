import { NextRequest, NextResponse } from "next/server"; 
import { FeedProps } from "@/app/types";
      const articlesFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       articles (first:200) {
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
       .then(data => data.data.articles.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }

 const contentFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       posts(first:500) {
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
       .then(data => data.data.posts.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   }
export async function GET(req: NextRequest) {
  const baseUrl = "https://culturays.com";  

  // Top-level static pages
  let urls = [
    `${baseUrl}/`,
    `${baseUrl}/about/`,
    `${baseUrl}/contact/`,
    `${baseUrl}/news/`,
    `${baseUrl}/nigeria/` 
  ]; 
 const articles_news:FeedProps[] = await articlesFeed()
 const postsData:FeedProps[]=await contentFeed() 
 
  if (articles_news?.length) {
    urls = urls.concat(
      articles_news.map(
        (p) => `${baseUrl}/news/${p.slug}/`
      )
    );
  }
 if (postsData?.length) {
    urls = urls.concat(
      postsData.map(
        (p) => `${baseUrl}/news/${p.slug}/`
      )
    );
  }
  //const body = urls.join("\n");url: `https://culturays.com/news/topic/${post.slug}/`,
  const body = [
    '# Culturays | News in Nigeria',
    '',
    '> Short summary: This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
    '',
    `Primary contact: ${baseUrl}/contact/`,
    '',
    '## Core Documentation',
    `- [Home](${baseUrl}/)`,
    `- [About](${baseUrl}/about/)`,
    `- [News](${baseUrl}/news/)`,
    '',
    `## Sitemaps`,
    `- ${baseUrl}/sitemap.xml`,
    `- ${baseUrl}/api/forum`,
    `- ${baseUrl}/api/naija-wiki-news`,
    `- ${baseUrl}/api/news-sitemap`,
    `- ${baseUrl}/api/sitemap`,
    `- ${baseUrl}/api/videos`,
    `- ${baseUrl}/naija-wiki/sitemap.xml`,
    `- ${baseUrl}/topic/sitemap.xml`,
     "",
    "## Dynamic News",
    ...urls
  ].join('\n');

 
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
 
 
}