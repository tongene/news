import Character from '@/components/NaijaWiki/Character' 
import { newcharCall,relatedChars } from '../../newCharHandle' 
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
  const char_details= await newcharCall(slug)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title:`Movie Character - ${char_details?.title} | Culturays`,
    openGraph: { 
      images: [char_details?.featuredImage.node.sourceUrl,...previousImages],
    },
  }
}  
 async function CharacterPage ({ params  }: Props) {
  const slug =(await params).slug
 const character_data = await newcharCall(slug) 
const related_chars = await relatedChars()  
   return (  
   <>   
   <Character 
   character_data={character_data}
   related_chars={related_chars}
   />  
 
  </>
   )
 }
 
 export default CharacterPage    