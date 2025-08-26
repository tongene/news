"use client"   
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'
 
type InnerNode ={
  id:number;
  slug:string;
  title:string;
  index:number; 
  contentTags:{
    nodes:{
name:string
slug:string
    }[]
  }
  nodes:[{ 
    naijaOnNetflix:{
    nodes:[{
      contentTypeName:string;
      id:number;
      slug:string;
      title:string;
      index:number;    
    }];
 
},
 
},
 
];

} 
  const liveResp=()=>{
  const wprestLive = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `
         query WPLives {
         lives(first:1) { 
         edges{     
      node {
      contentTypeName
      id
      databaseId
        date
        modified 
        slug
        title 
         contentTags{
           nodes{
           slug
           name
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

  async function trends(){ 
      
         const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST', 
           headers:{ 
           'Content-Type':'application/json', 
           },
           body: JSON.stringify({
             query:`
             query WPPOSTS{
             trends(first:6) {
             nodes {
              contentTypeName
               title
               slug
                date
                content
                id
                contentTags {
                 nodes {
                   name
                   slug
                 }
               } 
             
             }
           }
            }  
            `
           })
           
           }).then(response => response.json()) 
               .then(data => data.data.trends.nodes) 
            .catch(error => console.error('Error:', error))
           
            //const response = wprest?.data.trends.nodes 
            return wprest 
      
     }
     
const Nav =() => {  
 const [trendsData,setTrendsData]=useState<InnerNode[]>([])
 const [liveNewsView, setLiveNewsView]=useState([]) 
 
 const liveData =async()=>{ 
   await new Promise(resolve => setTimeout(resolve, 1000));
   const livesXNews =await liveResp()  
  const trends_data:InnerNode[] = await trends() 
     setTrendsData(trends_data) 
    setLiveNewsView(livesXNews)
 }
useEffect(()=>{ 
  liveData()
},[]) 
 

  return (<>
  
   <div className='flex shadow-detailedShadow pt-6 my-1 mt-4 dark:shadow-detailShadowLight justify-center dark:bg-gray-800' > 
    <div className='w-full py-4'> 
    <h2 className='text-center hover:text-gray-500 text-2xl font-bold py-3' >Trending in Nigeria<span></span> <span>&#10141;</span></h2> 
   <div className='relative text-xl hover:text-orange-700'><p className='absolute bottom-0 right-10 lg:right:40'><Link href='/search/'aria-label="Search"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link></p></div> 
<div className='text-md font-medium flex justify-center items-center xs:flex-row flex-wrap' >
{liveNewsView
  ?.filter((ex: { node: { modified: string } }) => {
    const postTime = new Date(ex.node.modified).getTime(); 
    const currentTime = Date.now(); 
    const timeDifference = currentTime - postTime;  
    return timeDifference <= 24 * 60 * 60 * 1000; 
  }).map((ex: { node: { title: string, slug: string, databaseId: string,content: string, modified: string, author: { node: { name: string } }, contentTags: { nodes: { name: string }[] } } }) => (
    <ul key={ex.node.title} className="flex py-3 items-center">
      <span className="animate-pulse mr-2 text-5xl text-red-600">•</span>
      <span className="text-red-600">Live</span>
      <li
          className="m-auto overflow-hidden text-ellipsis underline md:px-4 px-3 hover:text-orange-700 hover:font-bold"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        > <Link href={`/news/live/${ex.node.databaseId}/${ex.node.slug}/`}>
         {ex.node.contentTags.nodes[0]?.name} 
         </Link></li>
     
    </ul>
  ))}

    {trendsData?.map((ex)=> 
    <ul key={ex.title} className='py-3'><li className='m-auto overflow-hidden text-ellipsis underline md:px-4 px-3 hover:text-orange-700 hover:font-bold'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}> <Link href={`/news/trending/${ex.slug}/`}>{ex.contentTags.nodes[0].name}</Link></li>    
    </ul> 
     )}  
  
     </div>
      </div> 
    
   </div>  
  
    </> )
}

export default Nav