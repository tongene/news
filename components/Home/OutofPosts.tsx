 
 "use client"

import { InnerEdges, PostXNode } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

  const nextResp=()=>{ 
      const wprestPost = fetch('https://content.culturays.com/graphql',{     
        method: 'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
query WPPOSTS  {               
        posts(first: 5, where: {categoryName: "News"}) {
    pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
   edges{
     cursor     
           node{
          title
           slug
             date
             content
             id
              postsTags {
              nodes {
                name
                slug
              }
            }
             tags {
              nodes { 
               id
                id
                slug
                name
                posts {
                  edges {
                    node {
                      id 
                      slug
                      title 
                      date
                      categories {
                        nodes {
                          id
                          name
                          slug 
                        }
                      }
                    }
                  }
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
                 posts {
                      nodes {
                        title
                        slug
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                  }
                }
              }
            }
            author {
              node {
                firstName
                lastName
                name
                slug
                description
              }
            }
        }} 
  }} ` 
        
        })
        , 
     
        }).then((response) => response.json()) 
        .then((data)=>data.data.posts )
        .catch((error) => console.error('Error:', error)); 
 
        return wprestPost
          }
 function nextNewsPosts(endX:string){  
 if(!endX)return
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      next: { revalidate: 60 }, 
      body: JSON.stringify({
        query:`
        query WPPOSTS($after:String) { 
           posts( after:$after, first:6 , where:{categoryName: "News"}){ 
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
       edges{
       cursor
          node {
            author {
              node {
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
              tags {
              nodes { 
              id
                name
                slug
              }
            }
            date
            excerpt
             slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           
      }
          }
        } 
       
 
  } `,variables:{
    after:endX
  }
      
      })
      
      }).then(response =>response.json())
      .then(data => data.data) 
      .catch(error => console.error('Error:', error));

      return wprest
  
  } 

const OutofPosts = () => {
 const [nextOtherPosts, setOtherPosts] = useState<PostXNode| PostXNode[]>();
     const getOtherPosts=async()=>{
      const response2 = await nextResp()
     const endX= response2?.pageInfo.endCursor
      const posts_notIn_newsPosts= await nextNewsPosts(endX) 
     setOtherPosts(posts_notIn_newsPosts?.posts.edges) ?? []
   }

      useEffect(() => {
      getOtherPosts()
        }, []);
 

  return (
   <div className="bg-white w-full my-8 dark:bg-black">   
     <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 justify-center sm:items-start items-center max-w-2xl md:max-w-max m-auto py-8 gap-2"> 
   <div className='max-w-sm m-auto md:m-0 border-r'>   
       { (nextOtherPosts as PostXNode[])?.length>0&& (nextOtherPosts as PostXNode[]).slice(0,3).map((it, index:number)=> 
       <div key={index} className="px-4">  
       { index === 0 &&
      <div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '>
      
         <Image
      className='rounded-xl h-44 object-cover'
        width={600} 
        height={400}    
        src={it?.node?.featuredImage?.node.sourceUrl}     
        alt={it?.node?.featuredImage?.node.altText } 
        /> 
      <div className='my-3 sm:my-0 md:px-1 py-4'>
      <Link href={`/news/${it?.node?.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.node?.title}</h3></Link>
      
       <div className="flex flex-wrap py-2"> 
      <Link href={`/topic/${it?.node?.tags.nodes[0]?.slug}/`}><h4 className='md:text-end text-red-600 underline hover:text-gray-500'>{it?.node?.tags.nodes[0]?.name } | </h4></Link> 
      {/* <span className='text-sm italic text-red-600 px-1'>{moment(it?.node?.date).subtract(1, 'hour').fromNow()}</span> */}
      </div>    
      </div>  
       </div>}
         {index !==0&&
       <div className='my-3 md:px-1 border-b py-4'>
      <Link href={`/news/${it?.node?.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.node?.title}</h3></Link>
      <Link href={`/topic/${it?.node?.tags.nodes[0]?.slug}/`}><h4 className='md:text-end text-red-600 py-2 md:px-0 underline hover:text-gray-500'>{it?.node?.tags.nodes[0]?.name }</h4></Link> 
      {/* <span className='text-sm italic text-red-600'>{moment(it?.node?.date).subtract(1, 'hour').fromNow()}</span> */}
      </div>} 
       
       </div>
       ) } 
        
      </div>   
        
       <div className='max-w-sm m-auto md:m-0 border-r'>   
       { (nextOtherPosts as PostXNode[])?.length>0&&(nextOtherPosts as PostXNode[]).slice(3,6).map((it, index:number)=> 
       <div key={index} className="px-4"> 
       { index === 0 &&
      <div className='overflow-hidden border-b first:md:border-r-0 first:md:border-b md:w-auto px-1 pt-3 '> 
           <Image
      className='rounded-xl h-44 object-cover'
        width={600} 
        height={400}    
        src={it.node.featuredImage?.node.sourceUrl}     
        alt={it?.node.featuredImage?.node.altText } 
        />   
      <div className='my-3 sm:my-0 md:px-1 py-4'>
      <Link href={`/news/${it.node.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.node.title}</h3></Link>
      <div className="flex flex-wrap py-2"> 
      <Link href={`/topic/${it.node.tags.nodes[0].slug}/`}><h4 className='md:text-end text-red-600 underline hover:text-gray-500'>{it.node.tags.nodes[0].name } | </h4></Link> 
      {/* <span className='text-sm italic text-red-600 px-1'>{moment(it.node.date).subtract(1, 'hour').fromNow()}</span> */}
      </div> 
      </div>  
       </div>}
       {index !==0&&
       <div className='my-3 md:px-1 border-b py-4'>
      <Link href={`/news/${it.node.slug}/`}><h3 className='overflow-hidden text-ellipsis hover:text-gray-500 text-xl md:my-0 md:py-0 font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.node.title}</h3></Link>
      <Link href={`/topic/${it.node.tags.nodes[0]?.slug}/`}><h4 className='md:text-end text-red-600 py-2 md:px-0 underline hover:text-gray-500'>{it.node.tags.nodes[0]?.name }</h4></Link> 
      {/* <span className='text-sm italic text-red-600'>{moment(it.node.date).subtract(1, 'hour').fromNow()}</span> */}
      </div>}
       
       </div>
       )} 
        
      </div> 
    </div>  
    </div> 
    
   
  )
}

export default OutofPosts
