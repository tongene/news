"use client"

import { CineProps } from "@/app/types"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

const MoviesWidget = () => {
     const [cinemaXtitles, setCinemaTitles]=useState<CineProps[]>([])
  const [loading, setLoading]=useState(false)
   const naija_wiki =async ()=>{  
      const supabase =await createClient() 
      const { data:cinema_titles , error } = await supabase 
      .from('cinema_titles') 
      .select('*')
      if(error)throw new Error('An Error has occured!')
setCinemaTitles (cinema_titles)
          setLoading(false)
      } 
useEffect(()=>{
  setLoading(true)
naija_wiki()
},[])
   const coming_titles= cinemaXtitles?.filter((ex)=> ex.genre?.includes('Coming Soon'))  
  return (
    <div>
       {loading?<p>Loading...</p>:<></>}
      <div className='my-4 text-xl max-w-lg lg:max-w-md xl:max-w-sm m-auto lg:my-10'>  
<div className="py-11 w-80 bg-slate-50 border m-auto">
  <div className='flex py-3 items-center px-1'> 
 <h2 className="text-gray-700 font-medium text-3xl p-3 leading-10">Coming to Cinema</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>

  {coming_titles.map((ity, index)=> 
 <div key={index}> 
 <ul className='flex hover:scale-105 text-gray-600 p-2'>    
 <li className="text-lg px-3">
   {ity.title} — {ity.release_date.slice(9)}
 </li>  
   
 </ul> 
 </div>
 
 )} 

 <div className='flex py-3 items-center px-1'> 
<h2 className="text-gray-700  font-medium text-3xl p-3 leading-10">Netflix Naija</h2>
<hr className='h-1 w-1/2 mt-4 bg-black'/>
</div>

  <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-800"/> 
  <Link href='/coming-to-netflix/'><h3 className="cursor-pointer px-1">Coming to Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
  
 </div> 
 
 <div className="py-8 text-gray-600 flex justify-evenly hover:scale-105 px-2"> 
 <hr className="w-1/6 my-3 bg-gray-600"/>
 <Link href='/new-on-netflix/'><h3 className="cursor-pointer px-1">New on Netflix Naija </h3></Link> 
 <hr className="w-1/6 my-3 bg-gray-600"/> 
 
 </div>

 </div>
</div>
    </div>
  )
}

export default MoviesWidget
