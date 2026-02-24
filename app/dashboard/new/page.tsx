import Link from "next/link"; 
import { createClient } from "@/utils/supabase/server";
import Start from "@/components/Start";
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


return (
<div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}> 
<Start campaigns={campaigns}/>
</div>
 

)
}
export default New