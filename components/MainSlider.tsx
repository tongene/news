"use client"
import { LatestProps } from '@/app/types';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
   
    setTimeout(() => {
      setIsAnimating(true)
      setActiveIndices((prev) => {
        const newValues = activeIndices.filter((n) => !prev.includes(n));
        return [...newValues, ...prev ];
      });
     
    },10000);
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
  setTimeout(() => { 
      setIsAnimating(true) 
      setActiveIndices((prev) => {
        const newValues = activeIndices.filter((n) => !prev.includes(n));
        return [...newValues, ...prev ];
      });

  },10000);
  };

  const [titleOpens,setTitlesOpen]= useState(true)
  const [arrowOpens,setArrowOpen]= useState({})
 
  const rotateArrow=()=>{ 
    if(!titleOpens){
      setTitlesOpen(prev=>!prev)
    setArrowOpen({ 
      transform: "translateX(8px)",
      transition: "transform 1s ease",
    })
  }else{
  setTitlesOpen(prev=>!prev)
 setArrowOpen({ 
      transform: "translateX(-280px)",
      transition: "transform 1s ease",
    }) 
  }
  } 
  return ( 
    <div className='relative'>
     <div className="block absolute top-72 xl:top-0 z-50 w-max bg-blue-900 rounded-xl hover:bg-gray-900 dark:bg-gray-800 "style={arrowOpens}onClick={rotateArrow}>
   
     <div className='text-white'>  
        <div className="flex items-center border-b w-80 hover:dark:bg-gray-900" > 
        <ul className="capitalize text-xl p-6 cursor-pointer">
          <li className='my-1 hover:text-gray-500'>House/Office Cleaning</li>
      <a target="_blank" href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><li className='my-2 hover:text-gray-500'>Outdoor Tasks - Groceries</li></a>  
      <a target="_blank" href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><li className='my-2 hover:text-gray-500'> Pick ups</li></a> 
      <a target="_blank" href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><li className='my-2 hover:text-gray-500'>Hospital Visits</li></a>
      <a target="_blank" href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><li className='my-2 hover:text-gray-500'>Cooking — Supervised </li></a> 
      <a target="_blank" href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><li className='my-2 hover:text-gray-500'>Gardening</li></a> 
        </ul>
      
        </div>
       
         </div>
        <div className="flex border-b border-gray-200 w-80" >
          <div className='text-white'> 
         <h2 className="text-2xl dark:bg-gray-800 text-center text-2xl font-bold dark:bg-gray-800 px-5 py-3 w-full">Daily House/Office Keeping Service</h2> 
          <p className="text-xl font-bold dark:bg-gray-800 text-center text-2xl font-bold dark:bg-gray-800 px-5 py-3 w-full">Let's Run Your Errands & Do Your Chores</p>
           </div>
       <div className="relative text-white"> 
     
      {!titleOpens&& <p className="text-2xl p-4 cursor-pointer w-max hover:scale-100 hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900" > 
      <FontAwesomeIcon icon={faAngleRight}/>
      </p> }
       {titleOpens&&<p className={`text-2xl p-4 cursor-pointer w-max hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900 hover:scale-100`} > 
      <FontAwesomeIcon icon={faAngleLeft}/>
      </p> }
       </div>
        </div>
      </div>
     

    <div className='flex flex-col justify-center items-center my-11'> 
        <h2 className='text-gray-600 font-bold text-4xl text-center py-4 dark:text-gray-300'>News</h2> 
        <hr className='w-1/2 m-auto h-1 dark:bg-gray-300 bg-gray-600'/>  
 <div className="w-main_slider_small md:w-main_slider_big overflow-hidden relative main_slider" >
 <div className="flex justify-between m-auto absolute z-50 top-1/3 w-full "> 
         <div onClick={left_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
         <FontAwesomeIcon icon={faAngleLeft}/> 
         </div>
          
         <div onClick={right_slide} className='text-5xl text-white opacity-70 bg-gray-600 cursor-pointer hover:scale-105'> 
         <FontAwesomeIcon icon={faAngleRight}/>
          </div> 
         </div> 
    <div className={isAnimating ? 'main-x-slider absolute top-0 pt-4 ':'absolute top-0 pt-4'}
    style={{width:'9000px'}}> 
    {livesNews?.filter((ex) => {
    const postTime = new Date(ex.node.modified).getTime(); 
    const currentTime = Date.now(); 
    const timeDifference = currentTime - postTime;  
    return timeDifference <= 24 * 60 * 60 * 1000; 
  }).concat(latest_post_categories).map((xy,i)=>xy?.node?.contentTypeName !=='live'?
  activeIndices.includes(i)&&
    <div className='x-main-x-slider float-left relative inline-block p-1 h-96' key={i}>
      
    <div className="main-slider-container px-2 text-center py-11 bg-gray-200 bg-opacity-60 rounded-xl w-72 border">
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
 </div>)
};

export default MainSlider;
