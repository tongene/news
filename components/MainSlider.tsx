"use client"
import { LatestProps } from '@/app/types';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react'; 
const MainSlider = ({livesNews, latestPosts}:{livesNews:LatestProps[],latestPosts:LatestProps} ) => {
const latest_post_categories:any[] = latestPosts?.categories?.nodes.map((xy)=> xy?.posts?.edges).flat() 
 const router = useRouter()
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
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
 
  const left_slide = () => {
    setIsAnimating(false)
    setActiveIndices(([left, right]) => {
      const newLeft = left - 1 < 0 ? livesNews
      .concat(latest_post_categories).length - 1 : left - 1;
      const newRight = right - 1 < 0 ? livesNews
      .concat(latest_post_categories).length - 1 : right - 1;
      return [newLeft, newRight];
    });
   
  const slideTimeOut=  setTimeout(() => {
      setIsAnimating(true)
      setActiveIndices((prev) => {
        const newValues = activeIndices.filter((n) => !prev.includes(n));
        return [...newValues, ...prev ];
      });
     
    },10000);
    return ()=> clearTimeout(slideTimeOut)
  };
  
  const right_slide = () => {
    setIsAnimating(false)
    setActiveIndices(([left, right]) => {
      const newLeft = (left + 1) % livesNews
      .concat(latest_post_categories).length;
      const newRight = (right + 1) % livesNews
      .concat(latest_post_categories).length;
      return [newLeft, newRight];
    }); 
    const slideTimeOut= setTimeout(() => { 
      setIsAnimating(true) 
      setActiveIndices((prev) => {
        const newValues = activeIndices.filter((n) => !prev.includes(n));
        return [...newValues, ...prev ];
      });

  },10000);
  return ()=> clearTimeout(slideTimeOut)
  };
  const [hasClicked, setHasClicked]= useState(false)
  const handleClick = useCallback((str:string) => {
    if (!hasClicked) {
      setHasClicked(true);
      const slideTimeOut=  setTimeout(()=>{
setHasClicked(false)

 },1000)
 router.push(`/news/topic/${str}`);
 return ()=> clearTimeout(slideTimeOut)

    }
  }, [hasClicked]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const SLIDE_INTERVAL = 5000; // 5 seconds
  const sliderRef = useRef<HTMLDivElement>(null);
const slides=livesNews?.filter((ex) => {
  const postTime = new Date(ex.node.modified).getTime(); 
  const currentTime = Date.now(); 
  const timeDifference = currentTime - postTime;  
  return timeDifference <= 24 * 60 * 60 * 1000; 
}).concat(latest_post_categories)

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides?.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [paused]);

  const handleSlideClick = (link: string) => {
   return router.push(link);
  };
 
  return ( 
    <section className='flex flex-col justify-center items-center my-11'> 
    <h2 className='text-gray-600 font-bold text-4xl text-center py-4 dark:text-gray-300'>Recently Added</h2> 
    <hr className='w-1/2 m-auto h-1 dark:bg-gray-300 bg-gray-600'/>  
<div className="w-main_slider_small md:w-main_slider_big overflow-hidden relative main_slider"   onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
<div className="flex justify-between m-auto absolute z-40 top-1/3 w-full "> 
     <div onClick={left_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
     <FontAwesomeIcon icon={faAngleLeft}/> 
     </div>
      
     <div onClick={right_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
     <FontAwesomeIcon icon={faAngleRight}/>
      </div> 
     </div> 
<div className={'main-x-slider absolute top-0 pt-4 z-30'}
style={{width:'9000px' }} ref={sliderRef}> 
{slides?.map((xy,i)=>xy?.node?.contentTypeName !=='live'?
activeIndices.includes(i)&&
<div className='x-main-x-slider float-left p-1 h-96' key={i}>
 
<div className="main-slider-container px-2 py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border">
  <p className='italic text-red-600 px-1 text-left'>{moment(xy.node.date).fromNow()}</p>
 <h2 onClick={() => handleSlideClick(`/news/topic/${xy.node.slug}`)}className="overflow-hidden leading-8 py-6 text-gray-600 text-xl py-4 px-3 h-32 font-bold hover:text-gray-500 cursor-pointer dark:text-gray-200" style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2> 
  
   <Image      
    className='h-56 px-1 py-2 hover:opacity-50'
    src={xy.node.featuredImage.node.sourceUrl}
    width={1200}
    height={675} 
    alt={xy.node.featuredImage.node.altText}
    />      
</div>    
</div>:
  <div className='x-main-x-slider float-left p-1 h-96' key={i + ' ' + Math.random()}>
  <div className="main-slider-container px-2 text-center py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border" > 
  <div className="flex font-bold justify-between items-center text-red-600 ">
 <p><span className="animate-pulse text-5xl">•</span> Live</p> 
  <span className='text-sm italic px-1'>{currentHour}</span>  
</div>
 <h2  onClick={() => handleSlideClick(`/news/live/${xy.node.databaseId}/${xy.node.slug}`)} className="overflow-hidden leading-8 py-6 text-gray-600 text-xl py-4 px-3 h-32 hover:text-gray-500 cursor-pointer dark:text-gray-200"  style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2> 
 <Image
      className='h-56 px-1 py-2 hover:opacity-50'
      src={xy.node.featuredImage.node.sourceUrl}
      width={1200}
      height={675} 
      alt={xy.node.featuredImage.node.altText}
      />    
  </div>    
  </div>
)}
</div>

</div>

<hr className='w-11/12 m-auto bg-gray-600 h-1'/>

</section>
)
};

export default MainSlider;
