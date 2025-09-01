"use client" 
import { fetchNewPosts } from '@/app/page-bottom'
import { InnerEdges, LatestProps, PostXNode } from '@/app/types'
import { dateFormatter } from '@/utils/dateformat'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'  
  
 async function sidePlusViews(){
    // const latestPosts=await newsViews(['txcx'])
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
                      }}  ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data) 
           .catch((err) => console.log("err", err)) 
     const dataView= await res
    const postX = dataView?.posts.pageInfo?.endCursor 
  
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
       
         }
           }  
        
         `, variables:{
          after:postX
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  
      const dataXView= await wprest 
    const latestStr = dataXView?.pageInfo?.endCursor  

     const wpxrest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
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

     const newsStr=await wpxrest
     const trest=newsStr?.posts?.pageInfo?.endCursor 
   
      const wparest = fetch('https://content.culturays.com/graphql',{ 
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
            }
          } 
       `  
      }) 
     
      }).then(response => response.json()) 
      .then(data => data.data) 
      .catch(error =>{
       console.log(error)
  }) 
    return wparest
  }
  
 
const fetchXPosts2 =async () => { 
const wp_world = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json'
},

body: JSON.stringify({
  query:`
  query WPPOSTS { 
  posts( where: {categoryName: "world" }){
    pageInfo {
        startCursor
        endCursor
        hasNextPage
      } 
      
  nodes {        
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
}  }  

` 
})

}).then(response => response.json()) 
.then(data => data.data)
.catch(error => console.error('Error:', error)); 
//const res_naija = wp_naija?.data 
return wp_world

}


const nextPostsX2=async()=>{
const latestPosts=await sidePlusViews()
const trest=latestPosts?.posts?.pageInfo?.endCursor 
const wpXXrest = fetch('https://content.culturays.com/graphql',{
method: 'POST',
headers:{
  'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query WPPOSTS {       
posts( after:"${trest}" , where:{categoryName: "Latest"}){ 
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    } 
 
  nodes {
    contentTypeName
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
`  }) 

}).then(response =>response.json() ) 
.then(data =>data.data ) 
.catch(error => console.error('Error:', error));
return wpXXrest
}
async function nextPostsX1(){  
const wprestPost = fetch('https://content.culturays.com/graphql',{     
method: 'POST', 
headers:{
    'Content-Type':'application/json'
},
body: JSON.stringify({
  query:`
query WPPOSTS  {          
posts(first:11, where: {categoryName: "News"}) {
pageInfo{
endCursor
startCursor
hasNextPage
    }

}} 
` 

})
, 

}).then((response) => response.json()) 
.then((data)=>data.data.posts )
.catch((error) => console.error('Error:', error)); 
const endX = await wprestPost
if(!endX)return 

const xwp = fetch('https://content.culturays.com/graphql',{
method: 'POST',
headers:{
  'Content-Type':'application/json'
},

body: JSON.stringify({
query:`
query WPPOSTS {       
posts(first:22, after:"${endX.pageInfo.endCursor}" , where:{categoryName: "News"}){ 
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    } 
 
  nodes {
    contentTypeName
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
` 

} )
}).then(response =>response.json())
.then(data =>data.data) 
.catch(error => console.error('Error:', error)); 
return xwp
} 

const afriNewsNext =async()=>{
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
          
}  }   ` 
  })
  
  }).then((res) => res.json() )
    .then((data) => data.data) 
    .catch((err) => console.log("err", err)) 
  const moreX = await wp_naija
  const fill =moreX.posts.pageInfo.endCursor

const wpNextAf = fetch('https://content.culturays.com/graphql',{
  method: 'POST', 
  headers:{
  'Content-Type':'application/json'
  },

  body: JSON.stringify({
    query:`
    query WPPOSTS { 
      posts(  after:"${fill}", where: {categoryName: "africa" }){
      pageInfo {
          startCursor
          endCursor
          hasNextPage
        } 
        
  nodes {        
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
  } }} 
          ` 
  })
  
  }).then((res) => res.json() )
    .then((data) => data.data) 
    .catch((err) => console.log("err", err)) 

  return wpNextAf  

} 


 const nextPostsX3=async()=>{     
 const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST',
 headers:{
     'Content-Type':'application/json'
 },
 body: JSON.stringify({
   query:`
   query WPPOSTS { 
   categories(where: {name: "Topics"}) {          
   edges {
   cursor      
   node {
 name
 slug
 posts{
 edges{
 cursor
 }
 }
   children (where: {exclude: "dGVybTo0MDQ="}){ 
   edges {
   cursor 
 node {
 name
 slug
 posts(first:5) {
 pageInfo{
 endCursor
 startCursor
 hasNextPage
 }
 edges{
 cursor
 
 }
 
 }  }
 }  }}
 }
 } } `  
 
 })
 
 }).then(response => response.json()) 
 .then(data => data.data)
 .catch(error => console.error('Error:', error)); 
 const endXCate = await wprest   
 const postCategory_Children =(endXCate?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[] 
 const top_posts = postCategory_Children.map((xy:InnerEdges)=> xy.node.posts.edges).flat()
 const topCursors=top_posts.map((vx)=> vx.cursor)
 
    const wpRestXX = fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query:`
         query WPPOSTS($notIn:[ID]) {       
        posts(where:{categoryName: "Topics", notIn:$notIn }){ 
             pageInfo {
               startCursor
               endCursor
               hasNextPage
             } 
           
           nodes {
            contentTypeName
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
       }}  
     }
   ` , variables:{
 notIn: topCursors 
 
   }  })
        }).then(response =>response.json())
       .then(data => data.data)
       .catch(error => console.error('Error:', error)); 
      
        return wpRestXX
 } 
