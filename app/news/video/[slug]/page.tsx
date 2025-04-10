import VideoDetail from "@/components/News/VideoDetail" 
import type { Metadata, ResolvingMetadata } from 'next'
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
     const previousImages = (await parent).openGraph?.images || []
     const tags= vid_details.contentTags.nodes.map((ex:{name:string})=>ex.name).join(', ')
  
     return {
       title:`Culturays | Video - ${vid_details?.title}`,
       description:vid_details?.excerpt,
     keywords:tags,
     twitter: {
      card: 'summary_large_image',
      title: vid_details?.title  ,
      description: vid_details?.excerpt ,  
      images:[vid_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
       openGraph: {  
         images: [vid_details?.featuredImage.node.sourceUrl, ...previousImages],
         type: "article",
         publishedTime:vid_details?.date
       },
     }
   }  

const VideoDetailsPage=async ({params}: Props) => {
  const slug =(await params).slug
  const vid_details= await viddetails(slug) 
  return ( 
    <div>
  <VideoDetail  
vid_details={vid_details}   
/> 
  </div> 
  )
}

export default VideoDetailsPage
 