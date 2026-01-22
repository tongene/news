"use client"
import { PostXNode } from '@/app/types'  
import Image from 'next/image'
import Link from 'next/link'
import { dateFormatter } from '@/utils/dateformat'
import { useEffect, useState } from 'react'
import OutofPosts from './Home/OutofPosts'

 const fetchXPosts =  () => { 
 const wp_naija = fetch('https://content.culturays.com/graphql',{
       method: 'POST', 
       headers:{
       'Content-Type':'application/json'
       },
    
       body: JSON.stringify({
         query:`
         query WPPOSTS { 
          posts(first:1, where: {categoryName: "africa" }){
           pageInfo {
               startCursor
               endCursor
               hasNextPage
             } 
               edges{
               cursor
         node {        
           title
           slug
            date
            content
            id
           
         tags {
             nodes {
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
               description
             }
           }
         }
       }  }  }
      
        ` 
       })
       
       })
 
       return wp_naija 
   }
 
const MainPosts = () => {  
   const [postsXnewsPosts, setPostsXnewsPosts]= useState<PostXNode[]>([]) 
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetchXPosts()          
              
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const [res1 ] = await Promise.all([response.json() ]);
            setPostsXnewsPosts([
              ...(res1.data?.posts?.edges || []),
             
            ]);
        
          } catch (err) {
            if(err instanceof Error){
            return
            ;}
          } finally {
           return []
          }
        };

        fetchData();
      }, []); 
 
  return (
    <> 
<OutofPosts/> 

<div className='flex justify-around items-center py-4'> 
<h2 className='text-5xl font-bold w-max mx-4 font-mono py-6 italic'>Spotlight Africa</h2>
<hr className='bg-black h-1 w-3/4 my-4'/>
</div>

<div className='flex bg-black py-6 text-gray-300 italic justify-between mx-4 px-4'>
<p>Special Edition</p>
 <p>{new Date().toDateString()}</p>
 </div>
  
    <div className='grid grid-cols-1 justify-center gap-2 m-auto w-max'> 
      <div>
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(0,1).map((xy, i)=> 
<div key={i + ' ' + Math.random()} className='border max-w-sm min-[500px]:max-w-md sm:max-w-lg m-auto md:m-0 px-3 py-6 ' > 
<Link href={`/news/${xy.node.slug}/`}>
 
<h2 className='py-4 my-4 text-4xl lg:text-5xl font-bold hover:text-gray-400 px-1' style={{lineHeight:'55px'}} >{xy?.node.title}</h2></Link >
  <div className='text-ellipsis overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${xy.node.slug}/`}><div dangerouslySetInnerHTML={{__html:xy?.node.excerpt}}className='leading-8 xl:px-4 hover:text-gray-400 text-xl' /></Link ></div>  
 <div>
<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black my-1'/> 
  <div className='flex text-gray-400 justify-between py-4 px-2 overflow-hidden'> 
<Link href={`/creator/${xy?.node.author.node.slug}/`}><p className='w-44'>{xy?.node.author.node.name}</p></Link>
<hr className='h-10 bg-black p-0.5 w-auto'/>
  <p className='w-44'>{ dateFormatter?.format(Date.parse(xy?.node.date)) }</p>
</div>  

<hr className='h-3 bg-black my-1'/> 
<hr className='h-1 bg-black  my-1'/> 
<div> 
  <Image  
  src={xy?.node.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy?.node.featuredImage?.node.altText}/>   
  </div>

  <hr className='h-3 bg-gray-500 my-1'/> 
<hr className='h-1 bg-gray-500 my-1'/> 
<div className='flex justify-between py-4 px-3 overflow-hidden first:border-r first:border-r-4 first:border-r-black'> 
<Link href={`/topic/${xy?.node.tags?.nodes[0]?.slug}/`}><p className='hover:text-gray-300 w-32'>{xy?.node.tags.nodes[0]?.name}</p></Link> 
 
  <hr className='h-10 bg-gray-500 p-0.5 w-auto'/> 
  <Link href={`/topic/${xy?.node.tags?.nodes[1]?.slug}/`}><p className='hover:text-gray-300 w-32'>{xy?.node.tags?.nodes[1]?.name}</p></Link>
</div> 
<hr className='h-3 bg-gray-500 my-1'/> 
<hr className='h-1 bg-gray-500 my-1'/>   
</div> 
</div>  
)} 
  
 </div>
  
</div>

</>
  )
}

export default MainPosts