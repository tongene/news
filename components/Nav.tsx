"use client" 
import { newsByLatest } from '@/app/page-data'
import { trends } from '@/app/trendx'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'
 
type InnerNode ={
  id:number;
  slug:string;
  title:string;
  index:number; 
  contentTags:{
    nodes:{
name:string
slug:string
    }[]
  }
  nodes:[{ 
    naijaOnNetflix:{
    nodes:[{
      contentTypeName:string;
      id:number;
      slug:string;
      title:string;
      index:number;    
    }];
 
},
 
},
 
];

} 
const Nav =() => {  
 const [trendsData,setTrendsData]=useState<InnerNode[]>([])
 const [liveNewsView, setLiveNewsView]=useState([]) 
 
 const liveData =async()=>{ 
   const livesNews=await newsByLatest()
   const livesXNews = livesNews.resp1Live
     const trends_data:InnerNode[] = await trends() 
  setTrendsData(trends_data) 
  setLiveNewsView(livesXNews)
 }
useEffect(()=>{ 
  liveData()
},[]) 
  return (<>
   <div className='flex shadow-detailShadow pt-6 my-1 mt-4 dark:shadow-detailShadowLight justify-center dark:bg-gray-800' > 
    <div className='w-full py-4'> 
   <Link href='/news/trending'><p className='text-center hover:text-gray-500 text-2xl font-bold py-3' >Trending in Nigeria<span></span> <span>&#10141;</span></p></Link>
   <div className='relative text-xl hover:text-orange-700'><p className='absolute bottom-0 right-10 lg:right:40'><Link href='/search'aria-label="Search"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link></p></div> 
<div className='text-md font-medium flex justify-center items-center xs:flex-row flex-wrap' >
{liveNewsView
  ?.filter((ex: { node: { modified: string } }) => {
    const postTime = new Date(ex.node.modified).getTime(); 
    const currentTime = Date.now(); 
    const timeDifference = currentTime - postTime;  
    return timeDifference <= 24 * 60 * 60 * 1000; 
  })
  .slice(0, 1)
  .map((ex: { node: { title: string, slug: string, databaseId: string,content: string, modified: string, author: { node: { name: string } }, contentTags: { nodes: { name: string }[] } } }) => (
    <ul key={ex.node.title} className="flex py-3 items-center">
      <span className="animate-pulse mr-2 text-5xl text-red-600">•</span>
      <span className="text-red-600">Live</span>
      <Link href={`/news/live/${ex.node.databaseId}/${ex.node.slug}`}>
        <li
          className="m-auto overflow-hidden text-ellipsis underline md:px-4 px-3 hover:text-orange-700 hover:font-bold"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {ex.node.contentTags.nodes[0]?.name}
        </li>
      </Link>
    </ul>
  ))}

    {trendsData?.slice(0,6)?.map((ex)=> 
    <ul key={ex.title} className='py-3'> 
     <Link href={`/news/trending/${ex.slug}`}><li className='m-auto overflow-hidden text-ellipsis underline md:px-4 px-3 hover:text-orange-700 hover:font-bold'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.contentTags.nodes[0].name}</li></Link> 
    </ul> 
     )}  
  
     </div>
      </div> 
    
   </div>  
  
    </> )
}

export default Nav