import React from 'react'
import VideoPlayer from '../VideoPlayer'
import Image from 'next/image'
import Link from 'next/link'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShareButtons from '../ShareButtons'
import moment from 'moment'
import { VidProps } from '@/app/types'

const VideoDetail = ({vid_details}:{vid_details:VidProps}) => { 
     const related= vid_details.videosGroup.related?.nodes
   
  return (
    <div className='bg-black'> 
    <div className='relative max-w-7xl m-auto p-3 text-gray-200'>
      <div className='my-2'> 
        <div  > 
         
      <h2 className='p-4 text-4xl'>{vid_details.title}</h2>
      <div className='flex flex-wrap justify-between'> 
      <Link href={`/creator/${vid_details?.author.node.slug}`}><p className='text-lg p-3 underline'>{vid_details.author.node.name} </p></Link> 
       <p className='text-sm p-3 text-red-600 italic text-end'>{moment(vid_details.date).fromNow()} </p>
     
     </div>
    
      <hr className='my-0.5'/>
      <hr className='my-0.5'/> 
   
      </div>
        
      <div className="py-3 [&_.share-view]:max-w-max [&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:w-full [&_.share-view]:lg:left-3/4 [&_.share-view]:md:left-2/3 [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:xs:py-3">
  <ShareButtons 
 item={vid_details} 
 activeIdx={vid_details.id}
  shareOptions={true}
    /> 
     </div> 
     <hr className='my-0.5'/>
     <hr className='my-0.5'/>
     
 <VideoPlayer
      videoSrc={vid_details.videosGroup.videoUrl.node.mediaItemUrl}
      posterSrc={vid_details.featuredImage.node.sourceUrl}
      />  
      <div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:vid_details.featuredImage.node.caption}} className="absolute bottom-6 left-2 xs:left-auto xs:right-28 py-6 leading-8 shadow-xl font-mono max-w-44 xs:max-w-xl"/>
 
 </div>
      </div>   
  
      <div className='mx-3 my-6'>
      <div dangerouslySetInnerHTML={{__html:vid_details.excerpt}} className="text-lg italic my-2"/>
      <hr />
      <hr />
      <div dangerouslySetInnerHTML={{__html:vid_details.content}} className="my-2 leading-8"/>

      </div>
 <div className='flex gap-1 overflow-x-auto overflow-y-hidden '>
  {related?.map((xy)=>
  <div key={xy.title + Math.random()} className='my-2 max-w-xs'> 
<div className='border-white border-4 '>
      <Image
      className='max-h-32 sm:max-h-44 md:max-h-48'
      src={xy.featuredImage.node.sourceUrl} 
      width={1200} 
      height={675} 
      alt={xy.featuredImage.node.altText}/>

      </div>
       <div className='border flex px-2 py-8'>
      
       <Link href={`/news/video/${xy.slug}`}><h2 className='search-title text-xl text-gray-200'>{xy.title}</h2></Link>  
   
        <button className="rounded-full border text-gray-300 hover:border-4 hover:text-gray-50 text-2xl cursor-pointer h-12 w-28 sm:w-24 sm:h-16 mx-1">
    <Link href={`/news/video/${xy.slug}`}><span><FontAwesomeIcon icon={faPlay}/></span></Link>  
        </button>         
      </div> 
  
 </div>
  )}
 </div> 
    </div> 
  </div>)
}   

export default VideoDetail
