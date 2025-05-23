"use client" 
import Link from 'next/link'
import Image from 'next/image' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowRight, faBookOpen, faAngleLeft, faAngleRight, faTags } from '@fortawesome/free-solid-svg-icons' 
import moment from 'moment'  
import { useEffect, useState } from 'react'
import NewsLetter from '../NewsLetter'
import NaijaContent from './NaijaContent' 
import InterContent from './InterContent'
import { netflixAfrica, netflixInter, netflixNews, netflixNigNaija, netflixPopular } from '@/app/netflix-naija/netflix-news'
import { newchars, vids } from '@/app/naija-wiki/newCharHandle' 
import { getTop10 } from '@/app/naija-wiki/filmsdata'
import { AllObj, CharacterProps, NAPINewsProps, VidProps } from '@/app/types'
import { createClient } from '@/utils/supabase/client'

type NAPIProps={
title:string
featuredImage:{
  node:{
    sourceUrl:string
    caption:string
    altText:string
   }
 }
}


type CineProps={
  genre:string
  title:string
  featuredImage:{
    node:{
      sourceUrl:string
      caption:string
      altText:string
     }
   }
}

const Main = ({netflix_News, newChars}:{netflix_News:NAPINewsProps[], newChars:CharacterProps[]}) => { 
 
const [netflix_africa,setNetflix__Africa]=useState<NAPINewsProps[]>([])
const [netflix_popular,setNetflix__Popular]=useState<NAPINewsProps[]>([])
const [netflix_inter,setNetflix__Inter]=useState<NAPINewsProps[]>([])
const [netflix__NG_naija,setNetflix_NG_naija]=useState<NAPINewsProps[]>([]) 
const [naijaWikiVideos,setNaijaWikiVideos]=useState<VidProps[]>([])
const [netFlixTop10,setNetFlixTop10]=useState<any[]>([])
const [loading, setLoading]=useState(false)
 
const wikiNetflixNews=async()=>{
  const netflix_Africa= await netflixAfrica() 
  const netflix_Popular = await netflixPopular()
  const netflix_inter = await netflixInter()
  const netflix__NG_naija = await netflixNigNaija() 
 const naijaWikiVideos =await vids()
  const netFlixTopItems = await getTop10()  
  setNetflix__Africa(netflix_Africa)
  setNetflix__Popular(netflix_Popular)
  setNetflix__Inter(netflix_inter)
  setNetflix_NG_naija(netflix__NG_naija) 
  setNaijaWikiVideos(naijaWikiVideos)
  setNetFlixTop10(netFlixTopItems)
 
  }
  useEffect(()=>{
     setLoading(true)
    wikiNetflixNews()  
    if(netFlixTop10.length>0){
      setLoading(false)
    }
      },[netFlixTop10]) 
          
const news_blog =netflix_News?.map((ex)=> ex?.node.naijaOnNetflix).map((xy)=> (xy?.nodes??{})).flat()
const africa_blog =netflix_africa?.map((ex)=>ex?.node.naijaOnNetflix).map((xy)=> xy?.nodes).flat()
const popular_blog =netflix_popular?.map((ex)=>ex?.node.naijaOnNetflix).map((xy)=>xy?.nodes).flat()
// const inter_blog =netflix_inter.edges?.map((ex)=> ex.node.naijaOnNetflix).map((xy)=> xy.nodes).flat()

// const naija_blog =netflix__NG_naija?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.nodes).flat()
// const inter_cursor=netflix_inter?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.pageInfo) 
// const naija_cursor= netflix__NG_naija?.edges?.map((ex)=> ex.node.netflixNaijaPosts).map((xy)=> xy.pageInfo) 
 
const [activeSlide, setActiveSlide]=useState(0)
const [activeIndices, setActiveIndices] = useState([0, 1]);
const [end_ng_cursor, setEnd_ng_cursor] = useState('');
const [end_inter_cursor, setEnd_inter_cursor] = useState('');
    const [cinemaTitles, setCinemaTitles]=useState<CineProps[]>([])
    const [loadingx, setLoadingx]=useState(false)
     const naija_wiki =async ()=>{  
        const supabase =await createClient() 
        const { data:cinema_titles , error } = await supabase 
        .from('cinema_titles') 
        .select('*')
        if(error)throw new Error('An Error has occured!')
  setCinemaTitles (cinema_titles)
            setLoadingx(false)
        } 
  useEffect(()=>{
    setLoadingx(true)
  naija_wiki()
  },[])
 const nollywood_titles= cinemaTitles?.filter((ex)=> ex.genre?.includes('Nollywood'))
 const non_nollywood_titles= cinemaTitles?.filter((ex)=> !ex.genre?.includes('Nollywood')) 
 const coming_titles= cinemaTitles?.filter((ex)=> ex.genre?.includes('Coming Soon')) 

 const prevSlide=()=> { 
   const slide =activeSlide - 1 < 0
     ?5 - 1
     :activeSlide -1;
     setActiveSlide(slide);
 }
 const nextSlide=()=> {
   let slide = activeSlide + 1 < 5
     ? activeSlide + 1
     : 0;
     setActiveSlide(slide);  
 } 

 
  const left_slide = () => {
    setActiveIndices(([left, right]) => {
      const newLeft = left - 1 < 0 ? africa_blog.slice(27,35).length - 1 : left - 1;
      const newRight = right - 1 < 0 ? africa_blog.slice(27,35).length - 1 : right - 1;
      return [newLeft, newRight];
    }); 
  };
  
  const right_slide = () => {
    setActiveIndices(([left, right]) => {
      const newLeft = (left + 1) % africa_blog.slice(27,35).length;
      const newRight = (right + 1) % africa_blog.slice(27,35).length;
      return [newLeft, newRight];
    });
  };

  return (
   <div className='bg-slate-50 dark:bg-black px-8'>
    <div className='m-auto' style={{maxWidth:'1700px'}}>  
 <div className='bg-white py-8'> 
 <h2 className='text-3xl font-bold my-6 text-center text-slate-800 opacity-80'>Featured Naija Characters</h2> 
 <div className='md:flex justify-center max-w-6xl m-auto md:px-3'>  
  {newChars&&newChars.slice(0,3).map((it, index)=>  
        <div key={it.title + ' ' + index} className='max-w-sm md:w-80 lg:w-96 border rounded-b-xl bg-gray-700 my-2 relative m-auto'>  
          <Image
         className='w-full h-56 max-h-40 xxs:max-h-56 min-[400px]:max-h-64 md:max-h-36 min-[850px]:max-h-48 lg:max-h-64'
          src={it.featuredImage.node.sourceUrl} 
          width={250}
          height={250}
          alt={it.featuredImage.node.altText|| it.title}
          />  
          <div className='absolute top-5'>  
 <Link href={`/naija-wiki/character/${it.slug }`}><h3 className='text-white font-bold px-5 py-1 text-2xl'>{it.title }</h3></Link> 
  <span className='text-white ml-2'>by</span><Link href={`/naija-wiki/character/${it.slug }`}><p className='text-white hover:text-gray-200 font-bold py-1 px-5 mx-1 text-lg'> {it.charactertitles.portrayedby}</p></Link> 
 
 </div>
 <div className='text-white mx-4 pb-6 pt-3'>
 <Link href={`/naija-wiki/character/${it.slug }`}><div dangerouslySetInnerHTML={{__html:it.excerpt}} className='overflow-hidden text-ellipsis hover:text-gray-200 leading-relaxed text-lg cursor-pointer'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} /></Link>   
 
   </div>   
      </div>   
        )} 
        </div> 
        </div>

  <div className='m-auto bg-white py-8  my-2'> 
 <h2 className='text-3xl font-bold my-6 text-center text-slate-800 opacity-80'>Netflix News - Explore</h2> 
 <section className='lg:flex relative m-auto ' style={{maxWidth:'1550px'}}> 
  <div className={`lg:w-3/4 relative categoryBox`}> 
  {news_blog.slice(0,1).map((nt)=>(
  <div key={nt.slug} className='border border-orange-400'>
    <Image 
    className='h-full'
        width={1200}
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      />
      <div className='absolute bottom-5 z-20 font-bold text-white mx-4'>   
    <Link href={`/netflix-naija/news/${nt.slug}`}><h2 className='xs:text-2xl md:text-4xl py-2 hover:text-gray-400'> {nt.title}</h2></Link>
    <Link href={`/netflix-naija/news/${nt.slug}`}><div dangerouslySetInnerHTML={{__html:nt.excerpt}} className='sm:text-lg py-2 hidden sm:block hover:text-gray-400'/> </Link> 
    <span className='text-end text-sm mt-11 italic'>{moment(nt.date).fromNow()} </span>
    </div>
    </div> 
       )    
) }</div> 
 
<div className='lg:w-1/2 lg:mx-1 sm:grid sm:grid-cols-2 gap-1 border border-orange-400'>
  {news_blog.slice(1,5).map((nt)=>(
  <div key={nt.slug} className='[&:nth-child(3)]:sm:border-r [&:nth-child(3)]::md:border-r-0 first:sm:border-r first:md:border-r-0 home_grid relative border-b lg:border-b-0 lg:border-t border-orange-400 lg:text-white lg:relative'>
       <Image 
       className='hidden md:block h-full'
        width={1200}  
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      />  
    <div className='m-auto py-5 lg:py-0 lg:mx-0 md:absolute md:text-white z-20 bottom-11 xl:bottom-16 text-gray-600 hover:text-gray-400 px-4'>   
    <Link href={`/netflix-naija/news/${nt.slug}`}><h2 className='overflow-hidden text-ellipsis hover:text-gray-200 text-xl underline lg:no-underlinelg:text-xl'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}> {nt.title}</h2></Link>
   <Link href={`/topic/${nt.contentTags.nodes[0].slug}`}><p className='lg:absolute text-md xl:text-md py-3  text-end z-10 lg:text-sm'><span>{moment(nt.date).fromNow()} |</span> {nt.contentTags.nodes[0].name}</p ></Link> 
    </div> 
    </div> 
       )    
) }
    </div> 
  
