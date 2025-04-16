 
export async function tag (slug:string) { 
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',     
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ 
      query:`
      query POSTTAGS {
tags(where: {slug: "${slug}"}){
  nodes { 
    name
    id
    slug
     posts { 
        nodes {
        id
          slug
          title
          contentTypeName
          tags{
          nodes{
          id
          name
          slug
          }
          }
          featuredImage{
          node{
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
    
    }).then(response => response.json())    
    .then(data =>data.data.tags) 
    .catch(error => console.error('Error:', error)); 
    const response = wprest
    return wprest
   
 }

export async function contentTag (slug:string) { 
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAGS {
contentTags(where: {slug: "${slug}"}){
    nodes { 
      name
      id
      slug 
       awards { 
          nodes {
          id
            slug
            title
            contentTypeName
            contentTags {
            nodes{
            id
            name
            slug
            }
            }
            featuredImage{
            node{
            altText
            sourceUrl
            }
            }
          }
       
      }
            healths { 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
            featuredImage{
            node{
            altText
            sourceUrl
            }
            }  
          }
       
      }
       businesses { 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
            featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
         
      societies{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
      technologies{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
      trends{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
     articles{
        nodes { id
          slug
          title
          contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
             featuredImage{
            node{
            altText
            sourceUrl
            }
            }
        }
      }
     naijaOnNetflix {
        nodes {
          netflixCategories(where: {name: "news"}) {
            nodes {
              naijaOnNetflix {
            nodes {
              id
              slug
              title
              contentTypeName
              contentTags {
                nodes {
                  id
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
          }
        }
      }
       nollywoods { 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
               featuredImage{
            node{
            altText
            sourceUrl
            }
            }
         
        }
      }
        environments{ 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
               featuredImage{
            node{
            altText
            sourceUrl
            }
            }
         
        }
      }
        economies { 
          nodes { id
            slug
            title
            contentTypeName
               contentTags {
            nodes{  id
            name
            slug
            }
            }
          featuredImage{
            node{
            altText
            sourceUrl
            }
            }
         
        }
      }
            naijaWikis{
      nodes {
       id
        slug
        title
        contentTypeName
        contentTags {
          nodes{ 
           id
          name
          slug
          }
          }
           featuredImage{
          node{
          altText
          sourceUrl
          }
          }
             charactertitles {
        relatedPosts {
          nodes {
          contentTypeName
            ... on Nollywood {
              id
              title
              slug
          contentTags {
          nodes{ 
           id
          name
          slug
          }
          }
           featuredImage{
          node{
          altText
          sourceUrl
          }
          }
            }
          ... on Post {
              id
              title
              slug
                tags {
          nodes{ 
           id
          name
          slug
          }
          }
           featuredImage{
          node{
          altText
          sourceUrl
          }
          }
            }
          }
        }
      }
      }
    } 
        videos { 
          nodes { id
            slug
            title
            contentTypeName
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
               contentTags {
            nodes{  id
            name
            slug
            }
            }
               featuredImage{
            node{
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
      
      }).then(response => response.json())    
      .then(data =>data.data.contentTags) 
      .catch(error => console.error('Error:', error));
      const response = wprest
      return wprest
 }
 

export async function content_TAGS () { 
    const wprest = fetch('https://content.culturays.com/graphql',{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query POSTTAGS {
   contentTags { 
      nodes {
        articles {
          nodes {
            id
            title
          }
        }
        awards {
          nodes {
            id
            title
          }
        }
          businesses {
          nodes {
            id
            title
          }
        }
         economies {
          nodes {
            id
            title
          }
        }
         environments {
          nodes {
            id
            title
          }
        }
         healths {
          nodes {
            id
            title
          }
        }
         naijaOnNetflix {
          nodes {
            id
            title
          }
        }
         nollywoods {
          nodes {
            id
            title
          }
        }
         societies {
          nodes {
            id
            title
          }
        }
         technologies {
          nodes {
            id
            title
          }
        }
         trends {
          nodes {
            id
            title
          }
        }
         videos {
          nodes {
            id
            title
          }
        }
         naijaWikis {
          nodes {
            id
            title
          }
        }
      }
    }
  } 
        `  
        
      })
      
      }).then(response => response.json())    
      .then(data =>data.data.contentTags) 
      .catch(error => console.error('Error:', error));
      const response = wprest
      return wprest
 }