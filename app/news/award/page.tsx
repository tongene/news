import Awards from "@/components/News/Awards"   
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
  return (
    <div> 
 <Awards
 awards_content={awards_content}
 />  
    </div>
  )
}

export default AwardsPage
