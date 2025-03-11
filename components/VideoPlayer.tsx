"use client"

import { VidProps } from '@/app/types';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoSrc, posterSrc}:{videoSrc:string, posterSrc:string}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
       ( videoRef.current as HTMLVideoElement).pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };
  useEffect(() => {
    const updateTime = () => {
      const current = ( videoRef.current as HTMLVideoElement).currentTime;
      const duration =( videoRef.current as HTMLVideoElement).duration;
      setCurrentTime((videoRef.current  as HTMLVideoElement).currentTime);
      setProgress((current / duration) * 100);     

    };

    const updateDuration = () => {
      setDuration((videoRef.current as HTMLVideoElement).duration);
    };

    videoRef.current?.addEventListener('timeupdate', updateTime);
    videoRef.current?.addEventListener('loadedmetadata', updateDuration);

if(duration===currentTime && duration !==0)setIsPlaying(false)

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateTime);
      videoRef.current?.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isPlaying, duration, currentTime]);
 
  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleProgressChange = (e:React.ChangeEvent<HTMLInputElement> )=> {
    const newTime = (Number(e.target.value)/ 100) * duration;
   ( videoRef.current  as HTMLVideoElement).currentTime = newTime; // Update video time
    setProgress(Number(e.target.value)); // Update progress bar
  };

  return (
 
   <div className='relative w-full flex-col flex justify-center items-center'>
      <video className='inline ' width='1150px' onClick={handlePlay} poster={posterSrc} ref={videoRef}>
    <source src={videoSrc} type="video/mp4"/>
    <source src={videoSrc} type="video/ogg"/>
    <source src={videoSrc} type="video/webm"/>
    <object data={videoSrc} >
    <embed src={videoSrc}/>
    </object> 
</video> 
<div className='top-auto bottom-auto absolute text-center'>
        <button onClick={handlePlay}className="w-20 h-20 ">
        {isPlaying ?<span className='px-4 rounded-full text-gray-300 hover:text-white z-30 text-5xl cursor-pointer opacity-20 hover:opacity-50 border hover:border-4'><FontAwesomeIcon icon={faPause}/></span> :<span className='text-gray-300 hover:text-gray-50  z-30 text-5xl cursor-pointer'><FontAwesomeIcon icon={faPlay}/></span> }
        </button>
      
      </div>
      <div className="mt-4 text-gray-300 w-full flex justify-between px-4">
      <input
        type="range"
        value={progress}
        onChange={handleProgressChange}
        className="m-2 p-1.5"
        step="0.1"
        min="0"
        max="100"
      /> 
      <div className='w-40'>
   <span className='text-sm mx-1'>{formatTime(currentTime)}</span> / <span className=' text-sm mx-1'>{formatTime(duration)}</span> </div>
      </div>
 </div>

  
  );
};

export default VideoPlayer;