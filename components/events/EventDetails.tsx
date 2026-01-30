'use client'  
import Link from "next/link"
import { EventsProps, TrendsProps } from "@/app/types" 
  import { LatestProps, LiveProps } from '@/app/types';
  import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
  import Image from 'next/image'; 
  import { useRouter } from 'next/navigation';
  import { useState, useEffect, useRef } from 'react'; 
  const SLIDE_INTERVAL = 5000; 

async function similarTrending(){
  const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST', 
 headers:{
 'Content-Type':'application/json'
 },
 body: JSON.stringify({
 query:`
 query TREND { 
         trends(first: 6) {
           nodes {
           id
             slug
             title
             content 
             excerpt
             date
              featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }         
         }
       }
     } `  
 
 })
 
 }).then(response => response.json()) 
 .then(data => data.data.trends.nodes )
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data.trendingCategories.nodes 
        return wprest  
 }

const EventDetail = ({ eventTitle, similarEvents}:{eventTitle:EventsProps, similarEvents:EventsProps[]}) => { 
  const [trendPosts, setTrendsPosts] = useState<TrendsProps[]>([]);
  const [loading, setLoading] = useState(false)  
 
  const getTrends=async()=>{  
  const readTrends = await similarTrending()
  setTrendsPosts(readTrends) ?? []
  setLoading(false)
  }
  useEffect(() => {
    setLoading(true)  
   getTrends()
  
        },[])
  
   const slidesBg = [
  {  bg: 'bg-red-500' },
  {  bg: 'bg-blue-500' },
  {  bg: 'bg-green-500' },
   {  bg: 'bg-orange-500' },
    {  bg: 'bg-yellow-500' },
     {  bg: 'bg-purple-500' },
]
   const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const next = () => {
    setIndex((prev) => Math.min(prev + 1, trendPosts.length - 1))
  }
 const sliderRef = useRef<HTMLDivElement>(null);
  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }
const handleWheel = (e: React.WheelEvent) => {
  if (e.deltaY > 0) next()
  else prev()
}



//    <div className="relative h-[30vh] overflow-hidden w-1/3 secondarySlider" onWheel={handleWheel}>
//       {/* Slides wrapper */}
   
//       <div
//         className="transition-transform duration-700 ease-in-out absolute"
//         style={{
//           transform: `translateY(-${index * 30}vh)`,
//         }}
//       >
//         {trendPosts.map((slide, i) => (
//           <section
//             key={slide.id}
//             className={`h-[30vh] flex items-center justify-center text-white text-2xl font-bold px-3 ${slidesBg[i]?.bg}`}
//           >
//             {slide.title}
//           </section>
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
//         <button
//           onClick={prev}
//           className="bg-black/60 px-3 py-2 text-white rounded"
//         >
//           ↑
//         </button>
//         <button
//           onClick={next}
//           className="bg-black/60 px-3 py-2 text-white rounded"
//         >
//           ↓
//         </button>
     
 
//     </div>
//  </div>

return (
  <div className="my-6"> 
 <section className='flex flex-col justify-center items-center'> 
    <h2 className='text-black font-bold text-2xl text-center py-4 dark:text-gray-300'>News</h2> 
   {loading && <span className="loader dark:before:border dark:before:border-2 dark:before:border-white dark:after:border dark:after:border-2 dark:after:border-white"></span>}
  
    <hr className='w-80 m-auto h-1 dark:bg-gray-300 bg-gray-600'/>  
   
 <div 
  className="overflow-hidden relative my-5"  
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
>
  <div
    className="secondarySlider grid sm:grid-cols-2 transition-transform duration-500 ease-in-out h-44 xs:h-40 mx-4"
    style={{ transform: `translateY(-${index}px)` }}
    ref={sliderRef}
  > 
  {trendPosts?.map((xy, i) => (
<div key={xy.slug}>         
     { 
      <div className="flex-shrink-0 max-w-2xl mx-auto">
        <div className="py-2 border border-yellow-700 flex items-center">
           <>  <Link href={`/news/trending/${xy.slug}/`}>
                <h2 className="overflow-hidden leading-10 text-gray-600 text-2xl font-bold hover:text-gray-500 cursor-pointer dark:text-gray-200 mx-2 dark:hover:text-gray-500" style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
                  {xy.title}
                </h2>
              </Link>
              <Image
                className="max-w-32 py-5 hover:opacity-50 mx-2"
                src={xy.featuredImage?.node.sourceUrl}
                width={200}
                height={200}
                alt={xy.featuredImage?.node.altText}
              />
            </> 
        </div>
      </div>}

     </div> ))}
   
  </div>
</div> 

<hr className='w-11/12 mx-auto my-2 bg-gray-600 h-1'/>
</section>

<div>
<div className='flex flex-col items-center justify-center bg-cover bg-center'style={{backgroundImage: `url(https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',}}>   
  
<div className="xl:p-32 hover:shadow-3xl border border-t-8 hover:opacity-70 cursor-pointer p-3 bg-gray-700 opacity-90 w-11/12 my-20" >
  {/* <p className="text-lg border bg-white ml-14 m-2 w-14 rounded-full p-3 text-center relative bottom-32 left-full cursor-pointer" onClick={openForm} ><FontAwesomeIcon icon={faPen} /></p> */}
 <h2 className="text-3xl xl:text-5xl font-bold text-center text-white my-4 sm:w-3/4 sm:mx-auto">{eventTitle?.title}</h2>  
<p className="text-xl font-bold py-3 text-center text-white my-4">Location: {eventTitle?.location}</p>
<p className="text-xl font-bold py-3 text-center text-white my-4">Organizer: {eventTitle?.organizer ||'N/A'}</p>
<p className="text-xl font-bold py-3 text-center text-white my-4">Genre: {eventTitle?.genre}</p>
<p className="text-xl font-bold py-3 text-center text-white my-4">Date: {eventTitle?.day}</p>
{/* <p className="text-xl font-bold py-3 text-center text-white">{eventTitle.date}</p>
 {eventTitle.genre.split(' ').map((xy, i)=><p key={i}className="text-xl font-bold py-3 text-center text-white">{xy}</p> )}  */}
 <div className="my-4 ">
<p className="text-xl text-white text-center leading-9 opacity-90 overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:6, WebkitBoxOrient: 'vertical' }}>{eventTitle?.desc}</p>
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
<div className=" flex flex-wrap gap-1 justify-center m-auto xl:flex-nowrap max-w-7xl px-3" >
{similarEvents.map((ex)=>
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
    <Link href={`/event/${ex.slug}/`}>
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
</div></div>
   </div> )
  }
  
  export default EventDetail
 