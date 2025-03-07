"use server"
import { agent, fetchWithRetry } from "@/utils/fetchWithRetry";
 
export async function newsByLatest(){
  try{

 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
         timeout: 5000 ,
         agent: agent,
        headers:{
            'Content-Type':'application/json'
        },
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
        
        
        })  
        .then(response =>  response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data   
        return response
  }catch(error){
    console.log(error)

  }
   
  }
  export async function newsViews(){
    const latestPosts=await newsByLatest() 
    const postX = latestPosts?.categories?.nodes.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts?.pageInfo?.endCursor).flat()
 
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
        
        }).then(response => response)    
        .then(data =>data) 
        .catch(error => console.error('Error:', error)); 
        const response = wprest?.data?.posts
        return response
    }catch(error){ 
      if(error)throw new Error('Error fetching data')
    }
  
  }
  
  export async function sidePlusViews(){
    const latestPosts=await newsViews()  
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
        
        }).then(response => response)    
        .then(data =>data) 
        .catch(error => console.error('Error:', error)); 
        const response = wprest?.data?.posts?.edges
        return response
    }catch(error){ 
      if(error)throw new Error('Error fetching data')
    }
  
  }
 
   export async function postCategories (){

    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
        
        }).then(response => response)     
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data
        return response
    }catch(error){
      return error
      if(error)throw new Error('Error fetching data')
    }
 
  } 

  export async function categoriesUnusedPosts (notIn:string[] ){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
      
      }).then(response => response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
     const response = wprest?.data
     return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }
 
  

  export async function postNextCategories (notIn:string[]){ 
 
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify({
             query:`
             query WPPOSTS($notIn:[ID]){ 
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
         posts(where: {notIn:$notIn} ) { 
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
       } `, variables:{notIn:notIn} 
           
           })
           
           }).then(response =>response)
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
           const response = wprest?.data
           return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
     } 
