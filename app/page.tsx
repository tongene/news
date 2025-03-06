// import { events3Details, getNaijaEvents3 } from "./naija-events/eventData/eventContent";
// import { replaceSpecialCharacters } from "@/utils/replacechars";
// import { scrapeSilverBird } from "./naija-wiki/filmsdata";
// import { processImgs } from "@/utils/process_imgs";
// import { processSbImages } from "@/utils/processImages";
import { createClient } from "@/utils/supabase/server";
// import { AllObj, getGoogleNewsTitles } from "./data/news-data";
// import Main from "@/components/Main"; 
import { CronJob } from "cron";  
// import { newsPosts } from "./data";
import { InnerEdges } from '@/app/types'   
// import MainSlider from "@/components/MainSlider";
// import { livesFeed, newsByLatest } from '@/app/data';
import { LatestProps } from '@/app/types';
interface ObjType { 
  title: string[];
  slug:string  
  img_url: string
   desc: string[]
   day: string[]
   loc_slug: string  
   genre: string 
   genre_slug:string  
   location:string 
}
interface CineType { 
  title: string 
  img_url: string
   genre: string 
   url:string 
   release_date:string 
   dur:string 
}
type EvObjType= {
   titleAObj:any ; 
}
 
export default async function Home() {
  // const location = 'Lagos, Nigeria'; 
  // const newstitles:AllObj[]=await getGoogleNewsTitles(location) 
  // const livesNews = await livesFeed()
  // const latestPosts=await newsByLatest()
  // const dailyEv3 =async()=>{ 
  //   const eventExp:EvObjType | undefined= await getNaijaEvents3();
  //  const result= await Promise.all(eventExp?.titleAObj.map(async( one:{atitle:string})=> {  
  //  const evData = await events3Details(one.atitle)
  //   return evData 
  //    })) 
  //    const grouped: ObjType = { 
  //      title: [], 
  //      slug:'', 
  //      img_url:'', 
  //      desc:[], 
  //      day:[], 
  //      loc_slug:'', 
  //      genre:'',
  //      genre_slug:'' ,
  //      location:''
  //    };
  //   //This is the medium that caters for the daily need for legitimate news from Nigeria.
  //   //This is the medium that caters for the daily need for legitimate global news.
  //   //News on technological advancements, economy, health, society
  //    const data = result.map((ex)=> ex.data) 
  //   for (const ez of data ) {
  //     for (const ex of ez ) { 
  //       if (ex.title !== undefined){
  //       grouped['title']||=[]
  //      grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
        
  //     }
  //     if (ex.slug !== undefined){ 
  //      grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-") )  
        
  //     } 
  
  //    //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
  //     if (ex.img !== undefined ){ 
  //       const imgMime  =await processImgs(ex.img, 'event_avatars') 
  //       grouped.img_url= imgMime as string 
      
  //     } 
      
  //      if (ex.desc !== undefined ){
  //       grouped.desc=ex.desc  
         
  //      }
  //      if (ex.day !== undefined ){ 
  //       grouped.day=ex.day 
          
  //      }
  //         if (ex.venSlug !== undefined ){ 
  //       grouped.loc_slug=replaceSpecialCharacters( ex.venSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-") )  
         
  //      } 
     
  //      if (ex.gnr !== undefined ){ 
  //       grouped.genre =replaceSpecialCharacters(ex.gnr.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-") )
         
  //      } 
  //      if (ex.gnrSlug !== undefined ){ 
  //       grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-"))  
         
  //      } 
     
  //      if (ex.ven !== undefined ){ 
  //       grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-"))
         
  //      } 
  //     } 
   
  //      const supabase =await createClient()
  //      const { data, error } = await supabase
  //        .from('events')
  //        .upsert([grouped], { onConflict: 'slug' })
  //        .select();                     
  //      if (error) { 
  //        console.error('Error inserting items:', error);
  //      } 
    
  //   }  
  //  }
 

  //    const dailyWiki =async()=>{
  //      const silverBTitles= await scrapeSilverBird()
  //      const silverB_titles = silverBTitles.filter((xy)=> xy.title !==undefined).map((ex)=> ex.title)  
  //      const silverB_urls = silverBTitles.filter((xy)=> xy.titleUrl !==undefined).map((ex)=> ex.titleUrl)
  //      const silverB_imgs = silverBTitles.filter((xy)=> xy.img_url !==undefined).map((ex)=> ex.img_url)
  //   const silverB_dur = silverBTitles.filter((xy)=> xy.dur !==undefined).map((ex)=> ex.dur)
  //      const silverB_gnr = silverBTitles.filter((xy)=> xy.genre !==undefined).map((ex)=> ex.genre)
  //      const silverB_released = silverBTitles.filter((xy)=> xy.release_date !==undefined).map((ex)=> ex.release_date)
  //     const minLength = Math.max(silverB_titles.length,silverB_urls.length, silverB_imgs.length, silverB_dur.length, silverB_gnr.length, silverB_released.length);   
     
  //     const grouped:CineType[] =[]     
  //     for (let i = 0; i < minLength; i++) {     
  //       const imgMime = await processSbImages(silverB_imgs[i] as string); 
  //            if(imgMime!== undefined) {
  //             grouped.push({
  //               title: silverB_titles[i]as string,
  //               url: silverB_urls[i]as string,
  //               img_url: imgMime as string,
  //               release_date: silverB_released[i]as string,
  //               genre: silverB_gnr[i]as string,
  //               dur: silverB_dur[i]as string,
  //             });
  //            } 
  //     } 
  //      const supabase =await createClient() 
  //     const { data, error } = await supabase
  //       .from('cinema_titles')
  //       .upsert(grouped, { onConflict: 'title' })
  //       .select();
      
  //     if (error) {
  //       console.error('Error inserting items:', error);
  //     }
   
  //     // return () => clearTimeout(fxnTimeout);
  //      } 
 
       
   // CronJob.from({
    // cronTime: '10 8 * * *', 
    // onTick: dailyEv3(),
    // start: true,
    // timeZone: 'Africa/Lagos'
    //});
  
      // CronJob.from({
        // cronTime: '10 8 * * *',  
        // onTick: dailyWiki(),
        // start: true,
        // timeZone: 'Africa/Lagos'
     //  }); 
    // const postsDataTops = async () => { 
    //   const postsXData= await newsPosts()
    //   const postData= postsXData.map((xy:{posts:{edges:InnerEdges[]}})=> xy.posts.edges).flat()
    //   return postData   
     
    //   }  
    
    //    const top_PostsData= await postsDataTops()    
       
return (
    <div>
      hello  
   {/** <MainSlider livesNews={livesNews}latestPosts={latestPosts}/>  
    <Main top_PostsData={top_PostsData}/>  */}   
   </div>
  ); 
}
