"use server"
export async function newsByLatest(){ 
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: "POST",
      body: JSON.stringify({
        query:`
        query WPPOSTS { 
       categories( where: {name: "Latest"})  { 
          nodes {            
           posts(first: 10) {
            pageInfo {
        endCursor
      }
         edges{
         cursor 
            node{
             id
              title
                slug
                
                tags {
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
          }
                 categories {
                  nodes {
                    name
                    slug
                  }
                }
              excerpt
                date
                 author {
               node {
              firstName
              lastName
              name
              slug
              description
            }
          }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
        
       }
          } }}}
      } 
       ` 
      
      })
      ,
      headers: {
           'Content-Type':'application/json'
          },
    }).then((res) => res.json())
    .then((data)=>data.data)
    .catch((err) => console.log("err", err)) 
  

    const wprestLive = fetch('https://content.culturays.com/graphql',{ 
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `
         query WPLives {
         lives {
         edges{     
      node {
      contentTypeName
      id
      databaseId
        date
        modified
        excerpt
        slug
        title
       contentTags{
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
      }  }
    }
    }
      
      `
      })
   
      }) 
      .then(response => response.json() )
      .then(data => data.data.lives.edges)
      .catch(error => console.error('Error:', error));


      const wprestPost = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        body: JSON.stringify({
          query:`
          query WPPOSTS {
        categories(where: {name: "News"}) {
    nodes {               
          posts(first: 5){
       pageInfo{
        endCursor
      startCursor
      hasNextPage
           }
          edges{
          cursor     
           node{
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
                slug
                description
              }
            }
        }}
  
      }}}
         } ` 
        
        })
        , 
        headers:{
            'Content-Type':'application/json'
        }
        }).then((response) => response.json()) 
        .then((data)=>data.data.categories.nodes)
        .catch((error) => console.error('Error:', error));

const resp =await wprest 
const resp1Live =await wprestLive 
const resp2Post =await wprestPost 
return {resp, resp1Live, resp2Post}
}

  export async function newsViews(){
    const latestPosts=await newsByLatest()  
    const postX = latestPosts?.resp.categories?.nodes.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts?.pageInfo?.endCursor).flat()
  
     const wprest = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:10 ,after:"${postX[0]}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
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
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
                   author {
                 node {
                firstName
                lastName
                name
                slug
                description
              }
            }
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
       
         }
           }  } 
        } 
         ` 
        
        })
        
        }).then(response => response.json()  )
        .then(data =>  data.data?.posts) 
        .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data?.posts
        return wprest
  }
  
  export async function sidePlusViews(){
    const latestPosts=await newsViews() 
     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:10 ,after:"${latestPosts.pageInfo.endCursor}", where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
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
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
                   author {
                 node {
                firstName
                lastName
                name
                slug
                description
              }
            }
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
       
         }
           }  } 
        } 
         ` 
        
        })
        
        }).then(response => response.json())
        .then(data =>  data.data?.posts?.edges) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
       
  return wprest
  }

  export async function postsOutline (){
    
    const wprest = fetch('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query OUTLINEPOST{
         outlines(first: 1) {
       nodes {
         content
         featuredImage{
         node{
         sourceUrl
         altText
         }
         }
         outlineGroup {
           outlineVideos {
             node {
               altText
               caption
               date
               title
                mediaItemUrl
               slug
             }
           }
         }
       }
           } } ` 
           
           })
           
           }).then(response => response.json())
           .then(data => data.data?.outlines?.nodes)        
           .catch(error => console.error('Error:', error));
           //const response = wprest?.data?.outlines?.nodes 
           return wprest
      
     }