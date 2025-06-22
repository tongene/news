'use client'
import Image from "next/image" 
import Link from "next/link"  
import { Event  } from "@/app/types"
const ArtistEvent = ({eventTitle}:{eventTitle:Event[]}) => { 
return (
  <> 
<div className="top_event mt-8 m-auto xl:w-8/12 lg:w-9/12 px-20 min-[481px]:px-8 sm:px-20" >
<div className="grid md:grid-cols-3 gap-1 min-[481px]:grid-cols-2"> 
{eventTitle?.map((ux, ix)=> 
<div key={ix}className={`w-full min-[481px]:h-48 h-40 relative categoryBox`}> 
 <Image 
className="h-40 lg:min-[481px]:h-48"
src={ux.img_url &&ux.img_url.endsWith('.jpg')||ux.img_url.endsWith('.jpeg')||ux.img_url.endsWith('.png')? `https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux.img_url}`: "/assets/images/culturays_events.png"}
width={500} 
height={500}
alt={ux.title} 
/>  

<Link href={`/naija-events/event/${ux.slug}/`}><h1 className="absolute top-11 cursor-pointer text-white hover:opacity-70 px-3 py-5 z-10 font-bold text-xl">{ux.title.split(',')[0]}</h1></Link> 
</div> 
 )} 
 
</div> 
</div>  

 </>)
}

export default ArtistEvent
