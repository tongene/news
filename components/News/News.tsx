"use client"

import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
  
type DataProps={ 
name:string
articles:{ 
nodes:[{
title:string
slug:string
excerpt:string 
date:string 
contentTags:{
  nodes:[{
    id:string 
    name:string 
slug:string 
  }]
}
featuredImage:{
node:{ 
sourceUrl:string 
altText:string  
  } 
}
articlesCategories:{
  nodes:[{
    name:string
  }]
}

  }]
 
}
}

const News = ({newsData}:{newsData:DataProps[]}) => {
  const [activeIndices, setActiveIndices] = useState([0, 1]);
 const news1 = newsData[0]?.articles.nodes
 const news1_name = newsData[0]?.name
 
 const news2 = newsData[1]?.articles.nodes
 const news2_name = newsData[1]?.name

 const news3 = newsData[2]?.articles.nodes
 const news3_name = newsData[2]?.name

 const news4 = newsData[3]?.articles.nodes
 const news4_name = newsData[3]?.name

 const news5 = newsData[4]?.articles.nodes
 const news5_name = newsData[4]?.name

 const news6 = newsData[5]?.articles.nodes
 const news6_name = newsData[5]?.name

 const news7 = newsData[6]?.articles.nodes
 const news7_name = newsData[6]?.name

 const news8 = newsData[7]?.articles.nodes
 const news8_name = newsData[7]?.name

 const news9 = newsData[8]?.articles.nodes
 const news9_name = newsData[8]?.name

 const news10 = newsData[9]?.articles.nodes
 const news10_name = newsData[9]?.name

 const news11 = newsData[10]?.articles.nodes
 const news11_name = newsData[10]?.name

    const left_slide = () => {
      setActiveIndices(([left, right]) => {
        const newLeft = left - 1 < 0 ? newsData.length - 1 : left - 1;
        const newRight = right - 1 < 0 ? newsData.length - 1 : right - 1;
        return [newLeft, newRight];
      });
    };

    const right_slide = () => {
      setActiveIndices(([left, right]) => {
        const newLeft = (left + 1) % newsData.length;
        const newRight = (right + 1) % newsData.length;
        return [newLeft, newRight];
      });
    };
{/* <h2 className='text-2xl text-gray-800 font-bold py-4 text-center'>{news3_name}</h2> */}
  return (
 
    <div className="bg-gray-50">
    <div className="bg-white mx-2 px-2 lg:mx-8 dark:bg-black">
    <h2 className='text-2xl text-gray-200 font-bold py-6 px-3 bg-orange-500'>{news1_name}</h2>
    <hr/>
         <div className='flex flex-wrap xl:flex-nowrap justify-center'style={{maxWidth:'1500px',margin:'0 auto'}} >
 <div className="max-w-5xl m-auto xl:max-w-7xl">
 <div className='xl:border-r sm:flex-row flex-col flex rounded-xl my-4 max-w-4xl xl:max-w-6xl m-auto h-max py-11 md:px-8 lg:px-4 xl:px-0 sm:px-0'>

  {news1.slice(0,1).map((xy,i)=>
<div className='max-w-xl m-auto sm:m-0 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
  <div className="max-w-xs xs:max-w-sm sm:max-w-md m-auto px-1">
<Image
className='rounded-xl'
  width={1200}
  height={675}
  src={xy.featuredImage?.node.sourceUrl}
  alt={xy?.featuredImage?.node.altText }
      />
      <div>
   <Link href={`/news/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 hover:text-gray-700'>{xy.title} </h2></Link>
   <div dangerouslySetInnerHTML={{__html:xy.excerpt}} className="leading-8"/>
 </div>
  <div className='flex py-3'>
  <p className=''>{moment(xy.date).fromNow()} </p>

   </div>
   </div>

</div>
)}
 
   <div className="flex overflow-auto w-56 xxs:w-64 min-[320px]:w-72 min-[360px]:w-80 xs:w-96 sm:w-auto m-auto sm:overflow-hidden pt-4 sm:pt-0 hidden-scroll sm:m-0 px-2 xxs:px-0" >
    <div className='flex sm:block sm:max-w-lg'>
    {news1.slice(1,4).map((xy,i)=>
    <div className='border w-96 xxs:w-96 px-5 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}>
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}/${xy.contentTags.nodes[0].id}`} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>
  <Link href={`/news/article/${xy.slug}`}><h2 className="hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>
      <div className='py-2 text-sm flex flex-wrap'>
      <h3 className="m-1">{xy.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p>

      </div>

    </div>
   )}
    </div>

  </div>

  </div>

<hr/>
 <div className="bg-white rounded-xl">

  <div className="grid sm:grid-cols-2 sm:max-w-6xl sm:m-0 px-5 xs:px-11 sm:px-2 py-8 max-w-xl" >
    {news1.slice(4).map((xy,i)=>
    <div className='pt-2 sm:pt-0 border-b flex my-2 mx-1' key={i + ' ' + Math.random()}>
       <div className='' style={{maxWidth:'20%'}}>
    <Image
className='h-20 rounded-xl object-cover'
  width={1200}
  height={675}
  src={xy.featuredImage?.node.sourceUrl}
  alt={xy.featuredImage?.node.altText}
 /> </div>
 <div className="px-2">
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}/${xy.contentTags.nodes[0].id} `} >
   <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>
  <Link href={`/news/article/${xy.slug}`}><h2 className="font-bold overflow-hidden text-ellipsis hover:text-gray-500 py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2>
  </Link>
      <div className='py-2 text-sm flex flex-wrap '>
      <h3 className="m-1">{xy.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p>

      </div>
      </div>
      </div>
   )}

  </div>
</div>

<h2 className='text-2xl text-gray-200 font-bold py-6 px-3 bg-orange-500 text-center'>{news2_name}</h2>
<hr/>
  <div className='xl:border-r sm:flex-row flex-col flex rounded-xl my-4 max-w-4xl xl:max-w-6xl m-auto h-max py-11 md:px-8 lg:px-4 xl:px-0 sm:px-0'>

{news2.slice(0,1).map((xy,i)=>
<div className='max-w-xl m-auto sm:m-0 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
<div className="max-w-xs xs:max-w-sm sm:max-w-md m-auto px-1">
<Image
className='rounded-xl'
width={1200}
height={675}
src={xy.featuredImage?.node.sourceUrl}
alt={xy?.featuredImage?.node.altText }
    />
    <div>
 <Link href={`/news/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 hover:text-gray-700'>{xy.title} </h2></Link>
 <div dangerouslySetInnerHTML={{__html:xy.excerpt}} className="leading-8"/>
</div>
<div className='flex py-3'>
<p className=''>{moment(xy.date).fromNow()} </p>

 </div>
 </div>

</div>
)}

 <div className="flex overflow-auto w-56 xxs:w-64 min-[320px]:w-72 min-[360px]:w-80 xs:w-96 sm:w-auto m-auto sm:overflow-hidden pt-4 sm:pt-0 hidden-scroll sm:m-0 px-2 xxs:px-0" >
  <div className='flex sm:block sm:max-w-lg'>
  {news2.slice(1,4).map((xy,i)=>
  <div className='border w-96 xxs:w-96 px-5 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}>
 <Link href={`/topic/${xy.contentTags.nodes[0].slug}/${xy.contentTags.nodes[0].id} `} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>
<Link href={`/news/article/${xy.slug}`}><h2 className="hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>
    <div className='py-2 text-sm flex flex-wrap'>
    <h3 className="m-1">{xy.articlesCategories.nodes[0].name} |</h3>
      <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p>

    </div>

  </div>
 )}
  </div>

</div>

</div>
<hr/>
  <div className="grid sm:grid-cols-2 gap-1 justify-center">
 <div className="bg-white rounded-xl my-2 py-2 max-w-lg">
{news2.slice(4).map((x1,i)=>
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}>
    <Image
className='h-20 xxs:h-24 rounded-xl object-cover'
  width={1200}
  height={675}
  src={x1.featuredImage?.node.sourceUrl}
  alt={x1?.featuredImage?.node.altText }
      />  </div>
    <div>
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}/${x1.contentTags.nodes[0].id}`} ><h3 className='text-red-500 text-xl italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link>
   <Link href={`/news/article/${x1.slug}`}><h2 className="hover:text-gray-700 text-xl font-bold overflow-hidden text-ellipsis py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>
   <div className='py-2 flex flex-wrap'>
      <h3 className="m-1 text-xl">{x1.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1'>{moment(x1.date).fromNow()} </p>

      </div>
       </div>
   </div>
)}

</div>

<div className="rounded-xl my-2 py-2 max-w-lg mx-2">

<hr/>

  {news3?.map((x1,i)=>
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2' style={{maxWidth:'30%'}}>
    <Image
className='h-24 rounded-xl object-cover'
  width={1200}
  height={675}
  src={x1.featuredImage?.node.sourceUrl}
  alt={x1?.featuredImage?.node.altText }
      />
      </div>
    <div>
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}/${x1.contentTags.nodes[0].id}`} ><h3 className='text-red-500 text-lg italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link>
   <Link href={`/news/article/${x1.slug}`}><h2 className="hover:text-gray-700 text-xl font-bold overflow-hidden text-ellipsis py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>
   <div className='py-2 flex flex-wrap '>
      <h3 className="m-1text-xl">{x1.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>

      </div>
       </div>
   </div>
)}