</section>
<NewsLetter/> 
</div> 

 {loading?<p>Loading...</p>:<section className='bg-gray-700 text-white relative -mx-10 xl:-mx-32'> 
  <div className='flex justify-center py-4'>
     <p className='xxs:text-2xl xs:text-4xl'>
  <FontAwesomeIcon 
    icon={faBookOpen}   
    className='text-gray-200'
     /></p>
<h3 className='xxs:text-2xl xs:text-4xl font-bold text-gray-200 my-6 mx-2 text-center pt-3'>
  Netflix Naija Top 10</h3>
     </div>
 <div className=' lg:py-11'> 
 <div className="flex justify-between absolute w-4/5 m-auto left-0 right-0"> 
 <div onClick={prevSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleLeft}/> </div>  
 <div onClick={nextSlide} className='text-5xl text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </div> 
 </div>
  <div className='border-b mx-11 dark:from-white dark:to-green-400 bg-gradient-to-r to-sky-500 from-red-600 bg-clip-text text-transparent py-4 lg:py-0'>
 { netFlixTop10.map((item, index)=>  
 index===activeSlide&&
 <div className='sm:flex justify-center max-w-xs sm:max-w-md md:max-w-2xl xl:max-w-5xl m-auto' key={item.title + ' ' + index}> 
 <p className='text-4xl md:text-6xl text-center font-bold'>{item?.title} </p> 
 <p className=' text-6xl h-max md:text-8xl text-center sm:text-left py-4 sm:py-8 font-bold'>{index + 1} </p> 
  </div > 
) }  
 </div>
 
 </div>
 </section>}
   

 <section className='bg-white dark:bg-black py-8 px-4'>
 <h3 className='text-4xl text-gray-800 text-center border-b p-2 dark:text-gray-300'>Movies in the Theatre now</h3> 
  <div className='lg:flex w-3/4 m-auto justify-between'> 
  <div className='lg:w-1/2 md:m-5'> 
 <h4 className='text-2xl text-center p-3'>Foreign</h4>
