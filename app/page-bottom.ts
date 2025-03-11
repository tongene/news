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
 
export async function postLastAndScrolledCategories (string:string[]){
  
     const wprest = fetch('https://content.culturays.com/graphql',{
               method: 'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body: JSON.stringify({
                 query:`
                 query WPPOSTS( $exclude:[ID])  { 
                categories(last:1, where:{exclude: $exclude, "YXJyYXljb25uZWN0aW9uOjUwMQ=="}) {
                edges {
                cursor
                 node {
               name
               slug
                posts(first:2) {
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
           } ` ,variables:{exclude:string }
               
               })
               
               }).then(response => response.json() )            
               .then(data => data.data?.categories.edges) 
               .catch(error => console.error('Error:', error));
              // const response = wprest?.data.categories.edges 
               return wprest 
       
         }
    
    