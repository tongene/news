import { fetchWithTrace } from "@/utils/fetchWithTrace"

export async function trends(){ 
 
    const wprest = fetchWithTrace('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS{
        trends(first:100) {
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
         trendingCategories {
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
          .then(data => data.data.trends.nodes) 
       .catch(error => console.error('Error:', error))
      
       //const response = wprest?.data.trends.nodes 
       return wprest 
 
}

