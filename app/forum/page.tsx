import { createClient } from ".././../utils/supabase/server"; 
import Main from "@/components/forum/Main";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "../data/trends";
import { InitialPosts } from "../types";
import { getPosts } from "./actions/loadPosts";
import { Suspense } from "react";  
import { DiscussionForumPosting, WebPage, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
 export const revalidate = 0
 const INITIAL_NUMBER_OF_POSTS = 10
const Forum = async({searchParams}: {
  searchParams: Promise<{ topic: string }>}) => {
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
  const postsItems =async(): Promise<InitialPosts[]> =>{ 
    const initialPostsD = await getPosts(0, INITIAL_NUMBER_OF_POSTS)
       return initialPostsD ?? [] 
    } 
   const initialPostsD= await postsItems()
//const ix =await getGoogleNewsTitles('Lagos, Nigeria');
//const ix =await netFlixData() 
const jsonLd:WithContext<DiscussionForumPosting> = {
  '@context': 'https://schema.org',
  '@type': 'DiscussionForumPosting',
   name:"Culturays Forum",
   headline: "Culturays Forum",
   description: "Start a conversation with people you know and connect with new people.",
   author: {
     "@type": "Person",
     name: "Christina Ngene",
     url:'https://culturays.com/creator/christina-ngene',
   }, 
   datePublished:'2025-04-09T10:00:00Z', 
   dateModified: '2025-04-09T10:00:00Z',
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":'https://culturays.com/forum/',
   },
   url:'https://culturays.com/forum/',
   image: "https://culturays.com/assets/images/culturays-no-bg.png",
   publisher: {
     "@type": "Organization",
     name: "Christina Ngene",
     logo: {
       "@type": "ImageObject",
       url: "https://culturays.com/assets/images/culturays-no-bg.png",
     },
   },
    
   keywords:'Nigeria, Naija, Lagos',    
   
 };

return ( 
<div> 
  <StructuredData schema={jsonLd} />
 <Suspense> <Main 
 user={user}
 trendX={trending}
 initialPosts={initialPostsD}
 filteredTrends={filteredTrends}
 /></Suspense>  
 </div> 

  )
}

export default Forum