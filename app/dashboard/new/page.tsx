
import { createClient } from "@/utils/supabase/server";
import Start from "@/components/Start";
export type CampaignProps={
id?:number |string
slug?:string
title?:string
subject?:string
html?:string
status?:string,
sent_at?:string
}
const New = async () => {
  const supabase = await createClient()
   const millisecondsInOneDay = 1000 * 60 * 180;
    const millisecondsInTwoDays = millisecondsInOneDay * 30;
    const since = new Date(Date.now() - millisecondsInOneDay).toISOString();
    const { data: campaigns, error  } = await supabase
      .from("campaigns")
      .select("*")
      .eq('status','draft')
      .gte('created_at', since); 
if (error) throw error;
const campaign = campaigns[0] as CampaignProps

return (
<div> 
<Start campaigns={campaigns}/>
</div>


)
}
export default New