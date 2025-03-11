"use client"
import React, { useEffect, useState } from 'react' 
import Image from 'next/image'; 
import Link from 'next/link';  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import ShareButtons from '@/components/ShareButtons';
import moment from 'moment';
import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { aniticipatedAfrica, aniticipatedForeign, aniticipatedNollywood } from '@/app/netflix-naija/netflix-news';
type TitleXProps={
  title:string
  slug:string
  excerpt:string
  date:string
  author:{
    node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
    }
    
    }
  contentTags:{
    nodes:{
      id:string
    slug: string
    name: string
    
    }
    }
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    naijaOnNetflix:{
    edges:{
    nodes:{
      title:string
      featuredImage:{
        node:{
        sourceUrl:string
        caption:string
        altText:string
        }
        }
    }
    node:{
      title:string     
      slug: string
      date:string
      author:{
        node:{
        name:string
        slug:string
        avatar:{
        url:string
        }
        }
        
        }
      contentTags:{
        nodes:{
          id:string
        slug: string
        name: string
        
        }
        }
    }
    }
    nodes:{ 
      title:string
      slug:string      
      date:string
      featuredImage:{
        node:{
        sourceUrl:string
        caption:string
        altText:string
        }
        }
    }
    id:string
    slug:string
    title:string
    }
    
 }
 

 
type TitleProps={   
    id:string
    slug:string
    title:string
    excerpt:string
    date:Date
    content:string 
    author:{
    node:{
    name:string
    slug:string
    avatar:{
    url:string
    }
    }
    
    }
    featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    contentTags:{
    slug: string
    name: string 
    nodes:{
    slug: string
    name: string
    
    }[]
    }
    netflixNewsGroup:{
    intro:string
    filmTitle:string
    genre:string
    director:string
    cast:string[]
    mostAnticpatedAfrican:string
    mostAnticpatedForeign:string
    mostAnticpatedNollywood:string
    netflixEmbeds:string
    netflixNewsRelated:{
    nodes:[
    {
    title:string
    slug:string
    featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    }
    ]} 
    }
 
node:TitleXProps
naijaOnNetflix:{
  nodes:{
 
  }
}
pageInfo:{
hasNextPage:boolean,
endCursor:string
}
    
} 
const ToNetflixDetails = ({coming_to_netflix_naija, netflix_related, netflix_news, coming_to_netflix_details}:{coming_to_netflix_details:TitleProps, coming_to_netflix_naija:TitleProps[], netflix_related:TitleProps[], netflix_news:TitleProps[]}) => { 
 const [aniticipated_nollywood, setNolly]=useState<TitleProps[]>([])
 const [ aniticipated_africans, setAfri]=useState<TitleProps[]>([])
  const [aniticipated_foreign, setFore]=useState<TitleProps[]>([])
  const [loading,setLoading]=useState(false)
const itempub =new Date(coming_to_netflix_details.date)   
 const {netflixEmbeds} = coming_to_netflix_details.netflixNewsGroup 
 const news_posts_netflix=netflix_news.map((tx)=> tx.node.naijaOnNetflix.nodes).flat()
 const next_posts=coming_to_netflix_naija.map((tx)=> tx.node.naijaOnNetflix.edges).flat()
//   //const {embedText}=new_on_details.netflixNewsGroup
 const {intro}=coming_to_netflix_details.netflixNewsGroup 

const anticipatedTitles=async()=>{  
 const aniticipateNollywood= await aniticipatedNollywood()
 const aniticipateAfricans= await aniticipatedAfrica()
 const aniticipateForeign= await aniticipatedForeign()
 setNolly(aniticipateNollywood)
 setAfri(aniticipateAfricans)
 setFore(aniticipateForeign)
}
useEffect(()=>{
  setLoading(true)
anticipatedTitles()
if(aniticipated_nollywood.length>0||aniticipated_africans.length>0||aniticipated_foreign.length>0){
  setLoading(false)
}
},[anticipatedTitles])
return (
  <div className='bg-gray-50'> 
 <div className='bg-white dark:bg-black m-auto justify-center m-auto md:px-6 xl:px-0 relative md:flex w-full' style={{maxWidth:'1450px'}}>
  <div className='border-r border-r-4 xl:max-w-5xl px-3'> 
  <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t border-t-black dark:text-gray-300'> Movies and Series on Netflix Naija </p>  
 </div>
    <hr className='h-0.5 mx-2 mt-4 bg-black'/> 
    <div className='px-4 my-2 border-b text-gray-700 py-2'> 
  <h2 className='text-4xl my-2 font-bold leading-10 dark:text-gray-300'>{coming_to_netflix_details.title}</h2> 
  <div className='flex py-2'>
  <span className='text-gray-700 italic text-sm dark:text-gray-300'>by </span><Image  
  className='rounded-full'
 src={coming_to_netflix_details.author.node.avatar.url}
 width={50}
  height={50}
 alt={coming_to_netflix_details.author.node.name}
 /> 
   <Link href={`/creator/${coming_to_netflix_details.author.node.slug}`}><p className='p-2 text-blue-800 hover:text-gray-500'>{coming_to_netflix_details.author.node.name}</p></Link> </div>
 
 </div>
 
    <div className='xs:flex justify-between py-4'> 
    <div className="[&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:shadow-none [&_.share-view]:border-0 [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:py-3">
  <ShareButtons 
 item={coming_to_netflix_details} 
 activeIdx={coming_to_netflix_details.id}
  shareOptions={true}
    /> 
     </div>
     <p className='text-sm italic py-3 dark:text-gray-'>Published on {itempub.toDateString()}</p>
     </div>  
  </div> 
<div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.excerpt}} className='text-xl py-2 leading-10'/> 
 <div className="md:max-w-5xl md:m-auto"> 
