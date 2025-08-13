"use server"
import { fetchWithTrace } from "@/utils/fetchWithTrace";
import { newsByLatest } from "../page-data"; 
 
 export async function postCategories(){
 
  const wprest = fetchWithTrace('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
         categories(where: {name: "Topics"}) {          
         edges {
          cursor      
          node {
        name
        slug
        posts{
        edges{
       cursor
        }
        }
         children (where: {exclude: "dGVybTo0MDQ="}){
            
         edges {
          cursor
              
          node {
          name
          slug
         posts(first:5) {
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
  const wprest = fetchWithTrace('https://content.culturays.com/graphql',{ 
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

 
 
  export async function nextNewsPosts(){ 
    const latestPosts=await newsByLatest()  
  const endX= latestPosts?.resp2Post?.map((xy:{posts:{ pageInfo:{endCursor:string}}})=> xy.posts.pageInfo.endCursor)  
  const wprest = fetchWithTrace('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($after:String) { 
       categories(where:{name: "News"}){          
       edges {
        cursor      
        node {
      name
      slug
       posts( after:$after,first:6){ 
            pageInfo {
              startCursor
              endCursor
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
}
  } `,variables:{
    after:endX[0]
  }
      
      })
      
      }).then(response =>response.json())
      .then(data =>  data.data )
      .catch(error => console.error('Error:', error)); 
      return wprest
  
  } 
 
 