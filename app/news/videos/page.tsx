 
import { InnerEdges } from "@/app/types";
import Videos from "@/components/News/Videos";
import StructuredData from "@/components/StructuredData"; 
import { BlogPosting, WithContext } from "schema-dts";
    async function sidePlusViews(){
  
           const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
                  cache: 'force-cache',
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
           pageInfo {
        endCursor
      }
         edges{ 
            node{
             
            categories {
                  nodes {
                    name
                    slug
                  }
                } 
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
if(!postX)return
      const wpx = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
           } 
        } 
         `, variables:{
          after:postX 
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

    const latestPosts= await wpx  
  const latestStr=latestPosts?.pageInfo?.endCursor 

     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
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
           }  } 
        } 
         ` 
        
        })
        , 
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
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
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news/videos/` 
  : "http://localhost:3000/news/videos/";
  
export const metadata = {
 metadataBase: new URL('https://culturays.com'), 
   title:"Urban News | Videos", 
   alternates: {
    canonical: 'https://culturays.com/news/videos/',
 
  }, 
}; 
const VideosPage = async () => {
const content_videos = await vids(); 
  const sidebarItems=await sidePlusViews()
    const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)  
         const news_outline=await postsOutline()
   
       const jsonLd:WithContext<BlogPosting>={
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Urban News - Event Video Report",
        "description": "Watch this video report on major African events from Urban Naija.",
        "url": `https://culturays.com/news/video/${content_videos[0]?.slug}/`,
        "image": "https://culturays.com/opengraph-image.png",
          "datePublished": new Date().toISOString()  ,
         "dateModified":new Date().toISOString() ,
        "author": {
          "@type": "Organization",
          "name": "Culturays"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ngenet Studio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://culturays.com/culturays-no-bg.png"
          }
        },
        "mainEntity": {
          "@type": "VideoObject",
          "name": "Urban Naija - Coverage of Events in Nigeria, Africa and Beyond",
          "description": "This video features Urban Naija' coverage of major events in Nigeria, Africa, and across the globe.",
          "thumbnailUrl": "https://culturays.com/opengraph-image.png",
          "uploadDate": "2025-04-15T08:00:00Z",
          "contentUrl": `https://culturays.com/news/video/${content_videos[0]?.videosGroup.videoUrl.node.mediaItemUrl}/`,
          "embedUrl": `https://culturays.com/news/video/${content_videos[0]?.slug}/`,
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
