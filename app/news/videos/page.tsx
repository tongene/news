import { postsOutline, sidePlusViews } from "@/app/page-data";
import Videos from "@/components/News/Videos";
import { createClient } from "@/utils/supabase/server";
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
   title:"Culturays | Videos",
   alternates: {
    canonical: 'https://www.culturays.com/videos',
 
  }, 
}; 
const VideosPage = async () => {
const content_videos = await vids(); 
  const sidebarItems=await sidePlusViews()       
         const news_outline=await postsOutline()
         const naija_wiki =async ()=>{  
          const supabase =await createClient() 
          const { data:cinema_titles , error } = await supabase 
          .from('cinema_titles') 
          .select('*')
          if(error)throw new Error('An Error has occured!')
    return cinema_titles
              
          }   
     const xTitltes= await naija_wiki()
       const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon')) 
   return (  
    <> 
<Videos
  content_videos={content_videos}
  sidebarItems={sidebarItems}
 news_outline={news_outline} coming_titles={coming_titles}
  />  
 
   </>
    )
    
  }
  
  
 

export default VideosPage
