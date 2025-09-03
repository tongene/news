import VideoDetail from "@/components/News/VideoDetail" 
import StructuredData from "@/components/StructuredData"
import type { Metadata, ResolvingMetadata } from 'next'
import { NewsArticle, WithContext } from "schema-dts"
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
} 
 async function viddetails(slug:string){
 
 const wprest = fetch('https://content.culturays.com/graphql',{
method: 'POST', 
headers:{
'Content-Type':'application/json' 
},
body: JSON.stringify({
query:`
query NODE($id: ID!, $idType: VideoIdType!) {
video(id: $id, idType: $idType) {
   id
    slug
    title
    excerpt
    content
    date
    author{
   node{
   name
   slug
   } 
    }
    featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
      contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
              }
            }
    videosGroup {
     videoUrl {
          node {
            title
            slug
            mediaItemUrl
            date
            altText
          }
        }
      related {
        nodes {
          date
          ... on Video {
            id
            title
            slug
            featuredImage{
    node{
    caption
    sourceUrl
    altText
    }
    }
  contentTags {
              nodes {
                slug
                name
              }
            }
            videoCategories {
              nodes {
                slug
                name
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
.then(data => data.data.video )
       .catch(error => console.error('Error:', error)); 
     //const response = wprest?.data.video
       return wprest
 
 }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata ): Promise<Metadata> {
    const slug =(await params).slug
     const vid_details= await viddetails(slug)
        if(!vid_details)return {}
     const previousImages = (await parent).openGraph?.images || []
     const tags= vid_details?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
  
     return {
       title:`Urban Naija | Video - ${vid_details?.title}`,
       description:vid_details?.excerpt,
     keywords:tags,
     twitter: {
      card: 'summary_large_image',
      title: vid_details?.title  ,
      description: vid_details?.excerpt ,  
      images:[vid_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
       openGraph: {  
        title:`Urban Naija | Video - ${vid_details?.title}`,
         description:vid_details?.excerpt,
         url: `https://culturays.com/news/video/${slug}/`,
          siteName: 'Urban Naija',
         images: [{url:vid_details?.featuredImage.node.sourceUrl, width: 800,
       height: 600,...previousImages}],
         type: "article",
         publishedTime:vid_details?.date
       },
         alternates: {
    canonical:  `https://culturays.com/news/video/${slug}/`,
 
  },
     }
   }  

const VideoDetailsPage=async ({params}: Props) => {
  const slug =(await params).slug
  const vid_details= await viddetails(slug)
   if(!vid_details)return 
  const tags= vid_details?.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
  const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi;
    const newString = string?.replace(regex, "");
    return newString
     }
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
     name: vid_details.title,
     headline:vid_details.title, 
     description:replaceHTMLTags(vid_details?.excerpt) ,
     author: {
       "@type": "Person",
       name: "Christina Ngene",
       url:'https://culturays.com/creator/christina-ngene/',
     }, 
     datePublished:toIsoDate(vid_details?.date) , 
     dateModified:toIsoDate(vid_details?.date) , 
      mainEntityOfPage: {
       "@type": "WebPage",
       "@id": vid_details?.slug,
     },
     url: `https://culturays.com/news/video/${slug}/`,
     image: vid_details?.featuredImage.node.sourceUrl ,
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
  <VideoDetail  
vid_details={vid_details}   
/> 
  </div> 
  )
}

export default VideoDetailsPage
 