import EventDetail from "@/components/events/EventDetails";  
import { createClient } from "@/utils/supabase/server";
import type { Metadata, ResolvingMetadata } from 'next'
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
    openGraph: { 
      images: [eventTitle?.files,...previousImages],
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
return (
<div>   
<EventDetail eventTitle={eventTitle}/> 
</div>
  )
}

export default EventPage