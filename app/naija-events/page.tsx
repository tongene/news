import NaijaEvents from '@/components/events/NaijaEvents'
import StructuredData from '@/components/StructuredData'
import { createClient } from '@/utils/supabase/server'  
import { SpecialAnnouncement, WebPage, WithContext } from 'schema-dts'
 
export const revalidate = 10
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
     const jsonLd:WithContext<WebPage>={
               "@context": "https://schema.org",
               "@type": "WebPage",
               "name": "Culturays",
               "url": "https://culturays.com/naija-events",
               "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
               "inLanguage": "en",
               "isPartOf": {
                 "@type": "WebSite",
                 "name": "Culturays",
                 "url": "https://culturays.com/naija-events"
               },
               "primaryImageOfPage": {
                 "@type": "ImageObject",
                 "url": "https://culturays.com/assets/images/opengraph-image.png"
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
  {/* <NaijaEvents events={events} />  */}
</div> 

</>)
}

export default Events_Naija
