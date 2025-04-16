import NaijaEvents from '@/components/events/NaijaEvents'
import StructuredData from '@/components/StructuredData'
import { createClient } from '@/utils/supabase/server'  
import { BlogPosting, SpecialAnnouncement, WebPage, WithContext } from 'schema-dts'
 
//export const revalidate = 10
const Events_Naija = async() => { 
const forumEvents =async ()=>{
const supabase =await createClient() 
const { data:events , error } = await supabase 
.from('events')
.select('*')
.order('id', { ascending: false }) 
if (error) {
    throw new Error(error.message) 
 }
return {events} 
    
} 
const {events} =await forumEvents()
const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/naija-events",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/naija-events"
  },
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": "https://culturays.com/opengraph-image.png"
  },
  "datePublished": "2025-04-15T08:00:00Z",
  "dateModified": "2025-04-15T08:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Culturays"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ngenet Studio",
    "url": "https://www.culturays.com/naija-events",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/assets/images/culturays-no-bg.png"
    }
  }
}
 
return ( 
<> 
<StructuredData schema={jsonLd} />
<div className='xxs:flex xxs:flex-col'> 
 <NaijaEvents events={events} /> 
</div> 

</>)
}

export default Events_Naija