<hr className='bg-gray-400 py-0.5 w-1/2 m-auto '/>  
{/*<a href={` ${itx.url}`} >
</a> */}

 <ul className='lg:border-r border-b border-0 lg:border-b-0 my-6'>{non_nollywood_titles.slice(0,10).map((itx,index)=> 
<li className='list-disc text-lg p-3' key={index}> {itx.title }</li>
 
)} </ul>  
</div>
  {loadingx?<p>Loading...</p>:<></>}
  <div className='lg:w-1/2 md:m-5'> 
  <h4 className='text-2xl text-center p-3'>Nollywood</h4>
  <hr className='bg-gray-400 py-0.5 w-1/2 m-auto'/>  
 <ul className='lg:border-r border-b border-0 lg:border-b-0 my-6'>{nollywood_titles.slice(0,10)?.map((itx,index)=> 
 <li key={index} className='list-disc text-lg p-3'>{itx.title }</li>
)} </ul>  
</div> 
 </div>
</section>

  <section className='bg-white py-8 px-4 dark:bg-black'>
<h2 className='text-3xl font-bold my-6 text-center text-gray-700 dark:text-gray-300'>News</h2> 
<hr className='m-4'/>   
  <div className='grid xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1 justify-center py-4 m-auto max-w-7xl'>  
{news_blog.slice(5,13).map((xy, index)=> 
<div key={index} className='max-w-xs lg:max-w-md w-full border lg:border-b-0 h-full'>
<Image 
className='h-40 w-full lg:h-56 max-h-64' 
src={xy.featuredImage?.node?.sourceUrl}
width={1250}
height={675}
alt={xy.title}/> 
<div className='m-4'> 
<Link href={`/netflix-naja/news/${xy.slug}`}><h3 className='my-1 text-xl font-medium'>{xy.title}</h3></Link> 
<Link href={`/topic/${xy.contentTags.nodes[0].slug}`}><h4 className="text-md mt-4 hover:text-gray-400"> 
<FontAwesomeIcon 
className='mx-1 text-red-500' 
icon={faTags}/>{xy.contentTags.nodes[0].name}</h4></Link>  
<span className='italic my-3 text-sm'>{moment(xy.date 
).fromNow()}</span >
</div>   
</div>     
)}  
</div>  
 </section> 
  
 <section>
  <div className='bg-black py-4 my-3' > 
