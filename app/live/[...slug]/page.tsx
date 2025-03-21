import SideBar from "@/components/Side" 
import LiveNews from "@/components/LiveNews" 
import type { Metadata, ResolvingMetadata } from 'next' 
import { Suspense } from "react"
import { createClient } from "@/utils/supabase/server"
import { postsOutline, sidePlusViews } from "@/app/page-data"
import { liveNewsFeed } from "../live"
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
    openGraph: {
      images: [news_details?.featuredImage.node.sourceUrl,...previousImages],
      description:news_details?.excerpt,
    },
  } 
} 

const LiveNewsPage = async ({params}: Props) => {
const slug =(await params).slug
 const news= await liveNewsFeed(slug[0])

  const sidebarItems=await sidePlusViews()       
      const news_outline=await postsOutline()
      const naija_wiki =async ()=>{  
       const supabase =await createClient() 
       const { data:cinema_titles , error } = await supabase 
       .from('cinema_titles') 
       .select('*')
       if(error)throw new Error('An Error has occured!')
 return cinema_titles
           
       }   
  const xTitltes= await naija_wiki()
    const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon')) 

  return ( news?.title&&
    <div className="bg-gray-50">     
    <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px'}}>
        <Suspense><LiveNews 
         news={news}  
      /></Suspense> 
       <div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900">
      <SideBar  sidebarItems={sidebarItems}
 news_outline={news_outline} coming_titles={coming_titles}/> 
      </div>
      </div>
 </div>
  ) 
}

export default LiveNewsPage
 
 