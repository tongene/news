 'use client'
import Image from 'next/image';
import React, { useEffect, useState} from 'react'; 
type FetchArguments = Parameters<typeof fetch>;

type BdaysProps={} 
type DataProps={
data:[]
info:string
img:string
name:string
}
const AllBirthdays = ({data}:{data:DataProps[]}) => {  
   const offset = -8;
   const todaysBd= new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
 
 const today = new Date();
 const todayMonth = today.getMonth();
 
 const filteredDates = data?.filter((dateStr) => { 
     const date = new Date(dateStr.info);
     const dateMonth = date.getMonth(); 
     return dateMonth=== todayMonth;
 }); 


  return (
    <div > 
  <section className="">
  <h2 className="border-dotted border-b-2 py-2 text-2xl my-4 font-bold text-center">Naija Birthdays This Month: {new Date().toLocaleString('en-US', { month: 'long' })} <small>{todaysBd.toLocaleString().split(',')[0].slice(0,-5) }</small>
</h2>  
 
{ filteredDates?.length >0
&&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 relative justify-center my-8">  
<div className="pple-card-x flex flex-col w-max xs:grid xs:grid-cols-2 lg:grid-cols-4">
{filteredDates.map((xx)=>  
 
<div key={Math.random() + ' ' + xx.name} className="w-full xs:border-b xs:border-b-4 my-4">
<div className="my-2 pple-card bg-gray-900">
<h3 className=' text-white text-center w-full p-2'>{xx.name}</h3> 
</div>
{xx?.img&&<div className="pple-card m-1">  

<Image
className="justify-self-center bg-gray-900 rounded-full"
src={xx?.img } 
width={150}
height={150}    
alt='Naija Birthdays'/>
</div>}
<div className="my-2 pple-card bg-gray-900"> 
<p className='text-white text-center w-full p-2'>{xx.info}</p> 
</div>
 
 <hr className='my-4 xs:hidden'/>
 </div>)} 
</div>
</div>}
{filteredDates?.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center text-black font-bold">
<p>No Birthdays This Month </p>
</div>}

 </section> 

    </div>
  );
};

export default AllBirthdays;