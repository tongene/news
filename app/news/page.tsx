import News from '@/components/News/News' 
import StructuredData from '@/components/StructuredData';
import { BlogPosting, WithContext } from 'schema-dts';

async function news__Articles(){  
  const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST', 
 headers:{
 'Content-Type':'application/json'
 },
 body: JSON.stringify({
 query:`
 query PASSAGENEWS{ 
    articlesCategories( where:{hideEmpty:true}){
      nodes{
     name 
     slug
 articles(first:18){
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

const NewsPage = async() => {
  const newsData= await news__Articles() 
 
 const jsonLd:WithContext<BlogPosting>={
   "@context": "https://schema.org",
   "@type": "BlogPosting",
   "headline": "Urban News - Covering News in Nigeria, Africa, and Beyond",
   "description": "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",
   "url": "https://culturays.com/news/", 
   "mainEntityOfPage": {
     "@type": "WebPage",
     "@id": "https://culturays.com/news/"
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
     "url": "https://www.culturays.com/news/",
     "logo": {
       "@type": "ImageObject",
       "url": "https://culturays.com/culturays-no-bg.png"
     }
   }
 }
 
 
 return (  
   <div>
     <StructuredData schema={jsonLd} />
   <News 
 newsData={newsData} 
 /> 
  </div>

 )
 
}

export default NewsPage
