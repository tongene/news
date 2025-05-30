"use client" 
import NewsLetter from "./NewsLetter"
import Image from "next/image"
import Link from "next/link"
import { dateFormatter } from "@/utils/dateformat"

import MoviesWidget from "./MoviesWidget"
import { Cursors } from "@/app/types"

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

 

const SideBar = ({sidebarItems, news_outline }:{sidebarItems:Cursors[], news_outline:SideNode[]}) => { 
 
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
<div className='shadow flex my-2' key={ex.title + ' ' + Math.random()}>
 <div className='w-2/53 lg:w-1/2 mx-1 py-3'> 
 <Image
 className='h-24 w-48'
 src={ex?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-3'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex?.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 
<div className='max-w-sm lg:max-w-md py-6 m-auto border-b border-t border-yellow-600 border-b-4 border-t-4 lg:m-0 xl:max-w-sm'> 
{sidebarItems?.slice(0, 1).map((ex, i)=>
<div key={ex.title + ' ' + Math.random()}> 
<div> 
 <Image
 className='h-56 lg:h-64 xl:h-56'
 src={ex?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.featuredImage?.node.altText}/> 
 
 </div> 
<Link href={`/news/topic/${ex.slug}`}><h2 className='text-2xl font-bold py-4 hover:text-gray-400 border-t my-2'>{ex.title}</h2></Link>
</div>
)}

</div>  

</div> 
  )
}

export default SideBar
