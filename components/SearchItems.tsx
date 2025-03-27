 "use client"
import { searchValues } from "@/app/lib/searches/searches"; 
 import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
 import Link from "next/link"  
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";  

type InnerNode ={  
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

type NodeProps ={
  netflixCategories:InnerNode;
  contentTypeName:string;
  id:number;
  slug:string;
  title:string;
  index:number;  
}
 

const SearchItems = () => {  
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); 
  const params = new URLSearchParams(searchParams); 
  const [searchData,setSearchData]=useState<NodeProps[]>([]) 
  const [nameX1, setNameX1]= useState('')

  const handleSearch =useDebouncedCallback(( e:React.ChangeEvent<HTMLInputElement>) => {  
 params.set('name', e.target.value.trim());  
  setNameX1( e.target.value.trim())
    replace(`${pathname}?${params.toString()}`);  
},500); 
 
const fetchValues = async()=>{  
 const searchVals = await searchValues(nameX1)
setSearchData(searchVals)  
 if(!nameX1){
  params.delete('name'); 
  replace(`${pathname}`)   
  } 
}
useEffect(()=>{  
  fetchValues() 
},[nameX1])
 

return ( 

<div> 
 <div className="">  
<input  
placeholder='search'
className='absolute z-20 w-full p-2 border-2 focus:outline-none text-lg'
type="text" 
name='name' 
onChange={(e) => {
  handleSearch(e);
}}
defaultValue={params.get('name')?.toString()}
/> 
 
  <div className="relative z-40 top-3 -right-3/4 ml-22 sm:ml-28 md:ml-32">
<FontAwesomeIcon icon={faAngleDoubleRight}width={20} className="cursor-pointer opacity-70 text-xl hover:scale-150" onClick={()=>!nameX1?replace('/search')
:replace(`/search?name=${nameX1}`)}/> 
 
</div> 
 
</div>  
  {nameX1 &&!pathname.includes('search')&&
    <div className='searchRes m-2 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 max-w-6xl m-auto'>  
 { 
searchData?.map((it, index)=> it?.contentTypeName ==='char' &&           
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
<div className="m-6">  
<Link href={`/naija-wiki/character/${it?.slug }`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 

</div>
</div>
)   } 
{  
searchData?.map((it, index)=> it?.contentTypeName ==='post' &&           
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
<div className="m-6"> 
<Link href={`/news/topic/${it?.slug }`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 

</div>
</div>
)   }

{ 
searchData?.filter((ox)=> ox.contentTypeName==="nollywood").filter((xy)=> xy.contentTypeName === 'award')?.filter((xy)=> xy.contentTypeName === 'video')?.filter((xy)=> xy.contentTypeName === 'trending')?.filter((xy)=> xy.contentTypeName === 'business')?.filter((xy)=> xy.contentTypeName === 'economy')?.filter((xy)=> xy.contentTypeName=== 'environment')?.filter((xy)=> xy.contentTypeName === 'health')?.filter((xy)=> xy.contentTypeName === 'society')?.filter((xy)=> xy.contentTypeName=== 'tech').map((it, index)=>  
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
 
<div className="m-6"> 
<Link href={`/news/${it?.contentTypeName}/${it?.slug }`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 
 
</div>
</div>
)   }
{ 
searchData?.filter((x1)=> x1?.contentTypeName ==='netflix-naija' ).map((xy)=> xy?.netflixCategories?.nodes.map((tx)=> tx?.naijaOnNetflix.nodes)?.flat()?.map((it, index)=>
  {it?.title&&
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
<div className="m-6"> 
<Link href={`/netflix-naija/news/${it?.slug }`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 

</div>
</div>}
)) }

 {nameX1||searchData?.length ===0?<p className="p-11">Loading...</p>: <p className="p-11 text-xl"></p>}
   
</div> 
}  
   
</div>

 )
}

export default SearchItems
