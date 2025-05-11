import { createClient } from ".././../utils/supabase/server"; 
import Main from "@/components/forum/Main";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "../data/trends";
import { InitialPosts } from "../types";
import { getPosts } from "./actions/loadPosts";
import { Suspense } from "react";  
import { BlogPosting, WebPage, WithContext } from "schema-dts";
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
    const { data, error } = await supabase
  .from('fact_check') 
  .select('*') 
  .order('id', { ascending: false }) 
  .range(0, 10)
if(error){
  console.log(error?.message)
}

return data ??[]
}
 
  const fakeTrend = await getFacts()  
  const today = new Date();
  const todayMonth = today.getMonth()  
  
const date = new Date(); 
const previousMonth = new Date(date.getTime());
previousMonth.setDate(0); 
 
 const filteredTrends = fakeTrend?.filter((dateStr:FakeObj) => { 
  const date = new Date(dateStr.claimDate);
  const dateDay = date.getDate();  
  const  dateMonth= date.getMonth() ; 
  return  dateMonth=== todayMonth||previousMonth.getMonth()===dateMonth; 
});

  //const xt10 = fakeTrend.map((xt)=> xt.claimDate).includes('') 
 // console.log(fakeTrend)
//   const xt20= xt10.map((xy)=> 
//     // if(xy.claimDate.includes(String('2025'))){
// console.log(xy)  
//     // }
//    )
  
 const {topic}=await searchParams || ''
 const {message}=await searchParams || ''
  const postsItems =async(): Promise<InitialPosts[]> =>{ 
    const initialPostsD = await getPosts(0, INITIAL_NUMBER_OF_POSTS)
       return initialPostsD ?? [] 
    } 
   const initialPostsD= await postsItems()
//const ix =await getGoogleNewsTitles('Lagos, Nigeria');
//const ix =await netFlixData() 
const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Urban - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/forum",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/forum"
  },
  "inLanguage": "en",
  "image": {
    "@type": "ImageObject",
    "url": "https://culturays.com/opengraph-image.png"
  },
  "datePublished": "2025-04-15T08:00:00Z",
  "dateModified": "2025-04-15T08:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Culturays"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ngenet Studio",
    "url": "https://www.culturays.com/forum",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/assets/images/culturays-no-bg.png"
    }
  }
}

// <Suspense>
// </Suspense>
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