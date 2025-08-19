import Main from "@/components/Main"; 
import { InnerEdges, PostXNode } from '@/app/types'   
import MainSlider from "@/components/MainSlider"; 
import { events3Details, getNaijaEvents3 } from "./naija-events/eventData/eventContent";
import { processImgs } from "@/utils/process_imgs";
import { processSbImages } from "@/utils/processImages";
import { replaceSpecialCharacters } from "@/utils/replacechars";
import { scrapeSilverBird } from "./naija-wiki/filmsdata";
import { createClient } from "@/utils/supabase/server"; 
import { CronJob } from "cron"; 
import { BlogPosting, WebSite, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";   
import { Suspense } from "react";

 interface ObjType { 
  title: string[];
  slug:string  
  img_url: string
   desc: string[]
   day: string[]
   loc_slug: string  
   genre: string 
   genre_slug:string 
   organizer:string
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
        location:'',
        organizer:''
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
       if (ex.organizer !== undefined ){
         grouped.organizer=ex.organizer  
          
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
        
const newsByLatest =()=>{ 

const res= fetch('https://content.culturays.com/graphql',{ 
method: "POST",
  headers: {
      'Content-Type':'application/json'
    },
body: JSON.stringify({
  query:`
  query WPPOSTS { 
posts(first: 10, where: {categoryName: "Latest"})  { 
 
pageInfo {
endCursor
} 
edges{
cursor 
node{
id
title
  slug
  
  tags {
nodes {
name
slug
}
}
categories {
    nodes {
      name
      slug
    }
  }
excerpt
  date
    author {
  node {
firstName
lastName
name
slug
description
}
}
  featuredImage {
    node {
      altText
      sourceUrl
    }
  }

}
 }}}  
 
  ` 

}) 
}).then((res) => res.json() )
.then((data) => data.data ) 
.catch((err) => console.log("err", err))  
return res
}

   const nextResp=()=>{ 
      const wprestPost = fetch('https://content.culturays.com/graphql',{     
        method: 'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
query WPPOSTS  {               
        posts(first: 5, where: {categoryName: "News"}) {
    pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
   edges{
     cursor     
           node{
          title
           slug
             date
             content
             id
              postsTags {
              nodes {
                name
                slug
              }
            }
             tags {
              nodes { 
               id
                id
                slug
                name
                posts {
                  edges {
                    node {
                      id 
                      slug
                      title 
                      date
                      categories {
                        nodes {
                          id
                          name
                          slug 
                        }
                      }
                    }
                  }
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
                 posts {
                      nodes {
                        title
                        slug
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                  }
                }
              }
            }
            author {
              node {
                firstName
                lastName
                name
                slug
                description
              }
            }
        }} 
  }} ` 
        
        })
        , 
     
        }).then((response) => response.json()) 
        .then((data)=>data.data.posts )
        .catch((error) => console.error('Error:', error)); 
 
        return wprestPost
          }
   const postsOutline =async()=>{
    
    const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query OUTLINEPOST{
         outlines(first: 1) {
       nodes {
         content
         featuredImage{
         node{
         sourceUrl
         altText
         }
         }
         outlineGroup {
           outlineVideos {
             node {
               altText
               caption
               date
               title
                mediaItemUrl
               slug
             }
           }
         }
       }
           } } ` 
           
           })
           
           }).then(response => response.json())
           .then(data => data.data?.outlines?.nodes)        
           .catch(error => console.error('Error:', error));
           //const response = wprest?.data?.outlines?.nodes 
           return wprest
  }  
 function nextNewsPosts(endX:string){  
 if(!endX)return
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($after:String) { 
           posts( after:$after, first:6 , where:{categoryName: "News"}){ 
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
       edges{
       cursor
          node {
            author {
              node {
                name
                slug
              }
            }
               categories {
              nodes {
                name
                slug
              }
            }
              tags {
              nodes { 
              id
                name
                slug
              }
            }
            date
            excerpt
             slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           
      }
          }
        } 
       
 
  } `,variables:{
    after:endX
  }
      
      })
      
      }).then(response =>response.json())
      .then(data =>  data.data )
      .catch(error => console.error('Error:', error)); 
      return wprest
  
  } 
  const liveResp=()=>{
  const wprestLive = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `
         query WPLives {
         lives { 
         edges{     
      node {
      contentTypeName
      id
      databaseId
        date
        modified
        excerpt
        slug
        title
       contentTags{
           nodes{
           slug
           name
           }
           
           } 
            
        featuredImage{
        node{
        sourceUrl
        altText
        }
        
        }
      }  }
    }
    }
      
      `
      })
   
      }) 
      .then(response => response.json() ) 
      .then(data => data.data.lives.edges)
      .catch(error => console.error('Error:', error))
      return wprestLive
     }

const Home=async() =>{  
const latestPosts=await newsByLatest()  
const response2 = await nextResp() 
// const postData= response2.map((xy:{posts:{edges:InnerEdges[]}})=> xy.posts.edges).flat() 
  
const endX= response2.pageInfo.endCursor
const news_outline=await postsOutline()
const posts_notIn_newsPosts= await nextNewsPosts(endX) 
const livexnews =await liveResp() 

     CronJob.from({
      cronTime: '10 8 * * *',  
      onTick: dailyEv3(),
      start: true,
      timeZone: 'Africa/Lagos'
      });
    
         CronJob.from({
          cronTime: '10 8 * * *',  
          onTick: dailyWiki(), 
          start: true,
          timeZone: 'Africa/Lagos'
         });   
        
  const jsonLd:WithContext<WebSite>={
    "@context": "https://schema.org",
    "name":"Urban Naija",
    "@type": "WebSite",
    "alternateName": "Urban Naija News",
    "headline": "Urban Naija News- Covering News in Nigeria, Africa, and Beyond",
    "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
    "url": "https://culturays.com/",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://culturays.com/"
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
      "url": "https://www.culturays.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturays.com/culturays-no-bg.png"
      }
    }
  }
     
 
return (
    <div> 
  <StructuredData schema={jsonLd} /> 
    <Suspense fallback={<div>Loading ...</div>}>
       <MainSlider 
     livesNews={livexnews}
     latestPosts={latestPosts.posts.edges}
     /> 
      
      <Main 
    top_PostsData={response2.edges} 
    news_outline={news_outline}
    posts_notIn_newsPosts={posts_notIn_newsPosts.posts.edges}  
  
    />  </Suspense>   
 </div>
  ); 
}
export default Home