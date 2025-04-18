 
import Health from "@/components/News/Health" 
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/health` 
  : "http://localhost:3000/health";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Health",   
};

  
    async function healthBlog(){ 
      const wprest =   fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          healths {
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
            healthCategories {
              nodes {
                name
                slug
                  healths {
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
           
            }
            
            }
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
        .then(data => data.data.healths.nodes)          
         .catch(error => console.error('Error:', error));
         // const response = wprest?.data.healths.nodes
          
         return wprest 
  
  } 
const HealthPage =async () => {  
 const health_news = await healthBlog()
 
 const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/news/award",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/news/award"
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
    "url": "https://culturays.com/news/award",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/assets/images/culturays-no-bg.png"
    }
  }
}
 

  return ( 
   <div>
    <StructuredData schema={jsonLd} />
  <Health
health_news= {health_news} 
/> </div>  
  )
}

export default HealthPage
