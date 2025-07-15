 
 export async function fetchPages(){  
  const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST', 
 headers:{
 'Content-Type':'application/json'
 },
 body: JSON.stringify({
 query:`
 query PAGENEWS{ 
contentCategories {
    nodes {
      contents {
        nodes {
        id
          excerpt
          date
          modified
          slug
          title 
          featuredImage{
          node{
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
 }).then(response =>  response.json())
 .then(data => data.data.contentCategories.nodes )
.catch(error => console.error('Error:', error)) 
         //const response = wprest?.data.articlesCategories.nodes
       return wprest 
  
 } 

export const fetchInd = async()=> {
     const res = fetch('https://content.culturays.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query PAGENEWS{
       contentCategories(where: {name: "industry"}){
    nodes {
      contents {
        nodes {
        id
          excerpt
          date
          modified
          slug
          title
        }
      }
    }
  }
      }
    `,
  }),
}).then(response =>response.json())
      .then(data =>  data.data.contentCategories.nodes )
      .catch(error => console.error('Error:', error)); ;
return res ;
}

export const fetchGeo = async()=> {
     const res = fetch('https://content.culturays.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query PAGENEWS{
       contentCategories(where: {name: "geography"}){
    nodes {
      contents {
        nodes {
        id
          excerpt
          date
          modified
          slug
          title
        }
      }
    }
  }
      }
    `,
  }),
}).then(response =>response.json())
      .then(data =>  data.data.contentCategories.nodes )
      .catch(error => console.error('Error:', error)); ;
return res ;
}

export const fetchGov = async()=> {
     const res = fetch('https://content.culturays.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query PAGENEWS{
       contentCategories(where: {name: "government"}){
    nodes {
      contents {
        nodes {
        id
          excerpt
          date
          modified
          slug
          title
        }
      }
    }
  }
      }
    `,
  }),
}).then(response =>response.json())
      .then(data =>  data.data.contentCategories.nodes )
      .catch(error => console.error('Error:', error)); ;
return res ;
}

export const fetchEco = async()=> {
     const res = fetch('https://content.culturays.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query PAGENEWS{
       contentCategories(where: {name: "economics"}){
    nodes {
      contents {
        nodes {
        id
          excerpt
          date
          modified
          slug
          title
        }
      }
    }
  }
      }
    `,
  }),
}).then(response =>response.json())
      .then(data =>  data.data.contentCategories.nodes )
      .catch(error => console.error('Error:', error));
      
return res ;
}


export const fetchContent= async(slug:string)=> {
     const res = fetch('https://content.culturays.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query contentPages(
   $id: ID!, $idType: ContentIdType!
  )  {
       content(id: $id, idType: $idType){
    title
    slug
    content
    excerpt
    featuredImage{
    node{
    sourceUrl
    altText
    caption
    }
    }
  }
      }
    `,
  variables:{
  id: slug,
  idType: 'SLUG' 
  }
  }),
}).then(response =>response.json())
      .then(data => data.data.content )
      .catch(error => console.error('Error:', error)); ;
return res ;
}