
import EventDetail from "@/components/events/EventDetails";  
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from "next/navigation";
import { Event, WithContext } from "schema-dts";
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {
  const slug =(await params).slug

  const eventView = async () => { 
    const supabase =await createClient();  
    const { data:event, error} = await supabase
    .from('events')
    .select('*') 
    .eq('slug', slug[0] )
    .single() 
    if (error) {
 //  console.error('Error fetching posts:', error );
    return;
    }
    return event
    }
    const eventTitle = await eventView()
  const previousImages = (await parent).openGraph?.images || [] 
  

  return {
    title:`Urban Naija | Event - ${eventTitle?.title}`,
    description:eventTitle?.title,
    keywords:[eventTitle?.genre].join(', '),
    twitter: {
    card: 'summary_large_image',
    title: eventTitle?.title  ,
    description: eventTitle?.title ,  
     images:[`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url}`, ...previousImages],  
    }, 
    openGraph: { 
      title:`Urban Naija | Event - ${eventTitle?.title}`,
      description:eventTitle?.title,
      url: `https://culturays.com/event/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url}`,
      width: 800,
      height: 600,
      ...previousImages
    }],
      type: "article",
      publishedTime:eventTitle?.created_at
    },
     alternates: {
    canonical:  `https://culturays.com/event/${slug}/`,
 
  },
  }
}  
   
const EventPage = async({ params }: Props) => { 
  const slug =(await params).slug
const eventView = async () => { 
const supabase =await createClient();  
const { data, error} = await supabase
.from('events')
.select()
.eq('slug', slug[0])
.single()
  if (!data) {
    return  
    }
if (error) {
//console.error('Error fetching posts:', error.message);
return [];
}   
return data 
}
 
const eventTitle = await eventView()
  if(!eventTitle)return redirect ('/naija-events')
    function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}
const jsonLd: WithContext<Event> = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventTitle?.title ,
  description: eventTitle?.desc,   
  startDate:toIsoDate(eventTitle?.day) ,
  endDate: toIsoDate(eventTitle?.day), 
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
   performer:eventTitle?.title,
   organizer:{
    '@type':eventTitle?.organizer,
    url:`https://culturays.com/event/${slug[0]}`
   },
   offers:{
    '@type':'Offer',
    price:'N/A',
    priceCurrency:'N/A',
    url:`https://culturays.com/event/${slug[0]}` ,
    validFrom:eventTitle?.day,
    availability: "https://schema.org/InStock",
  },
 
   location: {
    "@type": "Place",
    name: eventTitle?.location,
    address: {
     "@type": "PostalAddress",
     streetAddress: eventTitle?.location,    
     addressLocality: eventTitle?.location,
     addressRegion:  eventTitle?.location,
   
    }
  },
  image: [
   `https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle?.img_url}/`
  ],
  keywords:[eventTitle?.genre].join(', ')

};
  const simValues = async () => {  
    const supabase =await createClient();  
    const { data, error } = await supabase
    .from('events')
    .select("*")
    .neq('slug', slug[0])
    .neq('title','[]')
    .range(0,2)
   
    if (error) {
   // console.error('Error fetching posts:', error.message);
    return [];
    }
    
   return data??[];
    } 
   const similarEvents=await simValues() 

return (
<div>
  <StructuredData schema={jsonLd} /> 
<EventDetail eventTitle={eventTitle} similarEvents={similarEvents} /> 
</div>
  )
}

export default EventPage