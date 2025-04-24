
export async function newsbyNewOnCategory(notIn:string[]){ 
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json' 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {
      netflixCategories(where: {name: "New on Netflix"}) {
         edges {
      node {
        name
        slug 
        naijaOnNetflix(where:{notIn:$notIn}) {
        edges{
        cursor
          node {
            contentTypeName
            title
            slug
           excerpt
            id
            date
            content
            author{
            node{
            name
            slug
            avatar{
            url
            }
            }
            }
             featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                } 
               contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
           
            netflixNewsGroup {
              netflixEmbeds
              genre
              filmTitle
              embedText
              director
              cast
            }
         
          }
        }
      }}
 
}
    
  }
    
       }  
       ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response => response.json())
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));
      const response = wprest
      return wprest
}

export async function newsbyComingtoCategory(notIn:string[]){
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
       
       
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {
      netflixCategories(where: {name: "Coming to Netflix"}) {
         edges {
      node {
        name
        slug
         children {
         edges{
         cursor
        node {
          name
          slug
          naijaOnNetflix(first:50) {
          edges{         
            node {
              contentTypeName
              title
           slug
           excerpt
            id
            date
            content
                author{
            node{
            name
            slug 
             avatar{
            url
            }
            }
            }
              featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                  contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }

            }
          }
        }
      }}}
        naijaOnNetflix(where:{notIn:$notIn}) {
        edges{
        cursor
          node {
            title
            slug
           excerpt
            id
            date
            content
                author{
            node{
            name
            slug 
             avatar{
            url
            }
            }
            }
              featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
                  contentTags { 
                  nodes {
                    name
                    slug
                  } 
              }
              netflixCategories { 
                  nodes {
                    name
                    slug
                  } 
              }
         
            netflixNewsGroup {
              netflixEmbeds
              genre
              filmTitle
              embedText
              director
              cast
            }
         
          }
        }
      }
    }
       }  }}

       ` ,variables:{notIn:notIn}
      
      })
      
      }).then(response => response.json()) 
      .then(data =>data?.data.netflixCategories.edges) 
      .catch(error => console.error('Error:', error));
      const response = wprest
      return wprest 
}  

export async function addedOnCategory(){
  const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        addedOnNetflixNaijas(first: 100) {
    edges {
      node {
        title
        slug
        date
        excerpt
         id
  content
    contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
             addednewsgroup {
              netflixEmbeds
              genre
              filmTitle 
              director
              cast
                 creators
            }
      }
    }
      
  }
         addedCategories {
           edges {
      node {
        name
        slug  
          addedOnNetflixNaijas(first: 100, where: {orderby: {field: MENU_ORDER, order: DESC}}) {
          nodes {
            title
            slug
           excerpt
            id
            date
            content
           
               contentTags{
                     nodes{
                     name
                     slug
                     }
                     }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
       
            addednewsgroup {
              netflixEmbeds
              genre
              filmTitle 
              director
              cast
                 creators
            }
         
          }
        }
      }}}
     }
       ` 
      
      }) 
      
      })
      .then(response => response.json())   
      .then(data =>data?.data) 
      .catch(error => console.error('Error:', error));
      const response = wprest
      return response
}

 export async function readNext(after:string){
 const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
       
       
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query NEXTPOSTS($after: String!){
    naijaOnNetflix(first:4,after:$after) {
    edges {
      node {
        title
        slug
        date
        contentTags{
        nodes{
        name
        slug
        }
        }
          netflixCategories { 
          nodes {
            name
            slug
          }
        }
    
        author{
        node{
        name
        slug
        }
        }
        featuredImage {
          node {
            altText
            sourceUrl
            caption
          }
        }
      }
    }
  }
    }
      `,
      variables: { after: after },
    
    
    })}).then(response => response.json())  
      .then(data =>data?.data.naijaOnNetflix.edges) 
      .catch(error => console.error('Error:', error));
      const response = wprest
     return response

 } 

export async function netflixDetails(slug:string){ 
    try{
     const wprest = fetch('https://content.culturays.com/graphql',{
  method: 'POST',
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
  query:`
  query POSTTYPE($id: ID!, $idType: NetflixNaijaIdType) {
   netflixNaija(id: $id, idType:$idType) {
   id
    slug
    title
    excerpt 
    slug 
    contentTypeName
    contentTags {
      nodes {
        slug
        name
      }
    }
    netflixCategories {
      nodes {
        name
        slug
      }
    }
  featuredImage {
                  node {
                    altText
                    sourceUrl
                    date
                    caption
                  }
                }
    date
    content
    author {
      node {
        name 
        slug
        avatar{
            url
            }
      }
    }
     netflixNewsGroup {
      intro
      netflixEmbeds
      
      netflixNewRelated {
       edges {
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
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
            }
              }
            }
          }
        }
      
      
      
      }
      
      
      }  
     netflixComingRelated {
       edges {
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
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
            }
              }
            }
          }
        }
  }}
        netflixNewsRelated {
        nodes {
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
                    date
                    caption
                  }
                }
            contentTags {
              nodes {
                name
                slug
              }
            }
            netflixCategories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                name
                slug
                  avatar{
            url
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
  idType: 'URI'   
  }
  
  })
  
  }).then(response => response.json())   
    .then(data =>data?.data.netflixNaija) 
    .catch(error => console.error('Error:', error));
