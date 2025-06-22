import { MetadataRoute } from "next";  
import { FeedProps } from "../types"; 
import { newchars } from "./newCharHandle";
//export const revalidate = 0;
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000/";   
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
  
      const charsList:FeedProps[] = await newchars() 
      
      const charPosts = charsList.map((post)=>({
        title:post.title,
        url:`https://culturays.com/naija-wiki/character/${post.slug}/`,
        lastModified:new Date(post.date),
        changeFrequency:'always', 
        priority:0.8,
       images: [post.featuredImage.node.sourceUrl] 
     }) )
  const listChars = charsList?.map((post) =>( {
    title:post.title,
    url:`https://culturays.com/naija-wiki/characters/${post.charactertitles.filmname.toLowerCase().replace(/ /g, '-')}/`,
        lastModified:new Date(post.date),
        changeFrequency:'always', 
        priority:0.8,
        images: [post.featuredImage.node.sourceUrl]
   
})
  ); 

  const moviesChars = charsList?.map((post) =>( {
    title:post.title,
    url:`https://culturays.com/naija-wiki/movies/${post.charactertitles.portrayedby.toLowerCase().replace(/ /g, '-')}/`,
        lastModified:new Date(post.date),
        changeFrequency:'always', 
        priority:0.8,
        images: [post.featuredImage.node.sourceUrl]
   
})
  ); 
  
    return [      
 ...charPosts,
 ...listChars,
 ...moviesChars,
 
    ] as SitemapFile
  }

 
