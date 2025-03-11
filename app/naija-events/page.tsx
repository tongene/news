import NaijaEvents from '@/components/events/NaijaEvents'
import { createClient } from '@/utils/supabase/server'  
 
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
return ( 
<>   
<div className='xxs:flex xxs:flex-col'> 
  <NaijaEvents events={events} /> 
</div> 

</>)
}

export default Events_Naija
