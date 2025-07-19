 "use client"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link" 
import EventForm from "../events/EventForm"
import { EventsProps } from "@/app/types";
import nlp from 'compromise'
import plg from 'compromise-dates'
import { type User } from "@supabase/supabase-js"
nlp.plugin(plg)
interface EvProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  user:User
  events:EventsProps[]
  active:boolean 
}
const Events: React.FC<EvProps>  = ({user, setActive, active, events} ) => {
//  const openForm = () => {
//         setActive(prev => !prev); 
//     }  
 
    const dateRegex = /\b[A-Za-z]{3} [A-Za-z]{3} \d{1,2} \d{4}\b/;
    const timeRegex = /\b\d{1,2}:\d{2} [ap]m\b/g;

  return (   
<div> 
  <section className="m-1">
<h2 className="text-center font-bold text-2xl py-4 opacity-70">Upcoming Naija Events</h2>
{ events?.length < 1 &&
<div className="card-data overflow-hidden flex bg-slate-100 p-4 justify-center">
<p>No Events to Show Today </p>
</div>} 
{ events?.slice(1,2).flat().map((xx, i)=> 
<div className="bg-gray-900 w-full p-4" key={xx.name + ' ' +  i}>
<div className="sm:flex-row flex flex-col justify-center items-center sm:w-3/4 sm:justify-between md:w-1/2 md:justify-evenly m-auto">  
 <Image 
className="rounded-xl mt-5"
src={xx.img_url &&xx.img_url.endsWith('.jpg')||xx.img_url.endsWith('.jpeg')||xx.img_url.endsWith('.png')?`${process.env.SUPABASE_PUBLIC_EVENT_AVATARS_URL}${xx.img_url}`:'/assets/images/culturays_events.png'}
width={150} 
height={150} 
alt={xx.title}
/>  
<div className="my-2 mx-2 text-center">
<Link href={`/event/${xx.slug}/` } ><h2 className="py-2 text-white cursor-pointer text-2xl hover:text-gray-400" >Title: {xx.title}</h2></Link>
 
 <p className="text-white mx-0.5 text-md mt-1">Genre: {xx?.genre||'Not Available'}</p> 
<p className="text-white mx-0.5 text-md mt-1"suppressHydrationWarning>Date: {nlp(xx?.day)?.dates()?.text()?.split('at')[0]}</p>
<p className="text-white mx-0.5 text-md mt-1"suppressHydrationWarning>Ends: {nlp(xx?.day?.split('to')[1])?.dates()?.text()?.split(' at ')[0] }</p>
 <p className="text-white mx-0.5 text-md mt-1"suppressHydrationWarning>Time: {nlp(xx?.day)?.times()?.text()||'See Details'}</p>  

</div>
</div>
<Link href='/naija-events/'> 
<small className="text-center flex justify-center py-4 text-white hover:text-green-400 hover:ml-2 hover:opacity-70">all event <FontAwesomeIcon icon={faAngleRight} className="opacity-70 mx-3 p-1 cursor-pointer hover:mr-2"/>  </small></Link> 
</div> )}

{/* <div className="flex justify-center"> 
{!active &&<p className="text-sm m-2 opacity-80 cursor-pointer" onClick={openForm}>Click to add Event</p> }</div> */}
{/* {active &&
 <EventForm  
 active={active}
 setActive={setActive}
 user={user}
 eventEdit={events}
 /> } */}

</section>  
</div>
)
}

export default Events