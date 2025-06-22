import { postsOutline, sidePlusViews } from "@/app/page-data";
import { InnerEdges } from "@/app/types";
import Nollywood from "@/components/News/Nollywood";
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import { BlogPosting, WithContext } from "schema-dts";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/nollywood/` 
  : "http://localhost:3000/nollywood/";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Nollywood", 
    alternates: {
    canonical:  `https://culturays.com/neews/nollywood/`,
 
  }
};
  async function nollywoodBlog(){ 
    const wprest =  fetch('https://content.culturays.com/graphql',{
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
        "datePublished": "2025-04-15T08:00:00Z",
        "dateModified": "2025-04-15T08:00:00Z",
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
            "url": "https://culturays.com/assets/images/culturays-no-bg.png"
          }
        }
      }
      
  return (
    <div>
      <StructuredData schema={jsonLd} />
  <Nollywood
     nollywood_news={nollywood_news}
     sidebarItems={txPlus}
 news_outline={news_outline} 
 
  />  
    </div>
  )
} 

export default NollywoodPage