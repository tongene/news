"use client"
import { faPlay} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link" 
type TagProps={
  name:string 
  nodes:{
    slug: string
    name: string 
   }[]
  
  contentTags:{
    id:string
  slug: string
  name: string 
  nodes:{
  slug: string
  name: string
  
 }[]
 }
  tags:{
    id:string
  slug: string
  name: string 
  nodes:{
  slug: string
  name: string

 }[]
 }
  [key: string]: any; 

}

const Tags = ({tag_response,content_tag_response}:{tag_response:{nodes:TagProps[]},content_tag_response:{nodes:TagProps[]} }) => { 
const posts= tag_response.nodes.map((xy)=>xy?.posts.nodes??[]).flat() 
const awards= content_tag_response.nodes.map((xy)=>xy?.awards.nodes??[]).flat() 
const businesses= content_tag_response.nodes.map((xy)=>xy?.businesses.nodes??[]).flat()
const culturaysVideos= content_tag_response.nodes.map((xy)=>xy?.videos.nodes??[]).flat()
const economies= content_tag_response.nodes.map((xy)=>xy?.economies.nodes??[]).flat()
const environments= content_tag_response.nodes.map((xy)=>xy?.environments.nodes??[]).flat()
const health= content_tag_response.nodes.map((xy)=>xy?.healths.nodes??[]).flat() 
const societies= content_tag_response.nodes.map((xy)=>xy?.societies.nodes??[]).flat()
const technologies= content_tag_response.nodes.map((xy)=>xy?.technologies.nodes??[]).flat()
const trends= content_tag_response.nodes.map((xy)=>xy.trends.nodes??[]).flat()
const netflix_Naija = content_tag_response.nodes.map((xy)=>xy.naijaOnNetflix.nodes??[]).flat()
const netflixNaijas= netflix_Naija.map((xy)=>xy.netflixCategories.nodes??[]).flat()
 const netflixNaijaPosts=netflixNaijas.map((xy)=>xy?.naijaOnNetflix.nodes??[]).flat()

const newsArticles= content_tag_response.nodes.map((xy)=>xy.articles.nodes??[]).flat()
const nollywood= content_tag_response.nodes.map((xy)=>xy.nollywoods.nodes??[]).flat()
const tagged=content_tag_response?.nodes.concat(tag_response.nodes) 
const charsPosts= content_tag_response.nodes.map((xy)=>xy?.naijaWikis?.nodes).flat() 
const tagged_reses=awards.concat(businesses).concat(culturaysVideos).concat(economies).concat(environments).concat(health).concat(societies).concat(trends).concat(technologies).concat(newsArticles).concat(nollywood).concat(netflixNaijaPosts).concat(posts).concat(charsPosts).concat(technologies)
 
   return (
   <div className="search_all" > 
  <div className="m-auto bg-white dark:bg-black sm:px-4 xl:px-28 px-2"style={{maxWidth:'1550px'}}> 
   <h2 className="py-3 font-bold text-3xl font-bold">{tagged[0]?.name}</h2>
 <div className="sm:flex justify-center py-6 " >
  <div >
{tagged_reses.slice(0,1)?.map((ex, index)=>
ex.contentTypeName ==='video'? 
<div key={ex.id + Math.random()}className="max-w-4xl">  
<div className="shadow-sm my-3"> 
 <div> 
 <Image
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
  <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>  
 </div>

 <div className="flex flex-col justify-between py-4 mx-3">
 <div className="flex justify-between my-3">
  <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-3xl font-bold cursor-pointer font-medium leading-9 underline ">{ex.title}</h3></Link>  
 <button>  
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4 hover:text-gray-50 text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
</div>

   <div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>


</div>
  
</div> 
 
</div>:

<div key={ex.id + Math.random()}className="max-w-4xl">  
<div className="shadow-sm my-3">
 
  <div className=""> 
 <Image
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
 {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki' && <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">{ex.contentTypeName}</p></Link>} 
 {ex.contentTypeName ==='netflix-naija' && <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-2 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">{ex.contentTypeName}</p></Link>}  

 {ex.contentTypeName ==='naija-wiki' && <Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">Character</p></Link>}
 </div> 

 <div className="flex flex-col justify-between py-4 mx-3" >
     { ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }

     { ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }

     {ex.contentTypeName ==='netflix-naija'&&<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }

     {ex.contentTypeName !=='post'&&ex.contentTypeName!=='naija-wiki'&&ex.contentTypeName!=='netflix-naija'&&<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }
 
       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div>
  
</div> 
 
</div>
)}  

  </div>
  




 

  <div className="max-w-xl"> 
{tagged_reses.slice(1,4)?.map((ex, index)=> 
  ex.contentTypeName ==='video'?
<div key={ex.id + Math.random()} className="shadow-sm my-1 xs:my-0 py-2"> 
<div className="px-2">
  <div className="flex">        
 <div > 
  
 <Image
 className="max-w-28 sm:max-w-32 md:max-w-44 "
 src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex.featuredImage.node.altText}
 />
   <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
 </div> 
  
    <div className="mx-2 " >
     <div className="flex justify-between gap-5">
      <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline max-w-96">{ex.title}</h3></Link> 
<button> 
      <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4 hover:text-gray-300 text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
          </button> </div> 
   <div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>

)}
 </div> 
 

</div> 
</div>
   
 
 </div>

</div>:
<div key={ex.id + Math.random()} className="shadow-sm my-1 xs:my-0 py-2"> 
<div className="px-2">
  <div className="flex">        
 <div> 
 <Image
className="max-w-28 sm:max-w-32 md:max-w-44"
 src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex.featuredImage.node.altText}
 />
 {ex.contentTypeName !=='post' && ex.contentTypeName !=='video'&&ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki'  ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

 {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-sm font-bold text-center capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-sm font-bold text-center capitalize"></p>}

 {ex.contentTypeName ==='naija-wiki' ?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}
 </div> 
  
    <div className="mx-2 " >
    <Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> 
 
    {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div> 
</div>   
 
 </div>

</div>
)}  
</div>

</div>  

<div className="xs:grid grid-cols-2 md:grid-cols-3 my-6 max-w-max xl:max-w-3xl m-auto xl:m-0 gap-1" > 
{tagged_reses.slice(4,7).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4 hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:

<div className="max-w-max" key={index + Math.random()} > 
   <div className="max-w-72 xl:max-w-60 m-auto my-3 shadow  capitalize">
  <Image
   className="max-h-40 md:max-h-36 xl:max-h-36 lg:max-h-40"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      {ex.contentTypeName !=='post' && ex.contentTypeName !=='video'&&ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki' ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>} 

      {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

      {ex.contentTypeName ==='naija-wiki' ?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">Character</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

  </div>
  <div className="mx-2" >
   {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link>}

   {ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link>} 

   {ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link>} 

   {ex.contentTypeName !=='naija-wiki'&& ex.contentTypeName !=='netflix-naija'&&ex.contentTypeName !=='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link>} 
 
    {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}
 
</div>
</div>)}
</div>
   
<div className="sm:flex max-w-max m-auto lg:m-0"> 
{tagged_reses.slice(7,9).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
  <div className="shadow p-5 my-1 max-w-md sm:w-96  m-auto lg:m-0" key={ex.id + Math.random()} > 
   <p className="text-gray-100 p-3 bg-red-600 text-xl max-w-max my-1">{ex.contentTypeName}</p>
     
      { ex.contentTypeName ==='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

      { ex.contentTypeName ==='naija-wiki'&&<Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> } 

      { ex.contentTypeName ==='netflix-naija'&&<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

      {ex.contentTypeName !=='naija-wiki'&& ex.contentTypeName !=='netflix-naija'&& ex.contentTypeName !=='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> } 
  
       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}
 
</div> )}
</div>
  


<div className="grid xs:grid-cols-2 gap-1 max-w-6xl "> 
{tagged_reses.slice(9,11).map((ex, index)=>
ex.contentTypeName ==='video'?
<div className="my-3 shadow" key={ex.id + Math.random()}> 
<div> 
 <Image
 className="xs:max-h-40 sm:max-h-52 md:max-h-64 lg:max-h-80"
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
 <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
 </div>
<div className="flex justify-between py-5 mx-3 gap-1">
<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h2 className="search-title text-xl md:text-2xl underline">{ex.title}</h2></Link>
<button> 
 <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
</button>
</div>
</div>:
<div className="my-3 shadow" key={ex.id + Math.random()}> 
<div> 
 <Image
 className="xs:max-h-40 sm:max-h-52 md:max-h-64 lg:max-h-80"
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
     {ex.contentTypeName !=='post' && ex.contentTypeName !=='video'&&ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki' ? <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-red-500 text-lg font-bold text-center  capitalize"></p>}

     {ex.contentTypeName ==='netflix-naija'? <Link href={`/${ex.contentTypeName}/news//${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-red-500 text-lg font-bold text-center  capitalize"></p>}

     {ex.contentTypeName ==='naija-wiki'? <Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-red-500 text-lg font-bold text-center  capitalize"></p>}


 </div>
<div className="py-6 mx-3">
<Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h2 className="search-title text-xl md:text-2xl underline">{ex.title}</h2></Link>

</div>
</div>)}


 </div>
 
 

 <div className="xs:grid xs:grid-cols-2 sm:grid-cols-3 gap-2 my-6 max-w-6xl m-auto lg:m-0" > 
{tagged_reses.slice(11,16).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={ex.id + Math.random()}className="m-auto my-3 shadow max-w-xs  md:max-w-5xl">   
  <Image
  className="max-h-36 sm:max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-52"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div>
 
</div>:
<div key={ex.id + Math.random()} className="m-auto my-3 shadow max-w-xs md:max-w-5xl"> 
   
  <Image
   className="max-h-36 sm:max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-52"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki'? <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

      {ex.contentTypeName ==='netflix-naija'? <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

      {ex.contentTypeName ==='naija-wiki' ? <Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

   <div className="py-5 mx-3">
   {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3  className='mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link>}

{ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link> }

{ex.contentTypeName ==='netflix-naija'&&  <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link>}

{ex.contentTypeName !=='post'&& ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link> }

   </div>
</div>)}
</div>

<div className="grid xs:grid-cols-2 lg:grid-cols-4 max-w-max md:max-w-3xl lg:max-w-6xl m-auto lg:m-0 gap-2"> 
{tagged_reses.slice(16,20).map((ex, index)=> 
  ex.contentTypeName ==='video'?
  <div key={index + Math.random()}className="m-auto my-3 shadow max-w-xs md:max-w-md">   
    <Image
 className="max-h-44 sm:max-h-48 md:max-h-56 lg:max-h-40"
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     />
       <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
      <div className="flex justify-between py-5 mx-3 gap-1">
   
      <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
      <button> 
      <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
    </button>
     </div> 
   
  </div>:
<div key={index + Math.random()}className="m-auto my-3 shadow max-w-xs md:max-w-md"> 

<Image
    className="max-h-44 sm:max-h-48 md:max-h-56 lg:max-h-40"
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     />
  {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija'  && ex.contentTypeName !=='naija-wiki'?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}   

  {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

  {ex.contentTypeName ==='naija-wiki'?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>} 

  {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3  className='mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link>}

{ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link> }

{ex.contentTypeName ==='netflix-naija'&&  <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link>}

{ex.contentTypeName !=='post'&& ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className=' mx-1 text-2xl my-2 underline'>{ex.title}</h3></Link> }

</div>

)} 

 </div> 


 <div className="xs:grid xs:grid-cols-2 sm:grid-cols-3 gap-2 my-6 max-w-6xl m-auto lg:m-0" > 
{tagged_reses.slice(20,26).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index}className="m-auto my-3 shadow max-w-xs  md:max-w-5xl">   
  <Image
  className="max-h-44 sm:max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-52"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
<div key={index} className="m-auto my-3 shadow max-w-xs md:max-w-5xl"> 
   
  <Image
   className="max-h-36 sm:max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-52"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      {ex.contentTypeName !=='post' && ex.contentTypeName !=='video'&& ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki'? <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

      { ex.contentTypeName ==='netflix-naija'? <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center   capitalize"></p>}

 { ex.contentTypeName ==='naija-wiki'? <Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

   <div className="py-5 mx-3"> 

   {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}

{ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

{ex.contentTypeName ==='netflix-naija'&&  <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}

{ex.contentTypeName !=='post'&& ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }
   </div>
</div>)}
</div> 
 


<div className="sm:flex max-w-max m-auto lg:m-0"> 
{tagged_reses.slice(26,29).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
  <div className="shadow p-5 my-1 max-w-md sm:w-96 m-auto lg:m-0" key={ex.id + Math.random()}> 
   <p className="text-gray-100 p-3 bg-red-600 text-xl max-w-max my-1">{ex.contentTypeName}</p>

      {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}

      {ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

      {ex.contentTypeName ==='netflix-naija'&&  <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}

      {ex.contentTypeName !=='post'&& ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }
  
       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div> )}
</div>

  

<div className="xs:grid xs:grid-cols-2 sm:grid-cols-3 gap-2 my-6 max-w-6xl m-auto lg:m-0" > 
{tagged_reses.slice(29,35).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index}className="m-auto my-3 shadow max-w-xs  md:max-w-5xl">   
  <Image
  className="max-h-36 sm:max-h-28 md:max-h-40 lg:max-h-48 xl:max-h-52"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4 hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
<div key={index} className="m-auto my-3 shadow max-w-xs md:max-w-5xl"> 
   
<div className="max-w-72 xl:max-w-60 m-auto my-3 shadow ">
  <Image
   className="max-h-40 md:max-h-36 xl:max-h-36 lg:max-h-40"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija' && ex.contentTypeName !=='naija-wiki' ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}
  
      {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>} 

      {ex.contentTypeName ==='naija-wiki' ?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize">Character</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

  </div>
  <div className="mx-2" >
    {ex.contentTypeName ==='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link>} 

   {ex.contentTypeName ==='naija-wiki'&& <Link href={`/naia-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

  { ex.contentTypeName ==='netflix-naija'&&  <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

{ex.contentTypeName !=='post'&&ex.contentTypeName !=='naija-wiki'&&  ex.contentTypeName !=='netflix-naija'&&  <Link href={ `/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }
 
    {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div>
</div>)}
</div>
  

<div className="sm:flex max-w-max m-auto lg:m-0"> 
{tagged_reses.slice(35,37).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
  <div className="shadow p-5 my-1 max-w-md sm:w-96 m-auto lg:m-0" key={ex.id + Math.random()} > 
   <p className="text-gray-100 p-3 bg-red-600 text-xl max-w-max my-1">{ex.contentTypeName}</p>

       {ex.contentTypeName ==='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> } 

      {ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

      {ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

      {ex.contentTypeName !=='post'&&ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> } 

       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div> )}
</div>

 

<div className="grid xs:grid-cols-2 lg:grid-cols-4 max-w-max md:max-w-3xl lg:max-w-6xl m-auto lg:m-0 gap-2"> 
{tagged_reses.slice(37,41).map((ex, index)=> 
  ex.contentTypeName ==='video'?
  <div key={index + Math.random()}className="m-auto my-3 shadow max-w-xs md:max-w-md">   
    <Image
 className="max-h-44 sm:max-h-48 md:max-h-56 lg:max-h-40"
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     />
       <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
      <div className="flex justify-between py-5 mx-3 gap-1">
   
      <Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
      <button> 
      <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
    </button>
     </div>   
   
  </div>:
<div key={index + Math.random()}className="m-auto my-3 shadow max-w-xs md:max-w-md">  
<Image
    className="max-h-44 sm:max-h-48 md:max-h-56 lg:max-h-40"
     src={ex.featuredImage.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.featuredImage.node.altText}
     />
  {ex.contentTypeName !=='post' && ex.contentTypeName !=='video'  && ex.contentTypeName !=='netflix-naija'  && ex.contentTypeName !=='naija-wiki' ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}
   
  {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

  {ex.contentTypeName ==='naija-wiki'?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link>: <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center capitalize"></p>}

{ ex.contentTypeName ==='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline p-4">{ex.title}</h3></Link>}

{ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline p-4">{ex.title}</h3></Link>}

{  ex.contentTypeName ==='naija-wiki'&&<Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline p-4">{ex.title}</h3></Link>}

{ex.contentTypeName !=='naija-wiki'&&  ex.contentTypeName !=='post'&&  ex.contentTypeName !=='netflix-naija'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline p-4">{ex.title}</h3></Link>}
</div>

)} 

 </div>

 <div className="sm:flex"> 
{tagged_reses.slice(41,44).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
  <div className="shadow p-5 my-1 max-w-md" key={index + Math.random()} > 
   <p className="text-gray-100 p-3 bg-red-600 text-xl max-w-max my-1">{ex.contentTypeName}</p>
     { ex.contentTypeName ==='post'&& <Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }
  

     { ex.contentTypeName ==='naija-wiki'&& <Link href={ex.contentTypeName ==='post'?`/news/topic/${ex.slug}`:`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}

      { ex.contentTypeName ==='netflix-naija'&&<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>
}
      {ex.contentTypeName !=='post'&&ex.contentTypeName !=='naija-wiki' && ex.contentTypeName !=='netflix-naija'&&<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link>}  

       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div> )}
</div>

   

<div className="sm:flex justify-center py-6" >
  <div >
{tagged_reses.slice(44,46)?.map((ex, index)=>
ex.contentTypeName ==='video'? 
<div key={ex.id + Math.random()}className="max-w-4xl">  
<div className="shadow-sm my-3"> 
 <div> 
 <Image
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
   <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
 </div>

 <div className="flex flex-col justify-between py-4 mx-3">
 <div className="flex justify-between my-3">
   <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-3xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link> 
 <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
</div>

{ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}
</div>
  
</div>  
</div>:

<div key={ex.id + Math.random()}className="max-w-4xl">  
<div className="shadow-sm my-3"> 
 <div className=""> 
 <Image
 src={ex?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex?.featuredImage?.node.altText}
 />
 {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija'&& ex.contentTypeName !=='naija-wiki'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center">{ex.contentTypeName}</p></Link> } 

 {ex.contentTypeName ==='netflix-naija' && <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center">{ex.contentTypeName}</p></Link> } 

 {ex.contentTypeName ==='naija-wiki' && <Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center">Character</p></Link> } 

 </div>

 <div className="flex flex-col justify-between py-4 mx-3" >
     { ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }
 { ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }

 { ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }

      { ex.contentTypeName !=='post'&& ex.contentTypeName !=='naija-wiki'&&ex.contentTypeName !=='netflix-naija'&&<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title leading-9 hover:opacity-50 text-3xl font-bold cursor-pointer font-medium underline">{ex.title}</h3></Link> }
 
       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div>
  
</div> 
 
</div>
)}  

  </div>





  
  <div className="max-w-xl"> 
{tagged_reses.slice(46,48)?.map((ex, index)=> 
  ex.contentTypeName ==='video'?
<div key={ex.id} className="shadow-sm my-1 xs:my-0 py-2"> 
<div className="px-2">
  <div className="flex">        
 <div > 
  
 <Image
 className="max-w-28 sm:max-w-32 md:max-w-44 "
 src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex.featuredImage.node.altText}
 />
   <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
 </div> 
  
    <div className="mx-2 " >
     <div className="flex justify-between gap-5">
      <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline max-w-96">{ex.title}</h3></Link> 
<button> 
      <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-300 text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
          </button> </div> 
          {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div> 
</div>  
 
 </div>

</div>:
<div key={ex.id} className="shadow-sm my-1 xs:my-0 py-2"> 
<div className="px-2">
  <div className="flex">        
 <div> 
 <Image
className="max-w-28 sm:max-w-32 md:max-w-44"
 src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
 alt={ex.featuredImage.node.altText}
 />
 {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija'&& ex.contentTypeName !=='naija-wiki' ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>} 

 {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

 {ex.contentTypeName ==='naija-wiki' ?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}


 </div>  
    <div className="mx-2" >
   {ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

{ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

   {ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }
   
 {ex.contentTypeName !=='naija-wiki'&& ex.contentTypeName !=='netflix-naija'&& ex.contentTypeName !=='post'&&<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }
 
 
    {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}
 
</div> 
</div>   
 
 </div>

</div>
)}  
</div>

</div> 


<div className="xs:grid grid-cols-2 md:grid-cols-3 my-6 max-w-max xl:max-w-3xl m-auto xl:m-0 gap-1" > 
{tagged_reses.slice(48,51).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:

<div className="max-w-max" key={index + Math.random()} > 
   <div className="max-w-72 xl:max-w-60 m-auto my-3 shadow ">
  <Image
   className="max-h-40 md:max-h-36 xl:max-h-36 lg:max-h-40"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
      {ex.contentTypeName !=='post' && ex.contentTypeName !=='video' && ex.contentTypeName !=='netflix-naija'&& ex.contentTypeName !=='naija-wiki' ?<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>} 

      {ex.contentTypeName ==='netflix-naija' ?<Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

      {ex.contentTypeName ==='naija-wiki' ?<Link href={`/naija-wiki/character/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">Character</p></Link> : <p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize"></p>}

  </div>
  <div className="mx-2" >
   { ex.contentTypeName ==='post'&&<Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

   {  ex.contentTypeName ==='naija-wiki'&&<Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

   { ex.contentTypeName ==='netflix-naija'&& <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }

   { ex.contentTypeName !=='netflix-naija'&&ex.contentTypeName !=='post'&&ex.contentTypeName !=='naija-wiki'&&<Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-tight underline">{ex.title}</h3></Link> }
 
    {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}

</div>
</div>)}
</div> 
  

<div className="sm:flex max-w-max m-auto lg:m-0"> 
{tagged_reses.slice(51,53).map((ex,index)=>ex.contentTypeName ==='video'?
<div key={index + Math.random()} className="max-w-72 xl:max-w-60 m-auto my-3 shadow">   
  <Image
  className="max-h-40 md:max-h-36 lg:max-h-40 xl:max-h-36"
   src={ex.featuredImage.node.sourceUrl}
   width={1200}
   height={675}
   alt={ex.featuredImage.node.altText}
   />
     <Link href={`/news/video/${ex.slug}`}><p className="bg-black py-1 bg-opacity-80 text-gray-100 text-lg font-bold text-center  capitalize">{ex.contentTypeName}</p></Link> 
    <div className="flex justify-between py-5 mx-3 gap-1">
 
    <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="  hover:opacity-50 text-2xl font-bold cursor-pointer font-medium leading-9 underline">{ex.title}</h3></Link>
    <button> 
    <Link href={`/news/video/${ex.slug}`}><span className="rounded-full border py-2 px-4   hover:text-gray-50 text-2xl"><FontAwesomeIcon icon={faPlay}/></span></Link>  
  </button>
   </div> 
 
</div>:
  <div className="shadow p-5 my-1 max-w-md sm:w-96 m-auto lg:m-0" key={ex.id + Math.random()}> 
   <p className="text-gray-100 p-3 bg-red-600 text-xl max-w-max my-1">{ex.contentTypeName}</p>
   { ex.contentTypeName ==='post'&& <Link href={`/news/topic/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

   { ex.contentTypeName ==='naija-wiki'&& <Link href={`/naija-wiki/character/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

   { ex.contentTypeName ==='netflix-naija' && <Link href={`/${ex.contentTypeName}/news/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }

    { ex.contentTypeName !=='naija-wiki'&& ex.contentTypeName !=='netflix-naija'&&  ex.contentTypeName !=='post'&& <Link href={`/news/${ex.contentTypeName}/${ex.slug}`}><h3 className="search-title hover:opacity-50 lg:text-xl font-bold cursor-pointer font-medium leading-7 underline my-3">{ex.title}</h3></Link> }
      
       {ex.contentTypeName ==='post'?<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.tags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>:

<div className="flex py-2 text-sm"> 
      <p>All tags:</p>{ex.contentTags?.nodes.slice(0,5)?.map((ex:{name:string, slug:string}, i:number)=> 
<Link href={`/topic/${ex.slug}`}key={i}>{ex.name&&<p className="cursor-pointer hover:opacity-50 mx-2">#{ex.name}  
</p>}</Link>  

)}
</div>}


</div> )}
</div> 

</div>  
 
</div>    
  )
}

export default Tags