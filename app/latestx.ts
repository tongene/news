import { newsByLatest } from "./page-data";
import { sidePanelNewsItems } from "./sidex";
 export async function newsViews(){
    const latestPosts=await newsByLatest()  
    const postX = latestPosts?.resp.categories?.nodes.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts?.pageInfo?.endCursor).flat()
  
     const wprest = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:10 ,after:"${postX[0]}", where: {categoryName: "Latest"}) {
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
                  tags {
                    nodes {
                    id
                      name
                      slug
                    }
                  }
                 
                postsTags {
              nodes {
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
           }  } 
        } 
         ` 
        
        })
        
        }).then(response => response.json()  )
        .then(data =>  data.data?.posts) 
        .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data?.posts
        return wprest
  }
  export async function altPageNewsItems(){
    const txPosts=await sidePanelNewsItems()
    const postX = txPosts?.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts.pageInfo.endCursor).flat()
    
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts(where: {categoryName: "Opinions" },after:"${postX[0]}") {
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
      
      })
      
      }).then(response => response.json()) 
      .then(data => data.data.posts.edges)         
      .catch(error => console.error('Error:', error));
      //const response =wprest?.data.posts.edges
      return wprest 
  
  }
