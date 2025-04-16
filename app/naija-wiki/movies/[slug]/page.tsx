import { newchars } from "../../newCharHandle"
import type { Metadata, ResolvingMetadata } from 'next'  
import ActorsMovie from "@/components/NaijaWiki/Movie";
import StructuredData from "@/components/StructuredData";
import { ProfilePage, WithContext } from "schema-dts";

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
    const charsList = await newchars()
    const listMovies = charsList?.filter((post: Character) => 
      post.charactertitles.portrayedby.toLowerCase().replace(/ /g, '-') === slug
    );
    const [charactertitles]= listMovies 
    const previousImages = (await parent).openGraph?.images || []

    return {
      title: `Culturays - ${charactertitles?.charactertitles.portrayedby} Movies `,
      description:`${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname}`, 
      keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),
     twitter: {
      card: 'summary_large_image',
      title: charactertitles?.charactertitles.portrayedby,
      description:charactertitles?.charactertitles.portrayedby, 
      images:[charactertitles.charactertitles.actorImgs.node.sourceUrl, ...previousImages],  
    },
      openGraph: {
        images: [charactertitles.charactertitles.actorImgs.node.sourceUrl, ...previousImages],
       
      },
    } 
  }

const ActorsMoviePage =async ({params}: Props) => {
const slug =(await params).slug
const charsList = await newchars() 
const listMovies = charsList?.filter((post: Character) => 
  post.charactertitles.portrayedby.toLowerCase().replace(/ /g, '-') === slug
);
const listOtherChars = charsList?.filter((post: Character) => 
  post.charactertitles.portrayedby.toLowerCase().replace(/ /g, '-') !== slug
);
const [charactertitles]= listMovies 
const jsonLd:WithContext<ProfilePage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
   headline: `Culturays - ${charactertitles?.charactertitles.portrayedby} | Movies `, 
   description: `${charactertitles?.title}, ${charactertitles?.charactertitles.portrayedby}, ${charactertitles?.charactertitles.filmname}`, 
   url:`https://culturays.com/naija-wiki/movies/${slug}`,
   mainEntity: {
    "@type": "Person",
    name:`${charactertitles?.charactertitles.portrayedby} - Movies`,     
    image: charactertitles.charactertitles.actorImgs.node.sourceUrl , 
   
  },
   
    mainEntityOfPage: {
     "@type": "WebPage",
     "@id":`https://culturays.com/naija-wiki/movies/${slug}`, 
   },

   image: charactertitles.charactertitles.actorImgs.node.sourceUrl, 
   keywords:[charactertitles?.title, charactertitles?.charactertitles.portrayedby, charactertitles?.charactertitles.filmname].join(', '),    
   
 };
 
  return ( 
    <div>
      <StructuredData schema={jsonLd} />
 <ActorsMovie
 listMovies={listMovies}
 listOtherChars={listOtherChars}
 /> 
 </div>
  )
}

export default ActorsMoviePage