const MainBottom = () => { 
const [scrolledContent, setScrolledContent]=useState<LatestProps[]>([])
const {ref, inView } =useInView();  
const [debouncedValue, setDebouncedValue] = useState<string>('')  
const [hasNewPage, setHasNewPage] = useState(true); 
 const [postsXnewsPosts, setPostsXnewsPosts]= useState<PostXNode[]>([])  
 
      useEffect(() => { 
        const fetchData = async () => {
         const response2 = await fetchXPosts2() 
        const newsX12= await nextPostsX2()          
            const response3 = await afriNewsNext() 
            const news_notIn_newsPosts= await nextPostsX1(); //should not slice 5. Already up to 20 at the time
            const startWith = await nextPostsX3()  
            setPostsXnewsPosts(prev => [...prev, ...response2.posts?.nodes, ...newsX12.posts?.nodes, ...response3.posts?.nodes, ...news_notIn_newsPosts.posts?.nodes, ...startWith.posts?.nodes]) 
      setScrolledContent(prev => [...prev, ...response2.posts?.nodes.slice(5), ...newsX12.posts?.nodes.slice(5), ...response3.posts?.nodes.slice(5), ...startWith.posts?.nodes.slice(5)]) 
        };

        fetchData();
      }, []); 
 
const loadMorePosts = useCallback(async () => {
 
  const apiP = await fetchNewPosts(debouncedValue); 
  if(apiP.posts.nodes.length===25)return
  const naijaNew_content = apiP.posts.nodes;
  const hasMorePosts = apiP.posts.pageInfo.hasNextPage;
 
   setScrolledContent(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const uniqueNew = naijaNew_content.filter((item:PostXNode) => !existingIds.has(item.id));
      return [...prev, ...uniqueNew];
    });
 
  setHasNewPage(hasMorePosts);
  if (hasMorePosts) {
    setDebouncedValue(apiP.posts.pageInfo.endCursor);
  } else {
    setDebouncedValue('');
  }
}, [debouncedValue, hasNewPage]);  

