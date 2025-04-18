import { postsOutline, sidePlusViews } from "@/app/page-data";
import Awards from "@/components/News/Awards"   
import StructuredData from "@/components/StructuredData";
import { createClient } from "@/utils/supabase/server";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/award` 
  : "http://localhost:3000/award";
  async function awardsBlog(){
 
        const wprest = fetch('https://content.culturays.com/graphql',{
          method: 'POST', 
          headers:{ 
          'Content-Type':'application/json', 
          },
          body: JSON.stringify({
            query:`
            query WPPOSTS {
            awards(first:100) {
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
            awardCategories {
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
          
          }).then(response =>response.json())
          .then(data => data.data.awards.nodes)         
           .catch(error => console.error('Error:', error));
          // const response = wprest
           return wprest 
    } 
    
export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | Awards",   
}; 

const AwardsPage = async() => {
 const awards_content = await awardsBlog() 
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
        const jsonLd:WithContext<BlogPosting>={
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Culturays - Covering News in Nigeria, Africa, and Beyond",
            "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
            "url": "https://culturays.com/news/award",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://culturays.com/news/award"
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
              "url": "https://culturays.com/news/award",
              "logo": {
                "@type": "ImageObject",
                "url": "https://culturays.com/assets/images/culturays-no-bg.png"
              }
            }
          }
         
  return (
    <div> 
      <StructuredData schema={jsonLd} />
 <Awards
 awards_content={awards_content} sidebarItems={sidebarItems}
 news_outline={news_outline} coming_titles={coming_titles}
 />  
    </div>
  )
}

export default AwardsPage
