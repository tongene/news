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
 const contentFeed = async()=>{  
     const wprest =fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{ 
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `query CONTENTFEED{
        contentNodes(first:100) {
        nodes {
          date
          contentTypeName
           ... on NetflixNaija {
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
  
              ... on Live {
             id
              databaseId
            title
            slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
            author {
            node {
            name
              slug
            }
        }
            }
          ... on Technology {
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
          }   ... on Video {
             id
            title
            slug
            excerpt
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
          }   ... on Post {
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
          }   ... on Nollywood {
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
          }    ... on Article {
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
          }    ... on Society {
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
          }  ... on Health {
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
          }  ... on Economy {
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
          }  ... on Trending {
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
          }  ... on Environment {
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
          
           ... on Char {
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
          ... on Business {
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
      }
          
          }`})
        
        }).then(response => response.json())   
        .then(data => data.data.contentNodes.nodes )
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data.contentNodes.nodes 
        return wprest 
    
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
 
   return`<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" >
${xmlContent}
</urlset>`;
 };
 
 export async function GET() { 
   const contentData:FeedProps[]=await contentFeed() 
   const dataFeed= contentData?.filter((xy)=> xy.contentTypeName !== 'post')?.filter((xy)=> xy.contentTypeName !== 'anticpated-nollywood')?.filter((xy)=> xy.contentTypeName !== 'anticpated-african')?.filter((xy)=> xy.contentTypeName !== 'anticpated-foreign')?.filter((xy)=> xy.contentTypeName !== 'netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'what-to-watch').filter((xy)=> xy.contentTypeName !== 'list-netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'char')?.filter((xy)=> xy.contentTypeName !== 'naija-wiki')?.filter((xy)=> xy.contentTypeName !== 'latest')?.filter((xy)=> xy.contentTypeName !== 'outline')?.filter((xy)=> xy.contentTypeName!== 'page').filter((xy)=> xy.contentTypeName!== 'live').filter((xy)=> xy.contentTypeName!== 'added-netflix-naija')  

   const content_posts: Post[] = dataFeed.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}`,
     lastModified: new Date(post.date),
     changeFrequency: 'always',
     priority: 0.8,
     images: [post.featuredImage.node.sourceUrl],
     news: [
       {
         publication: {
           name: 'Culturays News',
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
   } ) ;
 }