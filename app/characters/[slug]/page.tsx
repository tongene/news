import Characters from "@/components/NaijaWiki/Characters"; 
import type { Metadata, ResolvingMetadata } from 'next' 
import { Article, ProfilePage, WithContext } from "schema-dts";
import StructuredData from "@/components/StructuredData";
import { CharacterProps } from "@/app/types";
import { charsFilms, relatedChars } from "@/app/newCharHandle";
  
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
    const charsList = await charsFilms(slug)   
    const naijaWikis= charsList.map((xy:CharacterProps)=> xy.naijaWikis.nodes).flat()
    const [charactertitles]=naijaWikis
    const previousImages = (await parent).openGraph?.images || []
    
    return {
      title: `Urban Naija | ${charactertitles?.charactertitles.filmname ||''} Characters`,
      description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname} `,
      keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),
      twitter: {
      card: 'summary_large_image',
      title: charactertitles?.charactertitles.filmname ,
      description: charactertitles?.charactertitles.filmAbout, 
        images: [charactertitles?.charactertitles.filmImg1.node.sourceUrl, ...previousImages],
    },
      openGraph: {
      title: `Naija Wiki | ${charactertitles?.charactertitles.filmname} Characters`,
       url: `https://culturays.com/characters/${slug.toLowerCase().trim().replace(/ /g,'-')}/`,
      siteName: 'Urban Naija',
      description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname} `,
        images:[{url:charactertitles?.charactertitles.filmImg1.node.sourceUrl,
          width: 800,
          height: 600,
           ...previousImages}],
      },
      alternates: {
     canonical: `https://culturays.com/characters/${slug.toLowerCase().trim().replace(/ /g,'-')}/`,

},

    } 
  }
const CharactersPage =async ({params}: Props) => {
const slug =(await params).slug
const charsList = await charsFilms(slug.toLowerCase().replace(/-/g, ' '))   
  const naijaWikis= charsList.map((xy:CharacterProps)=> xy.naijaWikis.nodes).flat()
    const [charactertitles]=naijaWikis
  const listOtherChars =await relatedChars() 
   function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
     return new Date().toLocaleDateString()
  }
  return d.toISOString(); 
}
const jsonLd:WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
   headline: `Urban Naija - ${charactertitles?.charactertitles.filmname} | Characters `, 
   description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname}`, 
   url:`https://culturays.com/characters/${slug.toLowerCase().trim().replace(/ /g,'-')}/`,
   datePublished:toIsoDate(charsList.data||new Date().toDateString()),
   dateModified:toIsoDate(charsList.data||new Date().toDateString()),
   mainEntity: {
    "@type": "Person",
    name:`${charactertitles?.charactertitles.filmname} - Movies`,     
   image: charactertitles?.charactertitles.filmImg1.node.sourceUrl , 
  },
   
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":`https://culturays.com/characters/${slug.toLowerCase().trim().replace(/ /g,'-')}/`, 
   },

  image: charactertitles?.charactertitles.filmImg1.node.sourceUrl, 
   keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),   
   
 };
 
   return ( 
    <div> 
      <StructuredData schema={jsonLd} />  
  <Characters
 listChars={naijaWikis} 
 listOtherChars={listOtherChars}
 />  
 </div>
  )
}

export default CharactersPage
