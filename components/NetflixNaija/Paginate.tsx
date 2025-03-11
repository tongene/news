"use client"
import { useEffect, useState } from "react"; 
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { usePathname } from "next/navigation";
import Pagination from "../Pagination";
 
const Paginate = ({content}:{content:any[]}) => {
    const [posts, setPosts]=useState<any[]>([]) 
    const [currPg, setCurrPg]=useState(1)
    const [postPerPage, setPostPerP]=useState(10)  
  const path = usePathname() 
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
   const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    //(/<\/?[^>]+(>|$)/g, "")
    const newString = string?.replace(regex, "");
    return newString
     }
     
  return (
    <div>       
   <section>
   <div className="pages_shadow border-b-2 border-black p-5 max-w-6xl h-max dark:bg-black">
   {currentPosts.map((itx,index)=> 
   <div key={index} className="border-b flex" > 
   <div className="w-96 m-1 sm:m-2">   
        <p className="italic text-red-600 text-right py-4">{moment(itx.node?.date).fromNow()}</p> 
 <Image  
        width={1200}
        height={675}
       src={itx.node?.featuredImage?.node?.sourceUrl}
       alt={itx.node?.title}
       />
        </div>   
          <div className="w-4/5 m-1 sm:m-2 p-3">
    <div className="sm:w-3/4">
            <Link href={`/netflix-naija/${path.split('/')[2]}/${itx.node?.slug}`}><h2 className="text-2xl py-2 font-bold">{itx.node?.title}</h2></Link>
         <Link href={`/news/${path.split('/')[2]}/${itx.node?.slug}`}><p className="text-lg py-4" style={{lineHeight:'35px'}} >{replaceHTMLTags(itx.node?.excerpt)} </p></Link>  
      </div>
       <div className="bg-gray-600 max-w-max flex flex-wrap"> { itx.node?.contentTags.nodes.map((tx:{name:string} ,index:number)=> 
    <p key={index} className="text-lg px-6 py-2 text-gray-200"> {tx.name }</p> )  } 
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
