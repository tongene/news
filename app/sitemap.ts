import { MetadataRoute } from "next";  
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

    return [
      {
        url: `https://culturays.com/`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority:1,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/about/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/forum/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/naija-wiki/`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/news/`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
     ,
      {
        url:`https://culturays.com/news/trending`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/naija-events/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/netflix-naija/coming-to-netflix/`,
        lastModified: new Date(),
        changeFrequency:"daily"  ,
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
     
      {
        url:`https://culturays.com/netflix-naija/new-on-netflix/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      
      {
        url:`https://culturays.com/news/nollywood/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/news/videos/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/news/business/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
       
      {
        url:`https://culturays.com/news/articles/`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      {
        url:`https://culturays.com/news/economy/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      },
      
      {
        url:`https://culturays.com/sign-in`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      }, 
      {
        url:`https://culturays.com/naija-birthdays`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        images: ['https://culturays.com/assets/images/culturays.png']
      }, 
 
    ] as SitemapFile 
  }

 