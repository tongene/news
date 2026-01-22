  "use client"

import { SideNode } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";

  
  const postsOutline =async()=>{    
    const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query OUTLINEPOST{
         outlines(first: 1) {
       nodes {
         content
         featuredImage{
         node{
         sourceUrl
         altText
         }
         }
         outlineGroup {
           outlineVideos {
             node {
               altText
               caption
               date
               title
                mediaItemUrl
               slug
             }
           }
         }
       }
           } } ` 
           
           })
           
           }).then(response => response.json())
           .then(data => data.data?.outlines?.nodes)        
           .catch(error => console.error('Error:', error));
           //const response = wprest?.data?.outlines?.nodes 
           return wprest
  }  

const PostOutline = () => {
 const [outlinePlus, setOutlineNews] = useState<SideNode[]>([]);
 const getOutline=async()=>{
     const news_outline=await postsOutline()
     setOutlineNews(news_outline) ?? []
   }

      useEffect(() => {
      getOutline()
        }, []);
  //
  return (
    <div>
<div className='m-auto lg:m-0 max-w-md md:max-w-sm'>
  {outlinePlus[0]?.content.split('\n').length>0?outlinePlus[0]?.content.split('\n').map((line)=>
  <div dangerouslySetInnerHTML={{__html: line }}className='text-lg leading-8 py-1 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-900'key={line + ' ' + Math.random()} />) :<p>Loading...</p>}
{outlinePlus[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl&&
  <video
  className='xs:h-64 lg:h-56'
  src={outlinePlus[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl} 
  width={1200} 
  height={675} 
   />

  }
  {!outlinePlus[0]?.outlineGroup?.outlineVideos?.node.mediaItemUrl&&outlinePlus?.length>0&& outlinePlus[0]?.featuredImage?.node.sourceUrl&&
 <Image
className='xs:h-64 lg:h-56'
src={outlinePlus[0]?.featuredImage?.node.sourceUrl} 
width={1200} 
height={675} 
alt={outlinePlus[0]?.featuredImage?.node.altText}/>
  }
</div>
    </div>
  )
}

export default PostOutline