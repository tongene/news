import Link from "next/link"; 
import { createClient } from "@/utils/supabase/server";
export type CampaignProps={
id?:number |string
slug?:string
title?:string
subject?:string
}
const New = async () => {
  const supabase = await createClient()
  const { data: campaigns, error } = await supabase
  .from('campaigns' )
  .select('*') 

if (error) throw error;
const campaign = campaigns[0] as CampaignProps
  return (
    <div style={{fontFamily:"Arial,sans-serif", maxWidth:"600px", margin:"auto"}}>
   <Link href={`/dashboard/campaigns/${campaign.id}`}><h1>${campaign.subject}</h1></Link> 
  </div>
  )
}

export default New