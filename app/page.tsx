import Main from "@/components/Main"; 
import { InnerEdges } from '@/app/types'   
import MainSlider from "@/components/MainSlider";
import { newsByLatest, postsOutline, sidePlusViews } from "./page-data";
import { events3Details, getNaijaEvents3 } from "./naija-events/eventData/eventContent";
import { processImgs } from "@/utils/process_imgs";
import { processSbImages } from "@/utils/processImages";
import { replaceSpecialCharacters } from "@/utils/replacechars";
import { scrapeSilverBird } from "./naija-wiki/filmsdata";
import { createClient } from "@/utils/supabase/server"; 
import { CronJob } from "cron";
import { getNaijaFake1 } from "./data/trends";
import { WebSite, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData"; 
 type PostEdges ={
    responseLatest:{
        slug:string,
        title:string,
        excerpt:string
        date:string
        modified:Date
        contentTypeName:string
        author:{
          node:{
            slug:string,
            name:string
          }
        },
        featuredImage:{
      node:{
        sourceUrl:string,
        altText:string
      }
        }    
        posts:{
            edges:{
              cursor:string[]
              node:{
                slug:string,
            title:string,
            excerpt:string
            date:string
            contentTypeName:string
            databaseId:string
            modified:Date
            author:{
              node:{
                slug:string,
                name:string
              }
            },
            featuredImage:{
          node:{
            sourceUrl:string,
            altText:string
          }
            }
            }
          
            }[]
            nodes:{
              id:string
              databaseId:string
              slug:string,
              title:string,
              contentTypeName:string
              date:string 
              featuredImage:{
            node:{
              sourceUrl:string,
              altText:string
            }
              }
            }
            pageInfo:{
              endCursor:string
            }
           }
          
          node:{
            slug:string,
            title:string,
            excerpt:string
            date:string
            contentTypeName:string
            databaseId:string
            modified:Date
            author:{
              node:{
                slug:string,
                name:string
              }
            },
            featuredImage:{
          node:{
            sourceUrl:string,
            altText:string
          }
            }
          }
          categories:{
          nodes:{posts:{edges:{}}}[]
          }    

    }

    respPosts:InnerEdges
 }

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
 
  const dailyEv3 =async()=>{ 
     const eventExp= await getNaijaEvents3();

    const result= await Promise.all(eventExp?.titleAObj.map(async( one:{atitle:string})=> {  
    const evData = await events3Details(one.atitle)
    
     return evData 
      })) 

      const grouped: ObjType = { 
        title: [], 
        slug:'', 
        img_url:'', 
        desc:[], 
        day:[], 
        loc_slug:'', 
        genre:'',
        genre_slug:'' ,
        location:''
      };
       
      const data = result.map((ex)=> ex.data)
 
     for (const ez of data ) {      
       for (const ex of ez ) {
         if (ex.title !== undefined){
         grouped['title']||=[]
        grouped.title=ex.title.replace(/\t/g, '').replace(/\n/g, '')
         
       }
       if (ex.slug !== undefined){ 
        grouped.slug=replaceSpecialCharacters(ex.slug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-") )  
         
       } 
       
      //&& (ex.imgMime.includes('.jpg')|| ex.imgMime.includes('.png'))
       if (ex.img !== undefined ){ 
         const imgMime  =await processImgs(ex.img, 'event_avatars') 
         grouped.img_url= imgMime as string 
       
       } 
       
        if (ex.desc !== undefined ){
         grouped.desc=ex.desc  
          
        }
        if (ex.day !== undefined ){ 
         grouped.day=ex.day 
           
        }
           if (ex.venSlug !== undefined ){ 
         grouped.loc_slug=replaceSpecialCharacters( ex.venSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-") )  
          
        } 
      
        if (ex.gnr !== undefined ){ 
         grouped.genre =replaceSpecialCharacters(ex.gnr.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-") )
          
        } 
        if (ex.gnrSlug !== undefined ){ 
         grouped.genre_slug=replaceSpecialCharacters(ex.gnrSlug.replace(/’/g, "-").replace(/&/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/ /g,"-").replace(/,/g,"-"))  
          
        } 
      
        if (ex.ven !== undefined ){ 
         grouped.location=replaceSpecialCharacters(ex.ven.replace(/’/g, "-").replace(/\t/g, '-').replace(/\n/g, '-').replace(/&/g, "-"))
          
        } 
       } 
   
        const supabase =await createClient()
        const { data, error } = await supabase
          .from('events')
          .upsert([grouped], { onConflict: 'slug' })
          .select();                     
        if (error) { 
          console.error('Error inserting items:', error);
        } 
     
     }  
    }
   const dailyWiki =async()=>{
        const silverBTitles= await scrapeSilverBird()
        const silverB_titles = silverBTitles.filter((xy)=> xy.title !==undefined).map((ex)=> ex.title)  
        const silverB_urls = silverBTitles.filter((xy)=> xy.titleUrl !==undefined).map((ex)=> ex.titleUrl)
        const silverB_imgs = silverBTitles.filter((xy)=> xy.img_url !==undefined).map((ex)=> ex.img_url)
     const silverB_dur = silverBTitles.filter((xy)=> xy.dur !==undefined).map((ex)=> ex.dur)
        const silverB_gnr = silverBTitles.filter((xy)=> xy.genre !==undefined).map((ex)=> ex.genre)
        const silverB_released = silverBTitles.filter((xy)=> xy.release_date !==undefined).map((ex)=> ex.release_date)
       const minLength = Math.max(silverB_titles.length,silverB_urls.length, silverB_imgs.length, silverB_dur.length, silverB_gnr.length, silverB_released.length);   
      
       const grouped:CineType[] =[]     
       for (let i = 0; i < minLength; i++) {     
         const imgMime = await processSbImages(silverB_imgs[i] as string); 
              if(imgMime!== undefined) {
               grouped.push({
                 title: silverB_titles[i]as string,
                 url: silverB_urls[i]as string,
                 img_url: imgMime as string,
                 release_date: silverB_released[i]as string,
                 genre: silverB_gnr[i]as string,
                 dur: silverB_dur[i]as string,
               });
              } 
       } 
        const supabase =await createClient() 
       const { data, error } = await supabase
         .from('cinema_titles')
         .upsert(grouped, { onConflict: 'title' })
         .select();
       
       if (error) {
         console.error('Error inserting items:', error);
       }
    
       // return () => clearTimeout(fxnTimeout);
        } 
export default async function Home() {     
const latestPosts=await newsByLatest() 
  const postData= latestPosts.resp2Post.map((xy:{posts:{edges:InnerEdges[]}})=> xy.posts.edges).flat() 
     const news_outline=await postsOutline()
  
    //  CronJob.from({
    //   cronTime: '10 8 * * *',  
    //   onTick: dailyEv3(),
    //   start: true,
    //   timeZone: 'Africa/Lagos'
    //   });
    
    //      CronJob.from({
    //       cronTime: '10 8 * * *',  
    //       onTick: dailyWiki(), 
    //       start: true,
    //       timeZone: 'Africa/Lagos'
    //      });
    const jsonLd: WithContext<WebSite>= {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      headline: 'Culturays',
      description:
        'This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world',
      author: {
        '@type': 'Person',
        name: 'Christina Ngene',
        url:'https://culturays.com/creator/christina-ngene',
      },
      datePublished: '2025-04-09T10:00:00Z',
      dateModified: '2025-04-09T12:00:00Z',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://culturays.com/',
      },
      url:'https://culturays.com/', 
      image: 'https://culturays.com/assets/images/opengraph-image.png',
      publisher: {
        '@type': 'Organization',
        name: 'Christina Ngene',
        logo: {
          '@type': 'ImageObject',
          url: 'https://culturays.com/assets/images/culturays-no-bg.png',
        },
      },
      keywords: "News, Nigeria, Trade, Inflation, Money, CBN, Dangote, Sports, Inflation, Market, Tech, Nollywood, Netflix Naija, Business, Movies, Naija Birthdays, Economy, Naija Wiki, Naija Events, Africa",
    };
   
return (
    <div> 
      <StructuredData schema={jsonLd} /> 
{/* <MainSlider livesNews={latestPosts.resp1Live}latestPosts={latestPosts.resp}/> */}
    {/* <Main top_PostsData={postData} 
news_outline={news_outline} />  */}
<h2>Culturays News</h2>
    </div>
  ); 
}
