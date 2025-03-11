"use client"
import { VidProps } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useEffect } from 'react'; 

const SlidingSide = ({ newsItems, speed = 50000} :{newsItems:VidProps[], speed:number}) => {
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  useEffect(() => {
    const tickerElement = tickerRef.current as HTMLDivElement ;
    let startPosition = tickerElement?.scrollWidth as number;

    const animateTicker = () => {
      startPosition--;
      tickerElement.style.transform = `translateX(-${startPosition}px)`;

      if (startPosition <=0) {
        startPosition = tickerElement.scrollWidth ;
      }
 
      requestAnimationFrame(animateTicker);
    }; 

    const tickerInterval = setInterval(animateTicker, speed);
    return () => clearInterval(tickerInterval);
  }, [tickerRef]);
 

  return (  
    <div className='p-5 shadow-xl flex'>
      <div className='flex' ref={tickerRef}>
        {newsItems.concat(newsItems).map((item, index) => (
   <div className='flex p-2 border-r border-gray-700' key={index + ' ' + Math.random()}>         
          <div className="w-max cursor-pointer h-32 overflow-hidden py-2">  
          <Image  
          className='inline hover:opacity-80 w-40' 
          src={item.featuredImage.node.sourceUrl }
         width={300}
         height={300}
         alt={item.title}
 />
 
</div> 

 <div className="px-3 cursor-pointer py-2 w-80 sm:w-72">    
 <Link href={`/news/video/${item.slug}`}>
 <h2 key={index} className='text-2xl font-bold text-gray-700 hover:text-orange-800'>
        {item.title}
    </h2></Link> 
    </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingSide;