"use client" 
import { liveNewsFeed } from '@/app/live/live';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LiveNews = ({ news }:{news:{title:string, id:string, content:string, modified:string, author:{node:{name:string}}}}) => { 
  const [liveNews, setLiveNews] = useState(news); 
 const {id}= useParams<{ id: string }>() 
  useEffect(() => {
    if (!id) return; 
    const interval = setInterval(async () => {
       const news= await liveNewsFeed(id)
      if (news.modified !== liveNews.modified) {
        setLiveNews(news); 
        playNotificationSound();
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [liveNews]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
    toast.info('News updated!', { position: 'top-right' });
  };
  const [currentHour, setCurrentHour] = useState('');

  useEffect(() => {
    setCurrentHour(new Date(liveNews.modified).toLocaleTimeString());
  }, []);
  return (<> 
    <ToastContainer />  
    <div className='dark:text-gray-800 py-6 px-6 sm:px-11'> 
   
      <div className="flex items-center text-green-500 font-bold">
    <span className="animate-pulse mr-2 text-8xl ">•</span> Live
  </div>
      <div className='py-6'> 
      <h1 className='text-4xl py-2'>{liveNews.title}</h1>
       <small className='text-base'>Last updated: {currentHour}</small> 
      </div>
      <hr/>
      <hr/>
      {liveNews.content.split('\n').map((ex,i)=> 
     <div dangerouslySetInnerHTML={{__html:ex}} key={ex + ' ' + Math.random()} className='text-xl leading-8 py-1 [&_p>a]:text-green-600 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold'/> 
  
    )} 
   
    </div>
  </>);
};

 

export default LiveNews
 
