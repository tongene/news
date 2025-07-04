 
import Image from 'next/image'
import moment from 'moment' 
import Link from 'next/link' 
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from '../Side'
import { Cursors, SideNode, VidProps } from '@/app/types' 
import Paginate from '../Paginate'
const Videos = ({content_videos, sidebarItems, news_outline }:{content_videos:VidProps[], sidebarItems:Cursors[], news_outline:SideNode[] }) => { 
 const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
   
  return (
    <div className='bg-gray-50'>  
<div className="bg-black "> 
<div className='m-auto py-11 px-8 max-w-max' > 
<div className="">
<h2 className="py-6 px-2 bg-yellow-500 rounded w-max text-2xl text-white font-bold border" >Naija News in Video</h2>
<p className="text-xl py-4 text-white" >Get a quick overview of everyday events in Naija.</p>
</div>

 <section className='lg:flex m-auto justify-center'> 
  <div className='relative border'> 
  {content_videos.slice(0,1).map((nt, index)=>(
  <div key={nt.slug} className='home_grid_alt_vid '>
    <div className='max-w-5xl' >  
   <Image
    className='inline'
    src={nt.featuredImage.node.sourceUrl }
 width={1200}
 height={675}
 alt={nt.featuredImage.node.altText} 
  />
  <button>
    <Link href={`/news/video/${nt.slug}/`}><span className="absolute text-gray-300 hover:text-gray-50 hover:animate-in z-30 bottom-11 right-5 text-center text-4xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
        </button>
   </div>
      <div className='absolute z-20 top-0 sm:top-28 xs:mx-8 py-5 font-bold text-white mx-2 xs:w-3/4'>   
    <Link href={`/news/video/${nt.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}  className='hover:text-gray-500 overflow-hidden text-ellipsis text-xl xs:text-3xl md:text-4xl md:py-2'> {nt.title}</h2></Link>
    <Link href={`/news/video/${nt.slug}/`}><p className='overflow-hidden text-ellipsis xs:text-lg text-sm xs:block xs:leading-6 hover:text-gray-500'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} >{replaceHTMLTags(nt.excerpt)}</p ></Link> 
    <span className='text-end text-sm mt-11 italic py-2'>{moment(nt.date).subtract(1, 'hour').fromNow()} </span>
    </div>
    </div> 
       )    
) }</div> 

<div className='relative overflow-hidden overflow-x-auto sm:overflow-x-hidden h-max'>
  <div className='home_grid_alt_vid xs:flex lg:flex-col'>
  {content_videos.slice(1,4).map((nt)=>(
  <div key={nt.slug} className='[&:nth-child(3)]:lg:mt-1 [&:nth-child(2)]:lg:mt-1 [&:nth-child(3)]:xl:mt-3 [&:nth-child(2)]:xl:mt-3 border lg:text-white '>
 <div className='vidx2 xs:max-w-xs lg:max-w-sm 2xl:max-w-xs' >  
 <Image 
    src={nt.featuredImage.node.sourceUrl }
 width={1200}
 height={675}
 alt={nt.featuredImage.node.altText}
  />  
  </div>
    
      <div className='relative h-max text-white'>
        <div className='absolute bottom-8 xs:bottom-1 z-10'>
    <Link href={`/news/video/${nt.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='hover:text-gray-500 overflow-hidden text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg xs:text-base sm:text-lg lg:text-xl'>{nt.title}</h2></Link>
    <Link href={`/topic/${nt.contentTags.nodes[0]?.slug}/`}><p className='text-sm mx-2 xs:text-xs sm:text-sm hover:text-gray-500 py-2'><span>{moment(nt.date).subtract(1, 'hour').fromNow()} |</span> {nt.contentTags.nodes[0]?.name}</p ></Link> 

      </div> 
    <button className="absolute text-gray-300 hover:text-gray-50 hover:animate-in z-30 bottom-0 right-5 text-center text-4xl cursor-pointer">
    <Link href={`/news/video/${nt.slug}/`}><span><FontAwesomeIcon icon={faPlay}/></span></Link>  
        </button>
    </div> 
    </div>  
       )    
) } </div>
    </div> 
  
</section>
</div> 
  
</div> 
<div className="md:flex justify-between max-w-max bg-white m-auto"> 
<Paginate content={content_videos.slice(4)} pathString='video'/>
<div className="[&_.summary-side]:dark:text-gray-900 h-max dark:text-gray-900 [&_div]:lg:m-auto">
  <SideBar 
  sidebarItems={sidebarItems}
news_outline={news_outline} />  
 </div> </div> 
 </div>
 )
}

export default Videos