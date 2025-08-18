  export const fetchNewPosts = async (afterA:string) => { 
     
const wp_naija = fetch('https://content.culturays.com/graphql',{
      method: 'POST', 
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        query:`
        query WPPOSTS($after:String ){
                posts(where: { categoryName: "Nigeria" }, first:1, after:$after){
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
         
       `, variables:{after:afterA}  
      
      })
      
      }).then(response => response.json())      
      .then(data =>  data.data)  
      .catch(error => console.error('Error:', error));     
      //const res_naija =await wp_naija?.data 
      return wp_naija
   
  }