</div>
 </div>

 <h2 className='text-2xl text-gray-200 font-bold text-center py-6 px-3 bg-orange-500 '>{news4_name}</h2>
 <div className='xl:border-r sm:flex-row flex-col flex rounded-xl my-4 max-w-4xl xl:max-w-6xl m-auto h-max py-11 md:px-8 lg:px-4 xl:px-0 sm:px-0'>
  {news4?.slice(0,1).map((xy,i)=>
<div className='max-w-xl m-auto sm:m-0 xs:px-11 sm:px-3 sm:max-w-xs md:max-w-md lg:max-w-2xl' key={xy.title}>
  <div className="max-w-xs xs:max-w-sm sm:max-w-md m-auto px-1">
<Image
className='rounded-xl'
  width={1200}
  height={675}
  src={xy.featuredImage?.node.sourceUrl}
  alt={xy?.featuredImage?.node.altText }
      />
      <div>
   <Link href={`/news/article/${xy.slug}`}><h2 className='text-2xl font-bold py-3 hover:text-gray-700'>{xy.title} </h2></Link>
   <div dangerouslySetInnerHTML={{__html:xy.excerpt}} className="leading-8"/>
 </div>
  <div className='flex py-3'>
  <p className=''>{moment(xy.date).fromNow()} </p>

   </div>
   </div>

</div>
)}

   <div className="flex overflow-auto w-56 xxs:w-64 min-[320px]:w-72 min-[360px]:w-80 xs:w-96 sm:w-auto m-auto sm:overflow-hidden pt-4 sm:pt-0 hidden-scroll sm:m-0 px-2 xxs:px-0" >
    <div className='flex sm:block sm:max-w-lg'>
    {news4.slice(1,4).map((xy,i)=>
    <div className='border w-96 xxs:w-96 px-5 xl:px-0 pt-5 sm:pt-0 sm:border-none sm:w-auto' key={i + ' ' + Math.random()}>
   <Link href={`/topic/${xy.contentTags.nodes[0].slug}/${xy.contentTags.nodes[0].id}`} > <h3 className='text-red-500 text-sm italic py-1'>{xy.contentTags.nodes[0].name} </h3></Link>
  <Link href={`/news/article/${xy.slug}`}><h2 className="hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>
      <div className='py-2 text-sm flex flex-wrap'>
      <h3 className="m-1">{xy.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600'>{moment(xy.date).fromNow()}</p>

      </div>

    </div>
   )}
    </div>

  </div>

  </div>

  <hr/>
   <div className="xs:grid grid-cols-2 gap-1 justify-center">
  <div className="bg-white rounded-xl my-2 py-2 max-w-lg">
{news4.slice(4).map((x1,i)=>
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2 gap-3' key={i + ' ' + Math.random()}>
    <div style={{maxWidth:'30%'}}>
    <Image
className='h-24 rounded-xl object-cover'
  width={1200}
  height={675}
  src={x1.featuredImage?.node.sourceUrl}
  alt={x1?.featuredImage?.node.altText }
      />  </div>
    <div>
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}/${x1.contentTags.nodes[0].id}`} ><h3 className='text-red-500 text-lg italic p-1'>{x1.contentTags.nodes[0].name} </h3></Link>
   <Link href={`/news/article/${x1.slug}`}><h2 className="hover:text-gray-700 text-xl font-bold overflow-hidden text-ellipsis py-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>
   <div className='py-2 flex flex-wrap'>
      <h3 className="m-1 text-xl">{x1.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1'>{moment(x1.date).fromNow()} </p>

      </div>
       </div>
   </div>
)}

</div>
  <div className="rounded-xl my-2 py-2 max-w-lg">
{news5.map((x1,i)=>
  <div className='border-b mx-1 pt-5 sm:pt-0 py-5 flex my-2 gap-1' key={i + ' ' + Math.random()}>
    <div style={{maxWidth:'30%'}} >
    <Image
className='h-24 rounded-xl object-cover'
  width={1200}
  height={675}
  src={x1.featuredImage?.node.sourceUrl}
  alt={x1?.featuredImage?.node.altText }
      />  </div>
    <div>
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}/${x1.contentTags.nodes[0].id}`} ><h3 className='text-red-500 text-lg italic p-1 '>{x1.contentTags.nodes[0].name} </h3></Link>
   <Link href={`/news/article/${x1.slug}`}><h2 className="hover:text-gray-700 text-xl font-bold overflow-hidden text-ellipsis p-1 px-2"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>
   <div className='py-2 text-sm flex flex-wrap '>
      <h3 className="m-1">{x1.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600 dark:text-gray-200'>{moment(x1.date).fromNow()} </p>

      </div>
       </div>
   </div>
)}

