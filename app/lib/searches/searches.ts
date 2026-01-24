"use server"
import { createClient } from "@/utils/supabase/server";
export const searchValues = async (name:string) => {
 
  if(name){
    const supabase =await createClient()
    const { data:posts, error } = await supabase
    .from('posts') 
    .select("*") 
    .filter('title', 'ilike', `%${name}%`);
    
    if (error) {
    throw new Error(error.message)

    // console.error('Error fetching posts:', error.message);
    // return;
    }
  
    const { data:events, error:eventErr} = await supabase
    .from('events')
    .select("*")
    .filter('title', 'ilike', `%${name}%`);
    
    if (eventErr) {
    throw new Error(eventErr.message)
 
    }
     
        const post_response = fetch('https://content.culturays.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            query: `
            query SEARCHES {
     contentNodes( where: { search: "${name}"}) {
     nodes {
      slug
      id
          }
    }
  }
   `
     })
          
        }).then(response => response.json())
        .then(data =>data?.data?.contentNodes?.nodes  ) 
        .catch(error => console.error('Error:', error)); 
        const response =await post_response??[]
        const resx=response.map((xy:{id:string})=>xy.id)
       
        const singular_response = fetch('https://content.culturays.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            query: `
            query SEARCHES($ids: [ID]!) {
 contentNodes(where: {in: $ids}) {
    nodes {
      ... on Article {
        id
        title
        slug
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
        contentTypeName
      }
         ... on NaijaWiki {
        id
        title
        slug
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
        contentTypeName
      }
         ... on NetflixNaija {
        id
        title
        slug
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
        contentTypeName
         netflixCategories(where: {name: "News"}) {
          nodes {
            naijaOnNetflix {
              nodes {
                 id
        title
        slug
         contentTags{
        nodes{
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
      }
         ... on Nollywood {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Technology {
        id
        title
        contentTypeName
        slug
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Society {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Post {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        tags{nodes{name slug}}
      }
         ... on Business {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Environment {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Live {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Health {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Economy {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Trending {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
         ... on Video {
        id
        title
        slug
        contentTypeName
        featuredImage{node{sourceUrl altText}}
        contentTags{nodes{name slug}}
      }
    }
  }
 
  }
   `,variables: {
    ids: resx,
  }
   })
          
        }).then(response => response.json())
        .then(data => data.data.contentNodes.nodes) 
        .catch(error => console.error('Error:', error)); 
        return singular_response
    
    }
  
  }
    