<div className='flex flex-col sm:flex-row font-bold sm:justify-between items-center my-6 text-slate-800 text-white border-b px-8'>
    <h2 className='text-center text-3xl m-3'>Reels </h2> 
    <Link href='/news/videos'><button className='border mr-1 rounded-lg p-4 m-2 text-white'>View All <span><FontAwesomeIcon
    className=''
   icon={faArrowRight}
   width={18}/></span></button></Link>
   </div>
    <h3 className='text-white text-2xl px-8'>Videos from our newest collection</h3>
  <div className='grid xs:grid-cols-2 lg:grid-cols-4 gap-2 justify-center p-8'>   
  {naijaWikiVideos.slice(0,4).map((it, index)=>  
     <div 
     key={index}className='border'>
      <video
      className='h-52'
      width={1200} 
      height={675} 
         loop
          muted
          poster={it.featuredImage.node.sourceUrl}
        >  
         <source src={it.videosGroup.videoUrl.node.mediaItemUrl} type="video/mp4"/>
  <source src={it.videosGroup.videoUrl.node.mediaItemUrl} type="video/mp4" /> 
</video> 
 <div className='py-3'> 
  <div className='flex xs:my-4 px-2 justify-between w-full'> 
   <Link href={`/news/video/${it.slug }`} ><h3 className='text-gray-300 mx-1 text-xl my-2 overflow-hidden text-ellipsis' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{it.title}</h3></Link>
   <button> 
    <Link href={`/news/video/${it.slug}`}><span className="rounded-full border py-2 px-5 text-gray-300 hover:text-gray-50 text-4xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span></Link>  
        </button>
   </div> 
 <Link href={`/news/video/${it.slug }`} ><div dangerouslySetInnerHTML={{__html:it.excerpt}} className='text-gray-300 hover:text-gray-500 overflow-hidden text-ellipsis leading-7 px-3' style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/></Link> 
     </div>
    </div> )}  
   
  </div> 
  
  </div>
 </section>

