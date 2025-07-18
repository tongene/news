"use client"  
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image" 
import Link from "next/link"
import { CharacterProps } from "@/app/types"

const ActorsMovie = ({listMovies, filmsChar,filmsName,listOtherChars }:{listMovies:CharacterProps[],filmsChar:CharacterProps[], filmsName:CharacterProps[], listOtherChars:CharacterProps[]}) => {
const naijaWikis:CharacterProps[]= listMovies.map((xy )=> xy.naijaWikis.nodes).map((dy )=> dy).flat() 
const [charactertitles]= naijaWikis

const characterItems:CharacterProps[]=listMovies.map((ex)=>ex.naijaWikis.nodes).flat()
const titleIdx = characterItems.filter((xy:CharacterProps)=> xy.charactertitles?.charRel?.edges??[]?.length>0 )
const char_itx = titleIdx.map((xy:CharacterProps)=> xy.charactertitles.charRel.edges).flat(); 
 
     const nextFilms= listOtherChars.map((xy)=> xy.charactertitles) 
     const fixFilmname = nextFilms.filter((item, index, self) =>  index === self.findIndex((t) => t.filmname === item.filmname))
 const filmsStory:CharacterProps[] = filmsChar.map((xy)=>
xy.naijaWikis.nodes.filter((dy:CharacterProps)=>{  
  return dy.charactertitles.filmAbout !== null
 })).flat()
  const filmsId:CharacterProps[] = filmsName.map((xy)=>
xy.naijaWikis.nodes.filter((dy:CharacterProps)=>{  
  return dy.charactertitles.filmAbout !== null &&dy.charactertitles.portrayedby!==charactertitles?.charactertitles.portrayedby
 })).flat()
  const filmsIdFull:CharacterProps[] = filmsChar.map((xy)=>
xy.naijaWikis.nodes.filter((dy:CharacterProps)=>{  
  return dy.charactertitles.filmAbout !== null &&dy.charactertitles.portrayedby===charactertitles?.charactertitles.portrayedby
 })).flat()

 const filmsList= filmsChar.map((xy)=> xy.naijaWikis.nodes).flat()
 
  return (
    <div> 
   <div className='p-11 max-w-7xl font-bold bg-gray-700 text-white lg:mx-11'> 
<h3 className="text-4xl text-center">{charactertitles?.charactertitles.portrayedby} Movies</h3> 
 {/* {filmsStory.map((xy)=>(
 <div className='md:flex border p-4'key={xy.charactertitles.filmname} >  
 <div className="border md:w-1/2 lg:w-1/3 h-max" >  
  <Image 
  className="h-56 min-[400px]:h-64 sm:h-80 md:h-64"
    src={xy.charactertitles?.actorImgs?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xy.charactertitles.filmname}/> 
    </div>
    <div className="md:w-1/2 lg:w-3/4 text-center"> 
      <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Name: </p><span className="text-2xl font-bold w-3/4 p-3">{xy.charactertitles.portrayedby}</span>  
</div> 
<div className="flex">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4 border-r-2"> About: </p><span className="text-lg w-3/4 p-3 border-b-2"> {xy.charactertitles.actorsBios}</span> </div> 
  </div> 
 </div> 
   
 ))} */}
</div> 

 <section > 
  {filmsId.map((xy:CharacterProps)=> (xy.charactertitles.filmname===charactertitles.charactertitles.filmname&&
 <div className='lg:flex p-4 sm:w-4/5 md:w-3/5 lg:w-full'key={xy.id} >  
    <div className="border lg:w-1/3 xl:w-1/4" >   
  <Image 
  className="h-80"
    src={xy.charactertitles?.filmImg1?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xy.charactertitles.filmname}/> 
    </div>
<div className="lg:w-1/2 xl:w-1/3"> 
  <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Title: </p><span className="text-2xl font-bold  p-3">{xy.charactertitles.filmname}</span>  
</div> 

<div className="flex border">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4"> Description: </p><span className="text-lg w-3/4 p-3"> {xy.charactertitles.filmAbout}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Genre:</p><span className="text-lg w-3/4  p-4"> {xy.charactertitles.genre}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Director: </p><span className="text-lg w-3/4 p-4" style={{lineHeight:'50px'}}>{xy.charactertitles.filmDirector}</span></div> 
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Release Date/Year: </p><span className="text-lg w-3/4 p-4">{xy.charactertitles.releaseDate}</span>
</div> 
</div>
 </div>) )} 
  {filmsList.map((xy:CharacterProps)=> (xy.charactertitles.filmname!==charactertitles.charactertitles.filmname&&
 <div className='lg:flex p-4 sm:w-4/5 md:w-3/5 lg:w-full'key={xy.id} >  
    <div className="border lg:w-1/3 xl:w-1/4" >   
  <Image 
  className="h-80"
    src={xy.charactertitles?.filmImg1?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xy.charactertitles.filmname}/> 
    </div>
<div className="lg:w-1/2 xl:w-1/3"> 
  <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Title: </p><span className="text-2xl font-bold  p-3">{xy.charactertitles.filmname}</span>  
</div> 

<div className="flex border">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4"> Description: </p><span className="text-lg w-3/4 p-3"> {xy.charactertitles.filmAbout}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Genre:</p><span className="text-lg w-3/4  p-4"> {xy.charactertitles.genre}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Director: </p><span className="text-lg w-3/4 p-4" style={{lineHeight:'50px'}}>{xy.charactertitles.filmDirector}</span></div> 
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Release Date/Year: </p><span className="text-lg w-3/4 p-4">{xy.charactertitles.releaseDate}</span>
</div> 
</div>
 </div>) )} 
  {filmsIdFull.map((xy:CharacterProps)=> (xy.charactertitles.filmname===charactertitles.charactertitles.filmname&&
 <div className='lg:flex p-4 sm:w-4/5 md:w-3/5 lg:w-full'key={xy.id} >  
    <div className="border lg:w-1/3 xl:w-1/4" >   
  <Image 
  className="h-80"
    src={xy.charactertitles?.filmImg1?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xy.charactertitles.filmname}/> 
    </div>
<div className="lg:w-1/2 xl:w-1/3"> 
  <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Title: </p><span className="text-2xl font-bold  p-3">{xy.charactertitles.filmname}</span>  
</div> 

<div className="flex border">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4"> Description: </p><span className="text-lg w-3/4 p-3"> {xy.charactertitles.filmAbout}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Genre:</p><span className="text-lg w-3/4  p-4"> {xy.charactertitles.genre}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Director: </p><span className="text-lg w-3/4 p-4" style={{lineHeight:'50px'}}>{xy.charactertitles.filmDirector}</span></div> 
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Release Date/Year: </p><span className="text-lg w-3/4 p-4">{xy.charactertitles.releaseDate}</span>
</div> 
</div>
 </div>) )} 
  <table className="border w-2/4 md:w-3/4 lg:w-1/2 mx-auto"><thead><tr ><td className="text-2xl p-8 font-bold">Characters of {charactertitles.charactertitles.portrayedby}</td></tr></thead><tbody className="md:flex justify-center">{ (characterItems as CharacterProps[]).map((xx, i)=>   
    <tr className="border" key={i + ' ' + xx.title}><td>
       <div className="border p-2 m-2 w-80"> 
      <div className="">
     
      <Image      
      className="h-56 w-80"  
    src={xx?.featuredImage?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xx?.featuredImage?.node.altText}/> 
    </div> 
     
  <ul className="text-xl font-bold flex jusify-between my-2"> 
    <Link href={`/naija-wiki/character/${xx.slug}/`}><h3> {xx.title} <FontAwesomeIcon icon={faArrowRight} className="text-sm font-lighter mx-4"/>{xx?.charactertitles.filmname}</h3></Link>
 
 </ul> 
 <ul><li dangerouslySetInnerHTML={{__html:xx?.charactertitles.charBios}}className="list-disc text-lg overflow-hidden text-ellipsis leading-8"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></ul>
    </div>
    </td></tr>) }</tbody><thead><tr ><td className="text-2xl p-11 font-bold w-full">Related Actors</td></tr></thead><tbody>  
  {char_itx.map((xx, i)=><tr key={i + ' ' + xx?.node.title} >    
   {xx?.node.title&& <td className="border"><Link href={`/naija-wiki/character/${xx?.node?.slug}/`}><h3 className="text-xl font-bold p-3 text-center"> {xx?.node?.charactertitles?.portrayedby} </h3></Link>  
       <div className=" border p-2 m-2 "> 
     <div className="w-44">     
      <Image
    className=""
    src={xx?.node?.featuredImage?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xx?.node?.featuredImage?.node.altText}/> 
    </div>  
  <ul className=""> 
  <p className="list-disc text-xl font-bold my-2 my-4"> <FontAwesomeIcon icon={faArrowRight} className="text-sm font-lighter mx-4" />{xx?.node?.title} </p>
   <li dangerouslySetInnerHTML={{__html:xx?.node?.excerpt}}className="list-disc text-lg my-2 p-4 m-4"/>
  <li dangerouslySetInnerHTML={{__html:xx?.node?.content}}className="list-disc text-lg my-2 p-4 m-4 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800"/>
      
 </ul>  
    </div>
    </td>}</tr>) }</tbody>
    </table>   
</section>  
<div className="px-11 py-4 text-center text-2xl font-bold w-max">
  <h3>Next Actors</h3> 
</div>
  <div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
<div className='flex' style={{width:'1000px'}}>  
  {fixFilmname.slice(0,10).map((xy)=>
    <div key={xy.filmname + ' ' + Math.random()}className='border pt-5 px-3 w-96'>
     <Link href={`/naija-wiki/movies/${xy.portrayedby.toLowerCase().trim().replace(/ /g,'-')}/`}> <h3 className='text-red-500 hover:bg-black italic py-2 hover:dark:text-gray-500 p-2 font-bold text-2xl'>{xy.portrayedby}</h3></Link> 
<div className="w-72 h-44">
  <Image
  className="w-72 h-44"
  width={1200}
  height={675}
   src={xy.actorImgs.node.sourceUrl}
   alt={xy.actorImgs.node.altText}/>
   </div>
   <Link href={`/naija-wiki/character/${xy.characterWiki.slice(0, -5).toLowerCase().trim().replace(/ /g,'-')}/`}><h2 className="text-gray-800 hover:text-gray-700 hover:dark:text-gray-500 dark:text-gray-300 font-bold hover:bg-red-500 hover:text-white cursor-pointer text-center overflow-hidden text-ellipsis py-3" >{xy.characterWiki.slice(0, -5)}</h2></Link> 
 
</div>
)}
</div>
</div>  
   </div>
  )
}

export default ActorsMovie
