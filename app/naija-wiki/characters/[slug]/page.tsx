import Characters from "@/components/NaijaWiki/Characters";
import { charsFilms, newchars, relatedChars } from "../../newCharHandle"
import type { Metadata, ResolvingMetadata } from 'next' 
import { Article, ProfilePage, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
  
  interface Character {
    content: string;
    charactertitles: {
      filmname: string;
      
    };
    
  }
  type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata 
  ): Promise<Metadata> {  
    const slug =(await params).slug
    const charsList = await charsFilms(slug.toLowerCase().replace(/-/g, ' '))   
    const [charactertitles]= charsList  
    const previousImages = (await parent).openGraph?.images || []
  
    return {
      title: `Urban Naija | ${charactertitles?.charactertitles.filmname} Characters`,
      description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname} `,
      keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),
      twitter: {
      card: 'summary_large_image',
      title: charactertitles?.charactertitles.filmname ,
      description: charactertitles?.charactertitles.filmAbout, 
      images:[charactertitles?.charactertitles.filmImg1.node.sourceUrl, ...previousImages],  
    },
      openGraph: {
        images: [charactertitles?.charactertitles.filmImg1.node.sourceUrl, ...previousImages],
      },
      alternates: {
     canonical: `https://culturays.com/naija-wiki/charcters/${slug.toLowerCase().replace(/-/g, ' ')}/`,

},
    } 
  }

const CharactersPage =async ({params}: Props) => {
const slug =(await params).slug
const charsList = await charsFilms(slug.toLowerCase().replace(/-/g, ' '))   
const [charactertitles]= charsList

const listOtherChars =await relatedChars() 
 
const jsonLd:WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
   headline: `Culturays - ${charactertitles?.charactertitles.filmname} | Characters `, 
   description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname}`, 
   url:`https://culturays.com/naija-wiki/characters/${slug.toLowerCase().replace(/-/g, ' ')}/`,
   mainEntity: {
    "@type": "Person",
    name:`${charactertitles?.charactertitles.filmname} - Movies`,     
   image: charactertitles?.charactertitles.filmImg1.node.sourceUrl , 
  },
   
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":`https://culturays.com/naija-wiki/characters/${slug.toLowerCase().replace(/-/g, ' ')}/`, 
   },

  image: charactertitles?.charactertitles.filmImg1.node.sourceUrl, 
   keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),   
   
 };
   return ( 
    <div> <StructuredData schema={jsonLd} />  
 <Characters
 listChars={charsList} 
 listOtherChars={listOtherChars}
 />  
 </div>
  )
}

export default CharactersPage
