import { postsOutline, sidePlusViews } from "@/app/page-data";
import { InnerEdges } from "@/app/types";
import Videos from "@/components/News/Videos";
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import { BlogPosting, WithContext } from "schema-dts";
const vids = async()=>{  
 
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `
       query WPVIDEOS {
      videos { 
    nodes {
      videosGroup {
        videoUrl {
          node {
            title
            slug
            mediaItemUrl
            date
            altText
          }
        }
          related{
          nodes{
          ... on Video{
          id
           title
          slug
          }
         
          }
          }
      }
      content 
      date
      excerpt
      slug
      title
        contentTags{
         nodes{
         slug
         name
         }
         
         } 
         videoCategories{
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
    }
  }
    }
    `
    })
 
    }) 
    .then(response => response.json())   
    .then(data => data.data.videos.nodes)
    .catch(error => console.error('Error:', error));
   // const response = wprest?.data.videos.nodes 
    return wprest 
 
  }
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/videos` 
  : "http://localhost:3000/videos";
  
export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Videos", 
   alternates: {
    canonical: 'https://www.culturays.com/videos',
 
  }, 
}; 
const VideosPage = async () => {
const content_videos = await vids(); 
  const sidebarItems=await sidePlusViews()
    const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)  
         const news_outline=await postsOutline()
    //      const naija_wiki =async ()=>{  
    //       const supabase =await createClient() 
    //       const { data:cinema_titles , error } = await supabase 
    //       .from('cinema_titles') 
    //       .select('*')
    //       if(error)throw new Error('An Error has occured!')
    // return cinema_titles
              
    //       }   
    //  const xTitltes= await naija_wiki()
    //    const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon')) 
   
       const jsonLd:WithContext<BlogPosting>={
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Urban News - Event Video Report",
        "description": "Watch this video report on major African events from Culturays.",
        "url": `https://culturays.com/news/video/${content_videos[0]?.slug}`,
        "image": "https://culturays.com/opengraph-image.png",
        "datePublished": "2025-04-15T08:00:00Z",
        "dateModified": "2025-04-15T08:00:00Z",
        "author": {
          "@type": "Organization",
          "name": "Culturays"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ngenet Studio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://culturays.com/assets/images/culturays-no-bg.png"
          }
        },
        "mainEntity": {
          "@type": "VideoObject",
          "name": "Culturays - Coverage of Events in Nigeria, Africa and Beyond",
          "description": "This video features Culturays' coverage of major events in Nigeria, Africa, and across the globe.",
          "thumbnailUrl": "https://culturays.com/opengraph-image.png",
          "uploadDate": "2025-04-15T08:00:00Z",
          "contentUrl": `https://culturays.com/news/video/${content_videos[0]?.videosGroup.videoUrl.node.mediaItemUrl}`,
          "embedUrl": `https://culturays.com/news/video/${content_videos[0]?.slug}`,
          "duration": "PT2M30S"
        }
      }
      
   return (  
    <> 
    <StructuredData schema={jsonLd} />
<Videos
  content_videos={content_videos}
  sidebarItems={txPlus}
 news_outline={news_outline} 
  />  
 
   </>
    )
    
  }
  
  
 

export default VideosPage
