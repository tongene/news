"use server"
import { newsByLatest } from "../page-data";
import { InnerEdges } from "../types";

 

//   export async function newsPosts(){  
//     const wprest = fetch('https://content.culturays.com/graphql',{     
//          method: 'POST',
//          body: JSON.stringify({
//            query:`
//            query WPPOSTS {
//          categories(where: {name: "News"}) {
//      nodes {               
//            posts(first: 5){
//         pageInfo{
//          endCursor
//        startCursor
//        hasNextPage
//             }
//            edges{
//            cursor     
//             node{
//            title
//             slug
//               date
//               content
//               id
//                postsTags {
//                nodes {
//                  name
//                  slug
//                }
//              }
//               tags {
//                nodes { 
//                 id
//                  id
//                  slug
//                  name
//                  posts {
//                    edges {
//                      node {
//                        id 
//                        slug
//                        title 
//                        date
//                        categories {
//                          nodes {
//                            id
//                            name
//                            slug 
//                          }
//                        }
//                      }
//                    }
//                  }
//                }
//              }
//              featuredImage {
//                node {
//                  sourceUrl
//                  altText
//                }
//              }
//              excerpt
//              categories {
//                nodes {
//                  name
//                  slug
//                   posts {
//                        nodes {
//                          title
//                          slug
//                          featuredImage {
//                            node {
//                              sourceUrl
//                              altText
//                            }
//                          }
//                    }
//                  }
//                }
//              }
//              author {
//                node {
//                  firstName
//                  lastName
//                  name
//                  slug
//                  description
//                }
//              }
//          }}
   
//        }}}
//           } ` 
         
//          })
//          , 
//          headers:{
//              'Content-Type':'application/json'
//          }
//          }).then((response) => response.json()) 
//          .then((data)=>data.data.categories.nodes)
//          .catch((error) => console.error('Error:', error));
             
//          return wprest 
  
