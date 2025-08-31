export async function tag (slug:string) { 
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',     
    headers:{
    'Content-Type':'application/json'
    },
    body: JSON.stringify({ 
      query:`
      query POSTTAGS {
tags(first:100, where: {search: "${slug}"}){
  nodes { 
    name
    id
    slug
     contentNodes {
        nodes {
          ... on Post {
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
    }
      `  
      
    })
    
    }).then(response => response.json())    
    .then(data =>data.data.tags) 
    .catch(error => console.error('Error:', error)); 
      
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
     contentTags(first:500, where: {search: "${slug}"}){
    nodes { 
     name
      id
      slug
   contentNodes {
        nodes {
          ... on Article {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Business {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Health {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Economy {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Video {
            id
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
          ... on NaijaWiki {
            id
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
            charactertitles {
              relatedPosts {
                nodes {
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
          ... on Trending {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Technology {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Society {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Nollywood {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Live {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Health {
            id
             slug
          title
          contentTypeName
          contentTags{
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
          ... on Environment {
            id
             slug
          title
          contentTypeName
          contentTags{
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

  }}}  `  
        
      })
      
      }).then(response =>response.json())    
    .then(data =>data.data?.contentTags) 
    .catch(error => console.error('Error:', error));
     
      // const xtagged= response.filter((vx:{slug:string})=> vx.slug !== slug)
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
      .then(data =>data.data?.contentTags) 
      .catch(error => console.error('Error:', error));
       return wprest
 }