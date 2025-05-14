"use server"
import { newsByLatest } from "../page-data";
import { InnerEdges } from "../types";
 
 export async function postCategories(){
 
  const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
         categories( where: {name: "Topics"}) {          
         edges {
          cursor      
          node {
        name
        slug
         children {
         edges {
          cursor      
          node {
          name
          slug
         posts(first:6) {
        pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
         edges{
         cursor
            node {
              author {
                node {
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
              date
              excerpt
               slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
             
             
            }
          } 
      }
        }}
      }  }}
  }
    }   `  
        
        })
        
        }).then(response => response.json()) 
        .then(data => data.data)
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data
        return wprest ??[]
  } 

  export async function categoriesUnusedPosts (notIn:string[] ){ 
  const wprest = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID])  { 
       categories(first:5, where: {orderby: TERM_ID, exclude: ["YXJyYXljb25uZWN0aW9uOjUwMQ==", "YXJyYXljb25uZWN0aW9uOjYyMA=="], hideEmpty: true} ) {
       edges {
        cursor 
        node {
      name
      slug
       posts(where: {notIn: $notIn}) {       
       edges{
          node {
            author {
              node {
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
                tags {
              nodes {  id
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
            date
            excerpt
             slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           
           
          }
       } } 
    }
  }
}
  }   ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response => response.json())
      .then(data => data.data)
      .catch(error => console.error('Error:', error));
    // const response = wprest?.data
     return wprest
  }  

  export async function postNextCategories (){ 
    const post_data = (await postCategories()??[]) 
    const postCategory_Children =(post_data?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[]
    const postCategory_cursor = postCategory_Children?.map((xy:InnerEdges)=> xy.node?.posts?.edges)?.flat()?.map((t)=> t?.cursor)??[] 
 const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query WPPOSTS { 
             categories( where: {name: "Topics"}) {          
         edges {
          cursor      
          node {
        name
        slug
         children {
         edges {
          cursor      
          node {
          name
          slug
         posts(where: {notIn:[${postCategory_cursor.map(id => `"${id}"`).join(", ")}]} ) { 
            nodes {
              author {
                node {
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
              date
              excerpt
               slug
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
             
             
            }
      }
        }}
      }  }}
  }
       } ` 
           
           })
           
           }).then(response =>response.json()) 
      .then(data => data.data)
      .catch(error => console.error('Error:', error));
          // const response = wprest?.data
           return wprest
  
     } 
   
  export async function nextNewsPosts(){
    const latestPosts=await newsByLatest() 
    const postX = latestPosts.resp?.categories?.nodes.map((xy:{posts:{edges:any[] }})=> xy.posts.edges).flat().map((vx:any )=> vx.cursor)
    const postsXY = latestPosts?.resp2Post?.map((xy:{posts:{edges:any[] }})=> xy.posts.edges).flat().map((vx:any)=> vx.cursor) 
   const postsXcursors= postsXY?.concat(postX) 

  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) { 
       categories(where:{name: "News"}){          
       edges {
        cursor      
        node {
      name
      slug
       posts(where:{notIn:$notIn},first:20 ){ 
          nodes {
            author {
              node {
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
             postsTags {
              nodes {
                name
                slug
              }
            }  tags {
              nodes { 
              id
                name
                slug
              }
            }
            date
            excerpt
             slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           
           
          }
        } 
    }
  }
}
  } `,variables:{
    notIn:postsXcursors
  }
      
      })
      
      }).then(response =>response.json())
      .then(data => data.data)
      .catch(error => console.error('Error:', error)); 
      return wprest
  
  } 
 
 