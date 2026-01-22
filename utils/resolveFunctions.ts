
import { PostTypeProps } from "@/app/types";
 const CULTURAYS_CONTENT_WP = process.env.CULTURAYS_WP
 export async function postQuery(slug:string){
  const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json'
},
next: { revalidate: 60 }, 
body: JSON.stringify({
query:` query NODE($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType){
   id
      title
      slug
      excerpt
      content
      postnewsgroup {
        heroImage {
          node {
            altText
            caption
            sourceUrl
          }
        }
        relatedPosts {
          edges {
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
          }
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
          avatar {
            url
          }
        }
      }
}}`,
variables:{
id: slug,
idType: 'SLUG' 
}
})

  }).then(response => response.json())    
.then(data =>data.data.post) 
  .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data.contentNode
      return wprest

}

export async function news_details_all(uri:string){

const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json'
},

body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: ContentNodeIdTypeEnum!) {
contentNode(id: $id, idType: $idType){  
    id
    uri
    slug
    newsGroup {
      related {
      edges{
        node {
          date
          id
          slug
          ... on Article {
            id
            title
            excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Business {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Society {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Nollywood {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Health {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
             ... on Award {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
             ... on Technology {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Environment {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
          ... on Economy {
            id
            title
              excerpt
            content
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                caption
              }
            }
          }
        }
      }
}}
    contentTypeName
    __typename
    ... on Article {
        id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
    
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Technology {
        id
      content 
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Society {
       id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Nollywood {
      id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Health {
      id
       content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Environment {
   id
       content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Economy {
     id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
    ... on Business {
     id
     content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
         
          }
        }
      }
    }
    ... on Award {
      id
      content
      slug
      title
     excerpt
      date
      contentTags {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      excerpt
      date
      author {
        node {
          name
          slug
          avatar {
            url
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

}).then(response => response.json())    
.then(data => data.data.contentNode)
       .catch(error => console.error('Error:', error)); 
      //const response = wprest?.data.contentNode
      return wprest
 
}
export const resolveContent = async (slug: string, news_details:PostTypeProps)=>{
  
   for (const type of ["article", "business", "economy", "nollywood", "award", "technology", "health", "society","environment"]) {
 const res = await news_details_all(`${CULTURAYS_CONTENT_WP}/${type}/${slug}/`); 
    if (res?.title) {
      return { ...res, __typename: type };   
    }
  }
  return null; 
}
  
  
  export const postsOutline =async()=>{    
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
export async function sidePlusViews(slug:string){ 
    const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
                  cache: 'force-cache', 
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
           pageInfo {
        endCursor
      }
         edges{ 
            node{
             
            categories {
                  nodes {
                    name
                    slug
                  }
                } 
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
if(!postX)return
      const wpx = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
           } 
        } 
         `, variables:{
          after:postX 
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

    const latestPosts= await wpx  
  const latestStr=latestPosts?.pageInfo?.endCursor  
     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}" , where: {notIn:["${slug}"],categoryName: "Latest"}) {
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
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  } 

export const readNextContent = async(notIn:string[])=>{ 
  
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    cache:'force-cache', 
    body: JSON.stringify({
      query: 
      `query NEXTCONTENT($notIn:[ID]){
  contentNodes(first:20, where: {notIn:$notIn}){
 nodes {
    ... on Article {
      id
      title
      slug
      date
      contentTypeName
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
      contentTypeName
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
      contentTypeName
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
        contentTypeName
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
        contentTypeName
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
        contentTypeName
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
        contentTypeName
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
        contentTypeName
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
        contentTypeName
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
  }
}
  }`, variables:{notIn:notIn}
  })
    
    }).then(response => response.json())   
    .then(data => data.data.contentNodes.nodes )
    .catch(error => console.error('Error:', error));
 //  const response = wprest?.data.contentNodes.nodes 
  return wprest
} 

export const readNextPosts = async(notIn:string[])=>{  
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `query NEXTCONTENT($notIn:[ID]) {
     contentNodes(first:20, where: {notIn:$notIn}){
 nodes {  
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
  }`, variables:{
    notIn:notIn
  }
 })
    
    }).then(response => response.json())   
    .then(data => data.data.contentNodes.nodes )
    .catch(error => console.error('Error:', error));
 //  const response = wprest?.data.contentNodes.nodes 
  return wprest
}
export const returnPost = async (slug:string)=>{
 const news_details= await postQuery(slug)
 return news_details
}

 