import EventDetail from "@/components/events/EventDetails";  
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import type { Metadata, ResolvingMetadata } from 'next'
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
    console.error('Error fetching posts:', error );
    return;
    }
    return event
    }
    const eventTitle = await eventView()
  const previousImages = (await parent).openGraph?.images || []
 
    
  return {
    title:`Culturays Forum - ${eventTitle?.title}`,
    description:eventTitle?.title,
    keywords:[eventTitle.genre].join(', '),
         twitter: {
      card: 'summary_large_image',
     title: eventTitle?.title  ,
    description: eventTitle?.title ,  
     images:[`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle.img_url}`, ...previousImages],  
    }, 
    openGraph: { 
      images: [`https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle.img_url}`,...previousImages],
      type: "article",
      publishedTime:eventTitle?.created_at
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
if (error) {
console.error('Error fetching posts:', error.message);
return;
}   
return data 
}
 
const eventTitle = await eventView() 
const jsonLd: WithContext<Event> = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventTitle?.title ,
  description: eventTitle?.desc, 
  startDate:eventTitle?.day,
  endDate: eventTitle?.day,
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: eventTitle?.location,
    // address: {
    //   "@type": "PostalAddress",
    //   streetAddress: "123 Innovation Road",
    //   addressLocality: "Lagos",
    //   addressRegion: "LA",
    //   postalCode: "100001",
    //   addressCountry: "NG"
    // }
  },
  image: [
   `https://peezrwllibppqkolgsto.supabase.co/storage/v1/object/public/event_avatars/${eventTitle.img_url}`
  ],
  keywords:[eventTitle.genre].join(', ')
  // organizer: {
  //   "@type": "Organization",
  //   name: "Culturays",
  //   url: "https://culturays.com"
  // },
  // offers: {
  //   "@type": "Offer",
  //   url: "https://culturays.com/events/workshop",
  //   price: "0.00",
  //   priceCurrency: "NGN",
  //   availability: "https://schema.org/InStock",
  //   validFrom: "2025-04-01T12:00:00+01:00"
  // }
};
 
return (
<div>
  <StructuredData schema={jsonLd} /> 
<EventDetail eventTitle={eventTitle}/> 
</div>
  )
}

export default EventPage