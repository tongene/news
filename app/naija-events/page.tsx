import NaijaEvents from '@/components/events/NaijaEvents'
import StructuredData from '@/components/StructuredData'
import { createClient } from '@/utils/supabase/server'  
import { SpecialAnnouncement, WithContext } from 'schema-dts'
 
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
     const jsonLd:WithContext<SpecialAnnouncement> = {
        '@context': 'https://schema.org',
        '@type': 'SpecialAnnouncement',
         name:"Culturays Naija Events",
         description: "Naija Events Today",
         dateCreated:new Date().getDate().toLocaleString(),
          mainEntityOfPage: {
           "@type": "WebPage",
           "@id":'https://culturays.com/naija-events/',
         },
         url:'https://culturays.com/naija-events/',
         image: `https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${events[0].img_url}`,
         publisher: {
           "@type": "Organization",
           name: "Christina Ngene",
           logo: {
             "@type": "ImageObject",
             url: "https://culturays.com/assets/images/culturays-no-bg.png",
           },
         },
          
         keywords:events[0].name,    
         
       };

 
return ( 
<> 
<StructuredData schema={jsonLd} />
<div className='xxs:flex xxs:flex-col'> 
  <NaijaEvents events={events} /> 
</div> 

</>)
}

export default Events_Naija
