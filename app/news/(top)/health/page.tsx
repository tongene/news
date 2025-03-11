 
import Health from "@/components/News/Health" 
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

  return ( 
   <div>
  <Health
health_news= {health_news} 
/> </div>  
  )
}

export default HealthPage
