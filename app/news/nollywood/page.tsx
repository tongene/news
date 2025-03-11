import { postsOutline, sidePlusViews } from "@/app/page-data";
import Nollywood from "@/components/News/Nollywood";
import { createClient } from "@/utils/supabase/server";

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
 const sidebarItems=await sidePlusViews()       
       const news_outline=await postsOutline()
       const naija_wiki =async ()=>{  
        const supabase =await createClient() 
        const { data:cinema_titles , error } = await supabase 
        .from('cinema_titles') 
        .select('*')
        if(error)throw new Error('An Error has occured!')
  return cinema_titles
            
        }   
   const xTitltes= await naija_wiki()
     const coming_titles= xTitltes?.filter((ex)=> ex.genre?.includes('Coming Soon'))  
  return (
    <div>
  <Nollywood
     nollywood_news={nollywood_news}
     sidebarItems={sidebarItems}
 news_outline={news_outline} coming_titles={coming_titles}
  />  
    </div>
  )
} 

export default NollywoodPage