export async function newsPosts(){ 
  try{
   const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{
            'Content-Type':'application/json'
        },
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
        
        }).then(response =>response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const resp = wprest.data.categories.nodes
        return resp
  }catch(error){
    console.log(error)
    //if(error)throw new Error('Error fetching data')
  }
 
  }   
   
  export async function nextNewsPosts(){
    const latestPosts=await newsPosts() 
    const postX = latestPosts.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts.pageInfo.endCursor).flat() 
 
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
       posts(after:"${postX[0]}",first:20 ){ 
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
              nodes {  id
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
      
      }).then(response =>  response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }
  export async function postsOutline (){
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
        
        }).then(response => response)      
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data?.outlines?.nodes 
        return response
    }catch(error){ 
      if(error)throw new Error('Error fetching data')
    }

  }
 
  export async function postLastAndScrolledCategories (string:string[]){
    try{
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
           
           }).then(response => response)    
           .then(data =>data) 
           .catch(error => console.error('Error:', error));
           const response = wprest?.data.categories.edges 
           return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
   
     }

  export const fetchNewPosts = async (first:number, after:string, exclude:string[]) => {
    // const postsXData= await newsPosts()
    // const postData= postsXData.map((xy:{posts:{edges:[]}})=> xy.posts.edges).flat()
    try{
const wp_naija = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
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
      
      }).then(response => response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));     
      const res_naija = wp_naija?.data 
      return res_naija
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
    
  }

  export async function newsDetailData(slug:string){ 
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
  method: 'POST',
  timeout: 5000 ,
  agent: agent,
  headers:{
  'Content-Type':'application/json' 
  },
  body: JSON.stringify({
  query:`
  query NODE($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
       author {
      node {
        name
        slug
        avatar{
        url
        }
      }
    }
    content
    date
    excerpt
     postnewsgroup { 
       heroImage {
        node {
          altText
          caption
          sourceUrl
        }
      } 
  relatedPosts {
  edges{
  cursor
  node {
  ... on Post {
  id
  content  
  title
   slug
   date
   content 
   excerpt
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
     sourceUrl
       altText
      }
   } 
     tags{
      nodes{
       id
      name
      slug
      }
      }
   categories{
      nodes{
      name
      slug
      }
      }
  }
   }  } }
   
  }
    featuredImage {
      node {
        altText
        sourceUrl
        caption
      }
    }
    id
    slug    
    title
  tags {
      nodes {
      id
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
  
  } 
    }  
  ` ,
  variables:{
  id: slug,
  idType: 'SLUG' 
  }
  
  })
  
  }).then(response => response)  
         .then(data =>data) 
         .catch(error => console.error('Error:', error)); 
         const response = wprest?.data.post
         return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
  }
    
 
  export async function sidePanelNewsItems(){
    try{
const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts(first:5, where: {categoryName: "Opinions"}) {
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
       
                postsTags {
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
         } } 
      } 
       ` 
      
      })
      
      }).then(response => response)    
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
       const response = wprest?.data.posts.edges
       return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
    
  }

  export async function sideBarNewsItems(notIn:string[]){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($notIn:[ID]) {                  
           posts(first:10, where: {categoryName: "Opinions", notIn:$notIn}) {
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
              postsTags {
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
         } } 
      } 
       `,variables:{notIn:notIn} 
      
      })
      
      }).then(response => response)     
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.posts.edges
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }

  export async function altPageNewsItems(){
    const txPosts=await sidePanelNewsItems()
    const postX = txPosts?.map((xy:{posts:{pageInfo:{endCursor:string}}})=> xy.posts.pageInfo.endCursor).flat()
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {                  
           posts(where: {categoryName: "Opinions" },after:"${postX[0]}") {
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
                     
                postsTags {
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
         } } 
      } 
       ` 
      
      })
      
      }).then(response => response)      
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response =wprest?.data.posts.edges
      return response
    }catch(error){
      if(error)throw new Error('Error fetching data')
    }
  
  }

  export async function businessBlog(){
    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent, 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          businesses  {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
           businessCategories {
              nodes {
                name 
                slug
                 businesses  {
          nodes {
            title
            slug
             date
             content
             id
             excerpt
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            
            
            }}
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
         `  
        })
        
        }).then(response =>  response)  
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
         const response = wprest?.data.businesses.nodes
         return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
  }   
  
  export async function techBlog(){
    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          technologies {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            techCategories {
              nodes {
                name
                slug
                  technologies {
          nodes {
            title
            slug
             date
             content
             id 
             excerpt
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            } 
            
            }}
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
         `  
        })
        
        }).then(response => response) 
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
          const response = wprest?.data.technologies.nodes
          
         return response  
   
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
   

  } 
  
  
  export async function economyBlog(){

    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          economies {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
          economyCategories {
              nodes {
                name
                slug
                  economies {
          nodes {
            title
            slug
             date
             content
             id 
             excerpt
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          
            
            }}
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
         `  
        })
        
        }).then(response =>  response)  
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
         const response = wprest?.data.economies.nodes
         return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
   
  } 
  
  
  export async function healthBlog(){
    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          healths {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            healthCategories {
              nodes {
                name
                slug
                  healths {
          nodes {
            title
            slug
             date
             content
             id
              excerpt
            contentTags {
              nodes {
                name
                slug
              }
            }
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
         `  
        })
        
        }).then(response => response) 
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
          const response = wprest?.data.healths.nodes
          
         return response  
   
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
  } 
  export async function environmentBlog(){
    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          environments {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            environmentCategories {
              nodes {
            name
            slug
              environments {
          nodes {
            title
            slug
             date
             content
             id
              excerpt
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            
            }}
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
         `  
        })
        
        }).then(response => response) 
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
          const response = wprest?.data.environments.nodes
          
         return response  
   
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }

  } 
  export async function societyBlog(){
    try{
      const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        timeout: 5000 ,
        agent: agent,
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          societies {
          nodes {
             contentTypeName
            title
            slug
             date
             content
             id
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            societyCategories {
              nodes {
                name
                slug
                 societies {
          nodes {
            title
            slug
             date
             content
             id
              excerpt
             contentTags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            excerpt
            
            }}
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
         `  
        })
        
        }).then(response => response) 
         .then(data =>data) 
         .catch(error => console.error('Error:', error));
          const response = wprest?.data.societies.nodes        
         return response  
   
    } catch (error) {
      if(error)throw new Error('Error fetching data')
    
     }
   
  } 
  
  export async function top_news_details_all(slug:string){  
    try{
     const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
  method: 'POST',
  timeout: 5000 ,
  agent: agent,
  headers:{
  'Content-Type':'application/json'
  },
  body: JSON.stringify({
    query:`
    query NODE($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
     author {
        node {
          name
          slug
            avatar {
          url
        }
        }
      }
      content
      date
      excerpt
       postnewsgroup {  
    relatedPosts {
    edges{
    node {
    ... on Post {
    id
    content  
    title
     slug
     date
     content 
     excerpt
      author {
     node {
       avatar {
          url
        }
      firstName
      lastName
     name
     slug
      description
      }
     }
      featuredImage { 
       node {
       sourceUrl
         altText
        }
     } 
       tags{
        nodes{ 
        id
        name
        slug
        }
        }
     categories{
        nodes{
        name
        slug
        }
        }
     
     }  } }
      }
    }
      featuredImage {
        node {
          altText
          sourceUrl
          caption
        }
      }
      id
      slug    
      title
    tags {
        nodes {
         id
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
    } 
      }  
    ` ,
    variables:{
    id: slug,
    idType: 'SLUG' 
    }
    
    })
    
    }).then(response => response)  
           .then(data =>data) 
           .catch(error => console.error('Error:', error)); 
           const response = wprest?.data.post
           return response
      } catch (error) {
        if(error)throw new Error('Error fetching data')
      
       }
    
  }
 

  export async function topCategoriesFeed (){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
         categories {
         nodes {
      name
      slug
      posts {
        nodes{ 
         title
          slug 
           author {
          node {
            name
            slug
          }
        }
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
          categories{
          nodes{
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
  }
    }
   `  
    })
        
        }).then(response => response)     
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data.categories.nodes
        return response
    }catch(error){
      return error
      if(error)throw new Error('Error fetching data')
    }
 
  } 
 
  export async function postsFeed (){
    try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS { 
         categories {
         nodes {
      name
      slug
      posts {
        nodes{ 
         title
          slug
          date
           author {
          node {
            name
            slug
          }
        }
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
          categories{
          nodes{
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
  }
    }
   `  
   })
        
        }).then(response => response)      
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data.categories.nodes
        return response
    }catch(error){
      return error
      if(error)throw new Error('Error fetching data')
    }
 
  }

export async function awardsBlog(){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        awards(first:100) {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
        awardCategories {
            nodes {
              name
              slug
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
       `  
      })
      
      }).then(response =>response)
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.awards.nodes
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
} 
export async function nollywoodBlog(){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS {
        nollywoods(last:100 ) {
        nodes {
           contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         nollywoodCategories {
            nodes {
              name
              slug
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
       `  
      })
      
      }).then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.nollywoods.nodes        
       return response  
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
}  
export async function news_details_all(uri:string){  
  try{
   const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
method: 'POST',
timeout: 5000 ,
agent: agent,
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: ContentNodeIdTypeEnum!) {
contentNode(id: $id, idType: $idType) {  
    id
    uri
    contentTypeName 
      ... on Business {
      id
      title
      slug
      excerpt
      content
      contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Business {
                id
                content
                title
                slug
                 contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                businessCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
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
    ... on Award {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Award {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                awardCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
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
    ... on Nollywood {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Nollywood {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                nollywoodCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
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

    ... on Article {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Article {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                articlesCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
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
    ... on Economy {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Economy {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                economyCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Environment {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Environment {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                environmentCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Society {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Society {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                societyCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Health {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
            avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Health {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                healthCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on Technology {
      id
      title
      slug
      excerpt
      content
         contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                     techCategories {
                  nodes {
                    name
                    slug
                  }
                }
      featuredImage {
        node {
          altText
          caption
          sourceUrl
        }
      }
      date
      author {
        node {
          name
          slug
          avatar{
          url
          }
        }
      }
      newsGroup {
        related {
          edges {
            node {
              date
              id
              ... on Technology {
                id
                content
                title
                slug
                   contentTags{
                  nodes {
                    name
                    slug
                  }
                }
                      techCategories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    altText
                    caption
                    sourceUrl
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
id: uri,
idType: 'URI' 
}

})

}).then(response => response)    
       .then(data =>data) 
       .catch(error => console.error('Error:', error)); 
      const response = wprest?.data.contentNode
      return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
  
}
export async function trends(){ 
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      timeout: 5000 ,
      agent: agent,
      headers:{ 
      'Content-Type':'application/json', 
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS{
        trends(first:100) {
        nodes {
         contentTypeName
          title
          slug
           date
           content
           id
           contentTags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          excerpt
         trendingCategories {
            nodes {
              name
              slug
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
       `
      })
      
      }).then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
       const response = wprest?.data.trends.nodes 
       return response 
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
}

export async function trending(slug:string){  
  try{
   const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
method: 'POST',
timeout: 5000 ,
agent: agent,
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query TREND($id: ID!, $idType: TrendingIdType) {
trending(id: $id, idType: $idType) {
id
    title
    slug
    date
    content
    excerpt   
       featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
             trendinggroup {
      intro
      related(first: 20 ) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
    contentTags {
      nodes {
        trends(first: 20) {
          nodes {
          id
            slug
            title
            content 
            excerpt
            date
          trendinggroup {
      intro
      related(first: 20) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
                featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
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

}).then(response => response) 
       .then(data =>data) 
       .catch(error => console.error('Error:', error));
      const response = wprest?.data.trending 
       return response 
 
  } catch (error) {
    if(error)throw new Error('Error fetching data')
  
   }
 
}

export async function similarTrending(notIn:string[]){
  try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
 method: 'POST',
 timeout: 5000 ,
 agent: agent,
 headers:{
 'Content-Type':'application/json'
 },
 body: JSON.stringify({
 query:`
 query TREND( $notIn: [ID]) {
   trendingCategories {
       nodes {
       id
       name
       slug
         trends(first: 20,where:{notIn:$notIn}) {
           nodes {
           id
             slug
             title
             content 
             excerpt
             date
              featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
               contentTags {
       nodes {
       id
       name
       slug
       
       
       }}
           trendinggroup {
       intro
       related(first: 20) {
         nodes {
           ... on Trending {
             id
             title
             slug
             date
             excerpt
                 featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
           }
         }
       }
     } }
         }
       }
     } 
 
 }
 ` ,
 variables:{ 
 notIn:notIn
 }
 
 })
 
 }).then(response =>   response) 
        .then(data =>data) 
        .catch(error => console.error('Error:', error));
        const response = wprest?.data.trendingCategories.nodes 
        return response 
   } catch (error) {
    if(error)throw new Error('Error fetching data')
   
    }
    
 }
  
export async function news__Articles(){
  try{ 
 const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
method: 'POST',
timeout: 5000 ,
agent: agent,
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query PASSAGENEWS{ 
   articlesCategories(first:15){
     nodes{
    name
    slug
articles{
nodes{ 
id
title
 slug
 date 
 excerpt
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
   sourceUrl
     altText
    }
 } 
   contentTags{
    nodes{  id
    name 
    slug
    }
    }
  articlesCategories{
    nodes{
    name 
    slug
    }
    } 
 newsGroup {  
 related {  
nodes {
... on Article {
id
content  
title
 slug
 date
 content 
 excerpt
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
   sourceUrl
     altText
    }
 } 
   contentTags{
    nodes{
     id
    name
    slug
    }
    }
 articlesCategories{
    nodes{
    name
    slug
    }
    }
 
 }  } }
 
}

}
}

  }
}}
 
 ` 
})
}).then(response =>  response)
        .then(data =>data) 
        .catch(error => console.error('Error:', error)) 
        const response = wprest?.data.articlesCategories.nodes
      return response

} catch (error) {
  if(error)throw new Error('Error fetching data')

 }

  
}

 export async function viddetails(slug:string){
 
  try{
   const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
method: 'POST',
timeout: 5000 ,
agent: agent,
headers:{
'Content-Type':'application/json' 
},
body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: VideoIdType!) {
video(id: $id, idType: $idType) {
   id
    slug
    title
    excerpt
    content
    date
    author{
   node{
   name
   slug
   } 
    }
    featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
      contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
              }
            }
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
      related {
        nodes {
          date
          ... on Video {
            id
            title
            slug
            featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
  contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
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

}).then(response =>  response)   
       .then(data =>data) 
       .catch(error => console.error('Error:', error)); 
     const response = wprest?.data.video
       return response
  } catch (error) {
    if(error)throw new Error('Error fetching data')
    // console.error('Error fetching data:', error);
  
   }
  
}
export const vids = async()=>{  
  try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
    .then(response =>  response)   
    .then(data =>data) 
    .catch(error => console.error('Error:', error));
    const response = wprest?.data.videos.nodes 
    return response 
    
  } catch (error) {
    if(error)throw new Error('Error fetching data')
    //console.error('Error fetching data:', error);
 
  }
  }
export const livesFeed = async()=>{  
  try{
  const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
    .then(response =>  response)
    .then(data =>data) 
    .catch(error => console.error('Error:', error));
    const response = wprest?.data.lives.edges 
     return response 
    
  } catch (error) {
    if(error)throw new Error('Error fetching data')
    //console.error('Error fetching data:', error);
 
  }
  }
  export const contentFeed = async()=>{  
    try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
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
      
      }).then(response =>  response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.contentNodes.nodes 
      return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error);
   
    }
  
  }

 export const readNextContent = async(notIn:string[])=>{  
    try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `query NEXTCONTENT($notIn:[ID]) {
       contentNodes(where: {notIn: $notIn}){
   nodes {
      contentTypeName
      ... on Article {
        id
        title
        slug
        date
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Award {
        id
        title
        slug
        date
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
      ... on Business {
        id
        title
        slug
        date
        contentTags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
     }   }
        ... on Economy {
          id
          title
          slug
          date
          contentTags {
            nodes {
              name
              slug
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
          date
          contentTags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
        ... on Health {
          id
          title
          slug
          date
          contentTags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
        ... on Society {
          id
          title
          slug
          date
          contentTags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
        ... on Environment {
          id
          title
          slug
          date
          contentTags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
        ... on Nollywood {
          id
          title
          slug
          date
          contentTags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
        ... on Post {
          id
          title
          slug
          date
          tags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      
    }
  }
    }`
    ,variables:{notIn:notIn} })
      
      }).then(response => response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
     const response = wprest?.data.contentNodes.nodes 
    return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error);
   
    }
  
  } 

  export const liveNewsFeed =async(id:string)=>{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `
        query LiveContent($id: ID!, $idType: LiveIdType){
           live(id: $id, idType: $idType) {
   author{node{avatar{url} name slug}}
   featuredImage{node{sourceUrl, caption, altText}}
    date
    modified
    slug
    title
    content
  }
   } `,
        variables:{
          id: id,
          idType: 'DATABASE_ID' 
          }

     }) 
    
    }).then(response => response) 
    .then(data =>data) 
    .catch(error => console.error('Error:', error)); 
    const response = wprest?.data.live
    return response
  }

 
  export const topicFeed = async()=>{  
    try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query: `query CONTENTFEED{
   contentTags(first:5) {
    nodes {
      slug
      name
    }
  }
  }`})
      
      }).then(response =>  response)   
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.contentTags.nodes 
      return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error);
   
    }
  
  }

  export const tagFeed = async()=>{  
    try{
    const wprest = await fetchWithRetry('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{ 
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:
         `query CONTENTFEED{
       postsTags(first:5) {
       nodes {     
          name
          slug
        }
      } 
      }
        
    `})
      
      }).then(response =>response)  
      .then(data =>data) 
      .catch(error => console.error('Error:', error));
      const response = wprest?.data.postsTags.nodes 
      return response
    } catch (error) {
      if(error)throw new Error('Error fetching data')
   //console.error('Error fetching data:', error); 
   
    }
  
  }

