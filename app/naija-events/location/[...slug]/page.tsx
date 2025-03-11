 
import EventLocations from "@/components/events/Location";
import { createClient } from "@/utils/supabase/server";  
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
const LocationPage = async({ params }: Props) => {
 
 // {
//.filter('location', 'ilike', `%${transformedLocation}%`)} both work for filtering
//.replace(/[^a-zA-Z0-9 ]/g, ' ');
const slug =(await params).slug
//const transformed= location.replace(/%20/g, ' ').replace(/[^a-zA-Z0-9 ]/g, ' ')
  
const eventView = async () => { 
const supabase =await createClient();
const { data, error } = await supabase
.from('events')
.select('*')
.eq('loc_slug', slug) 
//.filter('loc_slug', 'ilike', `%${location}%`)
 
if (error) { 
console.error('Error fetching posts:', error.message);
return;
} 
 
return data  
}
 
 
const eventTitle= await eventView()??[]
return (
<div  className='xxs:flex xxs:flex-col'>  
 <EventLocations eventTitle={eventTitle}/> 
</div>
  )
} 

export default LocationPage