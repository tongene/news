'use client'
import { faEllipsisVertical, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"  
import Link from "next/link"
import { useEffect, useState } from "react"; 
import EventForm from "./EventForm";
import { createClient } from "@/utils/supabase/client" 
import { EventsProps } from "@/app/types" 
const EventDetail = ({ eventTitle }:{eventTitle:EventsProps }) => {
const [active, setActive]= useState(false)
const [similarEvents,setSimilarEvents]= useState<EventsProps[]>([]) 
const [eventId,setEventId]= useState([]) 
const openForm = () => {
setActive(prev => !prev); 
} 
//console.log(eventTitle.loc_slug)
useEffect(()=>{
const simValues = async () => {  
const supabase = createClient();  
const { data, error } = await supabase
.from('events')
.select("*")
.filter('loc_slug', 'ilike', `%${eventTitle.loc_slug}%`);

if (error) {
console.error('Error fetching posts:', error.message);
return;
}

setSimilarEvents( data)  
} 
simValues()
},[eventTitle])  

 
 
return (
  <div className="my-6"> 
  <div className='flex flex-col items-center justify-center bg-cover bg-center'style={{backgroundImage: `url(https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',}}>   
  
<div className="xl:p-32 hover:shadow-3xl border border-t-8 hover:opacity-70 cursor-pointer p-3 bg-gray-700 opacity-80 w-11/12 my-6" >
  {/* <p className="text-lg border bg-white ml-14 m-2 w-14 rounded-full p-3 text-center relative bottom-32 left-full cursor-pointer" onClick={openForm} ><FontAwesomeIcon icon={faPen} /></p> */}
 <h2 className="text-3xl xl:text-5xl font-bold text-center text-white my-4">{eventTitle.title}</h2>  
<p className="text-xl font-bold py-3 text-center text-white my-4">Location: {eventTitle.location}</p>
<p className="text-xl font-bold py-3 text-center text-white my-4">Genre: {eventTitle.genre}</p>
<p className="text-xl font-bold py-3 text-center text-white my-4">Date: {eventTitle.day}</p>
{/* <p className="text-xl font-bold py-3 text-center text-white">{eventTitle.date}</p>
 {eventTitle.genre.split(' ').map((xy, i)=><p key={i}className="text-xl font-bold py-3 text-center text-white">{xy}</p> )}  */}
 <div className="my-4 ">
<p className="text-xl text-white text-center leading-9 opacity-90">{eventTitle.desc}</p>
</div>

</div> 

<div>

</div> 
{/* {active &&
 <EventForm 
active={active}
setActive={setActive }
user={eventTitle.user_id}
eventEdit={eventTitle}
 /> }  */}
  </div>
  <div className="py-8"> 
  <h2 className="text-3xl p-6 dark:text-gray-200 text-gray-700 font-bold text-center">Related Events</h2>
<div className=" flex flex-wrap sm:flex-nowrap md:flex-wrap gap-1 justify-center m-auto xl:flex-nowrap max-w-7xl px-3" >
{similarEvents.filter((xx)=> xx.title!== eventTitle.title).map((ex)=>
<div className="relative"key={ex.title}> 
 <div className="h-full w-full bg-gray-900 bg-opacity-60 absolute rounded-lg"> </div>  

<div style={{
  backgroundImage: `url(https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ex?.img_url})`,  
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  height:'550px',
  width:'100vw',
  backgroundSize: 'cover',
    }}
     className="rounded-lg px-8 bg-black hover:border-solid max-w-xs py-20 "> 
 <div className="rounded-lg hover:shadow-3xl animated-in absolute z-50 left-0 bottom-0 px-5">
 <div>  
    <Link href={`/naija-events/event/${ex.slug}`}>
    <h3 className="text-3xl text-gray-100 font-bold cursor-pointer hover:opacity-80 leading-10 px-3">
{ex.title}
</h3></Link>
<p className="text-lg text-white font-bold text-right py-4 capitalize">
{ex.genre}
</p>
  </div>
  <hr/>
   <p className="text-lg pt-4 text-gray-200 font-bold hover:opacity-80 leading-9">
{ex.location}
</p>
<p className="pb-14 pt-2 text-gray-200 font-bold cursor-pointer hover:opacity-80 leading-7">{ex.day}</p>
</div>  

</div>
 
 </div>

)}
 
</div>  
</div>
   </div> )
  }
  
  export default EventDetail
  