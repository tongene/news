import Nollywood from "@/components/News/Nollywood";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/nollywood` 
  : "http://localhost:3000/nollywood";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Nollywood",   
};
  async function nollywoodBlog(){ 
    const wprest =  fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        nollywoods(last:100 ) {
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
         nollywoodCategories {
            nodes {
              name
              slug
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
      .then(data => data.data.nollywoods.nodes)        
       .catch(error => console.error('Error:', error));
      // const response = wprest?     
       return wprest  
  
  }  

const NollywoodPage =async () => {
 const nollywood_news = await nollywoodBlog()
 
  return (
    <div>
  <Nollywood
     nollywood_news={nollywood_news}
  />  
    </div>
  )
} 

export default NollywoodPage