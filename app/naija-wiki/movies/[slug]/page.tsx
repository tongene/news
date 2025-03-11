import { newchars } from "../../newCharHandle"
import type { Metadata, ResolvingMetadata } from 'next'  
import ActorsMovie from "@/components/NaijaWiki/Movie";

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
      title: `Culturays - ${charactertitles?.charactertitles.portrayedby} | Movies `,
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
 
  return ( 
    <div>  
 <ActorsMovie
 listMovies={listMovies}
 listOtherChars={listOtherChars}
 /> 
 </div>
  )
}

export default ActorsMoviePage
