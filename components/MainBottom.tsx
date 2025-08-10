"use client"
  
import { fetchNewPosts } from '@/app/page-bottom'
import { LatestProps, PostXNode } from '@/app/types'
import { dateFormatter } from '@/utils/dateformat'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer' 

const MainBottom = ({ postsXnewsPosts, postsX1,postsX2,postsX3}:{ postsXnewsPosts:PostXNode,postsX1:{  posts:{  
        edges: PostXNode[]
       
      }},postsX2:{  posts:{  
        edges: PostXNode
        
      }},postsX3:{  posts:{  
        edges: PostXNode
        
      }}}) => {
const [scrolledContent, setScrolledContent]=useState<LatestProps[]>([])
const {ref, inView } =useInView();  
const [debouncedValue, setDebouncedValue] = useState<string>('')  
const [hasNewPage, setHasNewPage] = useState(true);

     const posts_all = postsXnewsPosts?.categories?.edges.map((dy)=> dy?.node.posts.edges).flat()  
     const xtUnused= postsX1?.posts?.edges.concat(postsX2.posts?.edges).concat(postsX3.posts?.edges)

const top_x_Posts=[...xtUnused, ...posts_all] 
const loadMorePosts = useCallback(async () => {
 
  const apiP = await fetchNewPosts(debouncedValue); 
  const naijaNew_content = apiP.posts.nodes;
  const hasMorePosts = apiP.posts.pageInfo.hasNextPage;
 
   setScrolledContent(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const uniqueNew = naijaNew_content.filter((item:PostXNode) => !existingIds.has(item.id));
      return [...prev, ...uniqueNew];
    });
 
  setHasNewPage(hasMorePosts);
  if (hasMorePosts) {
    setDebouncedValue(apiP.posts.pageInfo.endCursor);
  } else {
    setDebouncedValue('');
  }
}, [debouncedValue, hasNewPage]);  