<section className='dark:bg-black bg-white my-1 p-4'>
<h2 className='text-3xl font-bold my-6 text-center text-gray-700 dark:text-gray-300'>Popular</h2>
  <div className=' flex flex-wrap my-11 md:flex-nowrap' style={{borderBottomStyle:'dotted',borderTopStyle:'dotted',borderBottomWidth:'1px',borderTopWidth:'1px',borderColor:'black'}}> 
  <div className='my-2 max-w-4xl mx-3' > 
{popular_blog.slice(0,6).map((item=>
<div key={item.id} className='py-2 md:border-r border-b' >
  <div className='flex max-w-lg lg:max-w-xl'> 
<Link href={`/netflix-naija/news/${item.slug }`}><h3 className='text-2xl py-3'>{item.title}</h3></Link>
 <Image
className='max-w-40 max-h-40 px-1'
  src={item.featuredImage.node.sourceUrl}
  alt={item.title}
  width={1200}
  height={675} /> </div> 
<Link href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className=' py-1 font-bold'>&#8212; {item.contentTags.nodes[0].name }</h4></Link> 
     <p className='italic text-red-600 text-sm'>{moment(item.date).fromNow()}</p> 
  </div>
  )) }
  </div> 

 
  <div className='max-w-2xl lg:max-w-max my-3 flex overflow-auto md:block md:overflow-hidden lg:grid 2xl:grid-cols-3 xl:grid-cols-2 h-max '> 
   {popular_blog.slice(6,15).map((item=>
<div key={item.id} className='md:p-3 gap-1 xl:px-0.5 px-2 flex justify-between flex-row-reverse md:block items-center max-w-xs' >   
<Image
className='w-1/2 md:w-auto lg:w-full max-h-44'
  src={item.featuredImage.node.sourceUrl}
  alt={item.title}
  width={1200}
  height={675} /> 
  <div className='w-80'>
<Link href={`/netflix-naija/news/${item.slug }`}><h3 className='text-lg lg:text-xl py-3'>{item.title}</h3></Link> 
<Link href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className='py-1 font-bold'> &#8212; {item.contentTags.nodes[0].name }</h4></Link> 
     <p className='italic text-red-600 text-sm'>{moment(item.date).fromNow()}</p>
  </div>
  </div>
  )) } 
  </div>


  </div>
</section> 


  <section className='dark:bg-black bg-white py-8 px-4 my-2' >
   <div> 
 {/* <h2 className='text-3xl font-bold my-6 text-center text-slate-800 opacity-80'>Stories</h2>  */}
  <div className='grid xs:grid-cols-2 lg:grid-cols-4 gap-1 justify-center py-4 lg:px-0'>  
  {popular_blog.slice(15,23).map((item=>
<div key={item.id}className='my-2' > 
    <Image
    className='max-h-56 xs:max-h-24 min-[500px]:max-h-32 sm:max-h-44 md:max-h-56 lg:max-h-36 xl:max-h-44 2xl:max-h-56 my-2'
  src={item.featuredImage.node.sourceUrl}
  alt={item.title}
  width={1200}
  height={675} /> 

  <div className='border-r border-b-4 border-orange-300 px-1 h-fit'> 
<Link href={`/netflix-naija/news/${item.slug }`}>
<h3 className='overflow-hidden text-ellipsis text-base sm:text-2xl font-bold px-2 text-gray-700 hover:text-gray-500'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{item.title}</h3></Link> 
<Link href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className=' my-3 hover:text-gray-500 text-red-600'>&#8212; {item.contentTags.nodes[0].name }</h4></Link> 
  <p className='createdAt'>{moment(item.date).fromNow()}</p> 
  </div> 
  </div>
  )) } 
  
 </div> 
 </div> 

 </section>
 <div className='dark:bg-black bg-white my-8 py-8'> 
    <h2 className='text-3xl font-bold my-6 text-center text-slate-800 opacity-80 dark:text-gray-300'>Africa</h2> 
  <div className='lg:flex gap-2 my-1 px-6 lg:px-11 justify-between'>  
  <section > 
 <div className='xl:flex gap-5'>
  <div> 
  {africa_blog.slice(0,1).map((item, index)=> 
<div key={item.id }>  
  <Image  
  style={{maxHeight:'600px'}}
  width={1200}
  height={675} 
  src={ item.featuredImage.node.sourceUrl}
  alt={item.title}/>  
 
<div className='flex justify-between'>
  <Link href={`/netflix-naija/news/${item.slug }`}><h3 className='text-4xl text-gray-800 hover:text-gray-500 font-bold py-3'>{item.title} </h3></Link>
  <div className='flex items-center text-red-600 font-bold w-1/6'> 
  <span>&#8212; </span>
  <Link href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className='m-2 hover:text-gray-500'>{item.contentTags.nodes[0].name }</h4></Link> 
  </div>
</div>
<span className='italic'>{moment(item.date).fromNow()}</span >
   </div >
  
  ) 
} 
<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-1 max-w-xl lg:max-w-max m-auto'>  
   {africa_blog.slice(1,7).map((item, index)=>  
 <div key={item.id} className='max-w-sm my-3 border-b border-b-2 py-4 '>
 <Image 
className='h-36 sm:h-48 md:h-64 lg:h-52 xl:h-64' 
 width={1200}
 height={675}
 src={ item.featuredImage.node.sourceUrl }
 alt={item.title}/> 
<Link href={`/netflix-naija/news/${item.slug }`}><h3 className='hover:text-gray-500 text-gray-700 text-xl py-5 pr-2 my-3 font-bold'>{item.title} </h3></Link> 

<Link  href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className='hover:text-gray-500'>&#8212;  {item.contentTags.nodes[0].name }</h4></Link> 
<span className='italic text-red-600'>{moment(item.date).fromNow()}</span>
</div>  
 
 ) 
}
 </div > 
