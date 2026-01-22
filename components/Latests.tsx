"use client"   
 
import Image from "next/image"
import Link from "next/link"    
import {useEffect, useState } from "react"
type Node ={
  title:string;
  featuredImage:{node:{altText:string,sourceUrl:string}};
  excerpt:string;
  slug:string
  node:{
      title:string;
      featuredImage:{node:{altText:string,sourceUrl:string}};
      excerpt:string;
      slug:string
  
  }; 
}
const newsViews=async()=>{ 
           const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"})  { 
                     pageInfo {
        endCursor
      }
      edges{ 
            node{
             categories {
                  nodes {
                    name
                    slug
                  }
                } 
       
          } }}}  ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data) 
           .catch((err) => console.log("err", err)) 
     const dataView= await res
    const postX = dataView?.posts.pageInfo?.endCursor 
 
if(!postX)return
      const wprest = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
                      name
                      slug
                    }
                  }
              
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
                   author {
                 node {
                firstName
                lastName
                name
                slug
                description
              }
            }
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
       
         }
           }  } 
        } 
         `, variables:{
          after:postX
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

     return wprest
  }
    
  async function sidePlusViews(){
   const latestPosts=await newsViews()
   const latestStr=latestPosts?.pageInfo?.endCursor 
 
     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        cache: 'force-cache',
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            }  
         }
           }  
         ` 
        
        })
        , 
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  }
  const altPageNewsItems= async ()=>{
     const latestPosts=await sidePlusViews()  
     const trest=latestPosts?.posts?.pageInfo?.endCursor   
     try{
      const wprest = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts( where: {categoryName: "Latest" }, after:"${trest}") {
              pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 
              edges{ 
              cursor
            node{
             id
              title
                slug
              
          }
                 
       }
         }   
      } 
       ` 
      
      }) 
     
      }).then(response => response.json()) 
      .then(data => data.data) 
      .catch(error =>{
       console.log(error)
  }) 
  
    return wprest 
 
    }catch(err){
      console.log(err)
    }
  }


const Latests = () => {   
  const [bottom_news_data, set_bottom_News_data]=useState<Node[]>([])
  const [alt_news_data, set_alt_News_data]=useState<Node[]>([])
    const[loading, setLoading]=useState(false)
useEffect(()=>{ 
  setLoading(true)
  const newsContent=async()=>{ 
  const bottom_latest = await newsViews(); 
  const xLatest = bottom_latest.edges.map((xy:{node:[]})=> xy?.node).flat() 
  set_bottom_News_data(xLatest) 
  const altNews = await altPageNewsItems() 
 set_alt_News_data(altNews.posts.edges)
 setLoading(false)
}
  newsContent() 
},[])

  return (
    <div>
       <h2 className="text-3xl text-gray-700 font-bold text-center p-4 dark:text-gray-200 my-2">Recommended</h2>
      <div className="overflow-auto pt-4 hidden-scroll" >
      <div className="flex border-b border-t border-t-4 border-t-black border-b-4 m-auto" style={{width:'1500px'}}> 
      {alt_news_data?.slice(0,3).map((ex, index)=>
         <div className="first:border-r [&:nth-child(2)]:border-r px-8 m-auto" key={ex.node.slug}> 
 <Link href={`/news/${ex.node.slug}/`}><h2 className="max-w-96 hover:text-gray-400 py-8 text-2xl font-mono leading-10 font-thin my-8">{ex.node.title} </h2></Link>
  </div>)}
</div>
</div>
{loading && <span className="loader dark:before:border dark:before:border-2 dark:before:border-white dark:after:border dark:after:border-2 dark:after:border-white"></span>} 
<div className="py-4 my-5 border-t-4 border-yellow-600 bg-black" >
  <h2 className="text-3xl text-gray-300 font-bold text-center p-4 border-b border-yellow-600 my-2">News</h2>
  <div className="md:grid grid-cols-2 gap-2 xl:max-w-6xl max-w-xl xl:grid-cols-4 m-auto">
   {bottom_news_data?.map((ex, index)=> 
<div key={ex.slug} className="max-w-max m-auto"> 
<div className="relative h-52 max-w-72 overflow-hidden border border-yellow-600"> 
  <div className="relative w-[300px] h-[300px]">
<Image 
src={ex.featuredImage?.node.sourceUrl}
 fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt={ex.title}
priority={true}
/> </div>
<div className="absolute bg-gray-800 flex items-center justify-center top-0 bg-opacity-40 mx-2 w-full h-full"> 
<small className="text-yellow-400 text-2xl font-bold h-4">&#124;</small> <Link href={`/news/${ex.slug}/`}><h2 className="text-white cursor-pointer underline hover:text-gray-400 text-xl py-20 px-2">{ex.title} </h2></Link>
</div> 
</div>
  
</div>    
)}  
</div> 
   
<p className="underline m-8 hover:text-gray-400 text-white"><Link href='/news/'>See All News</Link></p>
</div>   
   </div>)
}
 
export default Latests