import { MetadataRoute } from "next";  
import { FeedProps } from "../types";  
import { newsbyComingtoCategory, newsbyNewOnCategory } from "./netflix-news";
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
        const netflix__News:FeedProps[] = await newsbyNewOnCategory([]) 
        const coming_to_netflix_naija:FeedProps[] = await newsbyComingtoCategory([]) 
        const netflixFeed =netflix__News?.map((ex)=> ex.node.naijaOnNetflix.edges).flat() 
        const netflixFeed2 =coming_to_netflix_naija?.map((ex)=> ex.node.naijaOnNetflix.edges).flat()  
      const netflixPosts = netflixFeed.map((post)=>({ 
        title:post.node.title,
       url:`https://culturays.com/netflix-naija/new-on-netflix/${post.node.slug}`,
        lastModified:new Date(post.node.date),
        changeFrequency:'always', 
        priority:0.8,
       images: [post?.node?.featuredImage?.node?.sourceUrl] 
     }) ) 
        const netflixPosts2 = netflixFeed2.map((post)=>({    
          title:post.node.title,
        url:`https://culturays.com/netflix-naija/coming-to-netflix/${post?.node.slug}`,
        lastModified:new Date(post?.node?.date),
        changeFrequency:'always', 
        priority:0.8,
       images: [post?.node?.featuredImage?.node?.sourceUrl] 
     }) ) 
 
    return [      
  ...netflixPosts, 
 ...netflixPosts2,
    ] as SitemapFile
  }

 
