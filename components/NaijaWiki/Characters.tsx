"use client"  
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image" 
import Link from "next/link"
import { CharacterProps } from "@/app/types"
const Characters = ({listChars, listOtherChars }:{listChars:CharacterProps[],listOtherChars:CharacterProps[]}) => {
  const [charactertitles]= listChars 
  const titleIdx = listChars.map((ex)=>ex.charactertitles.charRel?.edges??[] ).flat() 
   const char_itx = titleIdx.filter((e, i, a) => {
    return a?.findIndex(item => item?.node?.title === e?.node?.title) === i  
  } ); 
 
 const nextFilms= listOtherChars.map((xy)=> xy.charactertitles) 
 const fixFilmname = nextFilms.filter((item, index, self) =>  index === self.findIndex((t) => t.filmname === item.filmname)) 
 
//has the same result as char_itx
//  <tbody>{ listChars.map((xx, i)=><tr key={i + ' ' + xx.title} ><td className="border">  
//  <Link href={`/naija-wiki/character/${xx.slug}`}><h3 className="text-xl font-bold p-3 text-center"> {xx.title} </h3></Link> 
//        <div className=" border p-2 m-2 "> 
//        <div className="w-1/4"><Image
//   className=""
//     src={xx?.featuredImage?.node.sourceUrl}
//     width={1250}
//     height={650}
//     alt={xx?.featuredImage?.node.altText}/> 
//     </div> 
//   <ul className=""> 
//   <p className="list-disc text-xl font-bold my-2 my-4"> <FontAwesomeIcon icon={faArrowRight} className="text-sm font-lighter mx-4" />{xx.charactertitles?.portrayedby} </p>
//   <li dangerouslySetInnerHTML={{__html:xx.excerpt}}className="list-disc text-lg my-2 p-4 m-4"/>
//   <li dangerouslySetInnerHTML={{__html:xx.content}}className="list-disc text-lg my-2 p-4 m-4"/> 
//  </ul> 
//     </div></td></tr>) }</tbody>
  return (
    <div> 
  <div className=' p-11 text-center text-4xl font-bold bg-gray-700 text-white '>  
<h3 >{charactertitles?.charactertitles.filmname} Characters</h3>

</div> 
 <section > 
  <div className='md:flex p-11 border lg:w-4/5' >  
    <div className="border p-3 h-1/5 md:w-1/2 lg:w-1/3"> 
  <Image
  className=""
    src={charactertitles.charactertitles.filmImg1?.node.sourceUrl}
    width={1250}
    height={650}
    alt={charactertitles.charactertitles.filmname}/> 
    </div>
<div className="md:w-1/2 lg:w-3/4"> 
  <div className="flex border"> 
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Title: </p><span className="text-2xl font-bold w-3/4 p-3">{charactertitles.charactertitles.filmname}</span>  
</div> 

<div className="flex border">
<p className="text-xl bg-gray-700 p-3 text-white w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4"> Description: </p><span className="text-lg w-3/4 p-3"> {charactertitles.charactertitles.filmAbout}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Genre:</p><span className="text-lg w-3/4  p-4"> {charactertitles.charactertitles.genre}</span> </div>
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Director: </p><span className="text-lg w-3/4 p-4" style={{lineHeight:'50px'}}>{charactertitles.charactertitles.filmDirector}</span></div> 
<div className="flex border">
<p className="text-xl bg-gray-700 p-4 text-white  w-1/2 xs:w-1/3 md:w-1/2 lg:w-1/4">Year: </p><span className="text-lg w-3/4 p-4">{charactertitles.charactertitles.releaseDate}</span>
</div> 
</div>
 </div> 

  <table className="border lg:w-1/2"><tbody>{ char_itx.map((xx, i)=><tr key={i + ' ' + xx?.node.title} ><td className="border"> 
 <Link href={`/naija-wiki/character/${xx?.node.slug}`}><h3 className="text-xl font-bold p-3 text-center"> {xx?.node.title} </h3></Link> 
       <div className=" border p-2 m-2 "> 
       <div className="w-1/4">
     
      <Image
  className=""
    src={xx?.node?.featuredImage?.node.sourceUrl}
    width={1250}
    height={650}
    alt={xx?.node?.featuredImage?.node.altText}/> 
    </div> 
 <ul className=""> 
  <p className="list-disc text-xl font-bold my-2 my-4"> <FontAwesomeIcon icon={faArrowRight} className="text-sm font-lighter mx-4" />{xx?.node.charactertitles?.portrayedby} </p>
   <li dangerouslySetInnerHTML={{__html:xx?.node.excerpt}}className="list-disc text-lg my-2 p-4 m-4"/>
  <li dangerouslySetInnerHTML={{__html:xx?.node.content}}className="list-disc text-lg my-2 p-4 m-4"/>
      
 </ul>
    </div></td></tr>) }</tbody>
    </table></section>  
<div className="px-11 py-4 text-center text-xl font-bold w-max">
  <h3>Next Characters</h3> 
</div>
<div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
<div className='flex' style={{width:'1000px'}}>  
  {fixFilmname.slice(0,10).map((xy)=>
    <div key={xy.filmname + ' ' + Math.random()}className='border pt-5 px-3 w-96'>
  <Link href={`/naija-wiki/characters/${xy.filmname.toLowerCase().replace(/ /g,'-')}`}><h2 className="text-gray-800 hover:text-gray-700 hover:dark:text-gray-500 dark:text-gray-300 font-bold hover:bg-red-500 hover:text-white cursor-pointer text-2xl text-center overflow-hidden text-ellipsis"style={{ display: '-webkit-box', WebkitLineClamp:1, WebkitBoxOrient: 'vertical' }} >{xy.filmname}</h2></Link>   
<div className="w-72 h-44">
  <Image
  className="w-72 h-44"
  width={1200}
  height={675}
   src={xy.filmImg1.node.sourceUrl}
   alt={xy.filmImg1.node.altText}/>
   </div>
 
    <Link href={`/naija-wiki/character/${xy.characterWiki.slice(0, -5).toLowerCase().replace(/ /g,'-')}`}> <h3 className='text-red-500 hover:bg-gray-500 italic py-2 hover:dark:text-gray-500 p-2 font-bold'>{xy.characterWiki}</h3></Link> 
</div>
)}
</div>
</div>
   </div>
  )
}

export default Characters
