"use server"
import axios from "axios";
import * as cheerio from 'cheerio'; 
import { CronJob } from "cron";
const ourPassword = process.env.NEXT_PUBLIC_WP_SECRET
const ourUsername = "Christina Ngene"
type Obj={
  title :string
  author:string
}
type ImgObj={
  title :string 
}
export type AllObj={
  title :string
  author:string
  date:string
} 

export const getNaijaNews1=async():Promise<AllObj[]> => {
    const eventName:Obj[]=[] 
    const eventAll:AllObj[]= []
    const eventLoc= []
    const imgObj:ImgObj[]= [] 
//     const res12=await axios.get('https://news.google.com/home?hl=en-NG&gl=NG&ceid=NG:en') 
//     .then(async(response)=>{
//       const html = response.data
//     const $ = cheerio.load(html)
  
//      $('a.gPFEn', html).each((index, element)=>{
//      const title = $(element).text() 
//         imgObj.push({ 
//            title ,             
//           } 
//          )  
//      }) 
 
//      $('.vr1PYe', html).each((index,element)=>{      
//         const author = $(element).text() 
//         imgObj.map((ex)=>{  
//         eventName.push( {
//         author:author, 
//          title:ex.title 
//         }
//      )} ) 
    
//     }) 
   
//      $('.hvbAAd', html).each((index,element)=>{      
//         const date = $(element).text()              
//         eventName.map((ex)=>{ 
//         eventAll.push({
//         author:ex.author,
//         title:ex.title,
//         date:date  
//     }) }) 
//      })

//   })
//      const removeDuplicatesBd = (data:AllObj[]):AllObj[] => {
//     const seen = new Set<string>(); 
//     return data.reduce((unique, current)=> { 
//       const keyName = current.author;
//       const keyTitle = current.title; 
//       const keyTime = current.date;    
 
//       if(!seen.has(keyName)){
//         if(!seen.has(keyTitle)){
//           if(!seen.has(keyTime)){         
//             seen.add(keyTitle);
//             seen.add(keyName );  
//             seen.add(keyTime ); 
//         (unique).push(current)
//        }}     
//         }  
//       return unique ??[];
//     }, [] as AllObj[]);
//   };  
   
//   const resultX = removeDuplicatesBd(eventAll)

//   const submitForm = async () => { 
//     const data = new FormData()
   
//       try { 
//          for (const xy of resultX) {  
//       Object.entries({title:xy.title }).forEach(([key, value]) => {
//         data.append(key, value); 
//       })
//         const response = await fetch('https://content.culturays.com/wp-json/wp/v2/latest', { 
//           method: "POST",  
//           body:data,  
//           headers: { 
//             'Accept': 'application/json', 
//           'Authorization': 'Basic ' + Buffer.from(`${ourUsername}:${ourPassword}`).toString('base64')
//           },
//         });
    
//         if (!response.ok) {
//          // console.log(response.statusText)
//           throw new Error(`HTTP error! status: ${response.statusText}`);
//         } 
//      const result = await response.json(); 
//       }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//       } 
//  //return () => clearTimeout(fxnTimeout);
// }
    
  // const fxnTimeout = setTimeout(() => {
  //   CronJob.from({
  //   cronTime: '10 8 * * *', 
  //   onTick: submitForm(),
  //   start: true,
  //   timeZone: 'Africa/Lagos'
  //   });
  // }, 3000); 
   return []
 
   } 

// export const getGoogleNewsTitles = async (location) => {
//   const newsTitlesGoogle=[]
//     try {
         
//         const url = `https://news.google.com/search?q=${encodeURIComponent(location)}&hl=en-US&gl=NG&ceid=NG:en`; 
//         const { data } = await axios.get(url); 
//         const $ = cheerio.load(data); 
//         const newsTitles = [];
//         $('h3').each((index, element) => {
//             newsTitles.push($(element).text());
//         });
 
//        // console.log(`Google News titles for ${location}:`);
//         newsTitles.forEach((title, index) => { 
//           newsTitlesGoogle.push({
//             title
//           })
//            // console.log(`${index + 1}. ${title}`);
//         });
//     } catch (err) {
//         console.error('Error fetching Google News data:', err);
//     }
//     return newsTitlesGoogle
// };


export const getGoogleNewsTitles = async (location:string):Promise<AllObj[]> => { 
  const newsTitlesGoogle:AllObj[] = [];
//   try {
//       const url = `https://news.google.com/search?q=${encodeURIComponent(location)}&hl=en-US&gl=NG&ceid=NG:en`;
//       const { data } = await axios.get(url);
//       const $ = cheerio.load(data);

//       $('article').each((index, element) => {
//           const titleElement = $(element).find('a.JtKRv');
//           const title = titleElement.text(); 
//           const dateElement = $(element).find('time');
//           const date = dateElement.attr('datetime') as string;

//           const authorElement = $(element).find('.vr1PYe');
//           const author = authorElement.text()

//           newsTitlesGoogle.push({
//               title,
//               date,
//               author
//           });
//       });
//   } catch (err) {
//       console.error('Error fetching Google News data:', err);
//   }
//   const removeDuplicatesBd = (data:AllObj[]):AllObj[] => {
//     const seen = new Set(); 
//     return data.reduce((unique, current) => { 
//       const keyName = current.author  ;
//       const keyTitle = current.title ; 
//       const keyTime = current.date ;    
 
//       if(!seen.has(keyName)){
//         if(!seen.has(keyTitle)){
//           if(!seen.has(keyTime)){         
//             seen.add(keyTitle);
//             seen.add(keyName );  
//             seen.add(keyTime ); 
//        ( unique).push(current)
//        }}     
//         }  
//       return unique ??[];
//     }, [] as AllObj[]);
//   };  
   
//  const resultX = removeDuplicatesBd(newsTitlesGoogle)  
//  const submitForm = async () => {
//   const data = new FormData() 

// try {
//   for (const xy of resultX ) {  
//     Object.entries({title:xy.title }).forEach(([key, value]) => {
//        data.append(key, value); 
//      })        
      
//     } 
//      const response = await fetch('https://content.culturays.com/wp-json/wp/v2/latest', { 
//        method: "POST",  
//        body:data,  
//        headers: {
//          'Accept': 'application/json', 
//        'Authorization': 'Basic ' + Buffer.from(`${ourUsername}:${ourPassword}`).toString('base64')
//        },
//      });
 
//      if (!response.ok) {
//       // console.log(response.statusText)
//        throw new Error(`HTTP error! status: ${response.statusText}`);
//      } 
 
//     const result = await response.json();     
//    } catch (error) {
//      console.error('Error submitting form:', error);
//    } 
//  return () => clearTimeout(fxnTimeout);
// }
const fxnTimeout = setTimeout(() => {
  // CronJob.from({
  // cronTime: '10 8 * * *', 
  // onTick: submitForm(),
  // start: true,
  // timeZone: 'Africa/Lagos'
  // });
}, 3000); 

  //if this function does not return anything and saved to variable and accidentally passed to client, it will throw an error - functions can not be passed directly to client
return [];
};



