'use client'

import { createClient } from '@/utils/supabase/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState} from 'react'; 
 
type BdaysProps={
  info:string
img:string
name:string
}[]
type DataProps={
data:[]
 info:string
img:string
name:string
person_obj:BdaysProps
title:string
id:string
}[]
const Bday = () => { 
    const [bdaysData,setBdaysData]=useState<DataProps>([])
    const [isLoading, setIsLoading]=useState(false)
    const [error, setIsError]=useState('')
 const today = new Date();
const todayDay = today.getDate()-1;
const todayMonth = today.getMonth();
  const gx = useMemo(() => {
  const groupParent: { [info: string ]: DataProps} = {};
  bdaysData?.forEach((dy) => 
    dy.person_obj.forEach((ex)=>{ 
         const date = new Date(ex.info); 
         const dateDay = date.getDate();  
    const dateMonth = date.getMonth() ; 
      if(dateMonth === todayMonth&&dateDay === todayDay){
    groupParent[todayMonth as unknown as string] ||= [] ;
    groupParent[todayMonth as unknown as string]?.push(dy);
 }
  }));
 
  return groupParent ;
}, [bdaysData]);


const todayBirthdays = Object.values(gx).flat()
const personObj = todayBirthdays.filter((dx)=> dx.person_obj.length<4) 

  const forumBdays =async ()=>{
    setIsLoading(true)
    const supabase = await createClient()
    const { data: bday, error } = await supabase
    .from('b_day')
    .select('*')
    if(error){
      setIsError('No Data')
      throw new Error('An Error has Occured')
    }
      setBdaysData(bday) 
      setIsLoading(false)
        
  } 
  
   const [activeSlide,setActiveSlide] =useState( 0) 
  const offset = -8;
  const todaysBd= new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
 
 useEffect(()=>{   
   forumBdays()

  },[])

  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?personObj.length - 1
      :activeSlide -1;
      setActiveSlide(slide);
  }
  const nextSlide=()=> {
    const slide = activeSlide + 1 <  personObj.length
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }
 
  return (
 <div>  
       {personObj?.length === 0 && bdaysData.length===0&&<small className='m-1'>Checking for Birthdays...</small>}
       {error&& <small className='ml-1'>{error}</small>}
       <h2 className="border-dotted border-b-2 py-2 text-2xl my-4 font-bold text-center">Naija Birthdays Today {new Date().toLocaleDateString()} 
</h2>
       {personObj.length===0 && isLoading&&
  <p className='m-1 text-center'>No Birthdays Today...</p>  }
 <section className="">   
{personObj?.length >0
&&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center relative"> 
  <div className="flex justify-between absolute mt-14 w-1/2"> 
 <p onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/></p>  
 <p onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/></p>
 </div>
<div className="pple-card-x flex w-max justify-center">
{personObj.map((xx,ix)=> 
  ix === activeSlide &&
<div key={xx.id} className="w-full">
<div className="pple-card m-1 relative w-[200px] h-[200px]">

<Image
className="justify-self-center bg-gray-900 rounded-full"
src={xx.person_obj[ix + 1]?.img || '/assets/images/tv.png'} 
 fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
alt='Naija Birthdays'/>
</div>
<div className="my-2 pple-card">
<h3 className=' text-white text-xl text-center bg-gray-900 w-full p-2'>{personObj[ix + 0]?.title}</h3> 
</div> 
</div>
)}
 </div> 

</div>} 
 </section>  

 <div className="card-data overflow-hidden flex flex-col items-center bg-slate-100 p-4 justify-center text-black font-bold">

 <Link href='/naija-birthdays'><small className='text-green-600 py-2 hover:text-black'>See all Birthdays in {new Date().toLocaleString('en-US', { month: 'long' })}</small></Link> 
</div> 
 </div>
  );
};

export default Bday;