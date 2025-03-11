import Tech from "@/components/News/Tech"; 
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/tech` 
  : "http://localhost:3000/tech";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Tech",   
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

  return (
    <div > 
  <Tech
tech_news={tech_news} 
/> 
 </div>
  )
}

export default TechPage
