"use client"
import { nextNewsPosts, postNextCategories } from '@/app/data'
import { getGoogleNewsTitles } from '@/app/data/news-data'
import { InnerEdges, PostsNotInPost, PostXNode } from '@/app/types' 
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const location = 'Lagos, Nigeria'; 
const MainPosts = () => {
    const [posts_notInX,setPosts_notInX]=useState([])
 const [isLoading,setIsLoading]=useState(false)
const [top_Posts_notIn_newsPosts, setPosts_notIn_newsPosts] = useState<PostsNotInPost[]>([])
const lastPost= async()=>{
const next_categories_posts= await postNextCategories() 
 const posts_notIn_newsPosts= await nextNewsPosts() 
const xyCategories= posts_notIn_newsPosts?.categories?.edges
 setPosts_notIn_newsPosts(xyCategories) 
 const xtCategories= next_categories_posts?.categories?.edges.map((xy:{node:{children:{edges:[]}}})=> xy.node.children.edges).flat()
   const postCategory_cursor = xtCategories?.map((xy:PostXNode)=> xy?.node?.posts.nodes).flat() 
 setPosts_notInX( postCategory_cursor )

  }
 
  const posts_all= top_Posts_notIn_newsPosts.concat(posts_notInX).map((xy)=> xy?.node?.posts).filter((vx)=> vx?.nodes.length>0)
   
 useEffect(()=>{
  setIsLoading(true)
  if(!isLoading){
  lastPost()
}
 if(posts_all.length>0){
setIsLoading(false)
 }
  const newxTitles=async()=>{
    await getGoogleNewsTitles(location) 
  }
  newxTitles() 
 
},[posts_all])

  return (<>{!isLoading&&
   <div className="bg-white w-full my-8 dark:bg-black">   
  <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 justify-center sm:items-start items-center max-w-2xl md:max-w-max m-auto py-8 gap-2"> 
 
  <div className='max-w-sm m-auto md:m-0 border-r'>   
 { posts_all?.length>0&& posts_all.map((vx)=>vx?.nodes.slice(0,4).map((it, index:number)=> 
 <div key={index} className="px-4">  
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '>
 
   <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  /> 
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>

 <div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0]?.name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>    
</div>  
 </div>}
   {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it?.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>} 
 
 </div>
 ) )} 
  
</div>   

 <div className='max-w-sm m-auto md:m-0 border-r'>   
 { posts_all?.length>0&&posts_all.map((vx)=>vx?.nodes.slice(4,8).map((it, index:number)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 ))} 
  
</div> 
 
</div> 

</div> }

{isLoading&&<p>Loading More...</p>}
 </> )
}

export default MainPosts