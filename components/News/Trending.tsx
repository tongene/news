"use client"
import { TrendsProps } from "@/app/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
 
const Trending = ({related_to_trend, trends_categories, trends}:{related_to_trend:TrendsProps[],trends_categories:TrendsProps[], trends:TrendsProps}) => {  
 const [readAll, setReadAll]=useState(true)
 const trendsAll = trends_categories[0].trends.nodes?.concat(trends_categories[1].trends.nodes)?.concat(trends_categories[2].trends.nodes)?.concat(trends_categories[3].trends.nodes)?.concat(trends_categories[4].trends.nodes)?.concat(trends_categories[5].trends.nodes)
 
  return ( 
    <div className="m-auto px-4" style={{maxWidth:'1700px'}}> 
    <div className="xl:flex justify-center" style={{maxWidth:'1600px'}}>
    <div className=" my-11 md:flex justify-center lg:px-4 mx-2 xl:px-0 gap-2"> 
      <div className="md:max-w-md m-auto lg:px-4 min-[800px]:max-w-lg min-[900px]:max-w-xl min-[1000px]:max-w-2xl min-[1080px]:max-w-3xl">      
   <h3 className="text-4xl py-4" style={{ fontStyle: 'oblique' }}>{trends.title.toUpperCase()} </h3>
   <p className="py-4 italic" >{moment(trends.date).subtract(1, 'hour').fromNow()} </p>
   <div dangerouslySetInnerHTML={{__html:trends.excerpt}} className="text-lg"/>
 
  <br/> 
  <div className='py-2 my-4'>
<Image
src={trends.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={trends.featuredImage.node.altText}
/>
<div dangerouslySetInnerHTML={{__html:trends.featuredImage.node.caption}} className="text-sm italic my-2 underline"/>
 
 </div>

 <div dangerouslySetInnerHTML={{__html:trends.trendinggroup.intro}} className="text-xl py-1 leading-8"/>

  {readAll&& trends.content.split('\n').filter((line)=> line !=="").map((linex)=> <div key={Math.random()} >
 <div dangerouslySetInnerHTML={{__html:linex}} className="text-xl py-1 leading-8 [&_img]:my-4 [&_figure>figcaption]:italic [&_figure>figcaption]:mb-3 [&_figure>figcaption]:underline [&_figure>figcaption]:text-sm dark:text-gray-300 whitespace-pre-line [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_h2]:text-3xl [&_h2]:py-3 [&_h2]:mt-4 [&_h2]:font-bold [&_h3]:text-3xl [&_h2]:py-3 [&_h3]:mt-4 [&_h3]:font-bold"/><br/> </div>
 ) } 
  <button onClick={()=> setReadAll(prev => !prev)} className="cursor-pointer text-lg opacity-80 bg-gray-800 p-4 text-white">{!readAll?'Expand':'Close'} </button> 

  <div className=" my-3 m-auto h-max "> 
<h2 className="text-center p-3 text-3xl font-bold py-8">See Also</h2>
 <div className="my-4 xs:grid grid-cols-2 justify-center border"> 
{trendsAll?.slice(0,5).map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex shadow px-2 py-4 justify-center border-r border-b"> 

<div> 
<small className="text-md italic py-2">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
<Link href={`/news/trending/${xy.slug}/`}><h3 className="hover:text-gray-500 text-2xl font-bold overflow-hidden text-ellipsis leading-8"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link>
<Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}} className='hover:text-gray-500 text-lg font-serif overflow-hidden text-ellipsis my-1'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} /> </Link>
</div>
 
</div>
 )}
    </div>
</div> 
 </div>
 
<div className="my-10 md:my-0 max-w-xs xs:max-w-max md:max-w-xs m-auto"> 
  <h2 className="text-4xl text-gray-800 dark:text-gray-300">Popular Trends</h2>
<div className="grid xs:grid-cols-2 md:grid-cols-1 my-4 gap-1 h-max">
{trendsAll?.slice(5,10).map((xy,i)=>
<div key={xy.title + ' ' + i} className="p-4 border rounded"> 
<small className="text-md italic text-red-600">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
<Link href={`/news/trending/${xy.slug}/`}><h3 className="hover:text-gray-500 text-2xl  overflow-hidden text-ellipis leading-8 dark:text-gray-300" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link> 
<Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}className='hover:text-gray-500 overflow-hidden text-ellipis my-2'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/></Link>
<div className='py-2'>
<Image
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/>
 </div>
</div>
 )}
  
    </div>
    </div>
 
    </div>
  
 <div className="my-11 lg:flex xl:block h-max justify-center max-w-5xl m-auto">
 <div className="0 dbg-gray-20ark:bg-black m-auto border max-w-2xl xl:max-w-sm">
  {/* <h2 className="text-center p-3 text-3xl text-gray-700 font-bold dark:text-gray-200">Popular Trends</h2>   <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>*/}