</div>
</div>
</div>
  <div className="xl:max-w-3xl">
  <div className="md:flex xl:block ">
  <div className="rounded-xl my-4 xl:mx-2 m-auto max-w-xl md:max-w-md min-[900px]:max-w-xl lg:max-w-2xl xl:max-w-xl h-max">
  {news6.map((x1,i)=>
  <div className='border-b mx-1 px-3 pt-5 sm:pt-0 py-3 flex my-2' key={i + ' ' + Math.random()}>
    <div className='px-2 py-2 ' style={{maxWidth:'30%'}}>
    <Image
className='h-32 xl:h-36 rounded-xl object-cover'
  width={1200}
  height={675}
  src={x1.featuredImage?.node.sourceUrl}
  alt={x1?.featuredImage?.node.altText }
      />  </div>
    <div className="max-w-lg py-4">
  <Link href={`/topic/${x1.contentTags.nodes[0].slug}/${x1.contentTags.nodes[0].id}`} ><h3 className='text-red-500 text-xl italic py-1'>{x1.contentTags.nodes[0].name} </h3></Link>
   <Link href={`/news/article/${x1.slug}`}><h2 className="hover:text-gray-700 text-xl font-bold overflow-hidden text-ellipsis p-1"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{x1.title}</h2></Link>
   <div className='py-2 flex flex-wrap'>
      <h3 className="m-1 text-lg">{x1.articlesCategories.nodes[0].name} |</h3>
        <p className='m-1 text-gray-600'>{moment(x1.date).fromNow()} </p>

      </div>
       </div>
   </div>
)}
</div>
<div className="">
 <div className="bg-white dark:bg-black rounded-xl my-1 px-2 md:mx-1 overflow-hidden py-4 my-4 max-w-xs xs:max-w-sm m-auto">
