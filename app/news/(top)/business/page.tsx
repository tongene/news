 
import Business from "@/components/News/Business"
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/business/` 
  : "http://localhost:3000/business/";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Business", 
    alternates: {
    canonical:  `https://culturays.com/news/business/`,
 
  }  
}; 
    async function businessBlog(){
   
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          businesses  {
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
           businessCategories {
              nodes {
                name 
                slug
                 businesses  {
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
        .then(data => data.data.businesses.nodes)    
         .catch(error => console.error('Error:', error));
        // const response = wprest?.data.businesses.nodes
         return wprest 
  }   
  
const BusinessPage =async () => { 
  const business_news = await businessBlog()  
  const jsonLd:WithContext<BlogPosting>={
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
    "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
    "url": "https://culturays.com/news/business/",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://culturays.com/news/business/"
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
      "url": "https://culturays.com/news/business/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturays.com/assets/images/culturays-no-bg.png"
      }
    }
  }
  
  return (
    <div >
      <StructuredData schema={jsonLd} />
  <Business
business_news={business_news } 
/></div>
  )
}

export default BusinessPage





