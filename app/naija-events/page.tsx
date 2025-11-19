import NaijaEvents from '@/components/events/NaijaEvents'
import StructuredData from '@/components/StructuredData'
import { createClient } from '@/utils/supabase/server'  
import { BlogPosting, WithContext } from 'schema-dts'
 import { processImgs } from "@/utils/process_imgs";
 import { replaceSpecialCharacters } from "@/utils/replacechars";
import { events3Details, getNaijaEvents3 } from './eventData/eventContent';
import { CronJob } from 'cron';
import { faCoins, faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import AISuggestions from "@/components/AISuggestions";
//export const revalidate = 10

 interface ObjType { 
  title: string[];
  slug:string  
  img_url: string
   desc: string[]
   day: string[]
   loc_slug: string  
   genre: string 
   genre_slug:string 
   organizer:string
   location:string 
}
const Events_Naija = async() => { 
const forumEvents =async ()=>{
const supabase =await createClient()  
const today = new Date()
const monthName = today.toLocaleString('default', { month: 'long' })  
const { data: events, error } = await supabase
  .from('events')
  .select('*') 
  .order('id', { ascending: false }) 
if (error) {
    throw new Error(error.message) 
 }
   const since = new Date(Date.now() - 24 * 60 * 60 * 5000).toISOString();
   await supabase.from('events').delete().lte('created_at', since);
return {events} 
    
}

const {events} =await forumEvents()
    function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}

const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/naija-events",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/naija-events/"
  },
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": "https://culturays.com/opengraph-image.png"
  },
   "datePublished":toIsoDate(new Date().toDateString()) ,
 "dateModified": toIsoDate(new Date().toDateString()),
  "author": {
    "@type": "Organization",
    "name": "Culturays"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ngenet Studio",
    "url": "https://www.culturays.com/naija-events/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/culturays-no-bg.png"
    }
  }
}
  const dailyEv3 =async()=>{ 
      const eventExp= await getNaijaEvents3();
      const result= await Promise.all(eventExp?.titleAObj.map(async( one:{atitle:string})=> {  
     const evData = await events3Details(one.atitle) 
      return evData 
       })) 
 
       const grouped: ObjType = { 
         title: [], 
         slug:'', 
         img_url:'', 
         desc:[], 
         day:[], 
         loc_slug:'', 
         genre:'',
         genre_slug:'' ,
         location:'',
         organizer:''
       };
        
       const data = result.map((ex)=> ex.data)
  
      for (const ez of data ) {      
        for (const ex of ez ) {
          if (ex.title !== undefined){
          grouped['title']||=[]
         grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
          
        }
        if (ex.slug !== undefined){ 
         grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-") )  
          
        } 
        
       //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
        if (ex.img !== undefined ){ 
          const imgMime  =await processImgs(ex.img, 'event_avatars') 
          grouped.img_url= imgMime as string 
        
        } 
        if (ex.organizer !== undefined ){
          grouped.organizer=ex.organizer  
           
         }
         if (ex.desc !== undefined ){
          grouped.desc=ex.desc  
           
         }
         if (ex.day !== undefined ){ 
          grouped.day=ex.day 
            
         }
            if (ex.venSlug !== undefined ){ 
          grouped.loc_slug=replaceSpecialCharacters( ex.venSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-") )  
           
         } 
       
         if (ex.gnr !== undefined ){ 
          grouped.genre =replaceSpecialCharacters(ex.gnr.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-") )
           
         } 
         if (ex.gnrSlug !== undefined ){ 
          grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-"))  
           
         } 
       
         if (ex.ven !== undefined ){ 
          grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-"))
           
         } 
        } 
    
         const supabase =await createClient()
         const { data, error } = await supabase
           .from('events')
           .upsert([grouped], { onConflict: 'slug' })
           .select();                     
         if (error) { 
           console.error('Error inserting items:', error);
         } 
      
      }  
     }
         CronJob.from({
      cronTime: '10 8 * * *',  
      onTick: dailyEv3(),
      start: true,
      timeZone: 'Africa/Lagos'
      });
      

return ( 
<> 
<StructuredData schema={jsonLd} />
 
  {/* <svg viewBox="0 0 500 500">
    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
    <text width="500">
      <textPath xlinkHref="#curve">
        Dangerous Curves Ahead
      </textPath>
    </text>
  </svg> */}
<div className='max-w-lg mx-auto py-4 px-6 rounded-xl shadow-md space-y-4 bg-yellow-50 my-2 h-max dark:bg-yellow-50'>
  <AISuggestions  />
    {/* <h2 className="text-xl font-semibold ">Join the list of our loyal readers.<FontAwesomeIcon icon={faCoins} className="text-yellow-400"/></h2>
    <p className='text-lg font-bold'> What you can get <FontAwesomeIcon icon={faHandPointDown} className=" text-yellow-800"/> </p>
    <ul className='list-disc mx-4'>
      
      <li>A paid event for free</li> 
       <li>A Cowry Card Top up</li>
    </ul> */}
 </div>
    <div className='xxs:flex xxs:flex-col'> 
 <NaijaEvents events={events} /> 
</div>  

</>)
}

export default Events_Naija