//    } 
 

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
        .then(data =>  data.data)
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data
        return wprest 
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
    const post_data = await postCategories()
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
    const postX = latestPosts.resp.categories.nodes.map((xy:{posts:{edges:any[] }})=> xy.posts.edges).flat().map((vx:any )=> vx.cursor)
    const postsXY = latestPosts.resp2Post.map((xy:{posts:{edges:any[] }})=> xy.posts.edges).flat().map((vx:any)=> vx.cursor) 
   const postsXcursors= postsXY.concat(postX) 
 
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS { 
       categories(where:{name: "News"}){          
       edges {
        cursor      
        node {
      name
      slug
       posts(where:{notIn:[${postsXcursors.map((id:string) => `"${id}"`).join(", ")}]},first:20 ){ 
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
  } ` 
      
      })
      
      }).then(response =>response.json())
      .then(data => data.data)
      .catch(error => console.error('Error:', error));
      const response = await wprest  
      return wprest
  
  } 
 
//   export async function sideBarNewsItems(notIn:string[]){
    
//   const wprest =   fetch('https://content.culturays.com/graphql',{
//       method: 'POST',
//       headers:{
//           'Content-Type':'application/json'
//       },
//       body: JSON.stringify({
//         query:`
//         query WPPOSTS($notIn:[ID]) {                  
//            posts(first:10, where: {categoryName: "Opinions", notIn:$notIn}) {
//               pageInfo {
//             startCursor
//             endCursor
//             hasNextPage
//           } 
//               edges{ 
//               cursor
//             node{
//              id
//               title
//                 slug
//               postsTags {
//               nodes {
//                 name
//                 slug
//               }
//             }
//                 tags {
//                   nodes { 
//                    id
//                     name
//                     slug
//                   }
//                 }
//                  categories {
//                   nodes {
//                     name
//                     slug
//                   }
//                 }
//               excerpt
//                 date
//                  author {
//                node {
//               firstName
//               lastName
//               name
//               slug
//               description
//             }
//           }
//                 featuredImage {
//                   node {
//                     altText
//                     sourceUrl
//                   }
//                 }
       
//        }
//          } } 
//       } 
//        `,variables:{notIn:notIn} 
      
//       })
      
//       }).then(response => response.json())         
//       .then(data => data.data.posts.edges) 
//       .catch(error => console.error('Error:', error));
//      // const response = wprest?.data.posts.edges
//       return wprest   
  
//   }

 
  
//   export async function top_news_details_all(slug:string){  
 
//      const wprest = fetch('https://content.culturays.com/graphql',{
//   method: 'POST', 
//   headers:{
//   'Content-Type':'application/json'
//   },
//   body: JSON.stringify({
//     query:`
//     query NODE($id: ID!, $idType: PostIdType!) {
//     post(id: $id, idType: $idType) {
//      author {
//         node {
//           name
//           slug
//             avatar {
//           url
//         }
//         }
//       }
//       content
//       date
//       excerpt
//        postnewsgroup {  
//     relatedPosts {
//     edges{
//     node {
//     ... on Post {
//     id
//     content  
//     title
//      slug
//      date
//      content 
//      excerpt
//       author {
//      node {
//        avatar {
//           url
//         }
//       firstName
//       lastName
//      name
//      slug
//       description
//       }
//      }
//       featuredImage { 
//        node {
//        sourceUrl
//          altText
//         }
//      } 
//        tags{
//         nodes{ 
//         id
//         name
//         slug
//         }
//         }
//      categories{
//         nodes{
//         name
//         slug
//         }
//         }
     
//      }  } }
//       }
//     }
//       featuredImage {
//         node {
//           altText
//           sourceUrl
//           caption
//         }
//       }
//       id
//       slug    
//       title
//     tags {
//         nodes {
//          id
//           name
//           slug
//         }  
//       }
//     categories {
//         nodes {
//           name
//           slug
//         }
//       }
//     } 
//       }  
//     ` ,
//     variables:{
//     id: slug,
//     idType: 'SLUG' 
//     }
    
//     })
    
//     }).then(response => response.json())  
//     .then(data => data.data.post)
//        .catch(error => console.error('Error:', error)); 
//           // const response = wprest?.data.post
//            return wprest 
    
//   }
 

//   export async function topCategoriesFeed (){  
//   const wprest = fetch('https://content.culturays.com/graphql',{
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//           query:`
//           query WPPOSTS { 
//          categories {
//          nodes {
//       name
//       slug
//       posts {
//         nodes{ 
//          title
//           slug 
//            author {
//           node {
//             name
//             slug
//           }
//         }
//               tags {
//               nodes {
//                 name
//                 slug
//               }
//             }
//                 postsTags {
//               nodes {
//                 name
//                 slug
//               }
//             }
//           categories{
//           nodes{
//           slug
//           }
//           }
//               featuredImage {
//           node {
//             altText
//             sourceUrl
//           }
//         }
//         }
//       }
//     }
//   }
//     }
//    `  
//     })
        
//         }).then(response => response.json())
//         .then(data => data.data.categories.nodes)
//         .catch(error => console.error('Error:', error));
//        // const response = wprest?.data.categories.nodes
//         return wprest
 
//   } 
 
//   export async function postsFeed (){
   
//   const wprest = fetch('https://content.culturays.com/graphql',{
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//           query:`
//           query WPPOSTS { 
//          categories {
//          nodes {
//       name
//       slug
//       posts {
//         nodes{ 
//          title
//           slug
//           date
//            author {
//           node {
//             name
//             slug
//           }
//         }
//               tags {
//               nodes {
//                 name
//                 slug
//               }
//             }
//                 postsTags {
//               nodes {
//                 name
//                 slug
//               }
//             }
//           categories{
//           nodes{
//           slug
//           }
//           }
//               featuredImage {
//           node {
//             altText
//             sourceUrl
//           }
//         }
//         }
//       }
//     }
//   }
//     }
//    `  
//    })
        
//         }).then(response => response.json())         
//         .then(data => data.data.categories.nodes)
//         .catch(error => console.error('Error:', error));
//         //const response = wprest?.data.categories.nodes
//         return wprest
 
//   }

  
// export async function news__Articles(){  
//  const wprest = fetch('https://content.culturays.com/graphql',{
// method: 'POST', 
// headers:{
// 'Content-Type':'application/json'
// },
// body: JSON.stringify({
// query:`
// query PASSAGENEWS{ 
//    articlesCategories(first:15){
//      nodes{
//     name
//     slug
// articles{
// nodes{ 
// id
// title
//  slug
//  date 
//  excerpt
//   author {
//  node {
//   firstName
//   lastName
//  name
//  slug
//   description
//   }
//  }
//   featuredImage { 
//    node {
//    sourceUrl
//      altText
//     }
//  } 
//    contentTags{
//     nodes{  id
//     name 
//     slug
//     }
//     }
//   articlesCategories{
//     nodes{
//     name 
//     slug
//     }
//     } 
//  newsGroup {  
//  related {  
// nodes {
// ... on Article {
// id
// content  
// title
//  slug
//  date
//  content 
//  excerpt
//   author {
//  node {
//   firstName
//   lastName
//  name
//  slug
//   description
//   }
//  }
//   featuredImage { 
//    node {
//    sourceUrl
//      altText
//     }
//  } 
//    contentTags{
//     nodes{
//      id
//     name
//     slug
//     }
//     }
//  articlesCategories{
//     nodes{
//     name
//     slug
//     }
//     }
 
//  }  } }
 
// }

// }
// }

//   }
// }}
 
//  ` 
// })
// }).then(response =>  response.json())
// .then(data => data.data.articlesCategories.nodes )
//         .catch(error => console.error('Error:', error)) 
//         //const response = wprest?.data.articlesCategories.nodes
//       return wprest
 
// }


// export const livesFeed = async()=>{  
  
//   const wprest = fetch('https://content.culturays.com/graphql',{ 
//     method: 'POST',
//     headers:{ 
//     'Content-Type':'application/json'
//     },
//     body: JSON.stringify({
//       query: `
//        query WPLives {
//        lives {
//        edges{     
//     node {
//     contentTypeName
//     id
//     databaseId
//       date
//       modified
//       excerpt
//       slug
//       title
//      contentTags{
//          nodes{
//          slug
//          name
//          }
         
//          } 
          
//       featuredImage{
//       node{
//       sourceUrl
//       altText
//       }
      
//       }
//     }  }
//   }
//   }
    
//     `
//     })
 
//     }) 
//     .then(response => response.json() )
//     .then(data => data.data.lives.edges)
//     .catch(error => console.error('Error:', error));
//    // const response = wprest?.data.lives.edges 
//      return wprest 
 
//   }