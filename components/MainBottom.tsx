"use client"
 
import { fetchNewPosts, postLastAndScrolledCategories } from '@/app/page-bottom'
import { InnerEdges, LatestProps, PostsNotInPost, PostXNode } from '@/app/types'
import { dateFormatter } from '@/utils/dateformat'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

type PostAll={
nodes:{
  slug: string,
  title:string,
  excerpt:string,
  date:string,
  author:{
    node:{
      slug:string,
      name:string
    }
  },
  featuredImage: {
    node: {
      sourceUrl: string,
      altText:string,
    },
  },
  tags: {
    nodes: Array<{
      slug?: string;
      name?: string;
    }>;
  } 
}[]
}

const MainBottom = ({posts_all, top_Posts_notIn_newsPosts, postCategory_cursor }:{posts_all:PostAll[], postCategory_cursor:string[],top_Posts_notIn_newsPosts:PostsNotInPost[]}) => {
    const [scrolledContent, setScrolledContent]=useState<LatestProps[]>([])
    const {ref, inView } =useInView(); 
    const [debouncedValue, setDebouncedValue] = useState('') 
    const [top_Last_categories, setLast_categories]=useState<PostXNode[]>([]) 
     const last_two_categories = top_Posts_notIn_newsPosts?.map((xt)=>xt.cursor)
     const last_cursors=postCategory_cursor?.concat(last_two_categories)??[]
     const post_end_cursor=top_Last_categories&&top_Last_categories[0]?.node.posts.pageInfo.endCursor
     
    const postsEnd =async()=>{ 
     const last_categories = await postLastAndScrolledCategories( last_cursors)
     setLast_categories(last_categories)
     
      }
      useEffect(()=>{
        postsEnd()
     
     },[]) 
     
  
    const [end_post_cursor, setEnd_post_cursor] = useState(post_end_cursor);
  
    const loadMorePosts = useCallback(async () => {
      if(last_cursors.length>0){
           const apiP = await fetchNewPosts(2, debouncedValue, last_cursors );
           const post_res=apiP?.categories?.nodes.map((xy:{ posts:{edges: InnerEdges[]}})=> xy.posts) 
           const post_content = post_res?.map((ex:{ nodes: InnerEdges[]}) => ex.nodes).map((xy:any)=> xy)
            .flat();
           if (post_content?.length>0) {
             setScrolledContent(prevContent => [...prevContent, ...post_content]);
           } 

          const hasMorePosts =  apiP?.categories?.nodes.map((xy:{ posts:{edges: InnerEdges[],pageInfo:{ 
            endCursor:string
            hasNextPage:boolean
          }}})=> xy.posts.pageInfo.hasNextPage)
          if (hasMorePosts && end_post_cursor !== null) { 
             const nextCursor =apiP?.categories?.nodes.map((xy:{ posts:{edges: InnerEdges[],pageInfo:{ 
              endCursor:string
              hasNextPage:boolean
            }}})=> xy.posts.pageInfo.endCursor )
             setEnd_post_cursor(nextCursor[0]); 
           } else {
             setEnd_post_cursor('');
           } 
          if( scrolledContent.length===20 )setEnd_post_cursor('');
          }
         }, [debouncedValue, inView, last_cursors]);  
           
         useEffect(() => { 
           if (inView&& debouncedValue !== null ) {
             loadMorePosts(); 
         }
   }, [loadMorePosts]);
   
    useEffect(() => {
      const handler = setTimeout(() => {
      setDebouncedValue(end_post_cursor)
      }, 500)
  
      return () => {
        clearTimeout(handler)
      }
    }, [end_post_cursor , 500])

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
 
<div className='py-6'> 
    <div className='md:flex flex-wrap xl:flex-nowrap justify-center gap-3  m-auto'> 
      <div>
{ posts_all?.length>0&&posts_all[4]?.nodes.slice(0,1).map((xy, i)=> 
<div className='border max-w-lg m-auto md:m-0 px-3 py-6 h-max' key={i + ' ' + Math.random()}> 
<Link href={`/news/topic/${xy.slug}`}>
<h2 className='py-4 my-4 text-4xl lg:text-5xl font-bold w-4/5 hover:text-gray-400 px-1'style={{lineHeight:'50px'}}>{xy?.title}</h2></Link >
  <div className='text-ellipsis overflow-hidden h-36' style={{display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/topic/${xy.slug}`}><div dangerouslySetInnerHTML={{__html:xy?.excerpt}}className='leading-8 py-4 xl:px-4 hover:text-gray-400' /></Link ></div>  
 <div>
<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black my-1'/> 
<div className='flex text-gray-400 justify-between py-4 px-4 overflow-hidden'> 
<Link href={`/creator/${xy?.author.node.slug}`}><p>{xy?.author.node.name}</p></Link>
<hr className='h-10 bg-black p-0.5 w-auto'/>
  <p className='px-3 '>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
</div>

<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black  my-1'/> 
<div> 
  <Image  
  src={xy?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.featuredImage?.node.altText}/>   
  </div>

  <hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black my-1'/> 
<div className='flex text-gray-600 justify-between py-4 px-4 overflow-hidden first:border-r first:border-r-4 first:border-r-black'> 
<Link href={`/topic/${xy?.tags?.nodes[0]?.slug}`}><p className='hover:text-gray-300 px-4 '>{xy?.tags.nodes[0]?.name}</p></Link> 
 
  <hr className='h-10 bg-black p-0.5 w-auto'/> 
  <Link href={`/topic/${xy?.tags?.nodes[1]?.slug}`}><p className='hover:text-gray-300 px-4 '>{xy?.tags?.nodes[1]?.name}</p></Link>
</div> 
<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black  my-1'/>   
</div> 
</div>  
)}
<div className='m-auto max-w-lg lg:m-0 '>
 { posts_all?.length>0&&posts_all[4]?.nodes.slice(1,5).map((ex)=>
<div className='shadow flex w-full' key={ex.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/4 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 lg:h-20'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 </div>


 <div className='m-auto my-11 px-2 md:px-1 max-w-sm md:m-0'> 
 { posts_all?.length>0&&posts_all[4]?.nodes.slice(7).map((xy, i)=> 
<div className='shadow-2xl max-w-sm m-auto my-2 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/topic/${xy.slug}`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy?.title}</h2></Link >
  <div className=''>
  <Link href={`/news/topic/${xy.slug}`}> <div dangerouslySetInnerHTML={{__html:xy?.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2 overflow-hidden'> 
<Link href={`/creator/${xy?.author.node.slug}`}><p>{ xy?.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
</div>
</div>  
)}  
</div>

<div className='col-span-4 lg:flex xl:col-span-1 xl:block justify-center'> 
<div className='m-auto max-w-lg lg:m-0 '>
 { posts_all?.length>0&&posts_all[5]?.nodes.slice(0,5).map((ex)=>
<div className='shadow flex w-full' key={ex.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/4 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 lg:h-20'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div> 
 
<div className='m-auto max-w-lg lg:m-0 '>
 { posts_all?.length>0&&posts_all[5]?.nodes.slice(5,10).map((ex)=>
<div className='shadow flex ' key={ex.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/4 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 lg:h-20'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div> 
</div>


</div>
<div className='my-6'> 
<hr className=' '/> 
<div className='sm:grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 text-gray-600 py-4 max-w-2xl lg:max-w-max m-auto' > 
 
{ posts_all?.length>0&&posts_all[6]?.nodes.slice(0,9).map((xy, i)=>
<div className='max-w-sm m-auto py-11 hover:text-gray-300 border-black border-b-4 px-4 sm:h-52' key={i + ' ' + Math.random()}>
<Link href={`/news/topic/${xy.slug}`}>
<h2 className='text-xl font-bold'>{xy.title}</h2></Link> 
  <p className='text-sm py-4'>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
  
</div> 

)} 

</div>
<hr /> 
</div> 
 </div>  

</div>
 
  <div className='m-auto py-5 w-full'>  
<div className='flex border-b shadow justify-around items-center py-6'> 
<h3 className='text-xl font-bold w-max mx-4 px-2'>What&#39;s New</h3>
<hr className='bg-black h-1 w-2/3 my-4'/>
</div>  

<div className='md:grid md:grid-cols-2 lg:grid-cols-4 justify-center lg:items-start m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { posts_all?.length>0&&posts_all[7]?.nodes.slice(0,4).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/topic/${xy.slug}`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 ' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy?.title}</h2></Link >
  <div className=''>
  <Link href={`/news/topic/${xy.slug}`}> <div dangerouslySetInnerHTML={{__html:xy?.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2 overflow-hidden'> 
<Link href={`/creator/${xy?.author.node.slug}`}><p>{ xy?.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
</div>
</div>  
)}   
</div> 

<div className='py-3 md:py-0 md:m-0 md:grid grid-cols-2 lg:block xl:grid justify-center 2xl:grid-cols-3 gap-0 xl:max-w-4xl 2xl:max-w-7xl xl:m-auto' >
 { posts_all?.length>0&&posts_all[7]?.nodes.slice(4).map((ex)=>
<div className='shadow flex max-w-xl xl:max-w-md m-auto my-3 m-auto' key={ex.title + ' ' + Math.random()}>
  <div className='w-1/4 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-16 xs:h-20 '
  src={ex?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400'>{ex?.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 
 </div>
 
  <div className='md:flex flex-wrap xl:flex-nowrap gap-1 my-11 px-2 md:px-1 m-auto max-w-2xl xl:max-w-7xl'> 
 { posts_all?.length>0&&posts_all[8]?.nodes.slice(0,4).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-xs m-auto my-4'style={{height:'600px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xxs:h-56 md:h-64 xl:h-56'
  src={xy?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/topic/${xy.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} className='text-ellipsis overflow-hidden h-28 py-4 text-2xl font-bold px-3 hover:text-gray-400'>{xy?.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/topic/${xy.slug}`}><div style={{ display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html:xy?.excerpt}}className='text-ellipsis overflow-hidden h-32 leading-8 px-3 hover:text-gray-400'/></Link ></div>  
<div className='flex text-gray-400 py-4 justify-between px-4'> 
<Link href={`/creator/${ xy?.author.node.slug}`}><p className='hover:text-gray-700 px-2'>{ xy?.author.node.name }</p></Link> 
  <p className='px-2'>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
</div>
</div>  
)}  
</div>


<div className='md:grid md:grid-cols-2 lg:grid-cols-4 justify-center lg:items-start m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { posts_all?.length>0&&posts_all[8]?.nodes.slice(4,8).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/topic/${xy.slug}`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 leading-8' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy?.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/topic/${xy.slug}`}> <div dangerouslySetInnerHTML={{__html:xy?.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2'> 
<Link href={`/creator/${xy?.author.node.slug}`}><p className='hover:text-gray-700'>{ xy?.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
</div>
</div>  
)}  
</div> 
 
 
<hr className='h-1 w-4/5 m-auto my-4'/>

<div className='py-3 md:py-0 md:m-0 md:grid grid-cols-2 lg:block xl:grid justify-center 2xl:grid-cols-3 gap-0 xl:max-w-4xl 2xl:max-w-7xl xl:m-auto' >
 { posts_all?.length>0&&posts_all[9]?.nodes.slice(0,6).map((ex)=>
<div className='shadow flex max-w-xl xl:max-w-md m-auto my-3 m-auto' key={ex.title + ' ' + Math.random()}>
  <div className='w-1/4 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-16 xs:h-20 '
  src={ex?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/topic/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400'>{ex?.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.author.node.slug}`}><p className='hover:text-gray-700 py-4'>{ ex?.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 
 </div>  
</div> 
 
  <div className='flex flex-wrap justify-center py-6'>
{ posts_all?.length>0&&posts_all[9]?.nodes.slice(6).concat(posts_all[0]?.nodes.slice(5)).map((ex,i)=>
<div className='relative m-3' key={ex?.title + ' ' + Math.random()} >
  <div className='max-w-sm m-auto'> 

  <Image
  className='h-56 block'
  src={ex?.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.altText}/> 
  
  </div> 
 
  <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 h-full w-full">
    <Link href={`/news/topic/${ex?.slug}`}><div className="text-center">
      <h2 className='text-2xl text-gray-50 hover:text-gray-400'>{ex?.title} </h2> 
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
 
{scrolledContent?.slice(3).map((ex,i)=>
 <div className='shadow m-2 flex' key={ex.title + ' ' + Math.random()}>
  
 <div className='w-1/2 py-6 mx-1'> 
 <Image
 className='xs:h-28 sm:h-40 md:h-56 max-h-64 object-cover'
 src={ex?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.featuredImage?.node.altText}/> 
 
 </div> 
 <div className='w-3/4 xs:w-4/5 mx-1 py-4'> 

 <Link href={`/news/topic/${ex.slug}`}>
 <h2 className='p-4 text-2xl font-bold text-ellipsis overflow-hidden h-20' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex?.title}</h2></Link > 
  <div className='text-ellipsis overflow-hidden h-28' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>
    <Link href={`/news/topic/${ex.slug}`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8 p-4 hover:text-gray-400'/></Link >
</div>
 
<div className='flex text-base text-gray-400 justify-between items-center leading-8 px-8'> 
<Link href={`/creator/${ ex?.author.node.slug}`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p></Link> 
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

<div className='lg:m-0 sm:flex lg:block gap-1'> 
   {scrolledContent?.slice(0,3).map((ex, i)=>
<div className='shadow-2xl my-4 m-auto max-w-md md:max-w-sm' key={ex.title + ' ' + Math.random()}>
 <div > 
  <Image 
  className='h-3/4 sm:h-44 md:h-56'
  src={ex?.featuredImage?.node.sourceUrl } 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.sourceUrl }/>  
  </div>
  <Link href={`/news/topic/${ex.slug}`}><h2 className='p-4 text-2xl font-bold hover:text-gray-400'>{ex?.title}</h2></Link >
   <Link href={`/news/topic/${ex.slug}`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8  hover:text-gray-400 overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/></Link >
<div className='flex text-gray-400 justify-between items-center p-4 leading-8 '> 
<Link href={`/creator/${ ex?.author.node.slug}`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>  
</div>
)}  

</div> 
</div>
  
</div>  

{end_post_cursor !== null ?
<p ref={ref} className="p-4">Loading...</p>: ''
 } 
  </div>
  )
}

export default MainBottom
