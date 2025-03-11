 
import Business from "@/components/News/Business"

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/business` 
  : "http://localhost:3000/business";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Business",   
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
  
  return (
    <div >
  <Business
business_news={business_news } 
/></div>
  )
}

export default BusinessPage





