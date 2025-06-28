import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link" 
import plg from 'compromise-dates'
import nlp from 'compromise' 
import {Event, EventsProps } from "../types"
nlp.plugin(plg)
 
const Events= ({ events }:{events:EventsProps[] } ) => { 
 console.log(events)
  return (   
<div> 
  <section className="m-1">
<h2 className="text-center font-bold text-2xl py-4 opacity-70">Upcoming Naija Events</h2>
{ events?.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center">
<p>No Events to Show Today </p>
</div>} 
{ events?.slice(1,2).flat().map((xx:Event, i:number)=> 
<div className="bg-gray-900 w-full p-4" key={xx.name + ' ' +  i}>
<div className="md:flex-row flex flex-col justify-center items-center xl:w-2/3 sm:justify-between md:justify-evenly m-auto">  

<div className="my-2 mx-2 text-center">
<Link href={`/naija-events/event/${xx.slug}/` } ><h2 className="py-2 text-white cursor-pointer text-2xl hover:text-gray-400" >Title: {xx.title}</h2></Link>
 
 <p className="text-white mx-0.5 text-lg mt-1">Genre: {xx?.genre||'Not Available'}</p> 
<p className="text-white mx-0.5 text-lg mt-1"suppressHydrationWarning>Date: {nlp(xx?.day)?.dates()?.text()?.split('at')[0]}</p>
<p className="text-white mx-0.5 text-lg mt-1"suppressHydrationWarning>Ends: {nlp(xx?.day?.split('to')[1])?.dates()?.text()?.split(' at ')[0] }</p>
 <p className="text-white mx-0.5 text-lg mt-1"suppressHydrationWarning>Time: {nlp(xx?.day)?.times()?.text()||'See Details'}</p>  

</div>
<div className="relative w-[350px] h-[300px] my-3">
{xx.img_url &&xx.img_url.endsWith('.jpg')||xx.img_url.endsWith('.jpeg')||xx.img_url.endsWith('.png')? <Image 
className="rounded-xl mt-5"
src={`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${xx.img_url}/`}
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
alt={xx.title}  
/> : <Image 
className="rounded-xl mt-5"
src={'/assets/images/culturays_events.png/'}
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
alt={xx.title}  
/>}
</div>
</div>
<Link href='/naija-events/'> 
<small className="text-center flex justify-center py-4 text-white hover:text-green-400 hover:ml-2 hover:opacity-70">all event <FontAwesomeIcon icon={faAngleRight} className="opacity-70 mx-3 p-1 cursor-pointer hover:mr-2"/>  </small></Link> 
</div> )}

{/* <div className="flex justify-center"> 
{!active &&<p className="text-sm m-2 opacity-80 cursor-pointer" onClick={openForm}>Click to add Event</p> }</div> */}
</section>  
</div>
)
}

export default Events
