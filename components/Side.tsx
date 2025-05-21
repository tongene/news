"use client" 
import NewsLetter from "./NewsLetter"
import Image from "next/image"
import Link from "next/link"
import { dateFormatter } from "@/utils/dateformat"
import { CineProps } from "@/app/types"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

type SideNode ={
  node:{
      title:string;
      featuredImage:{node:{altText:string,sourceUrl:string}};
      excerpt:string;
      slug:string
  
  };
  outlineGroup:{outlineVideos:{node:{altText:string,mediaItemUrl:string}}}
  cursor: string
  content:string
  featuredImage:{
    node:{
      sourceUrl:string
      caption:string
      altText:string
     }
   }
}

type Cursors={
  cursor: string 
  node:{
    title:string
    slug:string
    date:string
    featuredImage:{
      node:{
        sourceUrl:string
        caption:string
        altText:string
       }
     }
     author:{
      node:{
        name:string
        slug:string 
       }
     }
  }
}

const SideBar = ({sidebarItems, news_outline }:{sidebarItems:Cursors[], news_outline:SideNode[]}) => { 
  const [cinemaXtitles, setCinemaTitles]=useState<CineProps[]>([])
  const [loading, setLoading]=useState(false)
   const naija_wiki =async ()=>{  
      const supabase =await createClient() 
      const { data:cinema_titles , error } = await supabase 
      .from('cinema_titles') 
      .select('*')
      if(error)throw new Error('An Error has occured!')
setCinemaTitles (cinema_titles)
          setLoading(false)
      } 
useEffect(()=>{
  setLoading(true)
naija_wiki()
},[])
   const coming_titles= cinemaXtitles?.filter((ex)=> ex.genre?.includes('Coming Soon'))  
  return (
 <div className='side_view_lg py-3 px-3 m-auto lg:m-0 border-l-4 max-w-lg h-max'>  
 <div className='py-3 px-3 m-auto lg:m-0 border-l-4 max-w-sm '>
  <div className="flex justify-between flex-wrap"> 
<h2 className='text-gray-600 font-bold text-4xl text-center lg:text-left py-4 dark:text-gray-300 summary-side'>Summary</h2>
<p className='text-gray-600 font-bold text-sm text-center lg:text-left  dark:text-gray-300 summary-side'>{new Date().toDateString()}</p>
</div>
<hr className='h-1 w-4/5 m-auto my-4'/>
<div className='m-auto lg:m-0 max-w-md md:max-w-sm'>
  {news_outline[0]?.content.split('\n').length>0?news_outline[0]?.content.split('\n').map((line)=>
  <div dangerouslySetInnerHTML={{__html: line }}className='text-lg leading-8 py-1 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-900'key={line + ' ' + Math.random()} />) :<p>Loading...</p>}
{news_outline[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl&&
  <video
  className='xs:h-64 lg:h-56'
  src={news_outline[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl} 
  width={1200} 
  height={675} 
   />

  }
  {!news_outline[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl&&news_outline?.length>0&& news_outline[0]?.featuredImage?.node.sourceUrl&&
 <Image
className='xs:h-64 lg:h-56'
src={news_outline[0]?.featuredImage?.node.sourceUrl} 
width={1200} 
height={675} 
alt={news_outline[0]?.featuredImage?.node.altText}/>
  }
</div> 
 </div>
 <div className='[&_.news-letter-unflexed>form]:lg:flex-wrap [&_.news-letter-unflexed]:w-80 [&_.news-letter-unflexed]:max-w-auto [&_.news-letter-unflexed]:md:m-0 [&_.news-letter-unflexed]:my-2 [&_.news-letter-buttonwidth]:md:w-auto [&_.news-letter-nowidth]:w-auto'>
<NewsLetter/>
</div> 

 <div className='m-auto max-w-md lg:m-0'>
 {sidebarItems?.slice(1).map((ex)=>
<div className='shadow flex my-2' key={ex.node.title + ' ' + Math.random()}>
 <div className='w-2/53 lg:w-1/2 mx-1 py-3'> 
 <Image
 className='h-24 w-48'
 src={ex.node?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.node?.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-3'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.node.slug}`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex.node?.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.node.author.node.slug}`}><p >{ ex?.node.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 
<div className='max-w-sm lg:max-w-md py-6 m-auto border-b border-t border-yellow-600 border-b-4 border-t-4 lg:m-0 xl:max-w-sm'> 
{sidebarItems?.slice(0, 1).map((ex, i)=>
<div key={ex.node.title + ' ' + Math.random()}> 
<div> 
 <Image
 className='h-56 lg:h-44 xl:h-56'
 src={ex.node?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.node?.featuredImage?.node.altText}/> 
 
 </div> 
<Link href={`/news/topic/${ex.node.slug}`}><h2 className='text-xl font-medium py-4 hover:text-gray-400 border-l px-2 border-r my-2'>{ex.node.title}</h2></Link>
</div>
)}

</div> 
 
{loading?<p>Loading...</p>:<></>}
<div className='my-4 text-xl max-w-lg lg:max-w-md xl:max-w-sm m-auto lg:my-10'>  
<div className="py-11 w-80 bg-slate-50 border">
  <div className='flex py-3 items-center px-1'> 
 <h2 className="text-gray-700 font-medium text-3xl p-3 leading-10">Coming to Cinema</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>

  {coming_titles.map((ity, index)=> 
 <div key={index}> 
 <ul className='flex hover:scale-105 text-gray-600 p-2'>    
 <li className="text-lg px-3">
   {ity.title} — {ity.release_date.slice(9)}
 </li>  
   
 </ul> 
 </div>
 
 )} 

 <div className='flex py-3 items-center px-1'> 
<h2 className="text-gray-700  font-medium text-3xl p-3 leading-10">Netflix Naija</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>

  <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-800"/> 
  <Link href='/netflix-naija/coming-to-netflix' prefetch={false}><h3 className="cursor-pointer px-1">Coming to Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
  
 </div> 
 
 <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-600"/>
 <Link href='/netflix-naija/new-on-netflix'prefetch={false}><h3 className="cursor-pointer px-1">New on Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
 
 </div>

 </div>
</div> 

</div> 
  )
}

export default SideBar