{trendsAll?.slice(10,13).map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex m-4 border-b border-b-4 border-black"> 
<div className="w-1/2"> 
<Link href={`/news/trending/${xy.slug}/`}><h3 className="overflow-hidden text-ellipsis hover:text-gray-500 text-2xl my-2 font-bold" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link>
<Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}className='overflow-hidden text-ellipsis my-2  hover:text-gray-500 text-lg font-serif text-gray-600 dark:text-gray-300'/></Link>
</div>
<div className="w-1/2 p-1">
<Image
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/>
  
</div>
</div>
 )} 
  </div>

<div className="bg-gray-200 dark:bg-black border max-w-2xl my-3 lg:my-0 lg:m-0 xl:my-3 m-auto xl:max-w-sm h-max"> 
<h2 className="text-center p-3 text-3xl text-gray-700 dark:text-gray-200 font-bold pt-8">Still on the Topic </h2>
 <div className="my-4 xs:grid grid-cols-2 lg:block xl:grid justify-center mx-2"> 
{trendsAll?.slice(13,16).map((xy,i)=>
<div key={xy.title + ' ' + i} className="flex shadow px-2 py-4 justify-center"> 

<div className="max-w-xs"> 
<small className="text-md italic text-gray-600 py-2 dark:text-gray-300">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
<Link href={`/news/trending/${xy.slug}/`}><h3 className="hover:text-gray-500 font-bold overflow-hidden text-ellipsis dark:text-gray-300"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link> 

<Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}className='hover:text-gray-500 text-lg font-serif text-gray-600 overflow-hidden text-ellipsis my-3 dark:text-gray-300'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></Link>
</div> 
 
</div>
 )}
    </div>
</div>
   
    </div>  
   </div>
 
     <section>
     <h2 className="text-center p-6 text-3xl text-gray-700 dark:text-gray-300">More Trending Topics</h2>
     <hr className="p-0.5 bg-gray-600 w-1/2 m-auto m-1"/>
<div className="xl:flex justify-center py-8"> 
<div className="md:flex justify-center"> 
<div className="mx-2 px-8"> 
  {trendsAll?.slice(16,20).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="my-3 [&:not(:last-child)]:border-b">  
  <ul>
  <Link href={`/news/trending/${xy.slug}/`}><li className='hover:text-gray-500 list-disc text-2xl text-gray-800 overflow-hidden text-ellipsis leading-9 dark:text-gray-300' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </li></Link> 
     </ul> 
     <Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}className="hover:text-gray-500 text-lg overflow-hidden text-ellipsis leading-8 my-3 dark:text-gray-300" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></Link>
 <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
</div>
  )
  }
  </div>
  <div className="my-4 lg:border-r md:border-l md:border-b h-max p-3 ">  
{trendsAll?.slice(20,23).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="max-w-sm m-auto">   
<div className="[&:not(:last-child)]:border-b my-3"> 
 
<Link href={`/news/trending/${xy.slug}/`}><h3 className="hover:text-gray-500 text-2xl text-gray-800 overflow-hidden text-ellipsis leading-8 my-3 dark:text-gray-300"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title} </h3></Link> 
<Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}className='hover:text-gray-500 text-lg overflow-hidden text-ellipsis leading-8 my-3 dark:text-gray-300' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></Link>
  <small className="text-md italic text-red-600 py-2 block">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
 </div>
<Image
className="max-h-56 xl:max-h-64"
src={xy.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy.featuredImage.node.altText}
/> 

</div>
  )
  }
  </div>

</div>
 
  <div className="m-2 p-8 max-w-2xl"> 
  {related_to_trend?.slice(0,4).map((xy,i)=> 
<div key={xy.title + ' ' + i} className="[&:not(:last-child)]:border-b my-3">  
  <ul>
  <Link href={`/news/trending/${xy.slug}/`}><li className='hover:text-gray-500 list-disc text-2xl text-gray-800 dark:text-gray-300 dark:hover:text-gray-500'>{xy.title} </li></Link>
     </ul>  
     <Link href={`/news/trending/${xy.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}}className="text-lg hover:text-gray-500 overflow-hidden text-ellipsis leading-8 my-3 " style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></Link>
<small className="text-md italic text-red-600 py-2 block">{moment(xy.date).subtract(1, 'hour').fromNow()} </small>
</div>
  )
  }
  </div>
    </div>
</section>
  </div>)
}

export default Trending
 