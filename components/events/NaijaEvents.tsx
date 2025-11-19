'use client'
import Image from "next/image" 
import Link from "next/link" 
import { useMemo } from "react" 
import { EventsProps } from "@/app/types"

const NaijaEvents = ({events}:{events:EventsProps[]}) => { 
  const eventByLocale = useMemo(() => {
  const group : { [loc: string ]: EventsProps[] } = {};
  events&&events.forEach(ev => {
    //1 or 0
  group[ev.loc_slug] ||= []
  group[ev.loc_slug ].push(ev)
  })
  return group
  }, []) 
  const eventByArtists = useMemo(() => {
    const group: { [gnr: string ]: EventsProps[] }= {};
    events&&events.forEach(ev =>{ 
    group[ev.genre_slug] ||= [] 
    group[ev.genre_slug].push(ev) 
   } ) 
    return group  
    }, [])
   
   const eventKeys = {
    eventLoc: Object.keys(eventByLocale),
    events:Object.values(eventByLocale)
  } 
 ///<a href="#contact">Go to Section 2</a> should refer to an id
const artistEl = Object.keys(eventByArtists).map((ux)=> ux.replace(/ /g, '').split(',') ).flat()
 const fixArtistImg = artistEl.filter( function( item, index, inputArray ) {
  return inputArray.indexOf(item) === index;
})

return (
  <> 

<div className="top_event mt-8 m-auto min-[481px]:px-8" >
<h2 className="py-6 xs:text-2xl text-xl font-bold bg-gray-700 text-gray-300 mb-1 text-center">Find Events by Location</h2>
<div className="grid md:grid-cols-3 gap-1 min-[481px]:grid-cols-2">
{Object.keys(eventByLocale).map((ex, i)=> 
{ return( 
<div key={ex + ' ' + i} className='relative event_categoryBox'> 
{Object.values(eventByLocale).flat().filter((tx)=> tx?.img_url?.endsWith('.jpg')||tx?.img_url?.endsWith('.jpeg')||tx?.img_url?.endsWith('.png')||tx?.img_url?.endsWith('.webp')).map((ux,ix)=> ix === i&&
 <div key={ix}> 
 
 <Image 
 className="h-56 lg:h-64 w-72 xs:w-96"
src={`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux?.img_url}`}
width={500} 
height={500}
alt={ex}
/>

{/* ":'/assets/images/culturays_events.png'" */}
 <ul> 
  {ux.title ==="[]"?'':
  <Link href={`/event/${ux.slug}/`}><li title='view event'className="absolute bottom-4 cursor-pointer text-white hover:text-gray-200 px-3 z-10 font-bold text-xl sm:text-2xl underline overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{ux.title}</li></Link> } 
 </ul>
</div>  
)}

{/* {ex.charAt(0).toUpperCase() + ex.slice(1).replace(/-/g," ") } */}
 {/* <h2 className="absolute top-5 text-white px-3 z-10 font-bold text-2xl sm:text-3xl capitalize text-center overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.replace(/-/g," ") }</h2>  */}
</div> 
) }  
)}   
</div> 
</div> 

<div className="top_event mt-8 m-auto min-[481px]:px-8" >
<h2 className="py-6 xs:text-2xl text-xl font-bold bg-gray-700 text-gray-300 mb-1 text-center">Find Events by Genre</h2>
<div className="grid md:grid-cols-3 gap-1 min-[481px]:grid-cols-2">
{Object.keys(eventByArtists).map((ex, i)=> 
{ return( 
<div key={ex + ' ' + i} 
 className='w-full relative event_categoryBox'> 
{Object.values(eventByArtists).flat().filter((tx)=> tx?.img_url?.endsWith('.jpg')||tx?.img_url?.endsWith('.jpeg')||tx?.img_url?.endsWith('.png')||tx?.img_url?.endsWith('.webp')).map((ux,ix)=> ix === i &&  
<div key={ix}> 
 <Image

 className="h-56 lg:h-64 w-72 xs:w-96"
src={ux.img_url &&ux?.img_url?.endsWith('.jpg')||ux?.img_url?.endsWith('.jpeg')||ux?.img_url?.endsWith('.png')?`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${ux.img_url}`:'/assets/images/culturays_events.png'}
width={500} 
height={500}
alt={ex}
/> 
 <ul> 
 {ux.title ==="[]"?'':
  <Link href={`/event/${ux.slug}/`}><li title='view event'className="absolute bottom-4 cursor-pointer text-white hover:text-gray-200 px-3 z-10 font-bold left-0 right-0 sm:text-2xl text-xl text-center underline overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{ux.title }</li></Link>}
  </ul></div>
)}
 
 {/* <h2 className="absolute top-5 text-white left-0 right-0 px-3 py-2 z-10 font-bold sm:text-3xl text-2xl capitalize overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.replace(/-/g," ") }</h2>  */}
</div> 
) }  
)}   
</div>  
</div> 
 </>)
}

export default NaijaEvents
