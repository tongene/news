"use client"
import { LatestProps, LiveProps } from '@/app/types';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Live from './Home/Live';
 const newsByLatest =()=>{  

const wprest= fetch('https://content.culturays.com/graphql',{ 
method: "POST",
  headers: {
      'Content-Type':'application/json'
    },
next: { revalidate: 60 }, 
body: JSON.stringify({
  query:`
  query WPPOSTS { 
posts(first: 10, where: {categoryName: "Latest"})  { 
 
pageInfo {
endCursor
} 
edges{
cursor 
node{
id
title
  slug
  
  tags {
nodes {
name
slug
}
}
categories {
    nodes {
      name
      slug
    }
  }
excerpt
  date
    author {
  node {
firstName
lastName
name
slug
description
}
}
  featuredImage {
    node {
      altText
      sourceUrl
    }
  }

}
 }}}  
 
  ` 

}) 
}).then((res)=> res.json())
.then((data)=> data.data)
.catch(error => console.log('err',error))
  return wprest; 

}  

const SLIDE_INTERVAL = 5000; 
const MainSlider = () => {  
const router = useRouter()  
const [latestPosts, setLatestPosts] = useState<LatestProps[]>([]);
const [loading, setLoading] = useState(false)  
const getLatests=async()=>{  
const latestx=await newsByLatest()  
setLatestPosts(latestx?.posts.edges) ?? []
setLoading(false)
}
useEffect(() => {
  setLoading(true)  
 getLatests()

      },[])


  const [activeIndices, setActiveIndices] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const left_slide = () => {     
    setActiveIndices(([left, right]) => {
      const newLeft = left - 1 < 0 ?latestPosts.length - 1 : left - 1;
      const newRight = right - 1 < 0 ? latestPosts.length - 1 : right - 1;
      return [newLeft, newRight];
    }) ;
 
  const slideTimeOut=  setTimeout(() => { 
      setActiveIndices((prev) => {       
        const newValues = activeIndices.filter((n) => !prev.includes(n));  
        return [...newValues, ...prev ];
      });
     
    },10000); 
  };
  
  const right_slide = () => {         
    setActiveIndices(([left, right]) => {
      const newLeft = (left + 1) % latestPosts.length;
      const newRight = (right + 1) %latestPosts.length; 
      return [newLeft, newRight];
    }) ; 
    const slideTimeOut= setTimeout(() => {  
      setActiveIndices((prev) => {
        const newValues = activeIndices.filter((n) => !prev.includes(n));
        return [...newValues, ...prev ];
      });

  },10000);
 
  }; 

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        const firstSlide = sliderRef.current.querySelector(".x-main-x-slider") as HTMLElement;
        if (firstSlide) {
          setSlideWidth(firstSlide.offsetWidth);
        }
      }
    };

    updateWidth(); 
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [latestPosts]);

  // Auto-slide effect
  useEffect(() => {
    if (paused || latestPosts.length === 0 || slideWidth === 0) return;

    const interval = setInterval(() => {
     setIndex((prev) => (prev + 1) % latestPosts.length);    
    
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [paused, latestPosts.length, slideWidth ]);

  const handleSlideClick = (link: string) => {
   return router.push(link);
  };
 
  return ( 
    <section className='flex flex-col justify-center items-center my-11'> 
    <h2 className='text-gray-600 font-bold text-4xl text-center py-4 dark:text-gray-300'>Recently Added</h2> 
    {loading && <span className="loader"></span>}
    
<div className='relative lg:w-2/3 xl:w-2/4 w-full xs:w-3/4 md:w-11/12 top-60 px-1 z-50'>
<div className="flex justify-between"> 

     <div onClick={left_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
     <FontAwesomeIcon icon={faAngleLeft}/> 
     </div>
      
     <div onClick={right_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
     <FontAwesomeIcon icon={faAngleRight}/>
      </div> 
     </div>
     </div>
    <hr className='w-1/2 m-auto h-1 dark:bg-gray-300 bg-gray-600'/>  
   
 <div 
  className="w-[300px] md:w-[600px] overflow-hidden relative main_slider"  
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
>
  <div
    className="main-x-slider flex transition-transform duration-500 ease-in-out"
    style={{ transform: `translateX(-${index}px)` }}
    ref={sliderRef}
  >

   <Live/> 
  {latestPosts?.map((xy, i) => (
<div key={xy.node.slug}> 
        
     {  activeIndices.includes(i)&&
      <div className="x-main-x-slider flex-shrink-0 p-1 h-96">
        <div className="main-slider-container px-2 py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border">
           <> 
            
              <Link href={`/topic/${xy.node.tags.nodes[0].slug}/`}>
                <p className="italic text-red-600 px-1 text-left">{xy.node.tags.nodes[0].name}</p>
              </Link>
              <Link href={`/news/highlight/${xy.node.slug}/`}>
                <h2 className="overflow-hidden leading-8 py-6 text-gray-600 text-xl py-4 px-3 h-32 font-bold hover:text-gray-500 cursor-pointer dark:text-gray-200" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>
                  {xy.node.title}
                </h2>
              </Link>
              <Image
                className="h-56 w-[300px] px-1 py-2 hover:opacity-50"
                src={xy.node.featuredImage?.node.sourceUrl}
                width={400}
                height={400}
                alt={xy.node.featuredImage?.node.altText}
              />
            </> 
        </div>
      </div>}

     </div> ))}
   
  </div>
</div> 

<hr className='w-11/12 m-auto bg-gray-600 h-1'/>
</section>
)
};

export default MainSlider;
