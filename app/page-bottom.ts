 
import { PostsNotInPost } from "./types"; 
//
  export const fetchXPosts = async () => { 
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
   
      body: JSON.stringify({
        query:`
        query WPPOSTS  {
          categories(where: {name:["journal", "nigeria", "africa", "world"]}) {
          edges{
          node{                
         posts  {
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
      .then(data => data.data  )
      .catch(error => console.error('Error:', error));     
      //const res_naija = wp_naija?.data 
      return wp_naija
   
  }
 
  export const fetchNewPosts = async (first:number) => { 
      const posts_notIn_newsPosts= await fetchXPosts()  
          const xtCategories= posts_notIn_newsPosts?.categories?.edges.flat() 
const post_end_cursor = xtCategories?.map((xy:{node:{posts:{edges:[]}}} )=> xy?.node.posts.edges).flat().map((dy:{cursor:string})=> dy.cursor)  
 
//
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($first:Int){
         categories(where: {name:["journal", "nigeria", "africa", "world"]})  {
          nodes{                
         posts (first:$first, where: {notIn:[${post_end_cursor.map((id:string) => `"${id}"`).join(", ")}]}) {
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
      }  }    
         
         
  }
    }    
         
       `, variables:{first}  
      
      })
      
      }).then(response => response.json())      
      .then(data => data.data )
      .catch(error => console.error('Error:', error));     
      //const res_naija =await wp_naija?.data 
      return wp_naija
   
  }
 
export async function postLastAndScrolledCategories (){
    const posts_notIn_newsPosts= await fetchXPosts()  
        const xtCategories= posts_notIn_newsPosts?.categories?.edges
         const last_two_categories = xtCategories?.map((xt:PostsNotInPost)=>xt.cursor).concat(["YXJyYXljb25uZWN0aW9uOjUwMQ=="])
       
     const wprest = fetch('https://content.culturays.com/graphql',{
               method: 'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body: JSON.stringify({
                 query:`
                 query WPPOSTS( $notIn:[ID]) { 
                categories(last:1, where:{name:["world", "journal", "nigeria", "africa"], exclude: "${last_two_categories}"}) {
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
    
    