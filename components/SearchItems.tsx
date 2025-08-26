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
  
  const [searchData, setSearchData] = useState<NodeProps[]>([]);
  const [nameX1, setNameX1] = useState('');
  const [loading, setLoading] = useState(false);
  
  const debouncedUpdateURL = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set('name', value.trim());
    
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = e.target.value; 
    debouncedUpdateURL(value);
      setNameX1(value);
  };  
  
 
  useEffect(() => {
    const fetchData = async () => {
      if (!nameX1.trim()) {
        setSearchData([]);
        return;
      } 
      
      const results =await searchValues(nameX1.trim());
      setSearchData(results);
    
    };
  
    fetchData(); 
    setLoading(false);
  }, [nameX1, searchParams]);
  
 
  useEffect(() => {
    const initial = searchParams.get('name') || '';
    setNameX1(initial);
  }, [searchParams]);
  

   const xposts = searchData.filter((vz)=> vz.id).flat()
 
return ( 

<div> 
 <div className="relative z-20 ">  
<input  
placeholder='search'
className='w-full p-2 border-2 focus:outline-none text-lg'
type="text" 
name='name' 
onChange={handleSearch}
value={nameX1.toLowerCase()}
/> 
<div className="absolute z-40 top-3 right-20">
<FontAwesomeIcon icon={faAngleDoubleRight}width={20} className="cursor-pointer opacity-70 text-xl hover:scale-150" onClick={()=>!nameX1?replace('/search/')
:replace(`/search?name=${nameX1}`)}/> 
 
</div> 
 
</div> 
{loading&&<p>Loading...</p>}
  {!loading&&nameX1 &&!pathname.includes('search')&&
    <div className='searchRes m-2 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 max-w-6xl m-auto'>  
 { 
xposts?.map((it, index)=> it?.contentTypeName ==='naija-wiki' ?
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
<div className="m-6"> 
<Link href={`/character/${it?.slug }/`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 

</div>
</div>
 :it?.contentTypeName ==='post' ?           
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
<div className="m-6"> 
<Link href={`/news/${it?.slug }/`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 

</div>
</div>: it?.contentTypeName ==='netflix-naija' &&it?.netflixCategories?.nodes.length>0? it?.netflixCategories?.nodes.map((tx)=> tx?.naijaOnNetflix.nodes?.flat()?.map((itx, index)=> 
<div key={itx?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 

<div className="m-6"> 
<Link href={`/netflix-naija/${itx?.slug}/`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{itx?.title}</p></Link> 

</div>
</div>)):
<div key={it?.id + Math.random()} className="items_search min-h-32 w-11/12 m-0 m-auto py-4 min-[481px]:w-3/4 sm:w-full dark:border"> 
 <div className="m-6"> 
 <Link href={`/news/${it?.contentTypeName}/${it?.slug}/`} prefetch={false}><p className="text-xl text-center text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it?.title}</p></Link> 
  
 </div>
 </div>)  } 
 
 
 {nameX1&&searchData?.length ===0?<p className="p-11">Loading...</p>: <p className="p-11 text-xl"></p>}
 {searchData?.length >1&&<Link href={`/search?name=${nameX1}/`}><p className="p-11">See All</p></Link>}
</div> 
}  
   
</div>

 )
}

export default SearchItems
