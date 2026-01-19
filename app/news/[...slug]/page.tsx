 
import SideBar from "@/components/Side" 
import ArticleDetail from "@/components/News/ArticleDetail" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { NewsArticle, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
import { InnerEdges } from "@/app/types";
import NewsDetail from "@/components/NewsDetail"; 
import { resolveContent, returnPost } from "@/utils/resolveFunctions"; 
import LevelOne from "@/components/LevelOne";

export type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug =(await params).slug
  const news_details= await returnPost(slug[0])  
 const newsXdetail = await resolveContent(slug, news_details);

  const previousImages = (await parent).openGraph?.images || [] 
  const keyTags= newsXdetail?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
 const tags= news_details?.tags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
const twitterImage =
  news_details?.featuredImage?.node?.sourceUrl ||
  newsXdetail?.featuredImage?.node?.sourceUrl ||
  'https://culturays.com/opengraph-image.png';

   return {
    title: `Urban Naija | ${news_details?.title || newsXdetail?.title }`,
    description:replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) ,
    keywords:keyTags||tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title || newsXdetail?.title ,
      description:replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) ,  
      images:[twitterImage],
    },
     openGraph: {
      title: `Urban Naija | ${news_details?.title || newsXdetail?.title}`,
      description:replaceHTMLTags(news_details?.excerpt) ||replaceHTMLTags(newsXdetail?.excerpt) , 
      url:news_details?.slug? `https://culturays.com/news/${news_details?.slug}/`:`https://culturays.com/news/${newsXdetail?.slug}/`,
      siteName: 'Urban Naija',
      images: [{url:news_details?.featuredImage?.node?.sourceUrl||newsXdetail?.featuredImage?.node?.sourceUrl, width: 800,
          height: 600, ...previousImages} ],
      type: "article",
      publishedTime:news_details?.date?new Date(news_details?.date)?.toISOString() :new Date(newsXdetail?.date).toISOString(),
    },
     alternates: {
    canonical:news_details?.slug? `https://culturays.com/news/${news_details?.slug}/`:`https://culturays.com/news/${newsXdetail.slug}/`,
 
  },
  
  }
 
} 

const ArticleDetailPage = async({params}: {
  params: Promise<{ slug: string }>
} ) => { 
 const {slug} =await params  
 const newsXdetail = await returnPost(slug[0])
  const news_details = await resolveContent(slug, newsXdetail);
if(!news_details) return
 const tags= news_details?.contentTags?.nodes.map((ex:{name:string})=>ex.name).join(', ')
   function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}
  const jsonLd:WithContext<NewsArticle> = {
   '@context': 'https://schema.org',
   '@type': 'NewsArticle',
     name: news_details?.title,
    headline: news_details?.title, 
    description: `Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria." | ${replaceHTMLTags(news_details?.excerpt)}`,
    author: {
      "@type": "Person",
      name: "Christina Ngene",
      url:'https://culturays.com/creator/christina-ngene/',
    }, 
    datePublished:toIsoDate( news_details?.date) , 
    dateModified:toIsoDate( news_details?.date) , 
     mainEntityOfPage: {
      "@type": "WebPage",
      "@id": news_details?.slug,
    },
    url:`https://culturays.com/news/trending/${slug}/`,
    image: news_details?.featuredImage.node.sourceUrl ,
    publisher: {
      "@type": "Organization",
      name: "Christina Ngene",
      logo: {
        "@type": "ImageObject",
        url: "https://culturays.com/culturays-no-bg.png",
      },
    },
     
    keywords:tags,   
  };
  return (
     <> <LevelOne />
   <StructuredData schema={jsonLd} />     

 </>  ) 
}

export default ArticleDetailPage
