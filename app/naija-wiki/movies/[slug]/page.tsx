import { charsFilms, newchars, relatedChars } from "../../newCharHandle"
import type { Metadata, ResolvingMetadata } from 'next'  
import ActorsMovie from "@/components/NaijaWiki/Movie";
import StructuredData from "@/components/StructuredData";
import { ProfilePage, WithContext } from "schema-dts";
import { CharacterProps } from "@/app/types";

  interface Character {
    charactertitles: {
      filmname: string;
      portrayedby:string
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
   const charsList = await charsFilms(slug.toLowerCase().trim().replace(/-/g, ' '))
  const charactertitles= charsList.map((xy:CharacterProps)=> xy.naijaWikis.nodes).map((dy:CharacterProps)=> dy).flat()
   const previousImages = (await parent).openGraph?.images || []
 
    return {
      title: `Urban Naija | Movies - ${charactertitles[0]?.charactertitles.portrayedby} `,
      description:`${charactertitles[0]?.title}, ${charactertitles[0]?.charactertitles.portrayedby}, ${charactertitles[0]?.charactertitles.filmname}`, 
      keywords:[charactertitles[0]?.title, charactertitles[0]?.charactertitles.portrayedby, charactertitles[0]?.charactertitles.filmname].join(', '),
     twitter: {
      card: 'summary_large_image',
      title: charactertitles[0]?.charactertitles.portrayedby,
      description:charactertitles[0]?.charactertitles.portrayedby, 
      images:[charactertitles[0]?.charactertitles.actorImgs.node.sourceUrl, ...previousImages],  
    },
      openGraph: {
      title: `Naija Wiki | Movies - ${charactertitles[0]?.charactertitles.portrayedby} `,
      url: `https://culturays.com/naija-wiki/movies/${slug.toLowerCase().trim().replace(/-/g, ' ')}/`,
      siteName: 'Urban Naija',
      description:`${charactertitles[0]?.title}, ${charactertitles[0]?.charactertitles.portrayedby}, ${charactertitles[0]?.charactertitles.filmname}`, 
        images: [{url: charactertitles[0]?.charactertitles.actorImgs.node.sourceUrl, width: 800,
          height: 600, ...previousImages}]       
      },
      alternates: {
    canonical:  `https://culturays.com/naija-wiki/movies/${slug.toLowerCase().trim().replace(/-/g, ' ')}/`,
 
  }
    } 
  }

const ActorsMoviePage =async ({params}: Props) => {
const slug =(await params).slug
const charsList = await charsFilms(slug) 
const charactertitles= charsList.map((xy:CharacterProps)=> xy.naijaWikis.nodes).map((dy:CharacterProps)=> dy).flat()
const listOtherChars =await relatedChars()  

const jsonLd:WithContext<ProfilePage> = {
   '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  headline: `Culturays - ${charactertitles[0]?.charactertitles.portrayedby} | Movies `, 
   description: `${charactertitles[0]?.title}, ${charactertitles[0]?.charactertitles.portrayedby}, ${charactertitles[0]?.charactertitles.filmname}`, 
   url:`https://culturays.com/naija-wiki/movies/${slug.toLowerCase().trim().replace(/-/g, ' ')}/`,
   mainEntity: {
    "@type": "Person",
    name:`${charactertitles[0]?.charactertitles.portrayedby} - Movies`,     
    image: charactertitles[0]?.charactertitles.actorImgs.node.sourceUrl , 
   
  },
   
  //   mainEntityOfPage: {
  //    "@type": "WebPage",
  //    "@id":`https://culturays.com/naija-wiki/movies/${slug.toLowerCase().replace(/-/g, ' ')}/`, 
  //  },

   image: charactertitles[0]?.charactertitles.actorImgs.node.sourceUrl, 
   keywords:[charactertitles[0]?.title, charactertitles[0]?.charactertitles.portrayedby,charactertitles[0]?.charactertitles.filmname].join(', '),    
   
 };
 
  return ( 
  <div>
<StructuredData schema={jsonLd} />
  <ActorsMovie
 listMovies={charsList}
 listOtherChars={listOtherChars}
 />  
 </div>
  )
}

export default ActorsMoviePage
