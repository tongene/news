 
import { nextNewsPosts, postCategories } from "./data";
import { sidePlusViews } from "./page-data";
import { InnerEdges } from "./types";
 
  export const fetchXPosts = async () => { 
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
   
      body: JSON.stringify({
        query:`
        query WPPOSTS  {
          categories(where: {name:["africa", "world"]}) {
          edges{
          node{                
         posts(first:21){
          pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
              edges{
              cursor
        node {        
          title
          slug
           date
           content
           id
           postsTags {
              nodes {
                name
                slug
              }
            }
        tags {
            nodes {
              id
              slug
              name
              posts {
                edges {
                  node {
                    id 
                    slug
                    title 
                    date
                    categories {
                      nodes {
                        id
                        name
                        slug 
                      }
                    }
                  }
                }
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          categories {
            nodes {
              name
              slug
               posts {
                    nodes {
                      title
                      slug
                      featuredImage {
                        node {
                          sourceUrl
                          altText
                        }
                      }
                }
              }
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
      }  }  }
      }}}
       ` 
      })
      
      }).then(response => response.json())       
      .then(data => data.data)
      .catch(error => console.error('Error:', error));     
      //const res_naija = wp_naija?.data 
      return wp_naija
   
  }
 
  export const fetchNewPosts = async (afterA:string) => { 
     
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($after:String ){
                posts(where: { categoryName: "Nigeria" }, first:1, after:$after){
          pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
        nodes {        
          title
          slug
           date
           content
           id
             
                postsTags {
              nodes {
                name
                slug
              }
            }
        tags {
            nodes {
              id
              slug
              name
              posts {
                edges {
                  node {
                    id 
                    slug
                    title 
                    date
                    categories {
                      nodes {
                        id
                        name
                        slug 
                      }
                    }
                  }
                }
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
          categories {
            nodes {
              name
              slug
               posts {
                    nodes {
                      title
                      slug
                      featuredImage {
                        node {
                          sourceUrl
                          altText
                        }
                      }
                }
              }
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
         
       `, variables:{after:afterA}  
      
      })
      
      }).then(response => response.json())      
      .then(data =>  data.data)  
      .catch(error => console.error('Error:', error));     
      //const res_naija =await wp_naija?.data 
      return wp_naija
   
  }
 
export async function postLastAndScrolledCategories (){
     
     const wprest = fetch('https://content.culturays.com/graphql',{
               method: 'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body: JSON.stringify({
                 query:`
                 query WPPOSTS( $notIn:[ID]) { 
                categories(last:1, where:{name:["world", "journal", "nigeria", "africa"]}) {
                edges {
                cursor
                 node {
               name
               slug
                posts(where:{notIn:$notIn},first:2) {
               pageInfo {
                startCursor
                endCursor
                hasNextPage
              } 
    
          nodes {        
            title
            slug
             date
             content
             id
               postsTags {
                  nodes {
                    name
                    slug
                  }
                }
          tags {
              nodes {
                id
                slug
                name
                posts {
                  edges {
                    node {
                      id 
                      slug
                      title 
                      date
                      categories {
                        nodes {
                          id
                          name
                          slug 
                        }
                      }
                    }
                  }
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
                 posts {
                      nodes {
                        title
                        slug
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                  }
                }
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
           }
         }
           } `
               
               })
               
               }).then(response => response.json() )            
               .then(data =>data.data?.categories.edges) 
               .catch(error => console.error('Error:', error));
              // const response = wprest?.data.categories.edges 
               return wprest 
       
         }
     export async function nextXXPosts(){
          const latestPosts=await sidePlusViews()
        const news_notIn_newsPosts= await nextNewsPosts()   
   const endXNews = news_notIn_newsPosts.categories.edges.map((dy :InnerEdges[])=> dy ).flat().map((xy :{node:{posts:{pageInfo:{endCursor:string}}}})=> xy?.node?.posts.pageInfo.endCursor).flat()  

   const endXCate = await postCategories()   
     const postCategory_Children =(endXCate?.categories?.edges as InnerEdges[])?.map((xy)=> xy?.node?.children?.edges)?.flat()??[]
 
     const postCategory_cursor = postCategory_Children.map((dx:InnerEdges)=>dx.node.posts.edges).flat().map((xy:InnerEdges)=> xy.cursor)      
 
      const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {       
       posts( after:"${endXNews[0]}" , where:{categoryName: "News"}){ 
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
       edges{
       cursor
          node {
           contentTypeName
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
  ` 
      
      })
      
      }).then(response =>response.json())
      .then(data => data.data)
      .catch(error => console.error('Error:', error));
       

  const wpXXrest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {       
       posts( after:"${latestPosts.posts.pageInfo.endCursor}" , where:{categoryName: "Latest"}){ 
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
       edges{
       cursor
          node {
           contentTypeName
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
  ` 
      
      })
      
      }).then(response =>response.json())
      .then(data =>  data.data  )
      .catch(error => console.error('Error:', error));

  const wpRestXX = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {       
       posts( where:{categoryName: "Topics", notIn:$notIn }){ 
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
       edges{
       cursor
          node {
           contentTypeName
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
  ` , variables:{
notIn: postCategory_cursor 

  }
      
      })
      
      }).then(response =>response.json())
      .then(data => data.data)
      .catch(error => console.error('Error:', error)); 
 const postsX1= await wprest 
    const postsX2= await wpRestXX 
     const postsX3= await wpXXrest 
 
      return {postsX1, postsX2, postsX3}  
        
     } 