import Tech from "@/components/News/Tech"; 
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/tech` 
  : "http://localhost:3000/tech";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Tech",   
}; 
    async function techBlog(){  
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          technologies {
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
            techCategories {
              nodes {
                name
                slug
                  technologies {
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
        .then(data => data.data.technologies.nodes)          
         .catch(error => console.error('Error:', error));
         // const response = wprest?.data.technologies.nodes
          
         return wprest  

  } 
const TechPage =async () => { 
 const tech_news = await techBlog()  
 const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/news/tech",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/news/tech"
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
    "url": "https://culturays.com/news/tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/assets/images/culturays-no-bg.png"
    }
  }
}

     
  return (
    <div > 
  <StructuredData schema={jsonLd} />
   <Tech
tech_news={tech_news} 
/> 
 </div>
  )
}

export default TechPage
