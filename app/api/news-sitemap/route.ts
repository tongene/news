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
  const businessFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       businesses  {
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
       .then(data => data.data.businesses.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
    const ecoFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       economies  {
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
       .then(data => data.data.economies.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
    const envFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       environments  {
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
       .then(data => data.data.environments.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
    const techFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       technologies  {
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
       .then(data => data.data.technologies.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }

    const societyFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       societies {
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
       .then(data => data.data.societies.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }

    const nolFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       nollywoods  {
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
       .then(data => data.data.nollywoods.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }

    const awFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       awards  {
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
       .then(data => data.data.awards.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
    const trendFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       trends {
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
       .then(data => data.data.trends.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
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
     const heFeed = async()=>{  
    const wprest =fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{ 
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query: `query CONTENTFEED{
       healths  {
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
       .then(data => data.data.healths.nodes )
       .catch(error => console.error('Error:', error));
      // const response = wprest?.data.contentNodes.nodes 
       return wprest 
   
   }
 const generateNewsSitemap = (content_posts: Post[]) => {
   
   const xmlContent = content_posts
     .map((post) => {  
       const news = post?.news[0]; 
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

  const business_news:FeedProps[] = await businessFeed()  
  const ec_news:FeedProps[] = await ecoFeed()  
  const env_news:FeedProps[] = await envFeed()  
  const tech_news:FeedProps[] = await techFeed()  
  const aw_news:FeedProps[] = await awFeed()  
  const nol_news:FeedProps[] = await nolFeed()  
  const soc_news:FeedProps[] = await societyFeed()  
  const trend_news:FeedProps[] = await trendFeed()  
  const vid_news:FeedProps[] = await vidFeed()  
  const he_news:FeedProps[] = await heFeed()

   const bix_posts: Post[] = business_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
      const ec_posts: Post[] = ec_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
  
      const tex_posts: Post[] = tech_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
 
   const tr_posts: Post[] = trend_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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

      const vid_posts: Post[] = vid_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
      const aw_posts: Post[] = aw_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
      const nol_posts: Post[] = nol_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
const he_posts: Post[] = he_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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

const env_posts: Post[] = env_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
   
   const soc_posts: Post[] = soc_news.map((post) => ({
     url: `https://culturays.com/news/${post.contentTypeName}/${post.slug}/`,
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
   const xmlData = [...bix_posts, ...soc_posts, ...ec_posts, ...env_posts, ...tex_posts, ...vid_posts, ...aw_posts, ...nol_posts, ...he_posts, ...tr_posts] as Post[]     
 const xml = generateNewsSitemap(xmlData);
 
   return new NextResponse(xml, {
     headers: {
       'Content-Type': 'application/xml',
     },
   } ) ;
 }