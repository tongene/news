"use client"

import { LiveProps } from "@/app/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
 const SLIDE_INTERVAL = 5000; 

  const liveResp=()=>{
  const wprestLive = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `
         query WPLives {
         lives { 
         edges{     
      node {
      contentTypeName
      id
      databaseId
        date
        modified
        excerpt
        slug
        title
       contentTags{
           nodes{
           slug
           name
           }
           
           } 
            
        featuredImage{
        node{
        sourceUrl
        altText
        }
        
        }
      }  }
    }
    }
      
      `
      })
   
      }) 
      .then(response => response.json() ) 
      .then(data => data.data.lives.edges)
      .catch(error => console.error('Error:', error))
      return wprestLive
     }

const Live = () => {
  const [currentHour, setCurrentHour] = useState('');
  const [livesNews, setLive] = useState<LiveProps[]>([]);
     const getLive=async()=>{
     const livexnews =await liveResp()
     setLive(livexnews) ?? []
   }

     useEffect(() => {
   getLive()
   const liveDate = livesNews[0]?.node.modified
       setCurrentHour(new Date( liveDate).toLocaleTimeString());
     }, [livesNews]);

const slides=livesNews?.filter((ex) => {
  const postTime = new Date(ex.node.modified).getTime(); 
  const currentTime = Date.now(); 
  const timeDifference = currentTime - postTime;  
  return timeDifference <= 24 * 60 * 60 * 1000; 
})
 
 
  return (
    <div> 
      { slides.length>0&&<div className="x-main-x-slider flex-shrink-0 p-1 h-80">
             <div className="main-slider-container px-2 py-10 bg-gray-200 bg-opacity-60 rounded-xl w-72 border">
             {slides?.map((xy, i) => (       
      <div className="text-center" key={xy.node.slug}>
                    <div className="flex font-bold justify-between items-center text-red-600">
                      <p><span className="animate-pulse text-5xl">•</span> Live</p>
                      <span className="text-sm italic px-1">{currentHour}</span>
                    </div>
                    <Link href={`/news/live/${xy.node.slug}/`}>
                      <h2 className="overflow-hidden leading-6 text-gray-600 text-xl py-4 px-3 h-28 font-bold hover:text-gray-500 cursor-pointer dark:text-gray-200" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>
                        {xy.node.title}
                      </h2>
                    </Link>
                    <Image
                      className="h-56 w-[300px] px-1 py-2 hover:opacity-50"
                      src={xy.node.featuredImage.node.sourceUrl}
                      width={400}
                      height={400}
                      alt={xy.node.featuredImage.node.altText}
                    />
                  </div>))}
            </div>
       </div>  }
 </div> )
}

export default Live
