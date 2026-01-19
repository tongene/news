import Trending from "@/components/News/Trending" 
import StructuredData from "@/components/StructuredData";
import { NewsArticle, WithContext } from "schema-dts";
 const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  const newString = string?.replace(regex, "");
  return newString
   }
async function trending(slug:string){
const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST',
headers:{
'Content-Type':'application/json'
},
body: JSON.stringify({
query:`
query TREND($id: ID!, $idType: TrendingIdType) {
trending(id: $id, idType: $idType) {
id
    title
    slug
    date
    content
    excerpt   
       featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
             trendinggroup {
      intro
      related(first: 20 ) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
    contentTags {
      nodes {
        trends(first: 20) {
          nodes {
          id
            slug
            title
            content 
            excerpt
            date
          trendinggroup {
      intro
      related(first: 20) {
        nodes {
          ... on Trending {
            id
            title
            slug
            date
            excerpt
                featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
                caption
              }
            }
          }
        }
      }
    }
            featuredImage {
              node {
                altText
                sourceUrl
                slug
                title
              }
            }
          }
        }
      }
    }

     
  }
}   
` ,
variables:{
id: slug,
idType: 'SLUG'
}

})

}).then(response => response.json()) 
.then(data => data.data.trending) 
       .catch(error => console.error('Error:', error));
      //const response = wprest?.data.trending 
       return wprest 
 
}

async function similarTrending(notIn:string[]){
  const wprest = fetch('https://content.culturays.com/graphql',{
 method: 'POST', 
 headers:{
 'Content-Type':'application/json'
 },
 body: JSON.stringify({
 query:`
 query TREND( $notIn: [ID]) {
   trendingCategories {
       nodes {
       id
       name
       slug
         trends(first: 20,where:{notIn:$notIn}) {
           nodes {
           id
             slug
             title
             content 
             excerpt
             date
              featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
               contentTags {
       nodes {
       id
       name
       slug
       
       
       }}
           trendinggroup {
       intro
       related(first: 20) {
         nodes {
           ... on Trending {
             id
             title
             slug
             date
             excerpt
                 featuredImage {
               node {
                 altText
                 sourceUrl
                 slug
                 title
                 caption
               }
             }
           }
         }
       }
     } }
         }
       }
     } 
 
 }
 ` ,
 variables:{ 
 notIn:notIn
 }
 
 })
 
 }).then(response => response.json()) 
 .then(data => data.data.trendingCategories.nodes )
        .catch(error => console.error('Error:', error));
       // const response = wprest?.data.trendingCategories.nodes 
        return wprest  
 }

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}, parent:any) {
 const {slug} =await params 
    const trending_details= await trending(slug)
      if(!trending_details)return 
    const tags= trending_details?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
    const previousImages = (await parent).openGraph?.images || []
     
    return { 
    title:`Urban Naija | Trending - ${trending_details?.title}` ,
        description: `Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria." | ${replaceHTMLTags(trending_details?.excerpt)}`,
        keywords:tags,
        twitter: {
    card: 'summary_large_image',
    title: trending_details?.title  ,
    description:replaceHTMLTags(trending_details?.excerpt) ,  
    images:[trending_details?.featuredImage.node.sourceUrl, ...previousImages],  
  },
    openGraph: { 
        title:`Urban Naija | Trending - ${trending_details?.title}` ,
        description:replaceHTMLTags(trending_details?.excerpt),
        url: `https://culturays.com/news/trending/${slug}/`,
        siteName: 'Urban Naija',
      images: [{url:trending_details?.featuredImage.node.sourceUrl, width: 800,
      height: 600,}],
        type: "article",
        publishedTime:trending_details?.date
      },
       alternates: {
    canonical:  `https://culturays.com/news/trending/${slug}/`,
 
  }
    }
  }   
const TrendingDetails =async ({params}: {
  params: Promise<{ slug: string }>
}) => {
  const {slug} =await params 
  const trends_detail =await trending(slug)
   if(!trends_detail)return 
  const tags= trends_detail?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
  const related_to_trend_id= trends_detail?.trendinggroup?.related?.nodes.map((xy:{id:string})=> xy.id)
  const related_to_trend= trends_detail?.trendinggroup?.related?.nodes
 const rm_ids = (related_to_trend_id??[])?.concat(trends_detail?.id)

 const trends_categories=await similarTrending(rm_ids)

   function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }
  return d.toISOString(); 
}
 const jsonLd:WithContext<NewsArticle> = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
    name: trends_detail?.title,
   headline: trends_detail?.title, 
   description: `Daily news trends on Urban News — Find out what everyone is talking about and what's trending in every region across Nigeria." | ${replaceHTMLTags(trends_detail?.excerpt)}`,
   author: {
     "@type": "Person",
     name: "Christina Ngene",
     url:'https://culturays.com/creator/christina-ngene/',
   }, 
   datePublished:toIsoDate( trends_detail?.date) , 
   dateModified:toIsoDate( trends_detail?.date) , 
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id": trends_detail?.slug,
   },
   url:`https://culturays.com/news/trending/${slug}/`,
   image: trends_detail?.featuredImage.node.sourceUrl ,
   publisher: {
     "@type": "Organization",
     name: "Christina Ngene",
     logo: {
       "@type": "ImageObject",
       url: "https://culturays.com/culturays-no-bg.png",
     },
   },
    
   keywords:tags,   
 };

  return (
    <div>
      <StructuredData schema={jsonLd} />
   <Trending
        trends={trends_detail} 
        trends_categories={trends_categories}
        related_to_trend={related_to_trend}
        />   
    </div>
  )
} 

export default TrendingDetails

