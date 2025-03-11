"use client"
import { LatestProps } from '@/app/types';
import moment from 'moment'; 
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; 
const MainSlider = ({livesNews, latestPosts}:{livesNews:LatestProps[],latestPosts:LatestProps} ) => {
const latest_post_categories:any[] = latestPosts?.categories?.nodes.map((xy)=> xy?.posts?.edges).flat() 
 
const [isAnimating, setIsAnimating] = useState(true); 
const [screenWidth,setScreenWidth]=useState<any>({
  viewport:{
    width:0
  }
})

  useEffect(()=>{
const viewport= {
  width: document.documentElement.clientWidth ,
  height: document.documentElement.clientHeight
}
setScreenWidth(viewport )
  },[screenWidth?.viewport?.width ]) 
  const [currentHour, setCurrentHour] = useState('');
 
  useEffect(() => {
    setCurrentHour(new Date(livesNews[0]?.node.modified).toLocaleTimeString());
  }, [livesNews]);

  return ( 
    <div className='flex flex-col justify-center items-center my-11'> 
        <h2 className='text-gray-600 font-bold text-4xl text-center py-4 dark:text-gray-300'>News</h2> 
        <hr className='w-3/4 m-auto bg-gray-600 h-1 dark:bg-gray-300'/> 
 <div className="w-main_slider_small md:w-main_slider_big overflow-hidden relative main_slider" >
    <div className={isAnimating ? 'main-x-slider absolute top-0 pt-4 ':'absolute top-0 pt-4'}style={{width:'9000px'}}> 
    {livesNews?.filter((ex) => {
    const postTime = new Date(ex.node.modified).getTime(); 
    const currentTime = Date.now(); 
    const timeDifference = currentTime - postTime;  
    return timeDifference <= 24 * 60 * 60 * 1000; 
  }).concat(latest_post_categories).map((xy,i)=>xy?.node?.contentTypeName !=='live'?
    <div className='x-main-x-slider float-left relative inline-block p-1 h-96' key={i + ' ' + Math.random()}>      
    <div className="main-slider-container px-2 text-center py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border" >
      <p className='italic text-red-600 px-1 text-left'>{moment(xy.node.date).fromNow()}</p>
    <Link href={`/news/topic/${xy.node.slug}`}><h2 className="overflow-hidden leading-8 py-6 text-gray-600 text-xl py-4 px-3 h-32 font-bold hover:text-gray-500 cursor-pointer dark:text-gray-200" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link>  
       <Link href={`/news/topic/${xy.node.slug}`}>
       <Image      
        className='h-56 px-1 py-2 hover:opacity-50'
        src={xy.node.featuredImage.node.sourceUrl}
        width={1200}
        height={675} 
        alt={xy.node.featuredImage.node.altText}
        /></Link>        
    </div>    
    </div>:
      <div className='x-main-x-slider float-left relative inline-block p-1 h-96' key={i + ' ' + Math.random()}>
      <div className="main-slider-container px-2 text-center py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border" > 
      <div className="flex font-bold justify-between items-center text-red-600 ">
     <p><span className="animate-pulse text-5xl">•</span> Live</p> 
      <span className='text-sm italic px-1'>{currentHour}</span>  
  </div>
   <Link href={`/live/${xy.node.databaseId}/${xy.node.slug}`}><h2 className="overflow-hidden leading-8 py-6 text-gray-600 text-xl py-4 px-3 h-32 hover:text-gray-500 cursor-pointer dark:text-gray-200" onClick={() => setIsAnimating(false)} style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link> 
   <Link href={`/live/${xy.node.databaseId}/${xy.node.slug}`}><Image
          className='h-56 px-1 py-2 hover:opacity-50'
          src={xy.node.featuredImage.node.sourceUrl}
          width={1200}
          height={675} 
          alt={xy.node.featuredImage.node.altText}
          /></Link>        
      </div>    
      </div>
   )}
    </div>

  </div>

    <hr className='w-11/12 m-auto bg-gray-600 h-1'/>
   </div>
)
};

export default MainSlider;
