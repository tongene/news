"use client"
import { Cursors, InnerEdges, NextTypeProps, PostTypeProps, SideNode, TopNews } from "@/app/types"
import { news_details_all, postsOutline, readNextContent, readNextPosts, resolveContent, returnPost, sidePlusViews } from "@/utils/resolveFunctions"
import { useParams } from "next/navigation" 
import { useEffect, useMemo, useState } from "react"
import NewsDetail from "./NewsDetail"
import ArticleDetail from "./News/ArticleDetail"
import SideBar from "./Side"
const LevelOne = () => {
    const {slug} = useParams()
      const slugParam = slug??[]
        const [postPlus, setPostPlus]=useState <PostTypeProps>()
          const [postXPlus, setPostXPlus]=useState <TopNews>()
           const [outlinePlus, setOutlinePlus]=useState <SideNode[]>([])
            const [sideBarPlus, setSideBarPlus]=useState <Cursors[]>([])
            const [nextPlus, setNextPlus]=useState <NextTypeProps[]>([])
             const [nextContent, setNextContent]=useState <NextTypeProps[]>([])
            const [loading,setLoading]=useState(false) 

  const fullContent=async ()=> {
setLoading(true)
 const news_details= await returnPost(slugParam[0])
  setPostPlus(news_details)
   for (const type of ["article", "business", "economy", "nollywood", "award", "technology", "health", "society","environment"]) {  
  const res = await news_details_all(`https://content.culturays.com/${type}/${slugParam[0]}/`)
   if( res?.id){
setPostXPlus(res)
}
} 
  setLoading(false)
 const news_outline=await postsOutline()
 setOutlinePlus(news_outline)
 const sidebarItems=await sidePlusViews(postXPlus?.id as string)
const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node) 
setSideBarPlus(txPlus)
const next_x_news = await readNextPosts([postPlus?.id, news_related, news2related, exitingPosts].flat() as string[]) 
setNextPlus(next_x_news)
 const next_top_news = await readNextContent([postXPlus?.id, news_related, news2related, exitingPosts].flat()as string[])
 setNextContent(next_top_news) 
}
useEffect(()=>{
 fullContent()

},[loading])

const news_related = postXPlus?.newsGroup?.related?.edges.map((tx)=> tx.node.id) 
const news2related = postPlus?.postnewsgroup?.relatedPosts?.edges.map((tx:{node:{id:string}})=> tx.node.id)     
const post_related= postPlus?.postnewsgroup.relatedPosts?.edges 
const exitingPosts= post_related?.map((fx)=>(fx?.cursor) )??[] 
 
  return (
    <div> 
  {!loading&& <div className="w-full max-w-full mx-auto p-4">Loading...</div> }
       { !postXPlus?.id&&postPlus?.id &&<NewsDetail postPlus={postPlus} nextPlus={nextPlus} outlinePlus={outlinePlus} sideBarPlus={sideBarPlus} /> } 
      {postXPlus?.id&&!postPlus?.id&&( 
      <div className="bg-gray-50"> 
      <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px' }}>
   
    <ArticleDetail postXPlus={postXPlus} nextContent={nextContent} />
    <div className="[&_h2]:dark:text-gray-900 dark:text-gray-900 h-max">
    <SideBar 
      outlinePlus={outlinePlus} sideBarPlus={sideBarPlus}  
        />   
      </div>   
      </div>
      </div> )} 
    </div>
  )
}

export default LevelOne
