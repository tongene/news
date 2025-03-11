import Videos from "@/components/News/Videos";
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
  
   return (  
    <> 
<Videos
  content_videos={content_videos}
  />  
 
   </>
    )
    
  }
  
  
 

export default VideosPage
