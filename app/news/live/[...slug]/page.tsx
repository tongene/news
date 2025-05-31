import SideBar from "@/components/Side" 
import LiveNews from "@/components/LiveNews" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { Suspense } from "react"
import { createClient } from "@/utils/supabase/server"
import { postsOutline, sidePlusViews } from "@/app/page-data"
import { liveNewsFeed } from "../live"
import { NewsArticle, WithContext } from "schema-dts"
import StructuredData from "@/components/StructuredData"
import { InnerEdges } from "@/app/types"
const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {  
  const slug=(await params).slug
  const news_details= await liveNewsFeed(slug[0])
  const previousImages = (await parent).openGraph?.images || []
 const tags= news_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ') 

  return {
    title: `${news_details?.title||'' } `,
    description:news_details?.excerpt,
    keywords: tags,
     twitter: {
      card: 'summary_large_image',
      title: news_details?.title  ,
      description: news_details?.excerpt ,  
      images:[news_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: {
      images: [news_details?.featuredImage.node.sourceUrl,...previousImages],
      description:news_details?.excerpt,
      type: "article",
      publishedTime: news_details?.date,

    },
  } 
} 

const LiveNewsPage = async ({params}: Props) => {
const slug =(await params).slug
 const news= await liveNewsFeed(slug[0])

  const sidebarItems=await sidePlusViews() 
    const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)   
      const news_outline=await postsOutline()
//       const naija_wiki =async ()=>{  
//        const supabase =await createClient() 
//        const { data:cinema_titles , error } = await supabase 
//        .from('cinema_titles') 
//        .select('*')
//        if(error)throw new Error('An Error has occured!')
//  return cinema_titles
           
//        }   
//   const xTitltes= await naija_wiki()
//     const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon')) 
   const tags= news.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     }
   const jsonLd:WithContext<NewsArticle> = {
     '@context': 'https://schema.org',
     '@type': 'NewsArticle',
     name:news?.title, 
      headline: news?.title, 
      description: replaceHTMLTags(news?.excerpt) ,
      author: {
        "@type": "Person",
        name: "Christina Ngene",
        url:'https://culturays.com/creator/christina-ngene',
      }, 
      datePublished: new Date(news?.date).toDateString(), 
      dateModified:  new Date(news?.date).toDateString(), 
       mainEntityOfPage: {
        "@type": "WebPage",
        "@id": news?.slug,
      },
      url:news?.slug,
      image: news?.featuredImage.node.sourceUrl ,
      publisher: {
        "@type": "Organization",
        name: "Christina Ngene",
        logo: {
          "@type": "ImageObject",
          url: "https://culturays.com/assets/images/culturays-no-bg.png",
        },
      },
       
      keywords:tags,    
      
    };

  return ( 
      <>
     <StructuredData schema={jsonLd} />
     {  news?.title&&
    <div className="bg-gray-50">     
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px'}}>
        <Suspense><LiveNews 
         news={news}  
      /></Suspense> 
       <div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900">
      <SideBar 
      sidebarItems={txPlus}
      news_outline={news_outline} /> 
      </div>
      </div>
 </div>}
  </> ) 
}

export default LiveNewsPage
 
 