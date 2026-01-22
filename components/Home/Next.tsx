"use client"

import { InnerEdges } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dateFormatter } from '@/utils/dateformat'

  const nextResp=()=>{ 
      const wprestPost = fetch('https://content.culturays.com/graphql',{     
        method: 'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        next: { revalidate: 60 }, 
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


const Next = ({categoryName, categoryPost}: { categoryName: string, categoryPost: InnerEdges[] }) => {
    const [nextNews, setNextLive] = useState<InnerEdges>();
   const[loading, setLoading]=useState(false)
     const getNext=async()=>{
     const nextxnews =await nextResp()
     setNextLive(nextxnews) ?? []
     setLoading(false)
   }

      useEffect(() => {
        setLoading(true)
      getNext()
        }, []);
 
        const top_PostsData = nextNews?.edges
  return (
    <div>
        
        <div className='xl:flex justify-center max-w-4xl md:w-10/12 xl:w-auto xl:max-w-7xl m-auto'>  
          {loading && <span className="loader"></span>} 
<div> 
 {!categoryName&&(top_PostsData??[]).length>0?top_PostsData?.slice(0,1).map((ex, i)=>
<div className='shadow-2xl h-3/4 max-w-[700px] mx-auto lg:max-w-[1200px]' key={ex.node.title + ' ' + ex.node.slug}>

<div className="my-3"> 
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
className='object-cover'
 width={700}
 height={600}
  alt={ex?.node.featuredImage?.node.sourceUrl } />  

 </div>
  <Link href={`/news/highlight/${ex.node.slug}/`}><h2 className='overflow-hidden text-ellipsis text-2xl sm:text-4xl xl:text-5xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link>
  <hr className='my-2'/>
  <Link href={`/news/highlight/${ex.node.slug}/`}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400 text-lg' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link>
 
<div className='flex text-xs text-gray-400 justify-between items-center py-3 leading-8 '> 
<Link href={`/creator/${ex.node?.author.node.slug}/`}><p>{ ex.node?.author.node.name }</p></Link>  
 <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
</div>  
</div>
):<> 
{categoryPost?.slice(0,1).map((ex, i)=>
  <div className='shadow-2xl h-3/4 max-w-[700px] mx-auto lg:max-w-[1200px]' key={ex.node.title + ' ' + ex.node.slug}>   
<div className="my-3">
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
 className='object-cover'
 width={700}
 height={600}
  alt={ex?.node.featuredImage?.node.sourceUrl } />  

 </div>
   
    <Link href={`/news/highlight/${ex.node.slug}/`}><h2 className='overflow-hidden text-ellipsis text-xl sm:text-2xl xl:text-3xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link >
    <hr className='my-2'/>
    <Link href={`/news/highlight/${ex.node.slug}/`}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400 text-xl' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link >
   
  <div className='flex text-xs text-gray-400 justify-between items-center py-3 leading-8 my-3'> 
  <Link href={`/creator/${ex.node?.author.node.slug}/`}><p>{ ex.node?.author.node.name }</p></Link>  
   <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
  </div>  
  </div>
  )}
 </>}  

</div>

  <div className='my-2 m-auto px-2 xl:px-1'>
  {!categoryName?top_PostsData?.slice(1).map((ex)=>
<div className='shadow flex gap-4 first:md:pt-0 md:pt-4' key={ex.node.title + ' ' + ex.node.slug}>
  <div className="m-auto xl:h-[100px] my-2">

  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl} 
 className='object-cover'
 width={300}
 height={200}
  alt={ex?.node.featuredImage?.node.altText}/> 

  </div>

  <div className='w-4/5 xl:w-full'> 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/highlight/${ex.node.slug}/`}prefetch={false}><h2 className='font-bold text-2xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
 </div>
<div className='xs:flex text-xs text-gray-400 justify-between items-center leading-8 my-2'> 
{/* <Link href={`/creator/${ ex?.node.author.node.slug}/`}prefetch={false}><p >{ ex?.node.author.node.name }</p></Link>  */}
  <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
):categoryPost?.slice(1).map((ex)=>
  <div className='shadow flex gap-4 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title}>
<div className="relative w-44 h-24 m-auto xl:h-[100px] my-2">
<Image 
src={ex?.node.featuredImage?.node.sourceUrl} 
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt={ex?.node.featuredImage?.node.altText}/> 

</div>

<div className='w-4/5 xl:w-full'>  
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/highlight/${ex.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
  </div>
<div className='sm:flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ ex?.node.author.node.slug}/`}><p >{ ex?.node.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
)}  
</div> 
 
</div>  
    </div>
  )
}

export default Next
