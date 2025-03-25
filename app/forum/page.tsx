import { createClient } from ".././../utils/supabase/server"; 
import Main from "@/components/forum/Main";
import { FakeObj, getNaijaFake1, getNaijaTrends1 } from "../data/trends";
import { InitialPosts } from "../types";
import { getPosts } from "./actions/loadPosts";
import { Suspense } from "react";  
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
  .range(0, 10)
if(error){
  console.log(error?.message)
}

return data ??[]
}
 
  const fakeTrend = await getFacts() 

  const today = new Date();
const todayMonth = today.getMonth() ;
const filteredTrends = fakeTrend?.filter((dateStr:FakeObj) => {
  const date = new Date(dateStr.claimDate);
  const dateDay = date.getDate();  
  const dateMonth = date.getMonth() ;
  return dateMonth <= todayMonth ;
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
 
return ( 
<div> 
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