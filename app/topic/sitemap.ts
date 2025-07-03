import { MetadataRoute } from "next";
import { PostProps } from "../types";
  export type TagProps={
    name:string
    slug:string
    contentNodes:PostProps[]

  }

 const topicFeed = async()=>{ 
    const wprest =   fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `query CONTENTFEED{
   contentTags(first:500) {
    nodes {
      slug
      name
    }
  }
  }`})
      
      }).then(response => response.json())   
      .then(data => data.data.contentTags.nodes)
      .catch(error => console.error('Error:', error));
      //const response = wprest?.data.contentTags.nodes 
      return wprest
  
  }

 const tagFeed = async()=>{  
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:
         `query CONTENTFEED{
       postsTags(first:500) {
       nodes {     
          name
          slug
        }
      } 
      }
        
    `})
      
      }).then(response =>response.json() )  
      .then(data => data.data.postsTags.nodes)
      .catch(error => console.error('Error:', error));
      //const response = wprest?.data.postsTags.nodes 
      return wprest
  
  }

 
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

//export const revalidate = 0;
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}` 
  : "http://localhost:3000";

export default async function sitemap({
    id,
  }: {
    id: number
  }): Promise<MetadataRoute.Sitemap>{ 

     const topicData:TagProps[]=await topicFeed()
      const tagData:TagProps[]=await tagFeed()
    
      const dataTags=topicData.map((post)=>({ 
        title:post.name,
        url:`https://culturays.com/topic/${post.slug}/`,
        lastModified:new Date(),
        changeFrequency:'always', 
        priority:0.8,

     }) )
     const postTags=tagData.map((post)=>({ 
      title:post.name,
      url:`https://culturays.com/topic/${post.slug}/`,
      lastModified:new Date(),
      changeFrequency:'always', 
      priority:0.8,

   }) )
 const xtags = postTags.concat(dataTags).filter((item, index, self) =>  index === self.findIndex((t) => t.title === item.title))
 
    return [ 
   ... xtags, 
    ] as SitemapFile
  }

 
