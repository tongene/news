"use client" 
import React, { useEffect, useState } from 'react' 
import MainSlider from './MainSlider'
import Image from 'next/image'
import { CronJob } from "cron";
import { dateFormatter } from '@/utils/dateformat'
import Link from 'next/link'  
import moment from 'moment'
import { nextNewsPosts, postCategories, postNextCategories } from '@/app/data'
import { CineProps, Cursors, InnerEdges, PostsNotInPost, PostXNode, SideNode } from '@/app/types'  
import MainBottom from './MainBottom'
import SideBar from './Side'
import { getGoogleNewsTitles } from '@/app/data/news-data'
import { replaceSpecialCharacters } from "@/utils/replacechars"; 
import { processImgs } from "@/utils/process_imgs";
 import { processSbImages } from "@/utils/processImages";
import { sidePlusViews } from '@/app/page-data';
import { createClient } from '@/utils/supabase/client';
import MainPosts from './MainPosts';

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

const Main = ({top_PostsData, news_outline }:{top_PostsData:InnerEdges[],  news_outline:SideNode[] }) => { 
const [activeSet, setActiveSet]=useState(true)
const [actIdx ,setActIdx]=useState(-1)
const [categoryPost,setCategoryPost]=useState<InnerEdges[]>([])
const [categoryName,setCategoryName]=useState('') 
const [top_PostsCa, setTopPostsCa]=useState<PostXNode[]>([])
const [cinema_titles,setComingTitles]=useState<CineProps[]>([])
const [top_SidePanelCursors, setSidePanelCursors]=useState<PostXNode[]>([])
const [top_SidebarItems, setSidebarItems]=useState<PostXNode[]>([])
const [sidebarItems, setSidebarxItems]=useState<Cursors[]>([])
const [top_Posts_notIn_newsPosts, setPosts_notIn_newsPosts] = useState<PostsNotInPost[]>([])
// const [top_Last_categories, setLast_categories]=useState([])   
const rmMain =top_PostsData.map((xy)=> xy.cursor)
     const naija_wiki =async ()=>{
      const sidebarxItems= await sidePlusViews()
      setSidebarxItems(sidebarxItems)
      const supabase =await createClient() 
      const { data:cinemax_titles , error } = await supabase 
      .from('cinema_titles') 
      .select('*')
      if(error)throw new Error('An Error has occured!')
        const post_data = await postCategories()
      const posts_notIn_newsPosts= await nextNewsPosts() 
const xtCategories= posts_notIn_newsPosts?.categories?.edges
  setPosts_notIn_newsPosts(xtCategories) 
const postCategory_Children =(post_data?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[]
setTopPostsCa(postCategory_Children ) 
setComingTitles(cinemax_titles) 
  }
      const coming_titles= cinema_titles?.filter((ex)=> ex.genre?.includes('Coming Soon'))
      useEffect(()=>{
        
       naija_wiki()
      },[top_PostsData])
    
useEffect(()=>{
//setCategoryPost(top_PostsData)  
const currentPosts= top_PostsCa?.flat()?.filter((ex)=> ex?.node?.name=== categoryName)?.map((xy)=> xy?.node?.posts).map((ex)=> ex?.edges as InnerEdges).flat()
setCategoryPost(currentPosts)
 
// else { 
// setCategoryPost(top_PostsData)  
// }

},[categoryName])

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
   <MainPosts  
 /> 
 
</div>  
<div > 
     <SideBar 
     sidebarItems={sidebarItems}
     news_outline={news_outline}
     coming_titles={coming_titles}/>  
  </div> </div>
    <MainBottom
   top_PostsCa={top_PostsCa}
   />   
   </div>
  )
}

export default Main