<hr className='bg-black h-1 my-2'/> 
<div className='relative'> 
  <Image
  style={{maxHeight:'600px', width:'100%'}}
 src={coming_to_netflix_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={coming_to_netflix_details.title}
 />  
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.featuredImage.node.caption}} className="absolute bottom-0 top-0 left-8 p-3 leading-7 shadow-xl font-mono text-gray-300"/> 
 </div>
 <div dangerouslySetInnerHTML={{__html:intro}} className='text-lg py-2 leading-10 text-xl'/> 

 <div className='my-4'> 
 {/* {aniticipated_africans.length> 0&&
aniticipated_foreign.length> 0&&
aniticipated_nollywood.length >0?<></>:
<h2 className='font-bold text-4xl py-4 text-center bg-gray-700 border-b text-gray-200'>Most Anticipated Titles</h2>} */}
{loading&&<p>Loading Titles...</p>}
{!loading&&<div> 
  {aniticipated_africans.length> 0&&<div className='max-w-3xl m-auto my-3 py-3 leading-9 [&_li]:list-disc border-t-8 border-green-500 bg-gray-100 dark:bg-black'>
<h2 className='font-bold text-4xl py-4 text-center'>Netflix Africa</h2> 
<hr/>
{aniticipated_africans.map((line)=> 
  <div className='px-3 xl:px-2 [&_h2]:text-2xl [&_h2]:py-3 [&_h2]:text-center [&_h3]:text-center [&_h2]:font-bold leading-9 py-3 text-lg [&_strong]:text-2xl [&_h3]:text-2xl [&_h3]:font-bold'key={line.title}> 
  <h3>{line.title}</h3>
 <div dangerouslySetInnerHTML={{__html:line.content}} />
  </div>
   )}
  </div>
}
{ aniticipated_foreign.length> 0&&
  <div className='max-w-3xl m-auto my-3 p-3 leading-9 [&_li]:list-disc border-t-8 border-orange-500 bg-gray-100 dark:bg-black'>
  <h2 className='font-bold text-4xl py-4 text-center'>Netflix Non-Africa</h2> 
  <hr/> 
  {aniticipated_foreign.map((line)=> 
  <div className='px-3 xl:px-2 [&_h2]:text-2xl [&_h2]:py-3 [&_h2]:text-center [&_h3]:text-center [&_h2]:font-bold leading-9 py-3 text-lg [&_strong]:text-2xl [&_h3]:text-2xl [&_h3]:font-bold'key={line.title}> 
  <h3>{line.title}</h3>
 <div dangerouslySetInnerHTML={{__html:line.content}}/>
 </div>  
   )}
 
  </div> }

  {aniticipated_nollywood.length >0&&
 
  <div className='max-w-3xl m-auto my-3 p-3 leading-9 [&_li]:list-disc border-t-8 border-blue-700 bg-gray-100 dark:bg-black'>
  <h2 className='font-bold text-4xl py-4 text-center'>Netflix Nollywood</h2>
  <hr/>
  {aniticipated_nollywood.map((line)=>  
<div className='px-3 xl:px-2 [&_h2]:text-2xl [&_h2]:py-3 [&_h2]:text-center [&_h3]:text-center [&_h2]:font-bold leading-9 py-3 text-lg [&_strong]:text-2xl [&_h3]:text-2xl [&_h3]:font-bold'key={line.title}> 
  <h3>{line.title}</h3>
<div dangerouslySetInnerHTML={{__html:line.content}}/> 
  </div>  )}    
    
  </div> }  
</div>}
 


 </div>

 <hr className='bg-black h-1 my-2'/>
 {/* [&_figure>div>iframe]:md:max-w-none [&_figure>div>iframe]:md:h-96 [&_figure>div>iframe]:py-6[&_iframe]:my-4 */}
  <div className="max-w-xl px-3 m-auto sm:max-w-full" >
 <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.content}} className="doc-text [&_strong]:text-2xl [&_figure>div>iframe]:m-auto [&_figure>div>iframe]:py-4 [&_iframe]:w-11/12 [&_p]:py-2 [&_p]:my-3 [&_li]:my-6 [&_li]:list-disc [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-center [&_figure>figcaption]:text-sm text-lg leading-9 [&>figure]:px-4 [&>h3]:text-4xl [&>h3]:my-4 [&>h3]:font-bold [&>h2]:text-2xl [&>h5]:font-bold [&>h5]:text-xl [&>h2]:font-bold [&>h4]:text-xl [&>h4]:font-bold [&_p>a]:hover:bg-red-600 [&_p>a]:dark:hover:text-white [&_p>a]:dark:text-orange-600 py-0.5 [&>h5]:py-6 [&>h4]:py-6 [&>h2]:py-6 [&>h2]:px-2 [&>h3]:py-6 [&>h2]:my-6 [&>h2]:border-2 [&>h3]:border-2 [&>h3]:bg-blue-900 [&>h3]:bg-opacity-90 [&>h3]:text-gray-300 [&>h3]:px-2 [&>h2]:border [&>h3]:border-2 [&>h3]:bg-blue-900 [&>h3]:bg-opacity-90 [&>h3]:text-gray-300 [&>h3]:leading-9 [&>h2]:leading-9 [&>h4]:border-2 [&_blockquote]:py-11 [&_blockquote]:text-xl [&_blockquote]:border-l-8 [&_blockquote]:border-blue-400 [&_blockquote]:max-w-xl [&_blockquote]:m-auto [&_blockquote]:leading-9 [&_blockquote]:bg-black [&_blockquote]:text-gray-200 [&_blockquote]:my-6 [&_blockquote]:bg-opacity-80 [&_blockquote]:px-5 [&_img]:m-auto text-xl [&_div>li]:border-b [&_div>li]:border-b-4"/>

 <div className='my-4 px-2'>
 <hr className='bg-black h-1'/>
