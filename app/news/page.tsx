import News from '@/components/News/News' 
async function news__Articles(){  
  const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST', 
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
 }).then(response =>  response.json())
 .then(data => data.data.articlesCategories.nodes )
.catch(error => console.error('Error:', error)) 
         //const response = wprest?.data.articlesCategories.nodes
       return wprest
  
 }
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/news` 
  : "http://localhost:3000/news";

export const metadata = {
  metadataBase: new URL(defaultUrl), 
   title:"Culturays | News",
   description:'This is the medium that caters for the daily need of legitimate global news. We cover news about all technological advancements, economic situations and growth, health and societal issues as well as business and environment.',
   alternates: {
    canonical: 'https://www.culturays.com/news',
 
  }, 
}; 
const NewsPage = async() => {
  const newsData= await news__Articles()

 return (  
   <div> 
     <News 
 newsData={newsData} 
 />   
  </div>

 )
 
}

export default NewsPage
