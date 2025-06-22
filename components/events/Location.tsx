'use client'
import Image from "next/image" 
import Link from "next/link"   
import { Event  } from "@/app/types"
const EventLocations = ({eventTitle}:{eventTitle:Event[]}) => { 
  // const eventByLocale = useMemo(() => {
  // const group = {} 
  // events&&events.forEach(ev => {
  // group[ev.location] ||= []
  // group[ev.location].push(ev)
  // })
  // return group
  // }, []) 

  // const eventKeys = {
  //   eventLoc: Object.keys(eventByLocale),
  //   events:Object.values(eventByLocale)
  // }   
 
return ( 
  <> 
<div className="top_event mt-8 m-auto px-4 xxs:w-3/4 xs:px-8 sm:w-11/12 sm:px-2 md:w-4/5 xl:w-3/4 xl:px-32" >
<div className="grid lg:grid-cols-3 gap-1 sm:grid-cols-2"> 
{eventTitle.map((ux, ix)=> 
<div key={ix}className={`relative categoryBox`}> 
 <Image  
src={ux?.img_url &&ux.img_url?.endsWith('.jpg')||ux.img_url?.endsWith('.jpeg')||ux.img_url?.endsWith('.png')? `https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux.img_url}`: "/assets/images/culturays_events.png"}
 className="h-56 xs:h-64 lg:h-56 xl:h-64"
width={500} 
height={500}
alt={ux.title}
/> 

<Link href={`/naija-events/event/${ux.slug}/`}><h1 className="absolute bottom-11 cursor-pointer text-white hover:opacity-70 px-3 py-5 z-10 font-bold text-xl">{ux.title.split(',')[0]}</h1></Link> 
</div> 
 )} 
 
</div> 
</div>  

 </>)
}

export default EventLocations