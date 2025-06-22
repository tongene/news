"use client"
import { fetchNew } from "@/app/netflix-naija/netflix-news"
import { NAPINewsProps } from "@/app/types"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"  
 
const NaijaContent = ({end_ng_cursor, setEnd_ng_cursor}:{end_ng_cursor:string, setEnd_ng_cursor:React.Dispatch<React.SetStateAction<string>>} ) => { 

      const [scrolledContent, setScrolledContent]=useState<NAPINewsProps[]>([])    
      const {ref, inView } =useInView(); 
      //const debouncedSearchNaija = useDebouncedValue(end_ng_cursor, 500); 

      const loadMorePosts = useCallback(async () => { 
      const apiP = await fetchNew(2, end_ng_cursor);
      const naijaNew_content = apiP.map((ex:NAPINewsProps) => ex.node.naijaOnNetflix)
                                      .map((xy:NAPINewsProps) => xy.nodes)
                                     .flat();
       
        if (naijaNew_content.length>0) {
          setScrolledContent(prevContent => [...prevContent, ...naijaNew_content]);
        } 
      
        // or try this if (end_ng_cursor !== null ) {
        //   setScrolledContent(prevContent => [...prevContent, ...naijaNew_content]);
        // } 
        const hasMorePosts = apiP.map((ex:NAPINewsProps) => ex.node.naijaOnNetflix)
                                  .map((xy:NAPINewsProps) => xy.pageInfo)
                                  .map((pi:NAPINewsProps) => pi.hasNextPage)
                                  .flat();        
      
        if (hasMorePosts[0] && end_ng_cursor !== null) {
          const getMore = apiP.map((ex:NAPINewsProps) => ex.node.naijaOnNetflix)
                              .map((xy:NAPINewsProps) => xy.pageInfo)
                              .map((pi:NAPINewsProps) => pi.endCursor)
                              .flat();
      
          const nextCursor = getMore[0];
          setEnd_ng_cursor(nextCursor); 
        } else {
          setEnd_ng_cursor('');
        } 
      
      }, [inView]);  
        
      useEffect(() => { 
        if(inView){
       const clearInView=  setTimeout(()=>{
            loadMorePosts() 
        
          },1000) 
          return ()=> clearTimeout(clearInView) 
         }
      }, [loadMorePosts]);  
  
  
  return (
    <section >  
<div className='my-6'>
<h2 className='bg-black p-8 text-gray-300 text-3xl text-center w-full'>Netflix Naija</h2>
{scrolledContent.map((xy)=>
<div className='flex xs:px-11 md:px-4 md:border-r md:border-r-dotted' key={xy.title + ' '+ xy.id + Math.random()}>
    <div className="w-1/2 my-4 xl:w-1/3">
<Image 
  src={xy.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={xy.featuredImage.node.altText} 
  /></div>
  <div className="w-1/2 px-2 my-4"> 
  <Link href={`/netflix-naija/news/${xy.slug}/`}><h2 className='text-lg font-bold text-gray-700 hover:text-gray-500 cursor-pointer'>{ xy.title}</h2></Link>
<small className="text-red-600 my-4 italic">{moment(xy.date).fromNow()}</small>
  </div> 
</div> 
)}
 
</div>
{end_ng_cursor !== null && 
  <p ref={ref} className="p-4">Loading</p>
 }
</section>
  )
}

export default NaijaContent
