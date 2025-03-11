'use client'
import { BdaysProps } from '@/app/types';
import { createClient } from '@/utils/supabase/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState} from 'react'; 
type DataProps={
data:[]
isLoading:Boolean
}
const Bday = () => { 
    const [bdaysData,setBdaysData]=useState<BdaysProps[]>([])
    const [isLoading, setIsLoading]=useState(false)
    const [error, setIsError]=useState('')
const today = new Date();
const todayDay = today.getDate()-1;
const todayMonth = today.getMonth();

const filteredDates = bdaysData?.filter((dateStr) => {
    const date = new Date(dateStr.info);
    const dateDay = date.getDate();  
    const dateMonth = date.getMonth();
    return dateMonth === todayMonth&&dateDay === todayDay;
});
  const forumBdays =async ()=>{
    setIsLoading(true)
    const supabase = await createClient()
    const { data: bday, error } = await supabase
    .from('bday')
    .select('*')
    if(error){
      setIsError('No Data')
      throw new Error('An Error has Occured')
    }
      setBdaysData(bday) 
      if(filteredDates.length>0){
        setIsLoading(false)
       }
  } 
  
   const [activeSlide,setActiveSlide] =useState( 0) 
  const offset = -8;
  const todaysBd= new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
  // const bdayObj= data?.filter((xy, i)=>new Date(xy.info).toLocaleString().split(',')[0].slice(0,-5) 
  // === new Date(todaysBd).toLocaleString().split(',')[0].slice(0,-5))
///today.setHours(0, 0, 0, 0); 

 useEffect(()=>{   
   forumBdays()

  },[isLoading])

  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ?filteredDates.length - 1
      :activeSlide -1;
      setActiveSlide(slide);
  }
  const nextSlide=()=> {
    const slide = activeSlide + 1 <  filteredDates.length
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }
 
  return (
    <div>  
       {filteredDates?.length === 0&&bdaysData.length===0&&<small className='m-1'>Checking for Birthdays...</small>}
       {error&& <small className='ml-1'>{error}</small>}
       {bdaysData.length>0&&
  <section className="">  
  <h2 className="border-dotted border-b-2 py-2 text-2xl my-4 font-bold text-center">Naija Birthdays Today {new Date().toLocaleDateString()} 
</h2>  
{filteredDates?.length >0
&&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center relative"> 
  <div className="flex justify-between absolute mt-14 w-1/2"> 
 <p onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/></p>  
 <p onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/></p>
 </div>
<div className="pple-card-x flex w-max justify-center">
{filteredDates.map((xx,ix)=> 
  ix === activeSlide &&
<div key={ix} className="w-full">
<div className="pple-card m-1">
<Image
className="justify-self-center bg-gray-900 rounded-full"
src={xx?.img } 
width={150}
height={150}    
alt='Naija Birthdays'/>
</div>
<div className="my-2 pple-card">
<h3 className=' text-white text-center bg-gray-900 w-full p-2'>{xx.name}</h3> 
</div> 
</div>
)}
 </div> 

</div>} 
 </section>  
} 
{filteredDates.length>0&&!isLoading&&<div className="card-data overflow-hidden flex flex-col items-center bg-slate-100 p-4 justify-center text-black font-bold">

<small className='m-1'>No Birthdays Today...</small>
 <Link href='/naija-birthdays'><small className='text-green-600 py-2 hover:text-black'>See all Birthdays in {new Date().toLocaleString('en-US', { month: 'long' })}</small></Link> 
</div>}
 </div>
  );
};

export default Bday;