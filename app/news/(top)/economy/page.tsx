import Economy from "@/components/News/Economy"  
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news/economy/` 
  : "http://localhost:3000/news/economy/";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Economy",  
    alternates: {
    canonical:  `https://culturays.com/news/economy/`,
 
  }
};


    async function economyBlog(){ 
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          economies {
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
          economyCategories {
              nodes {
                name
                slug
                  economies {
          nodes {
            title
            slug
             date
             content
             id 
             excerpt
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
          
            
            }}
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
          .then(data => data.data.economies.nodes)            
         .catch(error => console.error('Error:', error));
        // const response = wprest?.data.economies.nodes
         return wprest
  
   
  } 
   
const EconomyPage =async () => { 
 const economy_news = await economyBlog()
   const jsonLd:WithContext<BlogPosting>={
             "@context": "https://schema.org",
             "@type": "BlogPosting",
             "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
             "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
             "url": "https://culturays.com/news/ecenomy/",
             "mainEntityOfPage": {
               "@type": "WebPage",
               "@id": "https://culturays.com/news/economy/"
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
               "url": "https://culturays.com/news/economy/",
               "logo": {
                 "@type": "ImageObject",
                 "url": "https://culturays.com/culturays-no-bg.png"
               }
             }
           }
         
      
  return (
    <div > 
     <StructuredData schema={jsonLd} />
   <Economy
economy_news={economy_news} 
/> 
</div>
  )
}

export default EconomyPage
