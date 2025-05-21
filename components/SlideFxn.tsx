"use client"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "") 
  const newString = string?.replace(regex, "");
  return newString
   }

  type SlideProps={
    slug:string
    title:string 
    excerpt:string 
    date:string
  }
 
const SlideFxn = ({content, title_item }:{content:SlideProps[], title_item:string}) => {
    const [activeSlide,setActiveSlide] =useState(0)
        
  const prevSlide=()=> {
      const slide = activeSlide - 1 < 0
        ? content.length - 1
        : activeSlide - 1;
       setActiveSlide(slide); 
    }
 const nextSlide=()=>{
      const slide = activeSlide + 1 < content.length
        ?  activeSlide + 1
        : 0;
      setActiveSlide(slide); 
    }
  return (  
 <section className='m-auto my-3 max-w-3xl relative'>
 <div className="flex justify-between m-auto absolute top-1/3 w-full"> 
 <div onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleLeft}/> 
 </div>
  
 <div onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
 <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
 </div> 
 
{content.map((item, index)=>   
 index===activeSlide&&
<div key={item?.slug + ' ' + index} className="bg-gray-900 border border-yellow-700">  
 <div className='my-2 max-w-max m-auto px-11 py-8'> 
  
  <Link href={`/news/${title_item}/${item.slug}`}><h2 className='text-3xl text-gray-300 my-1 font-bold hover:text-gray-200 cursor-pointer overflow-hidden text-ellipsis leading-10' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{item?.title} </h2> </Link>
 
 <div style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
          className='overflow-hidden text-ellipsis leading-8'>
  {item?.excerpt.split('\n').map((dy, index) => (
    <Link key={index} href={`/news/${title_item}/${item?.slug}`}>
      <div
        dangerouslySetInnerHTML={{ __html: dy }}       
        className="my-3 text-gray-200 cursor-pointer text-lg hover:text-gray-500 "
      />
    </Link>
  ))}
</div>

 <small className="text-sm my-3 p y-2 text-red-500"><em>{moment(item?.date).fromNow()}</em></small> 
  </div >  
 </div>
 ) }  
 </section> 
 
  
  )
}

export default SlideFxn