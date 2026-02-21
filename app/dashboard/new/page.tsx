import Link from "next/link"; 
import { createClient } from "@/utils/supabase/server";
export type CampaignProps={
id?:number |string
slug?:string
title?:string
subject?:string
html?:string
}
const New = async () => {
  const supabase = await createClient()
  const { data: campaigns, error } = await supabase
  .from('campaigns' )
  .select('*') 

if (error) throw error;
const campaign = campaigns[0] as CampaignProps

async function sendNewsletter() {
const res=await fetch('http://localhost:4000/admin/send-newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({campaigns})
})
const data = await res.json()
 console.log (`Scheduled ${data.scheduled} emails`)
}

return (
<div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}> <h1>Newsletters</h1>
 <div style={{fontFamily:"Arial,sans-serif", maxWidth:"600px", margin:"auto"}}>
   <Link href={`/dashboard/${campaign.id}`}><h1>${campaign.subject}</h1></Link> 
  </div> 

  <button onClick={sendNewsletter} style={{ marginTop: 20, padding: 12 }}>
    Send Newsletter
  </button>

</div>
 

)
}
export default New