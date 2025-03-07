import googleTrends from 'google-trends-api'
import { CronJob } from 'cron'; 
import axios from 'axios';
import { createClient } from '@/utils/supabase/server';
import * as cheerio from 'cheerio';
const ourPassword = process.env.NEXT_PUBLIC_WP_SECRET
const ourUsername = "Christina Ngene"
type Obj={
  title :string
}
type ReviewObj={
  title :string
  textualRating:string
  url:string
}
export type FakeObj={
  text :string,
  claimDate:string
  claimReview:ReviewObj[]
} 

export const getNaijaTrends1=async ()=> { 
  const titleObj:Obj[]= [] 
await googleTrends.dailyTrends({
  geo: 'NG',
  category: 'all',
 }
  , function(err:any, results:any) {
  if (err) {
    console.log(err);
  }else{ 
      try { 
         
          if (results.default?.trendingSearchesDays?.length) {            
              const trendingSearches = results.default.trendingSearchesDays[0].trendingSearches;
              trendingSearches.forEach((search: { title: { query: string } }, index: number) => {
           //  titleObj.push({ title: search.title.query });
              });
          } else {
   //console.log("No trending data available.");
              return []
          }
      } catch (error) {
          console.error("Error parsing JSON:", error); 
    }  
   }
})


  //   const submitForm = async () => { 
  //     const data = new FormData()
  //      for (const xy of titleObj) {  
  //       Object.entries({title:xy.title }).forEach(([key, value]) => {
  //       data.append(key, value);
  //     })
       
  //       try {
  //         const response = await fetch('https://content.culturays.com/wp-json/wp/v2/trending', { 
  //           method: "POST",  
  //           body:data,  
  //           headers: {
  //             'Accept': 'application/json', 
  //           'Authorization': 'Basic ' + Buffer.from(`${ourUsername}:${ourPassword}`).toString('base64')
  //           },
  //         });
      
  //         if (!response.ok) { 
  //           throw new Error(`HTTP error! status: ${response.statusText}`);
  //         }  
  //         const result = await response.json(); 
       
  //       } catch (error) {
  //         console.error('Error submitting form:', error);
  //       }
  //  } 
  // return () => clearTimeout(fxnTimeout);
  // }

  // const fxnTimeout = setTimeout(() => {
  //   CronJob.from({
  //   cronTime: '10 8 * * *', 
  //   onTick: submitForm(),
  //   start: true,
  //   timeZone: 'Africa/Lagos'
  //   });
  // }, 5000);    
 
  return titleObj 
   }


 
 export async function getNaijaFake1() {  
 const newsRest=await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=nigeria&key=${process.env.GOOGLE_API}&pageSize=100`)
 .then(response => response.json())
 .then(data => data)
 .catch(error => console.error("Error:", error));
const response = newsRest.claims

const supabase = await createClient()
const insertFacts=async()=>{
    const { data, error } = await supabase
  .from('fact_check')
  .insert(response)
  .select() 
if(error){
  console.log(error?.message)
}
return () => clearTimeout(fxnTimeout);

}
 const fxnTimeout = setTimeout(() => {
    CronJob.from({
    cronTime: '10 8 * * *', 
    onTick: insertFacts(),
    start: true,
    timeZone: 'Africa/Lagos'
    }); 
  }, 5000);
return response
 
   }