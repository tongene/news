"use client"
 
import { CharacterProps } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'  
import { useEffect, useState } from 'react' 
const Character = ({ character_data, related_chars }:{character_data:CharacterProps, related_chars:CharacterProps[]}) => { 
//  const itemtext = character_data.content.raw.children.map((typeObj, index) => {
//     const children = typeObj.children.map((item, itemindex) => item.text ) ;
// return children      
//   })  
   const containsNumbers = /[0-9]/.test(character_data.slug); 
   const stringWithoutNumbers = character_data.slug.replace(/\d+/g, ''); 
 
const [hiddenState, setHidden] = useState(true);
const[changeRandom, setChangeRandom]=useState(0)
 const navSelect=()=>{
setHidden(true)
 }
const navShadow = {
boxShadow: "0 3px 10px rgb(68, 65, 65)"
};
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }

  return ( 
    <div >      
 <nav className="sticky bg-white dark:bg-gray-800 flex justify-center p-8 my-8 z-20 " style={navShadow}>  
<h1 className='opacity-70 italic text-2xl'>{character_data.title?.toLowerCase()} </h1>     
<div className='flex justify-center'>
<h3 className='m-3 text-3xl text-center'> 
{character_data?.title} </h3>
<span className='cursor-pointer opacity-70 text-3xl mt-5' 
onMouseEnter={() => setHidden(prev => !prev)}
>&#9660;</span>
 </div>  
 
<div className='text-white p-2 relative left-0'> 
<ul className={hiddenState?'hidden':'block absolute w-56 z-30 m-auto bg-gray-800 top-10 right-10 animate-in text-center'}>
  <div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.slug}/`}><li className='text-lg'onClick={navSelect}>News </li></Link>
<span className='text-2xl cursor-pointer hover:scale-150 '>&#10095;</span>
</div>
<div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.charactertitles.portrayedby?.toLowerCase().replace(/ /g,'-')}/`}><li onClick={navSelect} className='text-lg'>{character_data.charactertitles?.portrayedby } </li></Link>
<span className='text-2xl cursor-pointer hover:scale-150 '>&#10095; </span>
</div>
<div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.charactertitles.filmname?.toLowerCase().replace(/ /g,'-')}/`}><li className='text-lg'>{character_data.charactertitles?.filmname} </li></Link> 
<span className='text-2xl cursor-pointer hover:scale-150'>&#10095;</span></div>
</ul>
 </div>
</nav>  
  
<div className=''>  
<div className='flex flex-wrap p-4 justify-between bg-gray-900 border-t'> 
  <div className='flex flex-wrap '>
  <span className='p-2 text-blue-600'>tags:</span> 
  {character_data.contentTags.nodes.map((xy, i)=><Link key={i}href={`/topic/${xy.slug}/`}><p className='p-2 text-gray-100 relative z-0 hover:text-blue-600'>  
{ xy.name }</p></Link> )} 
</div>  
<Link href={`/naija-wiki/characters/${character_data.charactertitles.filmname?.toLowerCase().replace(/ /g,'-') }/`}><p className='p-2 text-blue-600 hover:text-gray-400 relative z-0'>  
All {character_data.charactertitles.filmname} Characters</p></Link>
<Link href={`/naija-wiki/movies/${character_data.charactertitles.portrayedby?.toLowerCase().replace(/ /g,'-') }/`}><p className='p-2 text-blue-600 hover:text-gray-400 relative z-0'>  
{character_data.charactertitles.portrayedby} Movies</p></Link> 
</div>
<div className='relative' >
    <div className='-z-50 bg-cover bg-center bg-gray-600 absolute h-full w-full'style={{
      'backgroundImage': `url(${character_data.charactertitles?.filmImg1.node.sourceUrl})`,  
     backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',  
      height:'100%',
      backgroundColor: 'transparent',
      backgroundSize: 'cover'
      }
      }/> 
    
  <div dangerouslySetInnerHTML={{__html:`Photo: ${character_data.charactertitles?.filmImg1.node.caption}`}} className="absolute bottom-0 z-50 left-8 p-6 leading-8 font-mono font-bold text-orange-600"/> 
  <div className='py-20 bg-gray-900 bg-opacity-90 m-auto shadow-detailShadow px-3'>   
  <div className='lg:flex xs:max-w-7xl px-2 bg-white bg-opacity-20 flex-row-reverse m-auto justify-center items-center py-20 lg:px-0'>     
  <div className='max-w-xs m-auto px-3 ' > 
  <div className='bg-gray-200 rounded border border-gray-200'> 
    <h2 className='text-4xl py-5 px-3 bg-gray-400 font-bold'> {character_data.title}</h2> 
  <div className='rounded border border-gray-200 '>
  <Image 
  src={character_data.featuredImage.node.sourceUrl} 
  width={1250}
  height={675}
  alt='wikiimages'
  /> </div> 
  
  <p className='py-6 px-2 border-b border-gray-300 text-lg dark:text-gray-800'><b> Name:</b> {character_data.title}</p>
  <p className='py-6 px-2 border-b border-gray-300 text-lg dark:text-gray-800'><b>Known as: </b>{character_data.charactertitles.characterOtherName || '-'} </p>
  <p className='py-6 px-2 border-b border-gray-300 text-lg dark:text-gray-800'><b>Played By: </b>{character_data.charactertitles.portrayedby}</p> 
  <p className='py-6 px-2 border-b text-lg dark:text-gray-800'><b>Family: </b> {character_data.charactertitles.filmFamily}</p>
  </div>  
  
  </div> 
  
  <div className='p-2 sm:w-11/12 m-auto px-4 text-white'> 
  <div className='py-2 text-lg' dangerouslySetInnerHTML={{__html:character_data?.excerpt
}}/> 
 
  <h3 className='text-2xl font-bold py-2'> Bios </h3 >
  <hr/>  
  {character_data.charactertitles?.charBios.split('\n').map((line)=>
  <div key={Math.random()} className='py-1 text-lg leading-8' dangerouslySetInnerHTML={{__html:line
}}/> 
   )}

  <span className='text-2xl py-2 font-bold'>Information</span>
  <hr/>
  {character_data?.content.split('\n').map((line)=>
  <div key={Math.random()} className='py-1 text-lg leading-8 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800' dangerouslySetInnerHTML={{__html:line
}}/> 
   )}
  </div>  
  
  </div> 
   
  </div>  
 </div>
 

</div>  
<div className='py-4 my-8'>
  <div className='italic text-2xl font-bold text-center' dangerouslySetInnerHTML={{__html:character_data.charactertitles?.actorImgs.node.caption}}/> 
  <div className='rounded border border-gray-200 flex flex-wrap justify-center py-4'> 
  <div className='max-w-96 border border-orange-700 border-4 m-2'> 
  <Image 
  src={character_data.charactertitles?.actorImgs.node.sourceUrl} 
  width={1250}
  height={675}
  alt='wikiimages'
  /> </div>
 {character_data.charactertitles?.actorImgs2?.node.sourceUrl&& <div className='max-w-96 border border-orange-700 border-4 m-2'>
    <Image 
  src={character_data.charactertitles?.actorImgs2?.node.sourceUrl} 
  width={1250}
  height={675}
  alt='wikiimages'
  />  </div>}
   
  </div>
  </div> 
    
  <div className='italic text-xl font-bold text-center' dangerouslySetInnerHTML={{__html:character_data.charactertitles.actorsBios}}/>
  <div>

  </div>
 <div className='bg-gray-700 my-8 py-11'> 
 <h2 className='text-3xl font-bold text-center text-gray-200 opacity-80 border-b'>More Characters</h2></div>
 <section className='relatedActors px-2 min-[1050px]:px-16 xl:px-24 min-[1100px]:max-w-6xl m-auto'> 
 
 <div className="sm:flex flex-wrap justify-center gap-1 m-auto md:max-w-6xl">      
{related_chars.filter((xy)=> xy.slug!==character_data.slug ).slice(0,6).map((itex, index)=>
<div key={index} className='border max-h-48 flex items-center px-3 shadow-2xl max-w-md m-auto my-2 py-8'>  
<Image
className='w-32 h-32 xs:w-44'
src={itex.featuredImage.node.sourceUrl} 
width={1200}
height={550}
alt={ itex.title }
/>  
<div className='w-1/2 m-auto mx-3'>
  <Link href={`/naija-wiki/character/${itex.slug}/`}>
<h3 className='text-2xl text-center py-4 font-bold'>{ itex.title }</h3></Link> 
<Link href={`/naija-wiki/character/${itex.slug}/`}>
<div className='text-lg overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html:itex.excerpt}}/></Link> 
</div>  
  </div>  
   ) }

   </div>

</section>     
  
</div>  
  )
}

  
export default Character