 
import { InnerEdges } from "@/app/types";
import Nollywood from "@/components/News/Nollywood";
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import { BlogPosting, WithContext } from "schema-dts";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news/nollywood/` 
  : "http://localhost:3000/news/nollywood/";

export const metadata = {
 metadataBase: new URL('https://culturays.com'), 
   title:"Urban News | Nollywood", 
    alternates: {
    canonical:  `https://culturays.com/news/nollywood/`,
 
  }
};
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
  async function nollywoodBlog(){ 
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        nollywoods(last:100 ) {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         nollywoodCategories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              firstName
              lastName
              name
              description
            }
          }
        }
      }
       }  
       `  
      })
      
      }).then(response => response.json())
      .then(data => data.data.nollywoods.nodes)        
       .catch(error => console.error('Error:', error));
      // const response = wprest?     
       return wprest  
  
  }  

const NollywoodPage =async () => {
 const nollywood_news = await nollywoodBlog()
 const sidebarItems=await sidePlusViews() 
 const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node)          
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
      const jsonLd:WithContext<BlogPosting>={
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
        "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
        "url": "https://culturays.com/news/nollywood/",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://culturays.com/news/nollywood/"
        },
        "inLanguage": "en",
        "image": {
          "@type": "ImageObject",
          "url": "https://culturays.com/opengraph-image.png"
        },
        "datePublished": new Date().toISOString()  ,
         "dateModified":new Date().toISOString() ,
        "author": {
          "@type": "Organization",
          "name": "Culturays"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ngenet Studio",
          "url": "https://culturays.com/news/nollywood/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://culturays.com/culturays-no-bg.png"
          }
        }
      }
      
  return (
    <div>
      <StructuredData schema={jsonLd} />
  <Nollywood
     nollywood_news={nollywood_news}
     sidebarItems={txPlus} />  
    </div>
  )
} 

export default NollywoodPage