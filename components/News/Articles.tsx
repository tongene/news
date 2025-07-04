"use client"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import Image from "next/image"
import Link from "next/link" 
import { useEffect, useState } from "react"  
import Pagination from "../Pagination"
import SlideFxn from "../SlideFxn"
import { TopNews } from "@/app/types"
type PostProps={
  title:string
  slug:string
  excerpt:string
  date:string
  contentTypeName:string
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
}
 
const ArticlesX = ({
    environment_news,
    business_news,
eco_news,
tech_news,
health_news }:{environment_news:TopNews[],business_news:TopNews[],eco_news:TopNews[],health_news:TopNews[],tech_news:TopNews[]}) => {

const [posts, setPosts]=useState<PostProps[]>([]) 
const [currPg, setCurrPg]=useState(1)
const [postPerPage, setPostPerP]=useState(10) 

const world_news = environment_news.filter((ex)=>ex.environmentCategories?.nodes[0].name==="World")
const africa_news = environment_news.filter((ex)=>ex.environmentCategories?.nodes[0].name==="Africa") 
// const environment_items=environment_news.filter((ex)=>ex.environmentCategories?.nodes[0].name!=="World").filter((ex)=>ex.environmentCategories?.nodes[0].name!=="Africa")
 const environment_items= environment_news.concat(business_news).concat(eco_news)
function decrement() {
setCurrPg(currPg - 1);
 }
 function increment() {
   setCurrPg(currPg + 1);
 }

 
 useEffect(()=>{
   const fetchPs= async()=>{ 
     setPosts([...ycontent.slice(8)]) 
   }
   fetchPs()
 },[environment_news]) 
  
 const idxLastPs= currPg * postPerPage
 const idxFsPage = idxLastPs - postPerPage
 const currentPosts = posts.slice(idxFsPage, idxLastPs)
 
 const paginating=(pageNumber:number)=>{ 
 setCurrPg(pageNumber) 
 }

  
  const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "") 
    const newString = string?.replace(regex, "");
    return newString
     }
     const [activeSet , setActiveSet]=useState(false)    
     const title_item=environment_items.map((ex)=>ex.contentTypeName)[0]
   const ycontent=environment_items.sort(function(a, b) { return Number(new Date(b.date ))-Number( new Date(a.date )) })
  
  return (
    <div> 
    <div className="bg-gray-50 dark:bg-black py-4 m-auto" style={{maxWidth:'1800px'}}> 
    <div className="xl:flex justify-center gap-1 px-2 m-auto" style={{maxWidth:'1550px'}}>  
      <section className="sm:grid sm:grid-cols-2 justify-center m-auto gap-1 px-2 max-w-4xl"> 
      {ycontent.length>4 &&ycontent.slice(4,8).map((xy,i)=>
      <div className="max-w-md lg:max-w-xl m-auto" key={xy?.title + ' ' + i}>
        <div className="bg-white dark:bg-black p-4 m-1 h-52 shadow"> 
        <div className="my-3 cursor-pointer ">
          <Link href={`/topic/${xy?.contentTags?.nodes[0]?.slug}/`}></Link> <span className="border rounded-2xl bg-red-500 text-white p-2 hover:bg-red-600">
            <FontAwesomeIcon 
           icon={faCircle}
           width={10}
           className="text-white mx-2"
           />{xy?.contentTags?.nodes[0]?.name} </span>
         
            </div>
                <div className="my-6">
            <div className="cursor-pointer">
           <Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><h2 className="text-xl font-medium hover:text-gray-500">{xy?.title}</h2></Link> 
           </div>
            <small className="text-sm my-3 text-red-500"><em>{moment(xy?.date).fromNow()}</em></small>
         </div>
    </div>
      </div> 
)}
</section>

<div className="max-w-2xl m-auto xl:m-0">
  <SlideFxn content={ycontent.slice(0,4)} />  
</div>
</div>
  </div>
    
 <section>
<div className="xl:flex mx-auto p-6 gap-4 justify-center 2xl:mx-0 lg:w-[1100px] 2xl:w-[1500px]"> 
<div className="pl-11 lg:max-w-md m-auto">
<h2 className="text-5xl font-bold m-4">News</h2>
<hr className="bg-black py-0.5"/>
<div className="grid sm:grid-cols-2 lg:block xl:grid-cols-2 gap-2 justify-center">
{currentPosts.length>0 &&currentPosts.map((xy, ix)=> 
<div className="my-2 m-auto border-b border-b-4 border-b-black max-w-md xl:max-w-3xl py-4" key={xy?.title + ' ' + ix}> 
<div className="h-32"><Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}>

<h2 className="text-3xl hover:text-gray-500 overflow-hidden text-ellipsis leading-9 my-5"style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{xy?.title} </h2></Link> </div>
<Image
className="hover:opacity-70 cursor-pointer h-60 xs:h-64 sm:h-52 md:h-60 lg:h-72"
src={xy?.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy?.featuredImage.node.altText}
/> 
<Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><div dangerouslySetInnerHTML={{__html:xy?.excerpt}} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}className="overflow-hidden text-ellipsis my-2 text-lg hover:text-gray-500 py-2 leading-9"/></Link>
 <small className="text-sm my-3 text-red-500"><em>{moment(xy?.date).fromNow()}</em></small> 
</div>
)}
</div>
<div className="flex justify-between"> 
 
 <div>
{currPg === 1 ? 
'':<button onClick={decrement}className="text-lg p-4 text-orange-700 border border border-orange-700 rounded-xl hover:bg-black hover:text-gray-300">
 <span>&#x226A;</span> Previous Page 
 </button> } </div> 
