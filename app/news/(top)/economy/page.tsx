import Economy from "@/components/News/Economy"  
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/economy` 
  : "http://localhost:3000/economy";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Economy",   
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
  return (
    <div > 
   <Economy
economy_news={economy_news} 
/> 
</div>
  )
}

export default EconomyPage