<h3 className='text-center text-gray-600 text-3xl py-4 px-1 dark:text-gray-200'>More on the Topic</h3>
   <div className='xl:flex gap-1'>
 {netflix_related?.slice(0,2).map((xy, i)=>   
<div className='xs:flex gap-1 border-b my-2 justify-center items-center' key={xy.node.title + ' ' + i}> 
  <div className='py-4 px-2'> 
  <Image 
  className='my-2 xs:max-w-44 m-auto'
src={xy?.node.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.node.featuredImage?.node.altText}
/>   
</div>

  <div className='px-2 py-4 text-gray-700 dark:text-gray-200 font-light text-lg flex flex-col xs:max-w-xs flex-col-reverse'> 
  <Link href={`/netflix-naija/coming-to-netflix/${xy.node.slug}`}><h2 className='text-xl font-bold overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link> 
  <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14}/>
      <Link href={`/creator/${xy?.node.author.node.slug}`}><p className='mx-2'>{xy.node.author.node.name}</p></Link>
  </div>  
 
  <div className='flex my-3'> 
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2 w-full'>{new Date(xy.node.date).toDateString()}</p>
  </div>  
 
  </div>  
</div>
)}
 
</div> 
</div>  
 </div>
  </div> 
   </div> 
   <div className='h-max mx-1 rounded-t lg:hidden absolute top-0 -right-28 -mr-2 md:bg-transparent md:relative hover:right-0 md:w-auto md:right-0 md:-mr-0 cursor-pointer'>  
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
 <Link href='/netflix-naija/new-on-netflix'><p className='py-3 font-bold text-center'>On Netflix Naija</p></Link> 
 </div>
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
 <Link href='/netflix-naija/coming-to-netflix'><p className='py-3 font-bold text-center '>Coming to Netflix Naija</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faNewspaper} className='text-2xl p-2'/>
 <Link href='/naija-wiki/'><p className='py-3 font-bold text-center'>Netflix News</p></Link>  
 </div> 
 </div> 


  <div className='hidden lg:block mx-1 py-4 w-80'>  
   <div className="cursor-pointer py-6 shadow border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
   <Link href='/netflix-naija/new-on-netflix'><li className='hover:text-gray-400 dark:text-gray-200 list-none'>New on Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
    <div className="cursor-pointer max-w-sm text-sm py-6 shadow border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
    <Link href='/netflix-naija/coming-to-netflix'><li className='hover:text-gray-400 dark:text-gray-200 list-none'>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 

   <div className='mx-1 '>   
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black [&>*:nth-child(odd)]:dark:border-l-white [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
 {news_posts_netflix.slice(0,10).map((xy,i)=>
 <div key={xy.title + ' ' + i} className='shadow flex my-2 justify-between py-6 px-2'>
 <div>
 <Image
  className='border max-w-28 xl:max-w-32 object-cover xl:h-28'
 src={xy?.featuredImage?.node.sourceUrl}
 width={200}
 height={205}
 alt={xy?.featuredImage?.node.altText}
 /> 
 
 </div>
 <div className='px-2 font-bold '>
 <p className='text-red-600'>{moment(xy.date).fromNow()}</p> 
 <Link href={`/netflix-naija/news/${xy.slug}`}><h2 className='overflow-hidden text-ellipsis text-base hover:text-gray-400 text-gray-600 dark:text-gray-200'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.title} </h2></Link>
  </div> 
 </div> 
 )}</div>
 
 </div>  
 
    </div>  

</div>
 <hr className='bg-black h-1 my-2'/> 

 <div className='bg-white px-3 dark:bg-black text-gray-800 dark:text-gray-200 py-8'> 
  <div className='max-w-7xl m-auto'>
   <h2 className='text-2xl font-bold py-4'>Next</h2>
     </div>
    <div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" >
  <div className='flex' style={{width:'1000px'}}> 
   {next_posts.slice(0,3).map((xy,i)=> 
    <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}>   
    <Link href={`/topic/${(xy.node.contentTags.nodes??[][0]).slug}`}></Link> <h3 className='text-red-500 text-sm italic'>{(xy.node.contentTags.nodes??[][0]).name} </h3>
    <Link href={`/netflix-naija/coming-to-netflix/${xy.node.slug}`}><h2 className="hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p>{moment(xy.node.date).fromNow()}</p> 
        <Link href={`/creator/${xy.node.author.node.slug}`}>
          <p className='py-2 font-medium'>{xy.node.author.node.name}</p>
        </Link> 
      </div>   
     
    </div>
   )} 
    </div>  
    </div>  
  </div> 
  
</div>)
}
 
export default ToNetflixDetails