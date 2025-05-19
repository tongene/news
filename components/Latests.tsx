"use client"  
import { altPageNewsItems } from "@/app/latestx" 
import { newsViews } from "@/app/page-data"
import Image from "next/image"
import Link from "next/link"    
import { useEffect, useState } from "react"
type Node ={
  title:string;
  featuredImage:{node:{altText:string,sourceUrl:string}};
  excerpt:string;
  slug:string
  node:{
      title:string;
      featuredImage:{node:{altText:string,sourceUrl:string}};
      excerpt:string;
      slug:string
  
  }; 
}
const Latests = () => {   
  const [bottom_news_data, set_bottom_News_data]=useState<Node[]>([])
  const [alt_news_data, set_alt_News_data]=useState<Node[]>([])
 
const newsContent=async()=>{ 
 const bottom_latest = await newsViews();
 const xLatest = bottom_latest.edges.map((xy:{node:[]})=> xy?.node).flat() 
 set_bottom_News_data(xLatest) 
 const altNews = await altPageNewsItems()
 set_alt_News_data(altNews)
}
 
useEffect(()=>{
  newsContent() 
},[])

  return (
    <div>
       <h2 className="text-3xl text-gray-700 font-bold text-center p-4 dark:text-gray-200 my-2">Recommended</h2>
      <div className="overflow-auto pt-4 hidden-scroll" >
      <div className="flex border-b border-t border-t-4 border-t-black border-b-4 m-auto" style={{width:'1500px'}}> 
      {alt_news_data?.slice(0,3).map((ex, index)=>
         <div className="first:border-r [&:nth-child(2)]:border-r px-4 max-w-sm m-auto" key={index + Math.random()}> 
 <Link href={`/news/topic/${ex.node.slug}`}><h2 className=" hover:text-gray-400 py-8 text-2xl font-mono leading-10 font-thin my-11">{ex.node.title} </h2></Link>
  </div>)}
</div>
</div>
<div className="py-4 my-5 border-t-4 border-yellow-600 bg-black" >
  <h2 className="text-3xl text-gray-300 font-bold text-center p-4 border-b border-yellow-600 my-2">News</h2>
  <div className="md:grid grid-cols-2 gap-2 lg:grid-cols-3 lg:max-w-4xl xl:grid-cols-4 max-w-xl xl:max-w-6xl m-auto">
   {bottom_news_data?.map((ex, index)=> 
<div key={index + Math.random()} className="max-w-max m-auto"> 
<div className="relative h-52 max-w-72 overflow-hidden border border-yellow-600"> 
  <div className="relative w-[300px] h-[300px]">
<Image 
src={ex.featuredImage?.node.sourceUrl}
 fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt={ex.title}
priority={true}
/> </div>
<div className="absolute bg-gray-800 flex items-center justify-center top-0 bg-opacity-40 mx-2 w-full h-full"> 
<small className="text-yellow-400 text-2xl font-bold h-4">&#124;</small> <Link href={`/news/topic/${ex.slug}`}><h2 className="text-white cursor-pointer underline hover:text-gray-400 text-xl py-20 px-2">{ex.title} </h2></Link>
</div> 
</div>
  
</div>    
)}  
</div> 
   
<Link href='/news'><p className="underline m-8 hover:text-gray-400 text-white"> See More</p></Link>
</div>   
   </div>)
}
 
export default Latests