"use server"

export async function newchars(){ 
  
  try {
    const wprest =fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChars {
           naijaWikis(last: 200) {
                nodes {
                  content
                  excerpt
                  title
                   id
                  slug
                  date
                  
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
          naijaWikis {
              nodes {
                date
                excerpt
                id
                title
                slug
              }
            }
          }
        }
        charactertitles{  
          series
          movie
          shorts
          portrayedby
          genre
          filmname
          filmDirector
          actorsUpcomingMovie
          releaseDate
          country
          characterWiki
          charBios
          actorsBios
          actorWiki
          filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
          filmFamilyAbout
           actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          charRel {
            edges {
              node {
                ... on NaijaWiki { 
              id
              slug
              title
              excerpt
              content 
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
              charactertitles {
                shorts
                series
                portrayedby
                movie
                genre
                actorsUpcomingMovie
                filmname
                filmDirector
                characterWiki
                actorWiki
              }
                }
              }
            }
          }
          filmImg1 {
            node{
              altText
           sourceUrl
           }
          }
          filmImg2 {
            node{
               altText
            sourceUrl
            }
           
          }

          actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          
        } }}

         }  
         ` 
        
        })
        
        }).then(response => response.json())  
       .then(data =>data?.data.naijaWikis.nodes) 
       .catch(error => console.error('Error:', error));
       const response = wprest
       return wprest
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
} 
 
export async function relatedChars(){ 
  
  try {
    const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChars {
            naijaWikis(first:6) {
                nodes {
                  content
                  excerpt
                  title
                   id
                  slug
                  date
                  
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
          naijaWikis {
              nodes {
                date
                excerpt
                id
                title
                slug
              }
            }
          }
        }
        charactertitles{  
          series
          movie
          shorts
          portrayedby
          genre
          filmname
          filmDirector
          actorsUpcomingMovie
          releaseDate
          country
          characterWiki
          charBios
          actorsBios
          actorWiki
          filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
          filmFamilyAbout
         
          charRel {
            edges {
              node {
                ... on NaijaWiki {
                  id
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
              id
              slug
              title
              excerpt
              content
              charactertitles {
                shorts
                series
                portrayedby
                movie
                genre
                actorsUpcomingMovie
                filmname
                filmDirector
                characterWiki
                actorWiki
              }
                }
              }
            }
          }
          filmImg1 {
            node{
              altText
           sourceUrl
           }
          }
          filmImg2 {
            node{
               altText
            sourceUrl
            }
           
          }

          actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          
        } }}

         }  
         ` 
        
        })
        
        }).then(response => response.json())  
       .then(data =>data?.data.naijaWikis.nodes) 
       .catch(error => console.error('Error:', error));
      
        return wprest 
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
} 

