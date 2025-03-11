import { MetadataRoute } from "next"; 
import { FeedProps, PostProps } from "../types";  
import { getPosts } from "./actions/loadPosts";
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
 
     const initialPostsD = await getPosts(0, 100)  
      const forumPosts = (initialPostsD as PostProps[]).map((post)=>({
       title:post.title,
        url:`https://culturays.com/forum/post/${post.slug}/${post.id}`,
        lastModified:new Date(post.created_at as string),
        changeFrequency:'always', 
        priority:0.8,
        images: [post?.files?.length as number>0?`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${(post?.files as PostProps[])[0]}`:'']

     }) )
 
    return [ 
     ...forumPosts
    ] as SitemapFile
  }

 
