import Characters from "@/components/NaijaWiki/Characters";
import { newchars } from "../../newCharHandle"
import type { Metadata, ResolvingMetadata } from 'next' 
// export const metadata:Metadata = {  
//    title:"Naija Wiki | Characters",  
//   description: "Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa.",
//   }; 
  
  interface Character {
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
    const charsList = await newchars()
    const listChars = charsList?.filter((post: Character) => 
      post.charactertitles.filmname.toLowerCase().replace(/ /g, '-') === slug
    );
    const [charactertitles]= listChars 
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: `${charactertitles?.charactertitles.filmname} | Characters`,
      openGraph: {
        images: [charactertitles.charactertitles.filmImg1.node.sourceUrl, ...previousImages],
      },
    } 
  }

const CharactersPage =async ({params}: Props) => {
const slug =(await params).slug
const charsList = await newchars()
const listChars = charsList?.filter((post: Character) => 
  post.charactertitles.filmname.toLowerCase().replace(/ /g, '-') === slug
);
const listOtherChars = charsList?.filter((post: Character) => 
  post.charactertitles.filmname.toLowerCase().replace(/ /g, '-') !== slug
);
  return ( 
    <div>  
 <Characters
 listChars={listChars}
 listOtherChars={listOtherChars}
 />  

    </div>
  )
}

export default CharactersPage
