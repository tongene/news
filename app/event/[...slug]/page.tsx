
import AISuggestions from "@/components/AISuggestions";
import EventDetail from "@/components/events/EventDetails";  
import NewsLetter from "@/components/NewsLetter";
import StructuredData from "@/components/StructuredData";
import Top10 from "@/components/Top10El";
import { createClient } from "@/utils/supabase/server";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from "next/navigation";
import { Event, WithContext } from "schema-dts";
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 async function content_TAGS () { 
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
   query POSTTAGS {
   tags(first:1) { 
       nodes { 
    name
    id
    slug 
         
      }
    }
  }`  
        
      })
      
      }).then(response => response.json())    
      .then(data =>data.data?.tags.nodes) 
      .catch(error => console.error('Error:', error));
       return wprest
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
    title: eventTitle?.title ,
    description: `${eventTitle?.desc} | Find details of all relevant events, conferences and summits happening throughout Nigeria yearly. From tech to entertainment and everything necessary to forward that career.`  ,  
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
  const tag_response = await content_TAGS()
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
  if(!eventTitle || !eventTitle.day)return redirect ('/naija-events')
    function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d?.getTime())) {
    return new Date().toLocaleDateString()
   // throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}
const jsonLd: WithContext<Event> = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventTitle?.title ,
  description: `${eventTitle?.desc} | Find details of all relevant events, conferences and summits happening throughout Nigeria yearly. From tech to entertainment and everything necessary to forward that career.` ,   
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
  <div className='max-w-lg mx-auto py-4 px-6 rounded-xl shadow-md space-y-4 bg-yellow-50 my-2 h-max dark:text-black'>
    <AISuggestions tag_response={tag_response}  />
      {/* <h2 className="text-xl font-semibold ">Join the list of our loyal readers.<FontAwesomeIcon icon={faCoins} className="text-yellow-400"/></h2>
      <p className='text-lg font-bold'> What you can get <FontAwesomeIcon icon={faHandPointDown} className=" text-yellow-800"/> </p>
      <ul className='list-disc mx-4'>
        
        <li>A paid event for free</li> 
         <li>A Cowry Card Top up</li>
      </ul> */}
   </div>
<EventDetail eventTitle={eventTitle} similarEvents={similarEvents}/> 
<Top10 />  
<div className="flex p-8 lg:px-32"> 
<NewsLetter/>  
</div> 
</div>
  )
}

export default EventPage