</div>
 
<div className='my-2 max-w-xl md:max-w-max m-auto md:flex gap-3 xl:block xl:my-0 xl:m-0' > 
  <div className='max-w-2xl lg:max-w-xl xl:max-w-lg'> 
{africa_blog.slice(7,10).map((item=>
<div key={item.id} className='border-b'>
  <div className='xl:max-w-xs flex xl:block justify-center py-4'> 
<Link href={`/netflix-naija/news/${item.slug }`}><h3 className='text-2xl py-3 xl:py-0'>{item.title}</h3></Link>
 <Image
className='xl:max-h-44 max-w-40 xl:max-w-max max-h-32 px-1'
  src={item.featuredImage.node.sourceUrl}
  alt={item.title}
  width={1200}
  height={675} />
   </div> 
<Link href={`/topic/${item.contentTags.nodes[0].slug}`}><h4 className=' py-1 font-bold'>&#8212; {item.contentTags.nodes[0].name }</h4></Link> 
     <p className='italic text-red-600 text-sm'>{moment(item.date).fromNow()}</p> 
  </div>
  )) }
  </div>


   <div className='max-w-sm lg:max-w-md lg:max-w-full m-auto  '>
  <div className='latestSec p-2 relative'>
   <h2 className='bg-gray-700 text-gray-300 text-3xl font-bold  text-center p-3 pt-4'>Latest on Netflix News</h2> 
 <ul className='list-none text-lg [&>*:nth-child(odd)]:bg-gray-500 [&>*:nth-child(even)]:bg-blue-200 [&>*:nth-child(odd)]:text-white [&>*:nth-child(even)]:text-black font-bold'>
  {africa_blog.slice(10,15).map((oneItem, index)=> 
  <ol className='flex p-8 justify-between'key={oneItem.id}> <Link href= {`/netflix-naija/news/${oneItem.slug}` }><li className='mx-5 px-4 hover:opacity-70'>{oneItem.title} ...</li></Link></ol> 

)}</ul> 
  </div>
  </div> 
  </div> 
 
   </div> 
 
</section>  
 

</div>
</div>  

 <div className='lg:flex dark:bg-black bg-white my-1 py-6 justify-center px-6 gap-4'> 
<section className=''>
  <div className='xs:flex max-w-5xl m-auto'> 
{africa_blog.slice(15,17).map((oneCategory, index) =>  
<div key={oneCategory.id +' ' +index }> 
 <Image 
className='max-h-72 px-2 py-3' 
  width={1200}
  height={675}
  src={ oneCategory.featuredImage.node.sourceUrl}
  alt={ oneCategory.featuredImage.node.altText}/>
 <div className='border-r px-1'>
<Link href={`/netflix-naija/news/${oneCategory.slug}` } >
<h3 className='hover:text-gray-500 text-gray-800 text-4xl px-2 overflow-hidden text-ellipis leading-9' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{oneCategory.title} </h3></Link>
<Link href={`/topic/${oneCategory.contentTags.nodes[0].slug}`}><h4 className='hover:text-gray-500 text-lg my-3'>&#8212; {oneCategory.contentTags.nodes[0].name }</h4></Link> 
<span className='italic text-red-500 text-sm'>{moment(oneCategory.date).fromNow()}</span>
 </div> 
 </div>
)} </div>


<div className='xs:grid grid-cols-2 max-w-5xl m-auto'>  
{africa_blog.slice(17,23).map((oneCategory, index) =>  
<div key={oneCategory.id +' ' +index } className='mx-0.5 px-3 border-t py-8 lg:px-3    border-r'> 
 
<Link href={`/netflix-naija/news/${oneCategory.slug}` } ><h3 className='hover:text-gray-500 text-gray-800 text-2xl overflow-hidden text-ellipis leading-9' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{oneCategory.title} </h3></Link>
<Link href={`/topic/${oneCategory.contentTags.nodes[0].slug}`}><h4 className='hover:text-gray-500 text-lg my-3'>&#8212; {oneCategory.contentTags.nodes[0].name }</h4></Link> 
<span className='italic text-red-500 text-sm'>{moment(oneCategory.date).fromNow()}</span>
 </div> 

)}
  
