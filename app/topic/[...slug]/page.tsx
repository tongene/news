 
import Tags from "@/components/Tags"; 
import { contentTag, tag } from "../taghandles";
import type { Metadata, ResolvingMetadata } from 'next'
import type { NewsArticle, WithContext } from 'schema-dts';

import StructuredData from "@/components/StructuredData";
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata 
): Promise<Metadata> {
     const slug =(await params).slug
     const tag_details= await contentTag(slug[0])
     const tag_response = await tag(slug)    
     const tagged=tag_details?.nodes.concat(tag_response.nodes)
     const previousImages = (await parent).openGraph?.images || [] 
     return {
       title:`Culturays | All News About ${tagged[0]?.name}`,  
         description: tagged[0]?.name, 
         keywords: tagged[0]?.name , 
          twitter: {
      card: 'summary_large_image',
      title: tagged[0]?.name ,
      description: tagged[0]?.name,  
      images:['/assets/images/culturays.png' , ...previousImages],  
    },
       openGraph: { 
         images: ['/assets/images/culturays.png' ,...previousImages], 
         
       },
     }
   } 
const TagPage = async({params}: Props) => {  
  const slug =(await params).slug
// const id= params.slug[1].replace('%3D','')   // Article,
 const content_tag_response = await contentTag(slug[0])
  const tag_response = await tag(slug)
  const tagged=content_tag_response?.nodes.concat(tag_response.nodes)
 
  const jsonLd: WithContext<NewsArticle> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
     name:tagged[0]?.name,
     headline:tagged[0]?.name , 
     description:"This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world",
     author: {
       "@type": "Person",
       name: "Christina Ngene",
       url:'https://culturays.com/creator/christina-ngene',
     }, 
     datePublished: "2025-04-09T10:00:00Z", 
     dateModified:"2025-04-09T12:00:00Z",
      mainEntityOfPage: {
       "@type": "WebPage",
       "@id":tagged[0]?.slug ,
     },
     url:tagged[0]?.slug,
     image: "https://culturays.com/assets/images/opengraph-image.png" ,
     publisher: {
       "@type": "Organization",
       name: "Christina Ngene",
       logo: {
         "@type": "ImageObject",
         url: "https://culturays.com/assets/images/culturays-no-bg.png",
       },
     },
      
     keywords:tagged[0]?.name ,    
     
   };
   
  return (
    <div>
      <StructuredData schema={jsonLd} />
     <Tags
        content_tag_response={content_tag_response}
        tag_response={tag_response} 
      /> 
      
    </div>
  )
}

export default TagPage