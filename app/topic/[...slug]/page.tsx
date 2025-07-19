import Tags from "@/components/Tags"; 
import { contentTag, tag } from "../taghandles";
import type { Metadata, ResolvingMetadata } from 'next'
import type { NewsArticle, WithContext } from 'schema-dts'; 
import StructuredData from "@/components/StructuredData"; 
import { TagProps } from "../sitemap";
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
     const previousImages = (await parent).openGraph?.images || []
 
return {
title:`Urban Naija | All News About ${tag_details.nodes[0]?.name }`,  
description: tag_details.nodes[0]?.name,  
keywords: tag_details.nodes[0]?.name , 
twitter: {
card: 'summary_large_image',
title: tag_details.nodes[0]?.name ,
description: tag_details.nodes[0]?.name,  
images:['/culturays.png', ...previousImages],  
},
       openGraph: { 
        title:`Urban Naija | All News About ${slug[0].toUpperCase()}`,  
         description: tag_details.nodes[0]?.name,  
           url: `https://culturays.com/topic/${slug[0]}/`,
          siteName: 'Urban Naija',
         images: [{url:'https://culturays.com/culturays.png' ,
          width: 800,
          height: 600,...previousImages}], 
         
       },
        alternates: {
    canonical:  `https://culturays.com/topic/${slug}/`,
 
  }
     }
   } 
const TagPage = async({params}: Props) => {  
const slug =(await params).slug
// const id= params.slug[1].replace('%3D',''),
const content_tag_response = await contentTag(slug[0])
const tag_response = await tag(slug[0]) 
const taggedContent= content_tag_response.nodes.map((xy:TagProps)=> xy.contentNodes).map((dy:{nodes:TagProps})=> dy.nodes).flat() 
const taggedPosts = tag_response.nodes.map((xy:TagProps)=> xy.contentNodes).map((dy:{nodes:TagProps})=> dy.nodes).flat()

  const jsonLd: WithContext<NewsArticle> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
     name:slug[0].toUpperCase(),
     headline:slug[0].toUpperCase(), 
     description:"This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world",
     author: {
       "@type": "Person",
       name: "Christina Ngene",
       url:'https://culturays.com/creator/christina-ngene/',
     }, 
     datePublished: "2025-04-09T10:00:00Z", 
     dateModified:"2025-04-09T12:00:00Z",
      mainEntityOfPage: {
       "@type": "WebPage",
       "@id":slug[0] ,
     },
     url:slug,
     image: "https://culturays.com/assets/images/opengraph-image.png" ,
     publisher: {
       "@type": "Organization",
       name: "Christina Ngene",
       logo: {
         "@type": "ImageObject",
         url: "https://culturays.com/culturays-no-bg.png",
       },
     },
      
     keywords:tag_response.nodes[0]?.name ,    
     
   };
  
  return (
    <div>
    <StructuredData schema={jsonLd} /> 
     <Tags
        slug={slug}
        content_tag_response={taggedContent}
        tag_response={taggedPosts} 
      />  
      
    </div>
  )
}

export default TagPage