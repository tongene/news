"use client"
import { useEffect, useState } from "react"; 
import Image from "next/image";
import Link from "next/link";
import moment from "moment"; 
import Pagination from "../Pagination";
 
const Paginate = ({content, pathString}:{content:any[], pathString:string}) => {
    const [posts, setPosts]=useState<any[]>([]) 
    const [currPg, setCurrPg]=useState(1)
    const [postPerPage, setPostPerP]=useState(5)  
 
    function decrement() {
     setCurrPg(currPg - 1); 
   }
   function increment() {
     setCurrPg(currPg + 1); 
   }
   
   useEffect(()=>{
     const fetchPs= async()=>{ 
       setPosts([...content])  
     }
     fetchPs()
   },[content]) 
  
   const idxLastPs= currPg * postPerPage
   const idxFsPage = idxLastPs - postPerPage
   const currentPosts = posts.slice(idxFsPage, idxLastPs)
   
   const paginating=(pageNumber:number)=>{  
   setCurrPg(pageNumber) 
   }
  
 
  return (
    <div>       
   <section>
   <div className="pages_shadow border-b-2 border-black p-5 lg:p-10 max-w-6xl h-max dark:bg-black">
   {currentPosts.map((itx,index)=> 
   <div key={index} className="border-b flex" > 
   <div className="xs:w-3/4 xl:w-2/3 m-1 sm:m-4">   
        <p className="italic text-red-600 text-right py-4">{moment(itx.node?.date).subtract(1, 'hour').fromNow()}</p> 
 <Image 
 className="h-44 md:h-52 xl:h-64"
        width={1200}
        height={675}
       src={itx.node?.featuredImage?.node?.sourceUrl}
       alt={itx.node?.title}
       />
        </div>   
          <div className="w-full m-1 sm:m-3 py-5">
          <div className="py-2">
            <Link href={`/netflix-naija/${pathString}/${itx.node?.slug}/`}><h2 className="text-2xl overflow-hidden text-ellipsis font-bold hover:text-gray-600 font-bold"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical', lineHeight:'35px' }}>{itx.node?.title}</h2></Link>
         <Link href={`/netflix-naija/${pathString}/${itx.node?.slug}/`}><div className="text-lg hover:text-gray-600 overflow-hidden text-ellipsis"  style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical', lineHeight:'35px' }} dangerouslySetInnerHTML={{__html:itx.node?.excerpt}} /></Link>  
      </div> 
      <div className="max-w-max flex flex-wrap"> {itx.node.contentTags.nodes.map((tx:{name:string, slug:string} ,index:number)=> 
            <div key={index}>
        <Link href={`/topic/${tx.slug}/`}><p className="text-lg bg-gray-600 px-6 py-2 m-1 text-gray-200 hover:bg-red-600"> {tx.name }</p></Link></div>)} 
            </div> 
         
        </div> 
   </div>)}

   <div> 
  <div className=" text-right flex justify-end items-end my-2" >
  {currPg === 1 ? 
  '':<button onClick={decrement} className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white">
        <span>&#x226A;</span> Previous Page 
      </button> }
     <div> {currPg === postPerPage ?'': <button onClick={increment}className="text-xl text-gray-200 hover:text-gray-50 rounded-sm p-4 cursor-pointer font-bold bg-gray-600">
       Next Page <span>&#x226B;</span> 
        </button> }</div>
      </div>
      </div> 
   </div>
  
    </section>  
 
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
    </div>
  )
}

export default Paginate
