"use client"
import { Cursors, InnerEdges, NextTypeProps, PostTypeProps, SideNode, TopNews } from "@/app/types"
import { news_details_all, postsOutline, readNextContent, readNextPosts, returnPost, sidePlusViews } from "@/utils/resolveFunctions"
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
            const [sideBarPlus, setSideBarPlus]=useState <Cursors[]>([])           
             const [nextContent, setNextContent]=useState <NextTypeProps[]>([])
            const [loading,setLoading]=useState(false) 
const news_related = postXPlus?.newsGroup?.related?.edges.map((tx)=> tx.node.id) 

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
 const sidebarItems=await sidePlusViews(postXPlus?.id as string)
const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node) 
setSideBarPlus(txPlus)
 const next_top_news = await readNextContent([postXPlus?.id, news_related].flat()as string[])
 setNextContent(next_top_news) 
}
useEffect(()=>{
 fullContent()

},[loading])



 
  return (
    <div>  
      {postXPlus?.id&&!postPlus?.id&&( 
      <div className="bg-gray-50"> 
      <div className="lg:flex justify-center m-auto px-4 bg-white" style={{maxWidth:'1450px' }}>
   
    {/* <ArticleDetail />
    <div className="[&_h2]:dark:text-gray-900 dark:text-gray-900 h-max">
     <SideBar 
      sideBarPlus={sideBarPlus}  
        />    </div>   */}
       
      </div>
      </div> )} 
    </div>
  )
}

export default LevelOne
