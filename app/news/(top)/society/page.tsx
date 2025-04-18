 
import Society from "@/components/News/Society" 
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/society` 
  : "http://localhost:3000/society";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Society",   
}; 
     async function societyBlog(){
    
      const wprest =  fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          societies {
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
            societyCategories {
              nodes {
                name
                slug
                 societies {
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
            excerpt
            
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
        .then(data => data.data.societies.nodes)
         .catch(error => console.error('Error:', error));
         // const response = wprest?.data.societies.nodes        
         return wprest  
   
  } 
const SocietyPage =async () => {
 const society_news = await societyBlog()  
 const jsonLd:WithContext<BlogPosting>={
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
  "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
  "url": "https://culturays.com/news/society",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://culturays.com/news/society"
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
    "url": "https://culturays.com/news/society",
    "logo": {
      "@type": "ImageObject",
      "url": "https://culturays.com/assets/images/culturays-no-bg.png"
    }
  }
}
 
 return (
 <div >
  <StructuredData schema={jsonLd} />
 <Society 
society_news={society_news} 
/>  </div>
  )
}

export default SocietyPage
