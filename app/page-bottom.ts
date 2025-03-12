import { nextNewsPosts } from "./data";
import { PostsNotInPost } from "./types";

  export const fetchNewPosts = async (first:number, after:string, exclude:string[]) => { 
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($first: Int, $after: String, $exclude:[ID]) {
          categories(last:1, where:{exclude: $exclude}) {
          nodes{                
         posts(first:$first, after:$after) {
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
      }  }  }
         }
       ` ,
        variables: { first:first,after:after, exclude:exclude }, 
      
      })
      
      }).then(response => response.json())       
      .then(data => data.data)
      .catch(error => console.error('Error:', error));     
      //const res_naija = wp_naija?.data 
      return wp_naija
   
  }
 
export async function postLastAndScrolledCategories ( notIn:string[]){
    const posts_notIn_newsPosts= await nextNewsPosts()  
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
                categories(last:1, where:{exclude: "${last_two_categories}"}) {
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
           } ` ,variables:{  notIn:notIn }
               
               })
               
               }).then(response => response.json() )            
               .then(data =>data.data?.categories.edges) 
               .catch(error => console.error('Error:', error));
              // const response = wprest?.data.categories.edges 
               return wprest 
       
         }
    
    