useEffect(() => {
  if (hasNewPage) {
    loadMorePosts();
  }
}, [inView, hasNewPage, loadMorePosts]); 

  return (
    <div> 
 <div className='xl:w-11/12 m-auto px-3'>
 
 {/* {loading&&<p>Loading...</p>} */}
  <div className='grid lg:grid-cols-2 justify-center items-center px-10 xl:max-w-6xl mx-auto gap-2'>

     <div className='m-auto max-w-xl lg:m-0 my-4'>
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(0,3).map((ex)=>
<div className='shadow flex my-1' key={ex.title + ' ' + Math.random()}>
 <div className='w-44 m-1'> 
 <Image
 className='xs:h-28 sm:h-32'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-44 xs:w-[200px] sm:w-[280px] mx-2'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/${ex.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8'> 
{/* <Link href={`/creator/${ex.author.node.slug}/`}><p >{ ex.author.node.name }</p> </Link> */}
 <p>{ dateFormatter?.format(Date?.parse(ex.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 <div className='m-auto max-w-xl lg:m-0 my-4'>
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(3,6).map((ex)=>
<div className='shadow flex my-1' key={ex.title + ' ' + Math.random()}>
 <div className='w-44 m-1'> 
 <Image
 className='xs:h-28 sm:h-32'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-44 xs:w-[200px] sm:w-[280px] mx-2'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/${ex.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-gray-400 justify-between items-center leading-8'> 
{/* <Link href={`/creator/${ex.author.node.slug}/`}><p >{ex.author.node.name }</p> </Link> */}
 <p>{ dateFormatter?.format(Date?.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div>
 </div>

  <div className='my-6'> 
<hr className=' '/> 
<div className='sm:grid grid-cols-2 xl:grid-cols-4 gap-1 py-4 max-w-2xl lg:max-w-max m-auto' > 
 
{ postsXnewsPosts?.length>0&&postsXnewsPosts.slice(6,10).map((xy, i)=>
<div className='max-w-sm m-auto py-11 hover:text-gray-300 border-black border-b-4 px-4 sm:h-52' key={i + ' ' + Math.random()}>
<Link href={`/news/${xy.slug}/`}>
<h2 className='text-xl font-bold'>{xy.title}</h2></Link> 
  <p className='text-sm py-4'>{ dateFormatter?.format(Date.parse(xy?.date)) }</p>
  
</div> 

)} 

</div>
<hr /> 
</div> 
 </div>  

 
   <div className='m-auto py-5 w-full'>  
  <div className='flex border-b shadow justify-around items-center py-6'> 
<h3 className='text-2xl font-bold w-max mx-4 px-2'>What&#39;s New</h3>
<hr className='bg-black h-1 w-2/3 my-4'/>
</div>   
  <div className='md:grid md:grid-cols-2  justify-center  m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(10,12).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={xy.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${xy.slug}/`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 ' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link >
  <div className=''>
  <Link href={`/news/${xy.slug}/`}> <div dangerouslySetInnerHTML={{__html:xy.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
<div className='flex text-gray-400 justify-between py-3 my-4 px-2 overflow-hidden'> 
{/* <Link href={`/creator/${xy.author.node.slug}/`}><p>{ xy.author.node.name }</p></Link>  */}
  <p>{ dateFormatter?.format(Date.parse(xy.date)) }</p>
</div>
</div>  
)}   
</div> 
<hr className='p-0.5 bg-black'/>


<div className='py-3 md:py-0 md:m-0 md:grid grid-cols-2 lg:block xl:grid justify-center 2xl:grid-cols-4 gap-0 xl:max-w-4xl 2xl:max-w-max xl:m-auto' >
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(12,16).map((ex)=>
<div className='shadow flex max-w-xl xl:max-w-md m-auto my-3 m-auto' key={ex.title + ' ' + Math.random()}>
  <div className='w-44 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-20 xs:h-24 '
  src={ex.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400'>{ex.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
{/* <Link href={`/creator/${ex.author.node.slug}/`}><p >{ex.author.node.name }</p> </Link> */}
  <p>{ dateFormatter?.format(Date.parse(ex.date)) }</p>
</div>
</div>
</div>
)} 
 </div>
 <hr className='p-0.5 bg-black'/>

  <div className='md:flex flex-wrap xl:flex-nowrap gap-1 my-11 px-2 md:px-1 m-auto max-w-2xl'> 
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(16,18).map((xy, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-xs m-auto my-4'style={{height:'600px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xxs:h-56 md:h-64 xl:h-56'
  src={xy.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={xy.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${xy.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} className='text-ellipsis overflow-hidden h-28 py-4 text-2xl font-bold px-3 hover:text-gray-400'>{xy.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/${xy.slug}/`}><div style={{ display: '-webkit-box', WebkitLineClamp:4, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html:xy.excerpt}}className='text-ellipsis overflow-hidden h-32 leading-8 px-3 hover:text-gray-400'/></Link ></div>  
{/* <div className='flex text-gray-400 py-4 justify-between px-4'> 
<Link href={`/creator/${ xy.author.node.slug}/`}><p className='hover:text-gray-700 px-2'>{ xy.author.node.name }</p></Link> 
  <p className='px-2'>{ dateFormatter?.format(Date.parse(xy.date)) }</p>
</div> */}
</div>  
)}  
</div>

 

<div className='md:grid md:grid-cols-2 justify-center m-auto my-11 px-2 md:px-1 max-w-4xl lg:max-w-max' > 
 { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(18,20).map((ex, i)=> 
<div className='shadow-2xl max-w-sm md:max-w-md m-auto my-4 px-1'style={{height:'550px' }} key={i + ' ' + Math.random()}> 
<div> 
  <Image 
   className='h-44 xs:h-64 md:h-56 lg:h-64'
  src={ex.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex.featuredImage?.node.altText}/> 
  
  </div>
  <Link href={`/news/${ex.slug}/`}>
  <h2 className='text-ellipsis overflow-hidden h-20 py-4 text-2xl font-bold px-3 xl:px-4 hover:text-gray-400 leading-8' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title}</h2></Link >
  <div className='py-4'>
  <Link href={`/news/${ex.slug}/`}> <div dangerouslySetInnerHTML={{__html:ex.excerpt}}className='leading-8 px-3 xl:px-4 hover:text-gray-400 text-ellipsis overflow-hidden'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link ></div>  
{/* <div className='flex text-gray-400 justify-between py-3 my-4 px-2'> 
<Link href={`/creator/${ex.author.node.slug}/`}><p className='hover:text-gray-700'>{ex.author.node.name }</p></Link> 
  <p>{ dateFormatter?.format(Date.parse(ex.date)) }</p>
</div> */}
</div>  
)}  
</div>  
 
<hr className='h-1 w-4/5 m-auto my-4'/>
 <div className='p-3 md:py-0 md:m-0 md:grid grid-cols-2 xl:grid justify-center gap-0 xl:max-w-5xl xl:m-auto' > 
  { postsXnewsPosts?.length>0&&postsXnewsPosts.slice(20,24).map((ex)=>
<div className='flex m-auto my-3' key={ex.title + ' ' + Math.random()}>
  <div className='w-44 mx-2 py-6'> 
  <Image
  className='h-11 xxs:h-16 xs:h-24 lg:h-28'
  src={ex.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex.featuredImage?.node.altText}/> 
  
  </div> 
  <div className='w-4/5 mx-2 py-6'> 
  <div className=' text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.slug}/`}><h2 className='font-bold text-xl hover:text-gray-400'>{ex.title}</h2></Link>
 </div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex.author.node.slug}/`}><p className='hover:text-gray-700 py-4'>{ex.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex.date)) }</p>
</div>
</div>
</div>
)}  
 </div> 
</div> 

  <div className='flex flex-wrap justify-center py-6'>
{ postsXnewsPosts?.length>0&&postsXnewsPosts.slice(24,27).map((ex,i)=>
<div className='relative m-3' key={ex.title + ' ' + Math.random()} >
  <div className='max-w-sm m-auto'> 

  <Image
  className='h-56 block'
  src={ex.featuredImage?.node.sourceUrl} 
  width={1200} 
  height={675} 
  alt={ex.featuredImage?.node.altText}/> 
  
  </div> 
 
  <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 h-full w-full">
    <Link href={`/news/${ex.slug}/`}><div className="text-center px-1">
      <h2 className='text-2xl text-gray-50 hover:text-gray-400'>{ex.title} </h2> 
    </div></Link> 
</div>

  </div>
)}
 
</div>    

<hr className='h-1 w-4/5 m-auto my-4'/>
 <div className='lg:flex lg:px-3 lg:m-auto justify-between' style={{maxWidth:'1450px'}}> 
<div className='max-w-5xl m-auto xs:px-6 px-2 lg:px-0 lg:m-0 lg:max-w-2xl min-[1100px]:max-w-3xl xl:max-w-4xl min-[1324px]:max-w-5xl'>
<div className='flex shadow-sm px-8 justify-around items-center py-6'>  
<h3 className='text-xl font-bold mx-4 w-full'>Latest News</h3>
<hr className='bg-black h-1 w-4/5 my-4'/>
</div> 
 
 {scrolledContent?.slice(4).map((ex,i)=>
 <div className='shadow m-2 flex' key={ex.title + ' ' + Math.random()}>
  
 <div className='w-1/2 py-6 mx-1'> 
 <Image
 className='xs:h-32 sm:h-44 md:h-56 max-h-64 object-cover'
 src={ex?.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex?.featuredImage?.node.altText}/> 
 
 </div> 
 <div className='w-3/4 xs:w-4/5 mx-2 py-4'> 

 <Link href={`/news/${ex.slug}/`}>
 <h2 className='text-2xl font-bold text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex?.title}</h2></Link > 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>
    <Link href={`/news/${ex.slug}/`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8 my-2 hover:text-gray-400'/></Link >
</div>
 
<div className='flex text-base text-gray-400 justify-between items-center leading-8'> 
<Link href={`/creator/${ ex?.author.node.slug}/`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p></Link> 
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>  
</div>)} 
</div>

<div className='max-w-5xl m-auto xs:px-8 lg:px-0 px-2 lg:m-0 '>
<div className='flex shadow-sm px-8 justify-around items-center py-6'>  
<h3 className='text-xl font-bold mx-4 w-full'>New Collection</h3>
<hr className='bg-black h-1 w-4/5 my-4'/>
</div>

  <div className='lg:m-0 sm:grid grid-cols-2 lg:block gap-1 max-w-3xl m-auto'> 
   {scrolledContent?.slice(0,4).map((ex, i)=>
<div className='shadow-2xl my-4 m-auto max-w-md md:max-w-sm' key={ex.title + ' ' + Math.random()}>
 <div > 
  <Image 
  className='h-60 xs:h-64 sm:h-56'
  src={ex?.featuredImage?.node.sourceUrl } 
  width={1200} 
  height={675} 
  alt={ex?.featuredImage?.node.sourceUrl }/>  
  </div>
  <Link href={`/news/${ex.slug}/`}><h2 className='leading-9 my-2 overflow-hidden text-ellipsis text-2xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex?.title}</h2></Link >
   <Link href={`/news/${ex.slug}/`}><div dangerouslySetInnerHTML={{__html:ex?.excerpt}} className='leading-8 hover:text-gray-400 overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/></Link >
<div className='flex text-gray-400 justify-between items-center py-2 leading-8'> 
<Link href={`/creator/${ ex.author.node.slug}/`}><p className='hover:text-gray-700'>{ ex?.author.node.name }</p> </Link>
  <p>{ dateFormatter?.format(Date.parse(ex.date)) }</p>
</div>  
</div>
)}  

</div>   
</div>
  
</div>  
 <div ref={ref} > 
 {hasNewPage&&
<p className="p-4">Loading...</p> 
 } </div>  
  </div>  
  )
}

export default MainBottom
