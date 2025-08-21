"use client" 
import React, { useEffect, useState } from 'react' 
import Image from 'next/image'
import { dateFormatter } from '@/utils/dateformat'
import Link from 'next/link'  
import { Cursors, InnerEdges, PostXNode, SideNode } from '@/app/types'  
import MainBottom from './MainBottom'
import SideBar from './Side' 
import MainPosts from './MainPosts';
import { getGoogleNewsTitles } from '@/app/data/news-data'
  const newsViews=async()=>{ 
           const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
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
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
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
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}", where: {categoryName: "Latest"}) {
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
         ` 
        
        })
        , 
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  }
   async function postCategories(){
 
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
              
                postsTags {
              nodes {
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
        }}
      }  }}
  }
    }   `  
        
        })
        
        }).then(response => response.json()) 
        .then(data => data.data)
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data
        return wprest ??[]
  } 
const Main = ({top_PostsData, news_outline, posts_notIn_newsPosts }:{ top_PostsData:InnerEdges[], news_outline:SideNode[], posts_notIn_newsPosts:PostXNode[] }) => { 
const [activeSet, setActiveSet]=useState(true)
const [actIdx, setActIdx]=useState(-1)
const [categoryPost,setCategoryPost]=useState<InnerEdges[]>([])
const [categoryName,setCategoryName]=useState('') 
const [top_PostsCa, setTopPostsCa]=useState<PostXNode[]>([]) 
const [sidebarItems, setSidebarxItems]=useState<Cursors[]>([])

// const [top_Last_categories, setLast_categories]=useState([])   
const rmMain =top_PostsData.map((xy)=> xy.cursor)
const x_wiki =async ()=>{ 
const post_data = await postCategories() 
const postCategory_Children =(post_data?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[] 
setTopPostsCa(postCategory_Children ) 

await new Promise(resolve => setTimeout(resolve, 3000)); 
const sidebarxItems= await sidePlusViews() 
const txPlus=sidebarxItems.posts?.edges.map((dy:InnerEdges)=>dy.node )
setSidebarxItems(txPlus)

}
useEffect(()=>{        
x_wiki()
//dep top_PostsData
},[]) 

const changeSet = (i: number, name: string) => {
  if (i === -1) {
    // Handle the "All" button
    setActIdx(-1);
    setCategoryName('');
    setCategoryPost(
      top_PostsCa
        ?.flat()
        ?.map((xy) => xy?.node?.posts)
        .map((ex) => ex?.edges as InnerEdges)
        .flat() ?? []
    );
    return;
  }

  // Handle a specific category
  setActIdx(i);
  setCategoryName(name);

  const currentPosts = top_PostsCa
    ?.flat()
    ?.filter((ex) => ex?.node?.name === name)
    ?.map((xy) => xy?.node?.posts)
    .map((ex) => ex?.edges as InnerEdges)
    .flat();

  setCategoryPost(currentPosts ?? []);
};

 
  const changeView = async(i:number,name:string) =>{
     setActiveSet(prev => !prev)
    setActIdx(i);
    setCategoryName(name) 

 
    }; 
    useEffect(()=>{
      const googleTxt=async()=>{
   const location = 'Lagos, Nigeria'; 
       await getGoogleNewsTitles(location) 
      }
      googleTxt()
    },[]) 
    
  return ( 
    <section className='clear-left'> 
    <div className="lg:flex justify-center sm:px-11 px-4 m-auto" style={{maxWidth:'1700px'}}> 
<div className='max-w-7xl mx-auto'> 
  <div className='lg:flex xl:px-4'> 
 <div className='py-20 md:px-1 m-auto'> 
<div className='py-5'>
<div className='flex border-b shadow-sm justify-around items-center '> 
<h3 data-test="header-1" className='text-xl font-bold w-60'>Don&#39;t Miss</h3>  
 <hr className='bg-black h-1 w-3/4 my-4'/>
 <div className='w-2/3' >
   <ul className='flex justify-end flex-wrap py-2'> 
 <li
  className={
    actIdx === -1
      ? 'font-bold cursor-pointer text-gray-700 bg-gray-100 p-2 rounded underline decoration-cyan-500 decoration-4 hover:text-gray-900'
      : 'cursor-pointer text-gray-600 bg-gray-100 p-2 rounded hover:text-gray-900'
  }
  onClick={() => changeSet(-1, '')}
>
  All
</li>
 
    {top_PostsCa?.map((xy, idx) =>  
      <li 
    className={
    actIdx === idx
      ? 'font-bold cursor-pointer text-gray-500 bg-gray-100 p-2 rounded underline decoration-cyan-500 decoration-4 hover:text-gray-800 my-0.5'
      : 'cursor-pointer text-gray-600 bg-gray-100 p-2 rounded hover:text-gray-800 m-0.5'}
      onClick={() => changeSet(idx, xy.node.name)}  
        key={xy.node.name + ' ' + Math.random()}>
        {xy.node.name}
      </li> 
    )}   
  </ul> 
</div> 
</div>  
 
</div>

  <div className='xl:flex justify-center max-w-4xl md:w-10/12 xl:w-auto xl:max-w-7xl m-auto'> 
<div> 
 {!categoryName&&top_PostsData.length>0?top_PostsData?.slice(0,1).map((ex, i)=>
<div className='shadow-2xl h-3/4 max-w-[700px] mx-auto lg:max-w-[1200px]' key={ex.node.title + ' ' + Math.random()}>

<div className="my-3"> 
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
className='object-cover'
 width={700}
 height={600}
  alt={ex?.node.featuredImage?.node.sourceUrl } />  

 </div>
  <Link href={`/news/${ex.node.slug}/`}><h2 className='overflow-hidden text-ellipsis text-xl sm:text-2xl xl:text-3xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link >
  <hr className='my-2'/>
  <Link href={`/news/${ex.node.slug}/`}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400 text-lg' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link >
 
<div className='flex text-gray-400 justify-between items-center py-4 leading-8 '> 
<Link href={`/creator/${ex.node?.author.node.slug}/`}><p>{ ex.node?.author.node.name }</p></Link>  
 <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
</div>  
</div>
):<> 
{categoryPost?.slice(0,1).map((ex, i)=>
  <div className='shadow-2xl h-3/4 max-w-[700px] mx-auto lg:max-w-[1200px]' key={ex.node.title + ' ' + Math.random()}>   
<div className="my-3">
  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl } 
 className='object-cover'
 width={700}
 height={600}
  alt={ex?.node.featuredImage?.node.sourceUrl } />  

 </div>
   
    <Link href={`/news/${ex.node.slug}/`}><h2 className='overflow-hidden text-ellipsis text-xl sm:text-2xl xl:text-3xl font-bold hover:text-gray-400'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.node?.title}</h2></Link >
    <hr className='my-2'/>
    <Link href={`/news/${ex.node.slug}/`}><div className='overflow-hidden text-ellipsis leading-8 hover:text-gray-400 text-lg' dangerouslySetInnerHTML={{__html:ex.node?.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/> </Link >
   
  <div className='flex text-gray-400 justify-between items-center py-4 leading-8 my-3'> 
  <Link href={`/creator/${ex.node?.author.node.slug}/`}><p>{ ex.node?.author.node.name }</p></Link>  
   <p >{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p> 
  </div>  
  </div>
  )}
 </>}  

</div>

  <div className='my-2 m-auto px-4 xl:px-1'>
  {!categoryName?top_PostsData?.slice(1).map((ex)=>
<div className='shadow flex gap-4 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title + ' ' + Math.random()}>
  <div className="relative w-44 h-24 m-auto xl:h-[100px] my-2">

  <Image 
  src={ex?.node.featuredImage?.node.sourceUrl} 
 fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt={ex?.node.featuredImage?.node.altText}/> 

  </div>

  <div className='w-4/5 xl:w-full'> 
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.node.slug}/`}prefetch={false}><h2 className='font-bold text-xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
 </div>
<div className='sm:flex text-gray-400 justify-between items-center leading-8 my-2'> 
{/* <Link href={`/creator/${ ex?.node.author.node.slug}/`}prefetch={false}><p >{ ex?.node.author.node.name }</p></Link>  */}
  <p>{ dateFormatter?.format(Date.parse(ex.node?.date)) }</p>
</div>
</div>
</div>
):categoryPost?.slice(1).map((ex)=>
  <div className='shadow flex gap-4 first:md:my-0 first:md:py-0 md:pb-4' key={ex.node.title + ' ' + Math.random()}>
<div className="relative w-44 h-24 m-auto xl:h-[100px] my-2">
<Image 
src={ex?.node.featuredImage?.node.sourceUrl} 
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt={ex?.node.featuredImage?.node.altText}/> 

</div>

<div className='w-4/5 xl:w-full'>  
  <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
  <Link href={`/news/${ex.node.slug}/`}><h2 className='font-bold text-xl hover:text-gray-500' >{ex?.node.title}</h2></Link>
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

 <hr/> 
</div>   

</div>   
 <hr className='h-1 w-4/5 m-auto my-4'/>
   <MainPosts
   posts_notIn_newsPosts={posts_notIn_newsPosts}
 /> 
 
</div>  
<div > 
     <SideBar 
     sidebarItems={sidebarItems}
     news_outline={news_outline}
     />  
  </div> </div>
     <MainBottom />   
   </section>
  )
}

export default Main