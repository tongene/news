 
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

   return {
    title: `Urban Naija | ${news_details?.title || newsXdetail?.title }`,
    description:news_details?.excerpt || newsXdetail?.excerpt ,
    keywords:keyTags||tags,
    twitter: {
      card: 'summary_large_image',
      title: news_details?.title || newsXdetail?.title ,
      description: news_details?.excerpt || newsXdetail?.excerpt ,  
      images:[news_details?.featuredImage?.node?.sourceUrl, ...previousImages||newsXdetail?.featuredImage?.node?.sourceUrl, ...previousImages],  
    },
     openGraph: {
      title: `Urban Naija | ${news_details?.title || newsXdetail?.title}`,
      description:news_details?.excerpt || newsXdetail?.excerpt, 
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

const ArticleDetailPage = async ({params}: Props) => { 

  return (
     <> <LevelOne />
  {/* <StructuredData schema={jsonLd} />  */}    

 </>  ) 
}

export default ArticleDetailPage
