import { sidePlusViews } from "./page-data";
 // const controller = new AbortController();
// const timeout = setTimeout(() => controller.abort(), 8000);
  export async function altPageNewsItems(){    
 const latestPosts=await sidePlusViews()

    try{
      const wprest = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts( where: {categoryName: "Latest" }, after:"${latestPosts.posts.pageInfo.endCursor}") {
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
     
      }).then(response =>  response.json())
      .then(data =>data.data )         
      .catch(error =>{
       console.log(error)
  }) 
     
      //const response =wprest?.data.posts.edges
      return wprest 
  
    }catch(err){
      console.log(err)
    }
  
  }
 