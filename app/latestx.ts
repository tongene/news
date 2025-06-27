import { sidePanelNewsItems } from "./sidex";
  const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8000);
  export async function altPageNewsItems(){
    const txPosts=await sidePanelNewsItems()
    const postX = txPosts?.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts.pageInfo.endCursor).flat()
    
  const wprest = fetch('https://content.culturays.com/graphql',{
      signal: controller.signal ,
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts(where: {categoryName: "Opinions" }, after:"${postX[0]}") {
              pageInfo {
            startCursor
            endCursor
            hasNextPage
          } 
              edges{ 
              cursor
            node{
             id
              title
                slug
                     
                postsTags {
              nodes {
                name
                slug
              }
            }
                tags {
                  nodes {
                   id
                    name
                    slug
                  }
                }
                 categories {
                  nodes {
                    name
                    slug
                  }
                }
              excerpt
                date
                 author {
               node {
              firstName
              lastName
              name
              slug
              description
            }
          }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                } 
       }
         } } 
      } 
       ` 
      
      }),
     
      }).then(response =>{
    clearTimeout(timeout);  
    return response.json();
  }).then(data => data.data.posts.edges)         
      .catch(error =>{
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Fetch failed:', error);
      console.error('Error:', error)
    }
  }) 
      clearTimeout(timeout)
      //const response =wprest?.data.posts.edges
      return wprest 
  
  }
 