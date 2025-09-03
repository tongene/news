 
import ArticlesX from "@/components/News/Articles" 
import StructuredData from "@/components/StructuredData";
import { BlogPosting, WithContext } from "schema-dts";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news/articles/` 
  : "http://localhost:3000/news/articles/";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Urban News | Articles",
    alternates: {
    canonical:  `https://culturays.com/news/articles/`,
 
  } 
};
    async function businessBlog(){
   
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
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
        
        }).then(response => response.json())
        .then(data => data.data.businesses.nodes)    
         .catch(error => console.error('Error:', error));
        // const response = wprest?.data.businesses.nodes
         return wprest 
  }  

    async function economyBlog(){ 
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
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
        
        }).then(response => response.json())
          .then(data => data.data.economies.nodes)            
         .catch(error => console.error('Error:', error));
        // const response = wprest?.data.economies.nodes
         return wprest
  
   
  } 

    async function environmentBlog(){
  
      const wprest =  fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
        headers:{ 
        'Content-Type':'application/json', 
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {
          environments(first:30) {
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
        
        }).then(response => response.json() ) 
        .then(data => data.data.environments.nodes)
         .catch(error => console.error('Error:', error));
          //const response = wprest?.data.environments.nodes 
         return wprest  
  } 
   async function healthBlog(){ 
      const wprest =   fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
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
        
        }).then(response => response.json())    
        .then(data => data.data.healths.nodes)          
         .catch(error => console.error('Error:', error));
         // const response = wprest?.data.healths.nodes
          
         return wprest 
  
  }  
      async function techBlog(){  
      const wprest = fetch('https://content.culturays.com/graphql',{
        method: 'POST', 
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
        
        }).then(response => response.json())
        .then(data => data.data.technologies.nodes)          
         .catch(error => console.error('Error:', error));
         // const response = wprest?.data.technologies.nodes
          
         return wprest  

  } 

   async function netflixNews() {
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
          naijaOnNetflix { 
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
const Articles =async () => { 
const netflix_News = await netflixNews()  

//  <Main netflix_News={netflix_News}  
//  newChars={newChars} /> 
   const environment_news = await environmentBlog() 
    const business_news = await businessBlog() 
    const eco_news = await economyBlog() 
    const tech_news = await techBlog() 
    const health_news = await healthBlog() 
   const jsonLd:WithContext<BlogPosting>={
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
    "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
    "url": "https://culturays.com/news/articles/",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://culturays.com/news/articles/"
    },
    "inLanguage": "en",
    "image": {
      "@type": "ImageObject",
      "url": "https://culturays.com/opengraph-image.png"
    },
      "datePublished": new Date().toISOString() ,
          "dateModified":  new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Culturays"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ngenet Studio",
      "url": "https://culturays.com/news/articles/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://culturays.com/culturays-no-bg.png"
      }
    }
  }
 
 
  return (
    <div>
         <StructuredData schema={jsonLd} />   
         <ArticlesX 
         environment_news={environment_news}  
        business_news={business_news}  
          eco_news={eco_news} 
          tech_news={tech_news} 
          health_news={health_news}
          netflix_News={netflix_News}
        />  
    </div>
  )
}

export default Articles
