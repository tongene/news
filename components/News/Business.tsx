"use client"
 
import { faAngleLeft, faAngleRight, faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons"
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
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
}

const Business = ({business_news}:{business_news:TopNews[]}) => { 
  const [posts, setPosts]=useState<PostProps[]>([]) 
  const [currPg, setCurrPg]=useState(1)
  const [postPerPage, setPostPerP]=useState(10) 
     const world_news = business_news.map((ex)=>ex.businessCategories?.nodes.filter((xy)=> xy?.name==="World")).flat().map((tx)=> tx?.businesses.nodes).flat()
     const africa_news = business_news.map((ex)=>ex.businessCategories?.nodes.filter((xy)=> xy?.name==="Africa")).flat().map((tx)=> tx?.businesses.nodes).flat()     
     const business_items=business_news.map((ex)=>ex.businessCategories?.nodes.filter((xy)=> xy?.name!=="World")).flat().filter((xy)=> xy?.name!=="Africa").map((tx)=> tx?.businesses.nodes).flat()

     const title_item=business_news.map((ex)=>ex.contentTypeName)[0]
     
  function decrement() {
   setCurrPg(currPg - 1);
 } 
 function increment() {
   setCurrPg(currPg + 1);
 }
 
 useEffect(()=>{
   const fetchPs= async()=>{ 
     setPosts([...business_items.slice(8)]) 
   }
   fetchPs()
 },[business_news])
 
 
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
     
  return (
    <div> 
    <div className="bg-gray-50 py-4 m-auto" style={{maxWidth:'1800px'}}> 
    <div className="xl:flex justify-center gap-1 px-2 m-auto" style={{maxWidth:'1550px'}}>  
      <section className="sm:grid sm:grid-cols-2 justify-center m-auto gap-1 px-2 max-w-4xl"> 
      {business_items.length>4 &&business_items.slice(4,8).map((xy,i)=>
      <div className="max-w-md lg:max-w-xl m-auto" key={xy?.title + ' ' + i}>
        <div className="bg-white p-4 m-1 h-52 shadow"> 
        <div className="my-3 cursor-pointer ">
          <Link href={`/topic/${xy?.contentTags?.nodes[0]?.slug}/${xy?.contentTags?.nodes[0]?.id}`}></Link> <span className="border rounded-2xl bg-red-500 text-white p-2 hover:bg-red-600">
            <FontAwesomeIcon 
           icon={faCircle}
           width={10}
           className="text-white mx-2"
           />{xy?.contentTags?.nodes[0]?.name} </span>
         
            </div>
                <div className="my-6">
            <div className="cursor-pointer">
           <Link href={`/news/business/${xy?.slug}`}><h2 className="text-xl font-medium hover:text-gray-500">{xy?.title}</h2></Link> 
           </div>
            <small className="text-sm my-3 text-red-500"><em>{moment(xy?.date).fromNow()}</em></small>
         </div>
    </div>
      </div> 
)}
</section>
 
<div className="max-w-2xl m-auto xl:m-0">
  <SlideFxn title_item={title_item} content={business_items}/>  
</div>

    </div>
  </div>
    
 <section>
<div className="lg:flex m-auto p-6 gap-2 justify-center" style={{maxWidth:'1750px'}}> 
<div>
<h2 className="text-5xl font-bold m-4">Business</h2>
<hr className="bg-black py-0.5"/>
<div className="grid sm:grid-cols-2 justify-center max-w-2xl lg:max-w-5xl m-auto">
{currentPosts.length>0 &&currentPosts.map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b max-w-xs lg:max-w-max py-4" key={xy?.title + ' ' + ix}> 
<div className="overflow-hidden text-ellipsis h-28" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}> 
<Link href={`/news/business/${xy?.slug}`}>
<h2 className="text-3xl hover:text-gray-500 leading-9 py-10">{xy?.title} </h2></Link>
</div>
<Image
className="hover:opacity-70 cursor-pointer max-h-44"
src={xy?.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={xy?.featuredImage.node.altText}
/> 
<Link href={`/news/business/${xy?.slug}`}><p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}className="overflow-hidden text-ellipsis my-2 text-lg hover:text-gray-500 py-2 leading-9">{replaceHTMLTags(xy?.excerpt)} </p></Link>
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
 
<div className="flex justify-between lg:block xl:flex my-5 max-w-4xl m-auto">

<div className="xl:w-1/2 mx-1 h-max px-2 py-4"><h2 onClick={()=> setActiveSet(prev => !prev)}className={!activeSet?"text-2xl font-bold":'text-2xl cursor-pointer'}>Africa</h2>
<hr className={!activeSet?"bg-red-500 py-0.5 font-bold":''}/>
{ africa_news.slice(0,5).map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b border-l" key={xy?.title + ' ' + ix}>
<Link href={`/news/business/${xy?.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis  leading-8 text-xl py-1 mt-4 hover:text-gray-600 cursor-pointer">{xy?.title} </h2></Link>
<Link href={`/news/business/${xy?.slug}`}><p style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis my-2 hover:text-gray-600 text-base">{replaceHTMLTags(xy?.excerpt)} </p></Link>
 <small className="text-sm my-3 text-red-500 "><em>{moment(xy?.date).fromNow()}</em></small> 
</div>
)}
</div>
<div className="xl:w-1/2 mx-1 h-max px-2 py-4"><h2 onClick={()=> setActiveSet(prev => !prev)}className={activeSet?"text-2xl font-bold":'text-2xl cursor-pointer'}>World</h2>
<hr className={activeSet?"bg-red-500 py-0.5 font-bold":''}/>
{ world_news.slice(0,5).map((xy, ix)=> 
<div className="my-2 px-2 m-auto border-b border-l" key={xy?.title + ' ' + ix}>
<Link href={`/news/business/${xy?.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis  leading-8 text-xl py-1 mt-4 hover:text-gray-600 cursor-pointer">{xy?.title} </h2></Link>
<Link href={`/news/business/${xy?.slug}`}><p style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className="overflow-hidden text-ellipsis my-2 hover:text-gray-600 text-base">{replaceHTMLTags(xy?.excerpt)} </p></Link>
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

export default Business
 