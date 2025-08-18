
  export async function netflixNews() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',      
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "News"}) {
    edges {
      node {
      name
      slug         
          naijaOnNetflix(first:250) { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  } 
   netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
     ` 
      
      })
      
      }).then(response => response.json()) 
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));     
      const response = wprest
      return wprest
  }
  
  
 export async function netflixNewsDets(slug:string){ 
    try{
     const wprest = fetch('https://content.culturays.com/graphql',{
  method: 'POST',
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
  query:`
  query NETFLIXNEWS($id: ID!, $idType: NetflixNaijaIdType) {
  netflixNaija(id: $id, idType: $idType) {
      title
    id
    excerpt
    slug
    contentTags {
      nodes {
        slug
        name
      }
    }
    featuredImage {
      node {
         caption
        sourceUrl
        altText
      }
    }
    date
    content
    author {
      node {
        name
      }
    }
         netflixNewsGroup {
      intro
      netflixEmbeds
      netflixNewsRelated {
      edges{
      cursor
        node{
          ... on NetflixNaija {
            id
            date
            content
            excerpt
            slug
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           contentTags {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
 netflixCategories {
      nodes {
        name
        slug
         children {
          nodes {
            name
            naijaOnNetflix {
             edges{
              node { 
              slug
                title
                excerpt
                content
                date
                   author{
                      node{
                      name
                      }
                      }
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                  }
                } 
              }}
            }
          }
        }
        naijaOnNetflix {
          nodes {
            content
            date
            id
            title
            excerpt 
             slug
               author{
                node{
                name
                }
                }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           contentTags {
              nodes {
                name
                slug
              }
            }
             netflixNewsGroup {
              netflixNewsRelated {
                edges {
                  node {
                    date
                    id
                    slug
                    ... on NetflixNaija {
                      id
                      content
                      title
                      slug
                    }
                  }
                }
              }
            }


          }
        }
      }
    } 
  }
    
  }   
  ` ,
  variables:{
  id: slug,
  idType: 'SLUG' 
  }
  
  })
  
  }).then(response =>  response.json()) 
    .then(data =>data?.data.netflixNaija ) 
    .catch(error => console.error('Error:', error));
    const response = wprest
    return wprest
    } catch (error) {
       console.error('Error fetching data:', error); 
     } 
  }
  export async function nextNetflixNews(notIn:string[]){
    try{
     const wprest = fetch('https://content.culturays.com/graphql',{
  method: 'POST',  
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
  query:`
  query NETFLIXNEWS($notIn:[ID]) {
    netflixCategories(first:20, where: {slug: "news"}) {
      nodes {
        name
        slug
       
         children {
          nodes {
            name
            naijaOnNetflix{
             edges{
              node { 
                id
              slug
                title
                excerpt
                content
                date
                   author{
                      node{
                      name
                      }
                      }
                 netflixNewsGroup { 
                  netflixEmbeds
                    genre
                  director
                  cast
                  filmTitle
                }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                  }
                } 
              }}
            }
          }
        }
        naijaOnNetflix(first:50, where:{notIn: $notIn }) {
          nodes {
            content
            date
            id
            title
            excerpt 
             slug
               author{
                node{
                name
                }
                }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
           contentTags {
              nodes {
                name
                slug
              }
            }
             netflixNewsGroup {
              netflixNewsRelated {
                edges {
                  node {
                    date
                    id
                    slug
                    ... on NetflixNaija {
                      id
                      content
                      title
                      slug
                    }
                  }
                }
              }
            }


          }
        }
      }
    } 
  }
  `,variables:{
    notIn:notIn
  }
  
  })
  
  }).then(response =>  response.json())   
    .then(data =>data.data.netflixCategories.nodes) 
    .catch(error => console.error('Error:', error));
    const resp = wprest
    return wprest
    } catch (error) {
       console.error('Error fetching data:', error); 
     } 
  } 
  
  export async function netflixInter() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "International"}) {
    edges { 
      node {
      name
      slug 
        naijaOnNetflix(first: 2) {
             pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      } 
       ` 
      
      })
      
      }).then(response => response.json())  
      .then(data =>data?.data.netflixCategories) 
      .catch(error => console.error('Error:', error));     
     const response= wprest
     return wprest
  }


  export async function netflixNigNaija() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',       
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Naija"}) {
    edges { 
      node {
      name
      slug      
      naijaOnNetflix(first:2) {
         pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
          nodes { 
          id
            slug
            title
            date
            excerpt
            
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` 
      
      })
      
      }).then(response => response.json())  
      .then(data =>data?.data.netflixCategories ) 
      .catch(error => console.error('Error:', error));     
      const response= wprest
      return wprest
  }

  export const fetchNew  = async (first:number, after:string ) => { 
    const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST',    
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS($first: Int, $after: String) { 
     netflixCategories(where: {name: "Naija"}) {
    edges { 
      node {
      name
      slug         
          naijaOnNetflix(first:$first, after: $after){
           pageInfo {
                hasNextPage
                endCursor
              }
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` ,
        variables: { first: first, after: after }, 
      
      })
      
      }).then(response => response.json())   
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));     
    const res_naija = wp_naija
    return wp_naija
  }


 export const fetchNewInter = async (first:number, after:string ) => {  
  const wp_naija = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query:`
    query WPPOSTS($first: Int, $after: String) { 
   netflixCategories(where: {name: "International"}) {
  edges { 
    node {
    name
    slug         
       {
         pageInfo {
              hasNextPage
              endCursor
            }
        nodes { 
        id
          slug
          title
          date
          excerpt 
           featuredImage {
              node {
                altText
                sourceUrl 
              }
            }
       author{
    node{
    name
    }
    }
netflixNewsGroup { 
intro 

}  netflixCategories {
            nodes {
              slug
              name
            }
          }
          contentTags{
            nodes{
            name
            slug
            }
            }
        }
      }
    }
            
}
      }
    }
 
  
     ` ,
      variables: { first: first, after: after }, 
    
    })
    
    }).then(response => response.json())   
    .then(data =>data?.data.netflixCategories.edges) 
    .catch(error => console.error('Error:', error));     
  const res_naija = wp_naija
  return wp_naija
}

  export async function netflixAfrica() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Africa"}) {
    edges {
      node {
      name
      slug         
          naijaOnNetflix(first:20)  { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` 
      
      })
      
      }).then(response => response.json())   
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));     
      const response = wprest
      return wprest
  }
  export async function netflixPopular() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',  
       
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 netflixCategories(where: {name: "Popular"}) {
    edges {
      node {
      name
      slug         
          naijaOnNetflix(first:20) { 
          nodes { 
          id
            slug
            title
            date
            excerpt 
             featuredImage {
                node {
                  altText
                  sourceUrl 
                }
              }
         author{
      node{
      name
      }
      }
  netflixNewsGroup { 
  intro 
  
  }  netflixCategories {
              nodes {
                slug
                name
              }
            }
            contentTags{
              nodes{
              name
              slug
              }
              }
          }
        }
      }
              
  }
        }
      }
   
    
       ` 
      
      })
      
      }).then(response => response.json() )  
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));     
      const response = wprest
      return wprest
  }
 