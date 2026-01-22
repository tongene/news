 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { NewsArticle, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData"; 
import { resolveContent, returnPost } from "@/utils/resolveFunctions"; 
import LevelOne from "@/components/LevelOne";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { scrapeSilverBird } from "@/app/filmsdata";
import { processSbImages } from "@/utils/processImages";
import { CineType } from "@/app/types";
import NewsDetail from "@/components/NewsDetail";
import { headers } from "next/headers";

export type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string ]: string | string[] | undefined, variant: string }>
}


export async function generateMetadata(
  { params , searchParams}: Props,  
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug =(await params).slug
  const news_details= await returnPost(slug[0])  
 const newsXdetail = await resolveContent(slug, news_details);
  const variant = await searchParams;
    const isVariant= !!variant.variant
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
  const previousImages = (await parent).openGraph?.images || [] 
  const keyTags= newsXdetail?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
 const tags= news_details?.tags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const twitterImage =
  news_details?.featuredImage?.node?.sourceUrl ||
  newsXdetail?.featuredImage?.node?.sourceUrl ||
  'https://culturays.com/opengraph-image.png';
 
   return {
 metadataBase: new URL('https://culturays.com'),
    title: `Urban Naija | ${news_details?.title || newsXdetail?.title }`,
    description: replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) ,
    keywords:keyTags||tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title || newsXdetail?.title ,
      description: replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) ,  
      images: twitterImage,
    },
     openGraph: {
      title: `Urban Naija | ${news_details?.title || newsXdetail?.title}`,
      description: replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) , 
      url: news_details?.slug? `https://culturays.com/news/${news_details?.slug}/`:`https://culturays.com/news/${newsXdetail?.slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage?.node?.sourceUrl||newsXdetail?.featuredImage?.node?.sourceUrl, width: 800,
 height: 600, ...previousImages} ],
      type: "article",
      publishedTime: news_details?.date?new Date(news_details?.date)?.toISOString() :new Date(newsXdetail?.date).toISOString(),
    },
     alternates: {
    canonical: news_details?.slug? `https://culturays.com/news/${news_details?.slug}/`:`https://culturays.com/news/${newsXdetail.slug}/`,
 
  },
 robots: isVariant
      ? { index: false, follow: true }
      : { index: true, follow: true },

  }
 
} 

const ArticleDetailPage = async({params, searchParams}: {
  params: Promise<{ slug: string }>,
   searchParams: { variant?: string };
} ) => { 

  const {slug} =await params 
  const repPath = slug[0].split('-').join(' ')
 const repPathname = repPath.replace(/\//g,' ').toUpperCase() 
 
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }

//  const tags= news_details?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
   function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d?.getTime())) {
    return new Date().toDateString();
  }
  return d?.toISOString(); 
}


  const jsonLd:WithContext<NewsArticle> = {
   '@context': 'https://schema.org',
   '@type': 'NewsArticle',
     name: repPathname,
    headline: repPathname, 
    description: `Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria." | ${repPathname}`,
   
    author: {
      "@type": "Person",
      name: "Christina Ngene",
      url:'https://culturays.com/creator/christina-ngene/',
    }, 
    datePublished: new Date().toISOString() , 
    dateModified:new Date().toISOString() , 
     mainEntityOfPage: {
      "@type": "WebPage",
      "@id": slug,
    },
    url: slug,
    image: "https://culturays.com/culturays-no-bg.png",
    publisher: {
      "@type": "Organization",
      name: "Christina Ngene",
      logo: {
        "@type": "ImageObject",
        url: "https://culturays.com/culturays-no-bg.png",
      },
    },
     
    keywords:[repPathname],   
  };
 // const referer = (await headers()).get("origin")||'';   
  // const pathname = new URL(referer).pathname;
  //   const headersList =(await headers());
  // const originalUrl =
  //   headersList.get('x-forwarded-uri') ||
  //   headersList.get('x-original-url') ||
  //   '';

 const highlight =await searchParams;
  const isHighlight= highlight.variant === 'highlight'

  return (
     <article> 
     <StructuredData schema={jsonLd} /> 
       {isHighlight ? (
        <NewsDetail />
      ) : (
        <ArticleDetail/>
      )}     
    </article> 
    ) 
}

export default ArticleDetailPage