export async function newcharCall(slug:string){
 
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChar($id: ID!, $idType: NaijaWikiIdType){
            naijaWiki(id: $id, idType:$idType) {
              id
              date               
             featuredImage {
                        node {
                          sourceUrl
                          altText
                          caption
                       
                      }
                 }
                  charactertitles { 
                    actorImgs {
                      node{
                         altText
                      sourceUrl
                       caption
                      }
                     
                    }
                    actorImgs2 {
                      node{
                        altText
                     sourceUrl
                      caption
                     }
                    }
                    actorWiki
                    actorsBios
                    charBios
                    filmImg1{
                    node{
                      altText
                      sourceUrl
                      caption
                    }
                    }
                    releaseDate
                    characterWiki
                    country
                    filmDirector
                    filmname
                    genre
                    filmFamily
                    filmFamilyAbout 
                    portrayedby
                    series
                    characterOtherName
                  }
                  title
                  slug
                  contentTags {
                    nodes {
                      slug
                      name
                      naijaWikis {
                        nodes {
                          title
                          slug
                        }
                      }
                    }
                  }
                  charCategories {
                    nodes {
                      name
                      slug
                      naijaWikis {
                        nodes {
                          date
                          excerpt
                          title
                          slug
                        }
                      }
                    }
                  }
                  excerpt 
                  content 
                }
              } 
         ` 
         ,
     variables:{
       id: slug,
       idType: 'SLUG'
     }
        })
        
        })
    
    .then(response => response.json())  
    .then(data =>data?.data.naijaWiki) 
    .catch(error => console.error('Error:', error)); 
    const response = wprest
    return wprest 
} 
export async function charsFilms(findString: string){ 
 if (typeof findString !== 'string') return; 
  const clearString = findString.toLowerCase().trim().split('-').splice(0,2 ).join(' ');

  try {
    const wprest =fetch('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query: `
          query WPChars($search: String) {
          contentTags(where: {search:$search}) {
    nodes {
           naijaWikis{
                nodes {
                  content
                  excerpt
                  title
                   id
                  slug
                  date
                  
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
          naijaWikis {
              nodes {
                date
                excerpt
                id
                title
                slug
              }
            }
          }
        }
        charactertitles{  
          series
          movie
          shorts
          portrayedby
          genre
          filmname
          filmDirector
          actorsUpcomingMovie
          releaseDate
          country
          characterWiki
          charBios
          actorsBios
          actorWiki
          filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
          filmFamilyAbout
           actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          charRel {
            edges {
              node {
                ... on NaijaWiki { 
              id
              slug
              title
              excerpt
              content 
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
              charactertitles {
                shorts
                series
                portrayedby
                movie
                genre
                actorsUpcomingMovie
                filmname
                filmDirector
                characterWiki
                actorWiki
                 filmAbout
          characterOtherName
          prequel
          sequel
          filmProducer
          filmMedia
          filmFamily
              }
                }
              }
            }
          }
          filmImg1 {
            node{
              altText
           sourceUrl
           }
          }
          filmImg2 {
            node{
               altText
            sourceUrl
            }
           
          }

          actorImgs {
            node{
              altText
           sourceUrl 
            }
           
        }
        actorImgs2 {
          node{
             altText
           sourceUrl   
          }
          
        }
          
        } }}

        } }}
         ` , variables:{
          search: clearString.replace(/-/g, ' ')
         }
        
        })
        
        }).then(response => response.json())  
       .then(data =>  data?.data.contentTags.nodes )
       .catch(error => console.error('Error:', error));
       const response = wprest
       return wprest
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
} 
export const contentFeed = async()=>{  
  const wprest =fetch('https://content.culturays.com/graphql',{
     method: 'POST',
     headers:{ 
     'Content-Type':'application/json'
     },
     body: JSON.stringify({
       query: `query CONTENTFEED{
     contentNodes(first:100) {
     nodes {
       date
       contentTypeName
        ... on NetflixNaija {
         id
         title
         slug
          author {
         node {
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
       } 

           ... on Live {
          id
           databaseId
         title
         slug
       featuredImage {
         node {
           altText
           sourceUrl
         }
       }
         author {
         node {
         name
           slug
         }
     }
         }
       ... on Technology {
          id
         title
         slug
         author {
         node {
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
       }   ... on Video {
          id
         title
         slug
         excerpt
         author {
         node {
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
       }   ... on Post {
          id
         title
         slug
         author {
         node {
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
       }   ... on Nollywood {
          id
         title
         slug   
         author {
         node {
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
       }    ... on Article {
          id
         title
         slug  
          author {
         node {
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
       }    ... on Society {
         id
         title
         slug   
         author {
         node {
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
       }  ... on Health {
         id
         title
         slug 
          author {
         node {
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
       }  ... on Economy {
         id
         title
         slug 
          author {
         node {
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
       }  ... on Trending {
         id
         title
         slug 
          author {
         node {
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
       }  ... on Environment {
         id
         title
         slug 
          author {
         node {
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
       } 
       
        ... on Char {
         id
         title
         slug 
          author {
         node {
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
       } 
       ... on Business {
         id
         title
         slug 
          author {
         node {
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
       }  
     }
   }
       
       }`})
     
     }).then(response => response.json())   
     .then(data => data.data.contentNodes.nodes )
     .catch(error => console.error('Error:', error));
    // const response = wprest?.data.contentNodes.nodes 
     return wprest 
 
 }


 export const vids = async()=>{  
 
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `
       query WPVIDEOS {
      videos { 
    nodes {
      videosGroup {
        videoUrl {
          node {
            title
            slug
            mediaItemUrl
            date
            altText
          }
        }
          related{
          nodes{
          ... on Video{
          id
           title
          slug
          }
         
          }
          }
      }
      content 
      date
      excerpt
      slug
      title
        contentTags{
         nodes{
         slug
         name
         }
         
         } 
         videoCategories{
         nodes{
         slug
         name
         }
         
         }   
      featuredImage{
      node{
      sourceUrl
      altText
      }
      
      }
    }
  }
    }
    `
    })
 
    }) 
    .then(response => response.json())   
    .then(data => data.data.videos.nodes)
    .catch(error => console.error('Error:', error));
   // const response = wprest?.data.videos.nodes 
    return wprest 
 
  }