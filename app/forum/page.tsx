import { createClient } from ".././../utils/supabase/server"; 
import Main from "@/components/forum/Main";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "../data/trends";
import { InitialPosts } from "../types";
import { getPosts } from "./actions/loadPosts"; 
import { BlogPosting, DiscussionForumPosting, WebPage, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
 //export const revalidate = 0
 const INITIAL_NUMBER_OF_POSTS = 10
 
const Forum = async({searchParams}: {
  searchParams: Promise<{ topic: string, message: string }>}) => {
const supabase =await createClient()    
const { 
data: { user }, 
} = await supabase.auth.getUser(); 
 const xtre=await getNaijaFake1()
  const trending= await getNaijaTrends1()
  const getFacts=async()=>{
    const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
       const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
  const { data, error } = await supabase
  .from('fact_check')
  .select('*')
  .gte('created_at', startOfMonth)
  .lt('created_at', startOfNextMonth)
  .order('id', { ascending: false })
  .range(0, 10);
if(error){
  console.log(error?.message)
}

return data ??[]
}
 
  const fakeTrend = await getFacts()  
  const today = new Date();
  const todayMonth = today.getMonth() 

 const filteredTrends = fakeTrend?.filter((item, index, self) =>  index === self.findIndex((t) => t.claimant === item.claimant)) 
//  .filter((dateStr:FakeObj) => { 
 
//   const date = new Date(dateStr.claimDate); 
//   const dateDay = date.getDate();  
//   const dateMonth= date.getMonth() ;
//   return dateMonth=== todayMonth||todayMonth-1===dateMonth||todayMonth-2===dateMonth||todayMonth-3===dateMonth; 
// });
 
 const {topic}=await searchParams || ''
 const {message}=await searchParams || ''
  const postsItems =async(): Promise<InitialPosts[]> =>{ 
    const initialPostsD = await getPosts(0, INITIAL_NUMBER_OF_POSTS)
       return initialPostsD ?? [] 
    } 
   const initialPostsD= await postsItems()
//const ix =await getGoogleNewsTitles('Lagos, Nigeria');
//const ix =await netFlixData() 
    function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}
const jsonLd:WithContext<DiscussionForumPosting>={
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "headline": "Urban - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/forum/",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/forum/"
  },
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": "https://culturays.com/opengraph-image.png/"
  },
 "datePublished":toIsoDate(new Date().toDateString()) ,
 "dateModified": toIsoDate(new Date().toDateString()),
  "author": {
    "@type": "Organization",
    "name": "Culturays"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ngenet Studio",
    "url": "https://www.culturays.com/forum/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/culturays-no-bg.png/"
    }
  }
}

 
return ( 
<div> 
  <StructuredData schema={jsonLd} />
 <Main 
 topic={topic}
 val={message}
 user={user}
 trendX={trending}
 initialPosts={initialPostsD}
 filteredTrends={filteredTrends}
 /> 
 </div> 

  )
}

export default Forum