<div >
  {currPg === postPerPage ?'': <button onClick={increment} className="text-lg p-4 text-orange-700 border border border-orange-700 rounded-xl hover:bg-black hover:text-gray-300">
  Next Page  <span>&#x226B;</span> 
   </button> }
   </div>
 </div>
</div>
 
<div className="justify-between 2xl:flex my-5 max-w-xl md:max-w-max lg:max-w-xl xl:max-w-5xl m-auto"> 

<div className="mx-1 h-max px-2 py-4 max-w-lg"><h2 onClick={()=> setActiveSet(prev => !prev)}className={!activeSet?"text-3xl font-bold":'text-3xl cursor-pointer'}>Africa</h2>
<hr className={!activeSet?"bg-red-500 py-0.5 font-bold":''}/>
{ tech_news.slice(0,5).map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b border-l" key={xy?.title + ' ' + ix}>
<Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis leading-8 text-xl font-bold py-1 mt-4 hover:text-gray-600 cursor-pointer">{xy?.title} </h2></Link>
<Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><div dangerouslySetInnerHTML={{__html:xy.excerpt}} style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis my-2 hover:text-gray-600 text-base"/></Link>
 <small className="text-sm my-3 text-red-500"><em>{moment(xy?.date).fromNow()}</em></small> 
</div>
)}
</div>
<div className="mx-1 h-max px-2 py-4 max-w-lg"><h2 onClick={()=> setActiveSet(prev => !prev)}className={activeSet?"text-3xl font-bold":'text-3xl cursor-pointer'}>World</h2>
<hr className={activeSet?"bg-red-500 py-0.5 font-bold":''}/>
{ health_news.slice(0,5).map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b border-l" key={xy?.title + ' ' + ix}>
<Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis font-bold leading-8 text-xl py-1 mt-4 hover:text-gray-600 cursor-pointer">{xy?.title}</h2></Link>
<Link href={`/news/${xy.contentTypeName}/${xy?.slug}/`}><div dangerouslySetInnerHTML={{__html:xy?.excerpt}} style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis my-2 hover:text-gray-600 text-base"/></Link>
 <small className="text-sm my-3 text-red-500 "><em>{moment(xy?.date).fromNow()}</em></small> 
</div>
)}
</div> 
</div>
<Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
</div>
  </section> 
  </div>)
}

export default ArticlesX