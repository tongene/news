
import Environment from "@/components/News/Environment"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/environment` 
  : "http://localhost:3000/environment";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Environment",   
};


    async function environmentBlog(){
  
      const wprest =  fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          environments {
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
            environmentCategories {
              nodes {
            name
            slug
              environments {
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
        
        }).then(response => response.json() ) 
        .then(data => data.data.environments.nodes)
         .catch(error => console.error('Error:', error));
          //const response = wprest?.data.environments.nodes 
         return wprest  
  } 
const EnvironmentPage =async () => {
   const environment_news = await environmentBlog() 
  
  return ( 
   <div>    
 <Environment 
environment_news={environment_news} 
/>  
  </div> 
  )
} 

export default EnvironmentPage
