import { fetchWithTrace } from "@/utils/fetchWithTrace";

export const liveNewsFeed =async(id:string)=>{
    const wprest = fetchWithTrace('https://content.culturays.com/graphql',{
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
       contentTags{
           nodes{
           slug
           name
           }
           
           } 
  }
   } `,
        variables:{
          id: id,
          idType: 'DATABASE_ID' 
          }

     }) 
    
    }).then(response => response.json()) 
    .then(data => data.data.live )
    .catch(error => console.error('Error:', error)); 
    //const response = wprest?.data.live
    return wprest
  }