<h2 className='text-3xl font-bold text-center  opacity-80 border-b'>{news7_name} </h2>
<div className='flex md:block xl:flex justify-between'>
 { news7.slice(0,2).map((it, index)=>
 activeIndices.includes(index) &&
<div
key={index}
className='overflow-hidden first:border-r first:md:border-r-0 first:md:border-b w-80 xl:w-56 md:w-auto mx-2 xl:mx-0 px-1 pt-3 max-w-sm first:xl:border-b-0 first:xl:border-r'>
  <Image
  className='w-max mb-3 md:mb-5 md:m-auto xl:h-24'
  src={it.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={it.featuredImage.node.altText}
  />
<div className='my-3 sm:my-0 md:px-1 '>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700  md:my-0 md:py-0 font-bold text-xl'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-700'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>

 </div>
 )}

</div>

 <div className="flex justify-end">
 <div onClick={left_slide} className='text-xl text-gray-400 bg-opacity-90 cursor-pointer p-2'>
 <FontAwesomeIcon icon={faAngleLeft}/>
 </div>
 <div onClick={right_slide} className='text-xl text-gray-400 bg-opacity-90 cursor-pointer p-2'>
 <FontAwesomeIcon icon={faAngleRight}/>
 </div>
 </div>

</div>

  <div className='bg-white dark:bg-black max-w-xs xs:max-w-sm m-auto xl:m-1'>
 { news7.slice(2).map((it, index)=>

<div
key={index}
className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3'>
<div className='my-3 sm:my-0 md:px-1 '>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold text-xl'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-700'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>

 </div>
 )}

</div>
</div>
</div>
 </div>
  </div>

 </div>  

  <div className="bg-white w-full my-8">
 <div className="xs:grid grid-cols-2 justify-center xs:items-start items-center lg:grid-cols-4 max-w-2xl lg:max-w-max m-auto py-8 ">
  <div className='max-w-sm m-auto  border-r xs:m-0'>
 { news8.slice(0,5).map((it, index)=>
 <div key={index} className="px-4">
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '>
     <Image
className='rounded-xl object-cover'
  width={1200}
  height={675}
  src={it.featuredImage?.node.sourceUrl}
  alt={it?.featuredImage?.node.altText }
  />
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2">
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link>
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>
</div>
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-700'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}

 </div>
 )}

</div>
 <div className='max-w-sm m-auto border-r xs:m-0'>
 { news9.slice(0,5).map((it, index)=> 
 <div key={index} className="px-4">
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '>
  <Image
className='rounded-xl object-cover'
  width={1200}
  height={675}
  src={it.featuredImage?.node.sourceUrl}
  alt={it?.featuredImage?.node.altText }
  />
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2">
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end underline hover:text-gray-700'>{it.contentTags.nodes[0].name } | </h4></Link>
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>
</div>
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-700'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}

 </div>
 )}

</div>

<div className='max-w-sm m-auto xs:m-0 border-r'>
 { news10.slice(0,5).map((it, index)=>
 <div key={index} className="px-4">
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '>
     <Image
className='rounded-xl object-cover'
  width={1200}
  height={675}
  src={it.featuredImage?.node.sourceUrl}
  alt={it?.featuredImage?.node.altText }
  />
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2">
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.contentTags.nodes[0].name } | </h4></Link>
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>
</div>
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-700'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}

 </div>
 )}

</div>

 <div className='max-w-sm m-auto xs:m-0 border-r'>
 { news11.slice(0,5).map((it, index)=>
 <div key={index} className="px-4">
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '>
     <Image
className='rounded-xl object-cover'
  width={1200}
  height={675}
  src={it.featuredImage?.node.sourceUrl}
  alt={it?.featuredImage?.node.altText }
  />
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2">
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end underline hover:text-gray-700'>{it.contentTags.nodes[0].name } | </h4></Link>
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>
</div>
 </div>}
 {index !==0 &&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/article/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-700 md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}/${it.contentTags.nodes[0].id}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link>
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}

 </div>
 )}

</div>
</div>

</div>  
    </div>
 )
}

export default News
