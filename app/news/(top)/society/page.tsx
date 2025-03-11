 
import Society from "@/components/News/Society" 
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

  return (
    <div >
 <Society 
society_news={society_news} 
/>  </div>
  )
}

export default SocietyPage
