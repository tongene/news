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
     contentNodes(where: { search: "${name}"}) {
     nodes {
      contentTypeName
      ... on Post {
        id
        title
        slug
        tags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
            altText
          }
           
        }
      }
      ... on Video {
         id
        title
        slug
        contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
      ... on Trending {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
      
      ... on Nollywood {
       id
        title
        slug 
         contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
      ... on NetflixNaija {
       id
        title
        slug 
        contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
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
     
      ... on Char {
        id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
      
      ... on Award {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
           ... on Business {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
           ... on Economy {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
           ... on Environment {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
           ... on Society {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
           ... on Technology {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
        }
        }
        featuredImage{
          node{
            sourceUrl
             altText
          }
           
        }
      }
      ... on Article {
         id
        title
        slug   contentTags{
        nodes{
        name
        slug
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
  }
   `
     })
          
        }).then(response => response.json())
        .then(data =>data?.data?.contentNodes?.nodes  ) 
        .catch(error => console.error('Error:', error));      
        const response = post_response   
        return post_response
    
    }}
    