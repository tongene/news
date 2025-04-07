"use client"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"  
import Image from "next/image"  
import { useEffect, useState } from "react"

type InnerNode ={  
    nodes:[{
      naijaOnNetflix:{
      nodes:{ 
        contentTypeName:string;
        id:number;
        slug:string;
        title:string;
        index:number;  
        featuredImage:{
            node:{
                sourceUrl:string 
                altText:string
            }
        }
        contentTags:{
          nodes:{
          slug: string
          name: string
          
          }[]
          }
          tags:{ 
            nodes:{
                id:string
            slug: string
            name: string
            
            } []
            } 
      }[];
  
  },
   
  },
   
  ];
  
  }
  
  type NodeProps ={
    netflixCategories:InnerNode;
    contentTypeName:string;
    id:number;
    slug:string;
    title:string;
    index:number;
    featuredImage:{
        node:{
            sourceUrl:string 
            altText:string
        }
    }
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
      nodes:{
        id:string
      slug: string
      name: string

      }[]
      }
  }
const Search = ({ name, content }:{name:string, content:NodeProps[]}) => {
   const [loading,setLoading]=useState(false)
const searchItem:NodeProps[]= []   
const netflixContent = content?.map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.naijaOnNetflix.nodes).flat()).flat()
 
const xtcontent = content?.map((xy)=> {
  if(xy.id){
    return xy
  }
})
 useEffect(()=>{
  setLoading(true) 
   if(xtcontent?.length>0){
     setLoading(false)
   }
 },[name])
 
return (
    
<div>
{loading&&<p>Loading...</p>}
{ !loading&& <div className="bg-gray-50 max-w-2xl m-auto mb-5 dark:text-gray-800">
{name&&content?.length>0&&<p className="p-5 m-4 font-bold">Search result for {name} — {content?.length}</p>}   

  {name &&xtcontent?.length>0&&
xtcontent?.filter((vx)=> vx !==undefined).filter((ox)=> ox.contentTypeName!=="outline")?.map((it, index)=> it?.contentTypeName !=='char' && it.contentTypeName !=='netflix-naija' && it.contentTypeName !=='post' && it.contentTypeName !=='page' &&           
<div key={it.id + Math.random()} className="shadow bg-white dark:bg-transparent max-w-xl px-4 m-auto my-2"> 
<div className="flex justify-center xs:items-center"> 
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/news/${it?.contentTypeName}/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-8">{it?.title }</h3></Link> 
 <div className="flex flex-wrap pt-4" >
   {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
<div className="flex flex-wrap pt-4" >
   {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>

<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div> 
</div>
) }    
 
{name &&xtcontent?.length>0&&
xtcontent?.filter((vx)=> vx !==undefined)?.filter((ox)=> ox.contentTypeName!=="outline")?.filter((x1)=> x1?.contentTypeName ==='netflix-naija' ).map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.naijaOnNetflix.nodes)?.flat()?.map((it, index)=>           
<div key={it?.id + Math.random()} className="shadow bg-white dark:bg-transparent max-w-xl px-4 m-auto my-2"> 
<div className="flex justify-center xs:items-center">
 <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/neflix-naija/news/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 
 <div className="flex flex-wrap pt-4" >
   {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
 

<div className="flex flex-wrap pt-4" >
   {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
<div className="gotoforum cursor-pointer py-3 hover:opacity-50"> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
)) }

{name &&xtcontent?.length>0&&
xtcontent?.filter((vx)=> vx !==undefined)?.filter((ox)=> ox.contentTypeName!=="outline")?.map((it, index)=> it.contentTypeName ==='char' &&               
<div key={it.id + Math.random()} className="shadow bg-white dark:bg-transparent max-w-xl px-4 m-auto my-2"> 
<div className="flex items-center">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 py-5">            
 <Link href={`/naija-wiki/character/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 
<div className="flex flex-wrap pt-4" >
   {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
<div className="flex flex-wrap pt-4" >
   {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>

 
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
{name &&xtcontent?.length>0&&
xtcontent?.filter((vx)=> vx !==undefined)?.filter((ox)=> ox.contentTypeName!=="outline")?.map((it, index)=> it.contentTypeName ==='post' &&               
<div key={it.id + Math.random()} className="shadow bg-white dark:bg-transparent max-w-xl px-4 m-auto py-5 my-2"> 
<div className="flex justify-center xs:items-center">        
     <div className="max-w-32 xs:max-w-44"> 
     <Image
     className="h-28 xs:h-40 object-cover"
     src={it?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={it?.featuredImage?.node.altText}
     />
     </div>
     <div className="mx-4 xs:py-5">            
 <Link href={`/news/article/${it?.slug }`}><h3 className="hover:opacity-50 text-xl cursor-pointer font-medium leading-tight">{it?.title }</h3></Link> 
 <div className="flex flex-wrap pt-4" >
   {it?.contentTags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
<div className="flex flex-wrap pt-4" >
   {it?.tags?.nodes?.slice(0,5)?.map((ex, i)=>
 <div  key={i + Math.random()}>
  <Link href={`/topic/${ex?.slug}`}>{ex&&<span className="cursor-pointer hover:opacity-50 mx-2">#{ex.name }  
</span>}</Link>  

</div>)}</div>
<div className="gotoforum cursor-pointer py-3 hover:opacity-50 "> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>
    </div>
</div>
) } 
   { name ?
searchItem?.length>0&&searchItem?.map((it, index)=> 
<div key={it.id + Math.random()} className="items_search dark:bg-transparent bg-white max-w-xl m-0 m-auto py-4"> 
<div className="m-6">          
 <Link href={`/forum/post/${it.slug}/${it.id}`}><h3 className="search-title hover:opacity-50 text-lg m-4 cursor-pointer font-medium h-3/4 leading-tight">{it.title }</h3></Link> 
{it.tags.nodes.slice(0,5)?.map((ex, i:number)=>
 <div className="flex flex-wrap justify-between pt-4"key={i}> <Link href={`/topic/${String(ex).replace('.','')}/${ex.id}`}>{ex&&<span className="cursor-pointer hover:opacity-50 p-4">#
{String(ex).replace('.','').split(' ').join(' ') }  
</span>}</Link>  

</div> )}

<div className="gotoforum cursor-pointer"> 
<Link href="/forum"><FontAwesomeIcon icon= {faComments} /></Link>
</div>
 </div>

</div>
):null}  
 
 </div>  
 }
 </div>
  )
}

export default Search
