"use client" 
import React, { useEffect, useState } from 'react' 
import MainSlider from './MainSlider'
import Image from 'next/image'
import { CronJob } from "cron";
import { dateFormatter } from '@/utils/dateformat'
import Link from 'next/link'  
import moment from 'moment'
//import { nextNewsPosts, postCategories, postNextCategories } from '@/app/data'
import { CineProps, Cursors, InnerEdges, PostsNotInPost, PostXNode, SideNode } from '@/app/types'  
import MainBottom from './MainBottom'
import SideBar from './Side'
import { getGoogleNewsTitles } from '@/app/data/news-data'
import { replaceSpecialCharacters } from "@/utils/replacechars"; 
import { processImgs } from "@/utils/process_imgs";
 import { processSbImages } from "@/utils/processImages";
const location = 'Lagos, Nigeria'; 
interface ObjType { 
  title: string[];
  slug:string  
  img_url: string
   desc: string[]
   day: string[]
   loc_slug: string  
   genre: string 
   genre_slug:string  
   location:string 
}
interface CineType { 
  title: string 
  img_url: string
   genre: string 
   url:string 
   release_date:string 
   dur:string 
}
type EvObjType= {
   titleAObj:any ; 
}

const Main = ({top_PostsData, sidebarItems, news_outline, coming_titles}:{top_PostsData:InnerEdges[], sidebarItems:Cursors[], news_outline:SideNode[], coming_titles:CineProps[]}) => { 
const [activeSet, setActiveSet]=useState(true)
const [actIdx ,setActIdx]=useState(-1)
const [categoryPost,setCategoryPost]=useState<InnerEdges[]>([])
const [categoryName,setCategoryName]=useState('') 
const [top_PostsCa, setTopPostsCa]=useState<PostXNode[]>([])
 
const [top_SidePanelCursors, setSidePanelCursors]=useState<PostXNode[]>([])
const [top_SidebarItems, setSidebarItems]=useState<PostXNode[]>([])
const [top_Posts_notIn_newsPosts, setPosts_notIn_newsPosts] = useState<PostsNotInPost[]>([])
// const [top_Last_categories, setLast_categories]=useState([])   
 
// const postsTop = async()=>{  
// const post_data = await postCategories()
// const postCategory_Children =(post_data?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[]
// setTopPostsCa(postCategory_Children ) 

// }
// useEffect(()=>{
//   postsTop()

// },[top_PostsCa])
// const postCategory_cursor =(top_PostsCa?.map((xy)=> xy.node?.posts?.edges as InnerEdges ))?.flat()?.map((t)=> t?.cursor)??[]  

// const postsNotinPosts =async()=>{  
// const posts_notIn_newsPosts= await nextNewsPosts()
// const xtCategories= posts_notIn_newsPosts?.categories?.edges
//   setPosts_notIn_newsPosts(xtCategories) 
//   }

//   useEffect(()=>{
//    postsNotinPosts() 
//  },[]) 
  
// useEffect(()=>{
// //setCategoryPost(top_PostsData)
  
// const currentPosts= top_PostsCa?.flat()?.filter((ex)=> ex?.node?.name=== categoryName)?.map((xy)=> xy?.node?.posts).map((ex)=> ex?.edges as InnerEdges).flat()
// setCategoryPost(currentPosts)
 
// // else { 
// // setCategoryPost(top_PostsData)  
// // }

// },[categoryName])

// const lastPost= async()=>{
//   const next_categories_posts= await postNextCategories(postCategory_cursor)
//  const xtCategories= next_categories_posts?.categories?.edges.map((xy:{node:{children:{edges:[]}}})=> xy.node.children.edges).flat() 
//  const xpostx= top_Posts_notIn_newsPosts.concat(xtCategories) 
// setPosts_notIn_newsPosts(xpostx)
// }
// useEffect(()=>{ 
// if(top_Posts_notIn_newsPosts.length> 0){
//   lastPost()
// }

// },[lastPost])

  const changeSet = () => {
     setActiveSet(true)
     setActIdx(-1);
     setCategoryName('')  
   };
 
  const changeView = (i:number,name:string) =>{
    setActiveSet(false)
    setActIdx(i);
    setCategoryName(name) 
  
    }; 
//  const posts_all= top_Posts_notIn_newsPosts?.map((xy)=> xy?.node.posts).filter((vx)=> vx.nodes.length>0)
// useEffect(()=>{
//   const newxTitles=async()=>{
//     await getGoogleNewsTitles(location) 
//   }
//   newxTitles()

// },[])
// useEffect(()=>{
//   CronJob.from({
//     cronTime: '10 8 * * *', 
//     onTick: dailyEv3(),
//     start: true,
//     timeZone: 'Africa/Lagos'
//     });
  
//       CronJob.from({
//         cronTime: '10 8 * * *',  
//         onTick: dailyWiki(),
//         start: true,
//         timeZone: 'Africa/Lagos'
//       }); 
// },[])
  return ( 
    <div> 
    <div className="lg:flex justify-center sm:px-11 px-4 m-auto" style={{maxWidth:'1700px'}}> 
<div className='max-w-7xl mx-auto'>  

  <div className='lg:flex xl:px-4'> 
 <div className='py-20 md:px-1 m-auto' > 
<div className='py-5'>
<div className='flex border-b shadow-sm justify-around items-center '> 
<h3 data-test="header-1" className='text-xl font-bold w-60'>Don&#39;t Miss</h3>  
 <hr className='bg-black h-1 w-3/4 my-4'/>
 <div className='w-2/3' >
   <ul className='flex justify-end flex-wrap py-2'> 
  <li 
      className={activeSet ? 
        'font-bold text-base cursor-pointer text-gray-500 mx-2 decoration-cyan-400 underline decoration-4' : 
        'text-base cursor-pointer text-gray-500 mx-2'} 
           onClick={changeSet} >
      All
    </li> 
    {top_PostsCa?.map((xy, idx) =>  
      <li 
        className={actIdx === idx ? 
          'font-bold text-base cursor-pointer text-gray-500 mx-2 decoration-cyan-400 underline decoration-4 hover:text-gray-800' : 
          'text-base cursor-pointer text-gray-400 mx-2 hover:text-gray-800'} 
          onClick={() => changeView(idx, xy.node.name)}  
        key={xy.node.name + ' ' + Math.random()}>
        {xy.node.name}
      </li> 
    )}   
  </ul> 
</div> 
</div>  
 
</div>

  <div className='lg:flex justify-center max-w-7xl m-auto'> 
<div className='px-2 m-auto my-8 xs:max-w-md lg:max-w-xl'> 
 {!categoryName&&top_PostsData.length>0?top_PostsData?.slice(0,1).map((ex, i)=>
<div className='shadow-2xl' key={ex.node.title + ' ' + Math.random()}>
  <div className='h-3/4 my-2'> 
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.sourceUrl }/>  
  </div>
 
  <Link href={`/news/topic/${ex.node.slug}`} prefetch={false}><h2 className='overflow-hidden text-ellipsis text-xl lg:text-2xl xl:text-3xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link >
  <hr className='my-2'/>
  <Link href={`/news/topic/${ex.node.slug}`}prefetch={false}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link >
 
<div className='flex text-gray-400 justify-between items-center py-4 leading-8 '> 
<Link href={`/creator/${ex.node?.author.node.slug}`}prefetch={false}><p>{ ex.node?.author.node.name }</p></Link>  
 <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
</div>  
</div>
):<> {categoryName==='Fake News'?<p className="italic text-xl p-4">In 2025, there has been at least 30 fake news and propaganda circulating the internet. About 27 of those in January alone. Be careful what you read. The good things is, we are here to fact-check the news.</p> :''}
{categoryPost?.slice(0,1).map((ex, i)=>
  <div className='shadow-2xl' key={ex.node.title + ' ' + Math.random()}>   
    <div className='h-3/4 my-2'>     
    <Image 
    src={ex?.node.featuredImage?.node.sourceUrl } 
    width={1200} 
    height={675} 
    alt={ex?.node.featuredImage?.node.sourceUrl }/>  
    </div>
   
    <Link href={`/news/topic/${ex.node.slug}`} prefetch={false}><h2 className='overflow-hidden text-ellipsis text-xl lg:text-2xl xl:text-3xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link >
    <hr className='my-2'/>
    <Link href={`/news/topic/${ex.node.slug}`}prefetch={false}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link >
   
  <div className='flex text-gray-400 justify-between items-center py-4 leading-8 '> 
  <Link href={`/creator/${ex.node?.author.node.slug}`}prefetch={false}><p>{ ex.node?.author.node.name }</p></Link>  
   <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
  </div>  
  </div>
  )}
 </>}  

</div>

  <div className='max-w-md my-8 m-auto xl:max-w-xl'>
  {!categoryName?top_PostsData?.slice(1).map((ex)=>
<div className='shadow flex my-6 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title + ' ' + Math.random()}>
  <div className='w-1/3 m-2 py-6 md:py-0'> 
  <Image
  className='h-24 lg:h-20 xl:h-24'
  src={ex?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex?.node.featuredImage?.node.altText}/> 
  
  </div>

  <div className='w-4/5 mx-2 py-6 md:py-0 md:pb-4'> 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/topic/${ex.node.slug}`}prefetch={false}><h2 className='font-bold text-xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.node.author.node.slug}`}prefetch={false}><p >{ ex?.node.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
):categoryPost?.slice(1).map((ex)=>
  <div className='shadow flex my-6 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title + ' ' + Math.random()}>
    <div className='w-1/3 m-2 py-6 md:py-0'> 
    <Image
    className='h-24 lg:h-20 xl:h-24'
    src={ex?.node.featuredImage?.node.sourceUrl} 
    width={1200} 
    height={675} 
    alt={ex?.node.featuredImage?.node.altText}/> 
    
    </div>
  
    <div className='w-4/5 mx-2 py-6 md:py-0 md:pb-4'> 
    <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
    <Link href={`/news/topic/${ex.node.slug}`}prefetch={false}><h2 className='font-bold text-xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
   </div>
  <div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
  <Link href={`/creator/${ ex?.node.author.node.slug}`}prefetch={false}><p >{ ex?.node.author.node.name }</p></Link> 
    <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
  </div>
  </div>
  </div>
  )}  
 </div> 
 
</div>  

 <hr/> 
</div>   

</div>   
 <hr className='h-1 w-4/5 m-auto my-4'/>
 {/* <div className="bg-white w-full my-8 dark:bg-black">   
  <div className="xs:grid grid-cols-2 justify-center xs:items-start items-center xl:grid-cols-4 max-w-2xl lg:max-w-max m-auto py-8"> 

  <div className='max-w-sm m-auto border-r xs:m-0'>   
 { posts_all?.length>0&& posts_all[0]?.nodes.slice(0,5).map((it, index:number)=> 
 <div key={index} className="px-4">  
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '>
   <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  /> 
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>

 <div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0]?.name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>    
</div>  
 </div>}
   {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it?.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>} 
 
 </div>
 )} 
  
</div>   

 <div className='max-w-sm m-auto border-r xs:m-0'>   
 { posts_all?.length>0&&posts_all[1]?.nodes.slice(0,5).map((it, index:number)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0]?.slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0]?.name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div> 
 
<div className='max-w-sm m-auto xs:m-0 border-r'>   
 { posts_all?.length>0&&posts_all[2]?.nodes.slice(0,5).map((it, index:number)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>  

 <div className='max-w-sm m-auto xs:m-0 border-r'>   
 { posts_all?.length>0&&posts_all[3]?.nodes.slice(0,5).map((it, index:number)=> 
 <div key={index} className="px-4"> 
 { index === 0 &&
<div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto mx-2 px-1 pt-3 '> 
     <Image
className='rounded-xl h-44 object-cover'
  width={1200} 
  height={675}    
  src={it.featuredImage?.node.sourceUrl}     
  alt={it?.featuredImage?.node.altText } 
  />   
<div className='my-3 sm:my-0 md:px-1 py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<div className="flex flex-wrap py-2"> 
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end underline hover:text-gray-500'>{it.tags.nodes[0].name } | </h4></Link> 
<span className='text-sm italic text-red-600 px-1'>{moment(it.date).fromNow()}</span>
</div>  
</div>  
 </div>}
 {index !==0&&
 <div className='my-3 md:px-1 border-b py-4'>
<Link href={`/news/topic/${it.slug}`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-base md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
<Link href={`/topic/${it.tags.nodes[0].slug}`}><h4 className='md:text-end py-2 md:px-0 underline hover:text-gray-500'>{it.tags.nodes[0].name }</h4></Link> 
<span className='text-sm italic text-red-600'>{moment(it.date).fromNow()}</span>
</div>}
 
 </div>
 )} 
  
</div>  
</div>  

</div>*/}
</div> 

<div className=""> 
     <SideBar sidebarItems={sidebarItems}news_outline={news_outline} coming_titles={coming_titles}/>  
  </div> </div>
   {/* <MainBottom 
   posts_all={posts_all} 
   top_Posts_notIn_newsPosts={top_Posts_notIn_newsPosts}
   postCategory_cursor={postCategory_cursor}
   />   */}
   </div>
  )
}

export default Main
