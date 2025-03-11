import { MetadataRoute } from "next";  
import { FeedProps } from "../types";   
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
export const revalidate = 0;
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000";   
  export type Videos = {
    title: string;
    thumbnail_loc: string;
    description: string;
    content_loc?: string;
    player_loc?: string;
    duration?: number;
    expiration_date?: Date | string;
    rating?: number;
    view_count?: number;
    publication_date?: Date | string;
    family_friendly?: 'yes' | 'no'; 
    requires_subscription?: 'yes' | 'no';
    uploader?: {
        info?: string;
        content?: string;
    };
    live?: 'yes' | 'no';
    tag?: string;
};
type UnmatchedLang = 'x-default';
type HrefLang = UnmatchedLang;
export type Languages<T> = {
    [s in HrefLang]?: T;
};
type SitemapFile = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
    images?: string[];
    videos?: Videos[];
}>;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { 
 const contentData:FeedProps[]=await contentFeed() 
    const dataFeed= contentData?.filter((xy)=> xy.contentTypeName !== 'post')?.filter((xy)=> xy.contentTypeName !== 'anticpated-nollywood')?.filter((xy)=> xy.contentTypeName !== 'anticpated-african')?.filter((xy)=> xy.contentTypeName !== 'anticpated-foreign')?.filter((xy)=> xy.contentTypeName !== 'netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'what-to-watch').filter((xy)=> xy.contentTypeName !== 'list-netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'char')?.filter((xy)=> xy.contentTypeName !== 'naija-wiki')?.filter((xy)=> xy.contentTypeName !== 'latest')?.filter((xy)=> xy.contentTypeName !== 'outline')?.filter((xy)=> xy.contentTypeName!== 'page').filter((xy)=> xy.contentTypeName!== 'live').filter((xy)=> xy.contentTypeName!== 'added-netflix-naija') 
    const dataPosts = dataFeed.map((post)=>({
        title:post.title,
         url:`https://culturays.com/news/${post.contentTypeName}/${post.slug}`,
                lastModified:new Date(post.date),
                changeFrequency:'always', 
                priority:0.8,
               images: [post?.featuredImage?.node?.sourceUrl], 
   
         } ))
   
    return [      
        ...dataPosts
    ] as SitemapFile
  }

 
