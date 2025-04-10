import Character from '@/components/NaijaWiki/Character' 
import { newcharCall,relatedChars } from '../../newCharHandle' 
import type { Metadata, ResolvingMetadata } from 'next'
import { ProfilePage, WithContext } from 'schema-dts'
import StructuredData from '@/components/StructuredData'
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
    description:char_details?.excerpt, 
    keywords:[char_details?.title, char_details?.charactertitles.portrayedby, char_details?.charactertitles.filmname].join(', '),
   twitter: {
      card: 'summary_large_image',
      title: char_details?.title,
      description:char_details?.excerpt, 
      images:[char_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: { 
      images: [char_details?.featuredImage.node.sourceUrl,...previousImages],
      type: "article",
      publishedTime:char_details?.date
    },
  }
}  
 async function CharacterPage ({ params  }: Props) {
  const slug =(await params).slug
 const character_data = await newcharCall(slug) 
const related_chars = await relatedChars()
const jsonLd:WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
   headline: `Culturays - ${character_data?.title}`, 
   description: character_data?.excerpt, 
   url:`https://culturays.com/profile/${slug}`,
   mainEntity: {
    "@type": "Person",
    name:character_data?.title,     
    image:character_data?.featuredImage.node.sourceUrl , 
   
  },
   
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":`https://culturays.com/naija-wiki/character/${slug}`, 
   },

   image: character_data?.featuredImage.node.sourceUrl, 
   keywords:[character_data?.title, character_data?.charactertitles.portrayedby, character_data?.charactertitles.filmname].join(', '),    
   
 };


   return (  
   <> 
    <StructuredData schema={jsonLd} />
   <Character 
   character_data={character_data}
   related_chars={related_chars}
   />  
 
  </>
   )
 }
 
 export default CharacterPage    