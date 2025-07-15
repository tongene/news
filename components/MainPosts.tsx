"use client"
import { PostXNode } from '@/app/types' 
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const MainPosts = ({posts_notIn_newsPosts}:{posts_notIn_newsPosts:PostXNode  }) => {
 const postsY = posts_notIn_newsPosts.categories.edges.map((dy)=> dy ).flat().map((xy )=> xy?.node?.posts.edges).flat() 
// const posts_all= postsY.map((xy)=> xy?.node?.posts).filter((vx)=> vx?.nodes.length>0) 
 
  return ( 
   <div className="bg-white w-full my-8 dark:bg-black">   
 <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 justify-center sm:items-start items-center max-w-2xl md:max-w-max m-auto py-8 gap-2"> 
 
 <div className='max-w-sm m-auto md:m-0 border-r'>   
 { postsY?.length>0&& postsY.slice(0,3).map((it, index:number)=> 
 <div key={index} className="px-4">  
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '>
 
   <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it?.node?.featuredImage?.node.sourceUrl}     
  alt={it?.node?.featuredImage?.node.altText } 
  /> 
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/${it?.node?.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.node?.title}</h3></Link>

 <div className="flex flex-wrap py-2"> 
<Link href={`/${it?.node?.tags.nodes[0]?.slug}/`}><h4 className='md:text-end underline hover:text-gray-500'>{it?.node?.tags.nodes[0]?.name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it?.node?.date).subtract(1, 'hour').fromNow()}</span>
</div>    
</div>  
 </div>}
   {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/${it?.node?.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.node?.title}</h3></Link>
<Link href={`/${it?.node?.tags.nodes[0]?.slug}/`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it?.node?.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it?.node?.date).subtract(1, 'hour').fromNow()}</span>
</div>} 
 
 </div>
 ) } 
  
</div>   
  
 <div className='max-w-sm m-auto md:m-0 border-r'>   
 { postsY?.length>0&&postsY.slice(3,6).map((it, index:number)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.node.featuredImage?.node.sourceUrl}     
  alt={it?.node.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/${it.node.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.node.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/${it.node.tags.nodes[0].slug}/`}><h4 className='md:text-end underline hover:text-gray-500'>{it.node.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.node.date).subtract(1, 'hour').fromNow()}</span>
</div> 
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/${it.node.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.node.title}</h3></Link>
<Link href={`/${it.node.tags.nodes[0]?.slug}/`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.node.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.node.date).subtract(1, 'hour').fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
 
</div>  

</div>  

  )
}

export default MainPosts