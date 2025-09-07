import Character from '@/components/NaijaWiki/Character'  
import type { Metadata, ResolvingMetadata } from 'next'
import { ProfilePage, WithContext } from 'schema-dts'
import StructuredData from '@/components/StructuredData'
import { newcharCall, relatedChars } from '@/app/newCharHandle'

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
    title:`Urban Naija | Movie Character - ${char_details?.title}`,
    description:char_details?.excerpt, 
    keywords:[char_details?.title, char_details?.charactertitles.portrayedby, char_details?.charactertitles.filmname].join(', '),
    twitter: {
      card: 'summary_large_image',
      title: char_details?.title,
      description:char_details?.excerpt, 
      images:[char_details?.featuredImage.node.sourceUrl, ...previousImages],  
    },
    openGraph: { 
      title:`Naija Wiki | Movie Character - ${char_details?.title}`,
      description:char_details?.excerpt, 
       url: `https://culturays.com/character/${slug}/`,
      siteName: 'Urban Naija',
      images: [{url:char_details?.featuredImage.node.sourceUrl, 
          width: 800,
          height: 600,
          ...previousImages
        }],
      type: "article",
      publishedTime:char_details?.date
    },
    alternates: {
    canonical:  `https://culturays.com/character/${slug}/`,
 
  }
  }
}  
 async function CharacterPage ({ params  }: Props) {
const slug =(await params).slug  
const character_data = await newcharCall(slug)  
const related_chars = await relatedChars()
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
const jsonLd:WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
   headline: `Urban Naija - ${character_data?.title}`, 
   description:replaceHTMLTags(character_data?.excerpt) , 
   datePublished:toIsoDate(character_data?.date),
   dateModified:toIsoDate(character_data?.date),
   url:`https://culturays.com/character/${slug}/`,
   mainEntity: {
    "@type": "Person",
    name:character_data?.title,     
    image:character_data?.featuredImage.node.sourceUrl , 
   
  },
   
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":`https://culturays.com/character/${slug}/`, 
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