import Trending from "@/components/News/Trending" 
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
    const tags= trending_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
    const previousImages = (await parent).openGraph?.images || []
     
    return {
      title:`Culturays | Trending - ${trending_details?.title}` ,
         description:trending_details?.excerpt,
          keywords:tags,
          twitter: {
      card: 'summary_large_image',
      title: trending_details?.title  ,
      description: trending_details?.excerpt ,  
      images:[trending_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
      openGraph: { 
        images: [trending_details?.featuredImage.node.sourceUrl],
      },
    }
  }   
const TrendingDetails =async ({params}: {
  params: Promise<{ slug: string }>
}) => {
  const {slug} =await params 
  const trends_detail =await trending(slug)
  const related_to_trend_id= trends_detail?.trendinggroup?.related?.nodes.map((xy:{id:string})=> xy.id)
  const related_to_trend= trends_detail?.trendinggroup?.related?.nodes
 const rm_ids = (related_to_trend_id??[])?.concat(trends_detail?.id)
 //trends_detail.id,related_to_trend_id
 const trends_categories=await similarTrending(rm_ids)  
 
  return (
    <div>
   <Trending
        trends={trends_detail} 
        trends_categories={trends_categories}
        related_to_trend={related_to_trend}
        />   
    </div>
  )
} 

export default TrendingDetails

