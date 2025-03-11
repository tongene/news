 
import Tags from "@/components/Tags"; 
import { contentTag, tag } from "../taghandles";
import type { Metadata, ResolvingMetadata } from 'next'
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
       openGraph: { 
         images: ['/assets/images/culturays.png' ,...previousImages],
       },
     }
   } 
const TagPage = async({params}: Props) => {  
  const slug =(await params).slug
// const id= params.slug[1].replace('%3D','')
 const content_tag_response = await contentTag(slug[0])
  const tag_response = await tag(slug)
 
  return (
    <div>  
     <Tags
        content_tag_response={content_tag_response}
        tag_response={tag_response} 
      />   
    </div>
  )
}

export default TagPage