useEffect(() => {
  if (hasNewPage) {
    loadMorePosts();
  }
}, [inView, hasNewPage, loadMorePosts]); 


  return (
    <div> 

 <div className='xl:w-11/12 m-auto px-3'>
<div className='flex justify-around items-center py-4'> 
<h2 className='text-5xl font-bold w-max mx-4 font-mono py-6 italic'>News Bin</h2>
<hr className='bg-black h-1 w-3/4 my-4'/>
</div>

<div className='flex bg-black py-6 text-gray-300 italic justify-between mx-4 px-4'>
<p>Special Edition</p>
 <p>{new Date().toDateString()}</p>
 </div>
 {/* {loading&&<p>Loading...</p>} */}
 <div className='py-6'>  
    <div className='grid grid-cols-1 justify-center gap-2 m-auto w-max'> 
      <div>
 { top_x_Posts?.length>0&&top_x_Posts.slice(0,1).map((xy, i)=> 
<div key={i + ' ' + Math.random()} className='border max-w-sm min-[500px]:max-w-md sm:max-w-lg m-auto md:m-0 px-3 py-6 ' > 
<Link href={`/news/${xy.node.slug}/`}>
 
<h2 className='py-4 my-4 text-4xl lg:text-5xl font-bold hover:text-gray-400 px-1' style={{lineHeight:'55px'}} >{xy?.node.title}</h2></Link >
  <div className='text-ellipsis overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${xy.node.slug}/`}><div dangerouslySetInnerHTML={{__html:xy?.node.excerpt}}className='leading-8 xl:px-4 hover:text-gray-400 text-xl' /></Link ></div>  
 <div>
<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black my-1'/> 
  <div className='flex text-gray-400 justify-between py-4 px-2 overflow-hidden'> 
<Link href={`/creator/${xy?.node.author.node.slug}/`}><p className='w-44'>{xy?.node.author.node.name}</p></Link>
<hr className='h-10 bg-black p-0.5 w-auto'/>
  <p className='w-44'>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
</div>  

<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black  my-1'/> 
<div> 
  <Image  
  src={xy?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.node.featuredImage?.node.altText}/>   
  </div>

  <hr className='h-3 bg-gray-500 my-1'/> 
<hr className='h-1 bg-gray-500 my-1'/> 
<div className='flex justify-between py-4 px-3 overflow-hidden first:border-r first:border-r-4 first:border-r-black'> 
<Link href={`/topic/${xy?.node.tags?.nodes[0]?.slug}/`}><p className='hover:text-gray-300 w-32'>{xy?.node.tags.nodes[0]?.name}</p></Link> 
 
  <hr className='h-10 bg-gray-500 p-0.5 w-auto'/> 
  <Link href={`/topic/${xy?.node.tags?.nodes[1]?.slug}/`}><p className='hover:text-gray-300 w-32'>{xy?.node.tags?.nodes[1]?.name}</p></Link>
</div> 
<hr className='h-3 bg-gray-500 my-1'/> 
<hr className='h-1 bg-gray-500 my-1'/>   
</div> 
</div>  
)} 
  
 </div>
  
</div>

  <div className='grid lg:grid-cols-2 justify-center items-center px-10 xl:max-w-6xl mx-auto gap-2'>

     <div className='m-auto max-w-xl lg:m-0 my-4'>
 { top_x_Posts?.length>0&&top_x_Posts.slice(1,4).map((ex)=>
<div className='shadow flex my-1' key={ex?.node.title + ' ' + Math.random()}>
 <div className='w-44 m-1'> 
 <Image
 className='xs:h-28 sm:h-32'
 src={ex?.node.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.node.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-44 xs:w-[200px] sm:w-[280px] mx-2'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/${ex?.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex.node.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8'> 
<Link href={`/creator/${ex?.node.author.node.slug}/`}><p >{ ex?.node.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date?.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
   
  
     <div className='m-auto max-w-xl lg:m-0 my-4'>
 { top_x_Posts?.length>0&&top_x_Posts.slice(4,7).map((ex)=>
<div className='shadow flex my-1' key={ex?.node.title + ' ' + Math.random()}>
 <div className='w-44 m-1'> 
 <Image
 className='xs:h-28 sm:h-32'
 src={ex?.node.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.node.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-44 xs:w-[200px] sm:w-[280px] mx-2'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/${ex?.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex.node.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8'> 
<Link href={`/creator/${ex?.node.author.node.slug}/`}><p >{ ex?.node.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date?.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 </div>

  <div className='my-6'> 
<hr className=' '/> 
<div className='sm:grid grid-cols-2 xl:grid-cols-4 gap-1 py-4 max-w-2xl lg:max-w-max m-auto' > 
 
{ top_x_Posts?.length>0&&top_x_Posts.slice(7,11).map((xy, i)=>
<div className='max-w-sm m-auto py-11 hover:text-gray-300 border-black border-b-4 px-4 sm:h-52' key={i + ' ' + Math.random()}>
<Link href={`/news/${xy.node.slug}/`}>
<h2 className='text-xl font-bold'>{xy.node.title}</h2></Link> 
  <p className='text-sm py-4'>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
  
</div> 

)} 

</div>
<hr /> 
</div> 
 </div>   

</div>
  
  <div className='m-auto py-5 w-full'>  
  <div className='flex border-b shadow justify-around items-center py-6'> 
<h3 className='text-2xl font-bold w-max mx-4 px-2'>What&#39;s New</h3>
<hr className='bg-black h-1 w-2/3 my-4'/>
</div>   
  <div className='md:grid md:grid-cols-2  justify-center  m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { top_x_Posts?.length>0&&top_x_Posts.slice(11,13).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.node.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${xy.node.slug}/`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 ' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy?.node.title}</h2></Link >
  <div className=''>
  <Link href={`/news/${xy.node.slug}/`}> <div dangerouslySetInnerHTML={{__html:xy?.node.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2 overflow-hidden'> 
<Link href={`/creator/${xy?.node.author.node.slug}/`}><p>{ xy?.node.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
</div>
</div>  
)}   
</div> 
<hr className='p-0.5 bg-black'/>


<div className='py-3 md:py-0 md:m-0 md:grid grid-cols-2 lg:block xl:grid justify-center 2xl:grid-cols-4 gap-0 xl:max-w-4xl 2xl:max-w-max xl:m-auto' >
 { top_x_Posts?.length>0&&top_x_Posts.slice(13,17).map((ex)=>
<div className='shadow flex max-w-xl xl:max-w-md m-auto my-3 m-auto' key={ex.node.title + ' ' + Math.random()}>
  <div className='w-44 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-20 xs:h-24 '
  src={ex?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400'>{ex?.node.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.node.author.node.slug}/`}><p >{ ex?.node.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex?.node.date)) }</p>
</div>
</div>
</div>
)} 
 </div>
 <hr className='p-0.5 bg-black'/>

  <div className='md:flex flex-wrap xl:flex-nowrap gap-1 my-11 px-2 md:px-1 m-auto max-w-2xl'> 
 { top_x_Posts?.length>0&&top_x_Posts.slice(17,19).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-xs m-auto my-4'style={{height:'600px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xxs:h-56 md:h-64 xl:h-56'
  src={xy?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.node.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${xy.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} className='text-ellipsis overflow-hidden h-28 py-4 text-2xl font-bold px-3 hover:text-gray-400'>{xy?.node.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/${xy.node.slug}/`}><div style={{ display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html:xy?.node.excerpt}}className='text-ellipsis overflow-hidden h-32 leading-8 px-3 hover:text-gray-400'/></Link ></div>  
<div className='flex text-gray-400 py-4 justify-between px-4'> 
<Link href={`/creator/${ xy?.node.author.node.slug}/`}><p className='hover:text-gray-700 px-2'>{ xy?.node.author.node.name }</p></Link> 
  <p className='px-2'>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
</div>
</div>  
)}  
</div>

 

<div className='md:grid md:grid-cols-2 justify-center m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { top_x_Posts?.length>0&&top_x_Posts.slice(19,21).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.node.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${xy.node.slug}/`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 leading-8' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy?.node.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/${xy.node.slug}/`}> <div dangerouslySetInnerHTML={{__html:xy?.node.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2'> 
<Link href={`/creator/${xy?.node.author.node.slug}/`}><p className='hover:text-gray-700'>{ xy?.node.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
</div>
</div>  
)}  
</div>  
 
<hr className='h-1 w-4/5 m-auto my-4'/>
 <div className='p-3 md:py-0 md:m-0 md:grid grid-cols-2 xl:grid justify-center gap-0 xl:max-w-5xl xl:m-auto' >
 { top_x_Posts?.length>0&&top_x_Posts.slice(21,25).map((ex)=>
<div className='flex m-auto my-3' key={ex.node.title + ' ' + Math.random()}>
  <div className='w-44 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-16 xs:h-24 lg:h-28'
  src={ex?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400'>{ex?.node.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.node.author.node.slug}/`}><p className='hover:text-gray-700 py-4'>{ ex?.node.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex?.node.date)) }</p>
</div>
</div>
</div>
)} 
 </div> 
</div> 
 
  <div className='flex flex-wrap justify-center py-6'>
{ top_x_Posts?.length>0&&top_x_Posts.slice(25,28).map((ex,i)=>
<div className='relative m-3' key={ex?.node.title + ' ' + Math.random()} >
  <div className='max-w-sm m-auto'> 

  <Image
  className='h-56 block'
  src={ex?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.altText}/> 
  
  </div> 
 
  <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 h-full w-full">
    <Link href={`/news/${ex?.node.slug}/`}><div className="text-center px-1">
      <h2 className='text-2xl text-gray-50 hover:text-gray-400'>{ex?.node.title} </h2> 
    </div></Link> 
</div>

  </div>
)}

</div>  

<hr className='h-1 w-4/5 m-auto my-4'/>
 <div className='lg:flex lg:px-3 lg:m-auto justify-between' style={{maxWidth:'1450px'}}> 
<div className='max-w-5xl m-auto xs:px-6 px-2 lg:px-0 lg:m-0 lg:max-w-2xl min-[1100px]:max-w-3xl xl:max-w-4xl min-[1324px]:max-w-5xl'>
<div className='flex shadow-sm px-8 justify-around items-center py-6'>  
<h3 className='text-xl font-bold mx-4 w-full'>Latest News</h3>
<hr className='bg-black h-1 w-4/5 my-4'/>
</div> 
 
 {scrolledContent?.slice(4).map((ex,i)=>
 <div className='shadow m-2 flex' key={ex.title + ' ' + Math.random()}>
  
 <div className='w-1/2 py-6 mx-1'> 
 <Image
 className='xs:h-32 sm:h-44 md:h-56 max-h-64 object-cover'
 src={ex?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.featuredImage?.node.altText}/> 
 
 </div> 
 <div className='w-3/4 xs:w-4/5 mx-2 py-4'> 

 <Link href={`/news/${ex.slug}/`}>
 <h2 className='text-2xl font-bold text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex?.title}</h2></Link > 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>
    <Link href={`/news/${ex.slug}/`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8 my-2 hover:text-gray-400'/></Link >
</div>
 
<div className='flex text-base text-gray-400 justify-between items-center leading-8'> 
<Link href={`/creator/${ ex?.author.node.slug}/`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p></Link> 
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>  
</div>)} 
</div>

<div className='max-w-5xl m-auto xs:px-8 lg:px-0 px-2 lg:m-0 '>
<div className='flex shadow-sm px-8 justify-around items-center py-6'>  
<h3 className='text-xl font-bold mx-4 w-full'>New Collection</h3>
<hr className='bg-black h-1 w-4/5 my-4'/>
</div>

  <div className='lg:m-0 sm:grid grid-cols-2 lg:block gap-1 max-w-3xl m-auto'> 
   {scrolledContent?.slice(0,4).map((ex, i)=>
<div className='shadow-2xl my-4 m-auto max-w-md md:max-w-sm' key={ex.title + ' ' + Math.random()}>
 <div > 
  <Image 
  className='h-60 xs:h-64 sm:h-56'
  src={ex?.featuredImage?.node.sourceUrl } 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.sourceUrl }/>  
  </div>
  <Link href={`/news/${ex.slug}/`}><h2 className='leading-9 my-2 overflow-hidden text-ellipsis text-2xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex?.title}</h2></Link >
   <Link href={`/news/${ex.slug}/`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8 hover:text-gray-400 overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/></Link >
<div className='flex text-gray-400 justify-between items-center py-2 leading-8'> 
<Link href={`/creator/${ ex.author.node.slug}/`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex.date)) }</p>
</div>  
</div>
)}  

</div>   
</div>
  
</div> 
 <div ref={ref} > 
 {hasNewPage&&
<p className="p-4">Loading...</p> 
 } </div> 
  </div>
  )
}

export default MainBottom