</div>
 
 </section>  
  <hr className='lg:hidden'/>

 <section className='py-8 sm:py-0 gap-1 lg:max-w-xs m-auto sm:px-0 my-4 lg:my-0 xs:grid grid-cols-2 justify-center lg:block'> 
 {africa_blog.slice(23,27).map((oneitem, index)=> 
<div key={oneitem.slug + ' ' + index} > 
 <div className='m-auto lg:m-0 lg:mb-4' >  
  <Image
  className='md:max-h-56 lg:max-h-64 max-h-64 xs:max-h-32 sm:max-h-44 my-3'
  width={1200}
  height={675}
  src={ oneitem.featuredImage.node.sourceUrl}
  alt={ oneitem.featuredImage.node.altText}/> 
  
  <div className='sm:py-4'> 
  <Link href={`/netflix-naija/news/${oneitem.slug}`}><h3 className='overflow-hidden hover:text-gray-500 text-ellipis leading-9 text-3xl font-bold 'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{oneitem.title} </h3>
</Link>
<Link href={`/topic/${oneitem.contentTags.nodes[0].slug}`}><h4 className='text-lg my-3 hover:text-gray-500'>&#8212; {oneitem.contentTags.nodes[0].name }</h4></Link> 
<span className='italic'>{moment(oneitem.date).fromNow()}</span>
</div>
 </div> 
  
 </div>
) }  
 </section>   
 </div>

<div className="bg-white dark:bg-black my-1 overflow-hidden px-1 py-4 my-4">
 <div className="relative flex justify-end">  
 <div onClick={right_slide} className='text-5xl h-max absolute top-28 right-3 sm:top-72 lg:top-64 text-white opacity-70 bg-gray-400 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </div> 
 </div>

  <div className='sm:flex justify-between sm:py-16 sm:mt-11 md:my-14'> 
 { africa_blog.slice(27,35).map((it, index)=>  
 activeIndices.includes(index) &&  
<div 
key={index} 
className='sm:flex justify-center md:justify-between lg:justify-start overflow-hidden w-11/12 xs:w-3/4 m-auto sm:m-1 sm:px-0 xs:px-8 first:sm:border-r mt-11' >
 
  <Image 
  className='h-48 sm:w-1/3 sm:h-20 md:h-28 lg:h-44 md:w-1/2 xl:w-1/3'
  src={it.featuredImage.node.sourceUrl}
  width={1200}
  height={675}
  alt={it.featuredImage.node.altText}  
  />
<div className='my-3 sm:my-0 md:px-1 md:w-9/12 xl:w-1/2'>
<Link href={`/netflix-naija/news/${it.slug}`}><h3 className='hover:text-gray-500 text-2xl md:my-0 md:pr-0 md:py-0 px-1 pr-2'>{it.title}</h3></Link>
<Link href={`/topic/${it.contentTags.nodes[0].slug}`}><h4 className='md:text-end md:px-42 py-2 md:px-0 text-lg underline hover:text-gray-500'>{it.contentTags.nodes[0].name }</h4></Link> 
<span className='italic text-red-600 md:px-4'>{moment(it.date).fromNow()}</span>
</div>  

 </div>
 )} 
  
</div> 

<div className="relative flex"> 
 <div onClick={left_slide} className='text-5xl h-max -mt-72 ml-3 sm:absolute sm:-mt-96 sm:top-8 md:-mt-80 md:-top-16 text-white opacity-70 bg-gray-400 cursor-pointer left-3 sm:left-0.5'> 
 <FontAwesomeIcon icon={faAngleLeft}/> </div> 
  
 </div>
</div>
   
<div className='bg-white dark:bg-black px-4 py-11 sm:px-16 lg:px-20'> 
  <div className='md:flex justify-between'>  
<NaijaContent 
end_ng_cursor={end_ng_cursor}
setEnd_ng_cursor={setEnd_ng_cursor}
/> 
<InterContent 
end_ng_cursor={end_ng_cursor}
end_inter_cursor={end_inter_cursor}
setEnd_inter_cursor={setEnd_inter_cursor}
/> 
</div>
</div>
  
</div>

 </div>  
  )
}

export default Main

 