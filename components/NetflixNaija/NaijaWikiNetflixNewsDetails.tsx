"use client"
import moment from "moment";
import Image from "next/image"
import ShareButtons from "../ShareButtons";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";  
import SlidingSide from "../SlidingSide";
import { NAPINewsProps, VidProps } from "@/app/types"; 

const NaijaWikiNetflixNewsDetails =({next_on_netflix_naija, content_videos, news_details}:{content_videos:VidProps[], news_details:NAPINewsProps, next_on_netflix_naija:NAPINewsProps[]}) => {

  const videoRef = useRef(null);
  const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "") 
    const newString = string.replace(regex, "");
    return newString
     } 
     
     const related_content=news_details.netflixNewsGroup.netflixNewsRelated?.edges
     const next_posts_naija=next_on_netflix_naija.map((tx)=> tx.naijaOnNetflix).flat()
     const next_posts= next_posts_naija.map((tx)=> tx.nodes).flat()

    function formatTime(seconds:number) {
      const minutes = Math.floor(seconds / 60);
      const secondsRemaining = Math.floor(seconds % 60);
      
      // Pad seconds with leading zero if necessary
      const formattedSeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;  
      return `${minutes}:${formattedSeconds}`;
  }
  const [xTextx, setXTextX]= useState([''])
 useEffect(()=>{
  const xtext=news_details.content.split('\n').filter((xl)=>xl!=='')
  setXTextX(xtext)
},[])
  return (
    <article className="px-5 2xl:px-0"> 
   <div style={{width:"1170px"}} className="overflow-hidden m-auto"> 
    <div className="xs:flex justify-between items-center"> 
   <h2 className="text-4xl font-bold py-2 px-6 text-gray-800"> Videos </h2> <hr className="h-0.5 bg-gray-700 w-full"/> </div>
    <SlidingSide newsItems={content_videos} speed={60000}/>  
      </div> 

       <div className="bg-gray-50 dark:bg-black m-auto py-8 max-w-7xl px-6 ">    
      <div className="bg-white dark:bg-black my-2 py-10 rounded-lg sm:mx-4 xs:mx-8 sm:m-auto sm:px-11 lg:px-16">
       <h2 className="font-bold py-4 sm:px-8 text-3xl md:text-5xl text-gray-800 dark:text-gray-200 leading-10">{news_details.title} </h2>
       <div className="flex justify-between bg-gray-700">
       <p className="p-4 italic text-red-500 ">{moment(news_details.date).subtract(1, 'hour').fromNow() } </p> 
       <Link href={`/creator/${news_details.author.node.slug}/`}><p className="p-4 text-end text-lg  text-gray-200 mx-4 xs:mx-20 hover:text-red-400"><small className="italic p-3"> by</small>{ news_details.author.node.name } </p></Link></div>
       <div className="relative -mx-5 sm:-mx-8 border border-4 border-yellow-700"> 
       <Image src={news_details.featuredImage.node.sourceUrl}
       width={1200} 
       height={675} 
       alt={news_details.featuredImage.node.altText}
/>  
 </div>
 <div className="bg-gray-700">
  <div className="text-sm py-2 px-3 border-b text-gray-200 italic my-2 mb-4" dangerouslySetInnerHTML={{__html:news_details.featuredImage.node.caption}} />   
 <div className="pb-2 [&_.share-view]:bg-white [&_.share-view]:max-w-max [&_.share-view]:justify-between [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:sm:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:mx-2 mb-6">
 <ShareButtons  
 item={news_details} 
 activeIdx={news_details.id}
    shareOptions={true}
    />
   
     </div> 
     </div>
     <div dangerouslySetInnerHTML={{__html:news_details.excerpt}}className="p-4 mt-20 text-xl leading-9"/>
  
  </div> 
 
  <hr className="h-14 bg-orange-800 w-2 m-auto border border-dotted"/>
  <div className="bg-white my-1 py-10 sm:mx-4 xs:mx-10 sm:m-auto sm:w-11/12 dark:bg-black sm:px-6">
  {xTextx.map((line, index) => (
  <React.Fragment key={index}>
   
    <div dangerouslySetInnerHTML={{__html:line}} className="sm:px-8 py-4 text-xl leading-9 [&_p>a]:hover:bg-gray-800 [&_p>a]:text-green-600 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold [&_figure>div>iframe]:mx-auto [&_figure>div>iframe]:py-4 [&_iframe]:w-11/12"/> 
     {index===2&& related_content?.length>0&& 
    <div> 
      <h2 className="shadow-2xl bg-red-500 text-gray-200 px-2 py-1 mx-4 text-lg w-max font-bold">More on the Topic</h2>
     <div className="sm:flex justify-center border py-4 px-2">     
  {related_content?.slice(0,2).map((ex)=>   
  <div key={ex.node.title + ' ' + Math.random()} className="bg-black py-4 first:border-b first:sm:border-b-0 first:sm:border-r px-3 xs:w-80"> 
  <div className="flex"> 
  <div className=" px-1 w-2/3 flex items-center">
  <h2 className="text-gray-300 md:text-lg font-bold overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{ex.node.title} </h2>
  </div>  
<div className=" px-1 w-2/3"> 
 <Image 
src={ex.node.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={ex.node.featuredImage.node.altText}
/>  
 </div> 

  </div>
   <Link href={`/netflix-naija/news/${ex.node.slug}/`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   </div> 
  )}  
    
  </div>
    </div> }  
  
   </React.Fragment>
  ) )}
<div className="flex flex-wrap mx-8">
  {news_details.contentTags.nodes.map((xy)=> 
    <div key={xy.name +  ' ' + Math.random()} > 
<Link href={`/topic/${xy.slug}/`}><p className="shadow-2xl border text-base font-bold text-green-700 py-5 px-3 mx-2 hover:text-green-400">{xy.name}</p></Link>  
</div>)} 
</div>
  </div>
    </div>  
    <div className="text-xl text-center border py-5 my-11 mx-2 bg-red-700 hover:bg-red-900 font-mono font-bold text-white dark:text-auto ">
  
 <Link href={`/forum?topic=${news_details.slug}/`}><button>Join or Start a conversation on the topic - Go to Forum</button></Link> 
</div>

    <div className='bg-white px-3'> 
<div className='max-w-7xl m-auto'>
   <h2 className='text-2xl text-gray-700 font-bold py-4'>Next</h2>
     </div>
<div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
   <div className='flex' style={{width:'1000px'}}> 
   {next_posts.slice(0,3).map((xy,i)=> 
    <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}>   
    <Link href={`/topic/${ xy.contentTags.nodes[0].slug}/`}></Link> <h3 className='text-red-500 text-sm italic py-1 hover:text-gray-700 cursor-pointer font-bold'>{xy.contentTags.nodes[0].name} </h3>
 
    <Link href={`/netflix-naija/news/${xy.slug}/`}><h2 className="text-gray-800 text-lg font-bold overflow-hidden text-ellipsis hover:text-red-400 cursor-pointer"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link> 
     <div className='py-2 text-sm'> 
        <p className='text-gray-600'>{moment(xy.date).subtract(1, 'hour').fromNow()}</p> 
        <Link href={`/creator/${xy.author.node.slug}/`}>
          <p className='py-2 text-gray-800 font-medium hover:text-red-400 font-bold'>{xy.author.node.name}</p>
        </Link> 
      </div>   
     
    </div>
   )} 
    </div> 
    </div> 
  </div>
    </article>
  )
}

export default NaijaWikiNetflixNewsDetails