const response = wprest
return wprest
    } catch (error) {
       console.error('Error fetching data:', error); 
     } 
  }

  export async function fullListNew(){
    const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST',        
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
fullListNetflixNaijas(first: 1) {
  edges{
      node {
         slug
              title
              id
              excerpt
              date
              content 
                   } 
                  }
              } }
 `   })
        
        }).then(response =>  response.json())   
        .then(data =>data?.data.fullListNetflixNaijas.edges) 
        .catch(error => console.error('Error:', error));
        const response = wprest
       return wprest
  }

  export async function whatToWatch() {
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS { 
 whatsToWatch(first: 1) {
    edges {
      node {
         slug
              title
              id
              excerpt
              date
              content 
                 featuredImage {
                node {
                  altText
                  sourceUrl
                  
                }
              }
         author{
      node{
      name
      }}
  
      }
    }
    }
    }
       ` 
      
      })
      
      }).then(response => response.json())  
      .then(data =>data?.data.whatsToWatch.edges) 
      .catch(error => console.error('Error:', error));
       const response = wprest
       return wprest
  }


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

  export const aniticipatedNollywood = async () => { 
 const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
      query WPPOSTS   { 
      mostAnticpatedNollywoods (first:1 ){
    nodes {
      content
      title
    }
  }
     
 }`
      }
  )}

).then(response => response.json())   
    .then(data =>data?.data.mostAnticpatedNollywoods.nodes) 
    .catch(error => console.error('Error:', error));     
  const res_naija = wprest
  return wprest 
}


export const aniticipatedAfrica = async () => { 
  const wprest = fetch('https://content.culturays.com/graphql',{
       method: 'POST',
       headers:{
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query:`
       query WPPOSTS   { 
       mostAnticpatedAfricans(first:1 ){
     nodes {
       content
       title
     }
   }
      
  }`
       }
   )}
 
 ).then(response => response.json())   
     .then(data =>data?.data.mostAnticpatedAfricans.nodes) 
     .catch(error => console.error('Error:', error));     
   const res_naija = wprest
   return res_naija 
 
 
 } 


 export const aniticipatedForeign = async () => {  

  const wprest = fetch('https://content.culturays.com/graphql',{
       method: 'POST', 
       headers:{
       'Content-Type':'application/json'
       },
       body: JSON.stringify({
         query:`
       query WPPOSTS   { 
       mostAnticpatedForeigns(first:1 ){
     nodes {
       content
       title
     }
   }
      
  }`
       }
   )}
 
 ).then(response => response.json())   
     .then(data =>data?.data.mostAnticpatedForeigns.nodes) 
     .catch(error => console.error('Error:', error));     
   const res_naija = wprest
   return wprest  
 }