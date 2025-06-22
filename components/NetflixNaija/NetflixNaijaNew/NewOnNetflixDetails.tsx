"use client"
import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faAsterisk, faAward, faBook, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link'; 
import * as cheerio from 'cheerio'; 
import moment from 'moment';
import ShareButtons from '@/components/ShareButtons';
import { NAPINewsProps, AllObj } from '@/app/types';
import { useEffect, useState } from 'react';
import { whatToWatch, fullListNew, netflixNews, newsbyNewOnCategory, readNext } from '@/app/netflix-naija/netflix-news';
import { getTop10, getTop10Series, getPopular, getPopularNonEng, getPopularSeriesNonEng, getPopularSeries } from "@/app/naija-wiki/filmsdata" 
type TopProps={
  id:string
  slug:string
  title:string
  date:Date
  content:string
  netflixNewsGroup:{
    intro:string
  }
 
} 

const NewOnNetflixDetails = ({ new_on_details }:{new_on_details:NAPINewsProps}) => { 
    const [what_to_watch,setWhatToWatch]=useState<NAPINewsProps[]>([])
    const [full_list_new,setFullList]=useState<NAPINewsProps[]>([])
    const [get_popular_series,setPopularSeries]=useState<any>([])
    const [get_popular_non_eng,setPopularNoneng]=useState<any>([])
    const [get_popular_series_non_eng, setPopularSeriesNoneng]=useState<any>([])
    const [get_popular, setPopular]=useState<any>([])
    const [netflix_news, setNews]=useState<NAPINewsProps[]>([])
    const [netflix_10,  setNetflix10]=useState<any>([])
    const [netflix_10_series, setNetflix10Series]=useState<any>([])
    const [netflix_related, setNetflixRelated]=useState<NAPINewsProps[]>([])
    const [new_on_netflix_naija, setNewNetflixNaija]=useState<NAPINewsProps[]>([])
    const [loading,setLoading]=useState(false)

useEffect(()=>{
  setLoading(true)
const dataX =async()=>{
    const whattoWatch= await whatToWatch()
  const getNetflixNews = await netflixNews()
  const netflix10 =await getTop10()
  const netflix10series =await getTop10Series() 
  const netflixPopular = await getPopular()
  const popularSeries = await getPopularSeries()
  const popular_non_eng = await getPopularNonEng()
  const popular_series_non_eng = await getPopularSeriesNonEng()
  const full_list = await fullListNew()
  const newRelated = new_on_details?.netflixNewsGroup?.netflixNewRelated?.edges
  const exitinginrelated=netflix_related?.map((fx)=>fx.cursor)
  const newNetflix_naija = await newsbyNewOnCategory([new_on_details.id,exitinginrelated ].flat())
 
  setWhatToWatch(whattoWatch)
  setFullList(full_list)
  setPopularSeries(popularSeries)
  setPopularNoneng(popular_non_eng)
  setPopularSeriesNoneng(popular_series_non_eng)
  setPopular(netflixPopular)
  setNews(getNetflixNews)
  setNetflix10(netflix10)
  setNetflix10Series(netflix10series)
  setNetflixRelated(newRelated as NAPINewsProps[])
  setNewNetflixNaija(newNetflix_naija)
}
dataX()
if(netflix_10.length > 0){
  setLoading(false)
 }

},[netflix_10])

     function eliminateSimilarPops(arr1:any[], arr2:any[], arr3:any[]) { 
 
      return arr1
        ?.filter(item => !arr2.includes(item.title))
        ?.filter(item => !arr3.slice(0,10).includes(item.title))
        ?.concat(arr2.filter(item => !arr1.includes(item.title))) 
        ?.concat(arr3.slice(0,10).filter(item => !arr1.includes(item.title)));
    }
     
    
    function eliminateSimilarSer(arr1:any[], arr2:any[], arr3:any[]) { 
     
      return arr1
        ?.filter(item => !arr2.includes(item.title))
        ?.filter(item => !arr3.slice(0,10).includes(item.title))
        ?.concat(arr2.filter(item => !arr1.includes(item.title))) 
        ?.concat(arr3.slice(0,10).filter(item => !arr1.includes(item.title)));
    } 
const itempub =new Date(new_on_details?.date)    
// const {netflixEmbeds} = new_on_details?.netflixNewsGroup?.netflixNewRelated  
// // // //const {embedText}=news_details.netflixNewsGroup
  const {intro}=new_on_details.netflixNewsGroup
// const srcMatch = netflixEmbeds?.match(/src="([^"]+)"/);
// const src = srcMatch ? srcMatch[1] : '';  
const result_pop = eliminateSimilarPops(get_popular_non_eng, get_popular,netflix_10 );  
const result_series = eliminateSimilarSer( get_popular_series_non_eng, get_popular_series, netflix_10_series ); 
const next_posts=new_on_netflix_naija.map((tx)=> tx.node.naijaOnNetflix.edges).flat() 
const news_posts_netflix=netflix_news.map((tx)=> tx.node.naijaOnNetflix.nodes).flat()
const $= cheerio.load(new_on_details.content )
let data_texts= ''
let data_link= []
let data_imgs= []
const h2t_index=[]
const h3r_index=[]
const link_texts=[]

    $('img', new_on_details.content).each( function(){
      const img = $(this).attr('src') 
      data_imgs.push(img)
      })
      $('p', new_on_details.content).each( function(){
        const text = $(this).text()
        data_texts+=text
        })
  
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h2')){
            h2t_index.push(index )
         } 
        })});
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h3')){
            h2t_index.push(index )
         } 
        })}); 
        new_on_details.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
          if(xy?.includes('h4')){ 
            h2t_index.push(index )
         } 
        })}); 
    // const category_slug=new_on_details.netflixCategories.nodes[0].slug

return (
  <div className='bg-gray-50'> 
  <div className='flex bg-white justify-center m-auto dark:bg-black m-auto m-auto md:px-6 xl:px-0 relative' style={{maxWidth:'1450px'}}> 
  <div className='border-r border-r-4 px-3 xl:max-w-5xl'>
    <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t border-t-black dark:text-gray-300'> Movies and Series on Netflix Naija </p>
 </div>  
    <hr className='h-0.5 mx-2 mt-4 bg-black'/> 
    <div className='px-4 my-2 border-b text-gray-700 py-2'> 
  <h2 className='text-4xl my-2 font-bold leading-10 dark:text-gray-300'>{new_on_details.title}</h2> 
  <div className='flex py-2'>
  <span className='text-gray-700 italic text-sm dark:text-gray-300'>by </span><Image  
  className='rounded-full'
 src={new_on_details.author.node.avatar.url}
 width={50}
  height={50}
 alt={new_on_details.author.node.name}
 /> 
   <Link href={`/creator/${new_on_details.author.node.slug}/`}><p className='p-2 text-blue-800 hover:text-gray-500'>{new_on_details.author.node.name}</p></Link> </div>
 
 </div> 
    <div className='xs:flex justify-between py-4'> 
    <div className="[&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:shadow-none [&_.share-view]:border-0 [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:py-3">
  <ShareButtons 
 item={new_on_details} 
 activeIdx={new_on_details.id}
  shareOptions={true}
    /> 
     </div>
     <p className='text-sm italic py-3 dark:text-gray-'>Published on {itempub.toDateString()}</p>
     </div>  
  </div>  
   
  <div className="md:max-w-5xl px-2 md:m-auto"> 
  <div dangerouslySetInnerHTML={{__html:new_on_details.excerpt}}className='text-xl py-2 leading-10'/> 
<hr className='bg-black h-1 my-2'/> 
  <div className='relative px-5'> 
  <Image 
 src={new_on_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={new_on_details.title}
 /> 
  <div dangerouslySetInnerHTML={{__html:new_on_details.featuredImage.node.caption}} className="absolute bottom-20 left-8 p-6 leading-8 shadow-xl font-mono"/>
 </div> 

   <div dangerouslySetInnerHTML={{__html:intro}} className='text-lg py-2 leading-10 text-xl'/> 
  <hr className='bg-black h-1 my-2'/>  
  <div className='py-5'>
 {loading?<p>Loading...</p>:full_list_new.length> 0 &&full_list_new.map((xy)=> 
  <div key={xy.node.title}>
 <h2 className='text-3xl bg-culturaysBg py-14 text-white border-b leading-9 px-4'>{ xy.node.title.toUpperCase()}</h2>

 {xy.node.content.split('\n').map((line, index) =>line !== ''&& (
  <div key={index} className='m-4 [&_>h3]:text-2xl [&_>h2]:text-3xl [&_>li]:text-xl' dangerouslySetInnerHTML={{__html:line}}/> 
 
 ))}
<hr className='bg-black h-1 my-2'/> 
  </div>
  )}

  </div>   

  <div className="[&_iframe]:w-1/2" > 
  {new_on_details.content.split('\n').map((xy, index)=> 
  <div key={xy+ ' ' + index} className=' '> 
  <div dangerouslySetInnerHTML={{__html:xy}} className="[&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm text-xl leading-9 [&_>figure]:px-8 [&_>h3]:text-3xl [&_>h3]:font-bold [&_>h2]:text-3xl [&_>h5]:font-bold [&_>h5]:text-xl [&_>h2]:font-bold [_>h4]:text-3xl [&_>h4]:font-bold [&_p>a]:hover:bg-red-600 [&_p>a]:dark:hover:text-white dark:[&_p>a]:text-orange-600 py-0.5 [&_>h5]:py-8 [&_>h4]:py-8 [&_>h2]:py-8 [&_>h3]:py-8 [&_>h2]:bg-gray-700 [&_>h3]:bg-gray-700 [&_>h4]:bg-gray-700 [&_>h2]:text-gray-200 [&_>h3]:text-gray-200 [&_>h4]:text-gray-200 [&>h2]:px-3 [&_>h3]:px-3 [&_>h4]:px-3"/> 
   
  {index === 3&&
   <div key={xy+ ' ' + index} className='py-4 border-b border-b-4 my-8 border-black rounded-lg'>  
   <h3 className='text-center text-2xl md:text-4xl py-4 border-b text-gray-500 dark:text-white'>This Week on Netflix Naija</h3>
   <h2 className='text-xl font-bold bg-gray-500 p-4 w-max text-center text-gray-50 my-4'>Top Ranking Series</h2>  
  <div className='md:my-8 lg:my-11 w-full grid grid-cols-2 md:grid-cols-3 [&>*:nth-child(even)]:bg-gray-50 dark:[&>*:nth-child(even)]:text-black'>  
  {loading?<p>Loading...</p>:result_series.slice(-10).filter(ex=> ex.title !== undefined).map((xy, i)=> 
  <div key={xy.title+ ' ' + i} className='flex border py-4 h-auto' > 
  <p className='p-1 md:text-xl text-lg italic font-bold'> {i+1} </p>
  <h3 className='md:text-xl text-lg p-3'> {xy.title} </h3>
  
  </div> 
  )}   
  </div> 
  
  </div>
  
  }
{index === 6&&
<div className="bg-gray-100 rounded m-1 dark:text-black"key={xy+ ' ' + index}>
<h2 className='text-center text-2xl lg:text-4xl py-8 border-b border-b-4 mx-1 border-black my-4 font-bold '> What to Watch on Netflix Naija Now</h2>
 {loading?<p>Loading...</p>:what_to_watch.map((xy,i)=> 
  <div className='mx-3' key={xy.node.title + ' ' +i}> 
<div className='flex flex-col flex-col-reverse sm:flex-row items-start gap-2'>
   <Image 
className='py-4 mx-2 w-11/12 sm:w-1/2'
src={xy?.node.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.node.featuredImage?.node.altText}
/>  
    
<div className='p-2 sm:w-1/2'>
  <div className='text-gray-700 font-light text-lg md:flex'> 
    <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14} />
      <Link href={`/creator/${xy?.node.author.node.slug}/`}><p className='mx-2 '>{xy.node.author.node.name} </p></Link>
  </div>
  <div className='flex my-3'>
  <FontAwesomeIcon icon={faClock} width={14}/>
  <p className='mx-2'>{new Date(xy.node.date).toDateString()} </p>
  </div>
  
  </div>

  <div className=''> 
 <h2 className='text-4xl font-medium py-2 w-full'>{xy.node.title}</h2> 
<div className='flex-grow overflow-hidden text-ellipsis text-lg font-thin'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html: xy.node.excerpt }}/> 
</div>

</div>  
</div>  
<hr className='bg-white h-1'/> 
 <div className='mt-8 px-3'> 
{xy.node.content.split('\n').map((ex, i)=>
<div className='text-xl py-0.5 leading-9' key={ex + ' ' + i} dangerouslySetInnerHTML={{__html:ex}}/>  
 )} 
 
 </div>  
</div>
 )}
 
 <div className='my-4 px-2'>
 <hr className='bg-black h-1'/>
<h3 className='text-center text-gray-600 text-3xl py-4 px-1'>More on the Topic</h3> 
   <div className='xl:flex gap-1'>
 {netflix_related?.slice(0,2).map((xy, i)=>   
<div className='xs:flex gap-1 border-b lg:border-b-0 lg:border-r my-2 justify-center items-center' key={xy.node.title + ' ' + i}> 
  <div className='py-4 px-2'> 
  <Image
  className='my-2 xs:max-w-44 m-auto'
src={xy?.node.featuredImage?.node.sourceUrl}
width={1200}
height={675}
alt={xy?.node.featuredImage?.node.altText}
/>   
</div>
  <div className='px-2 py-4 text-gray-700 font-light text-lg flex flex-col xs:max-w-xs flex-col-reverse'> 
     <h2 className='text-xl font-bold overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2> <div className='flex my-3'>
      <FontAwesomeIcon icon={faUser} width={14}/>
      <Link href={`/creator/${xy?.node.author.node.slug}/`}><p className='mx-2'>{xy.node.author.node.name}</p></Link>
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
}

</div> 
)} 
  
 </div>  

    <div className='py-4 border-b border-b-4 my-8 border-black rounded-lg mx-2'> 
    <h3 className='text-center text-2xl md:text-4xl py-4 border-b text-gray-500 dark:text-white '>This Week on Netflix Naija</h3>  
     <h2 className='text-xl font-bold bg-gray-500 py-4 px-1 w-max text-center text-gray-50  my-4'>Top Ranking Movies</h2>  
   <div className='md:my-8 lg:my-11 w-full grid grid-cols-2 md:grid-cols-3 [&>*:nth-child(even)]:bg-gray-50 dark:[&>*:nth-child(even)]:text-black'>  
  {loading?<p>Loading...</p>:result_pop.slice(-10).filter(ex=> ex.title !== undefined).map((xy, i)=> 
 <div key={xy.title+ ' ' + i} className='flex border py-4 h-auto' >  
   <p className='p-1 md:text-xl text-lg italic font-bold'> {i+1} </p>
  <h3 className='md:text-xl text-lg py-3 px-2'> {xy.title} </h3>

  </div>
 )}   
 </div> 
 
  </div>   
</div>  

 </div> 
 <div className='h-max mx-1 rounded-t lg:hidden absolute top-0 -right-28 -mr-2 md:bg-transparent md:relative hover:right-0 md:w-auto md:right-0 md:-mr-0 cursor-pointer'>  
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
 <Link href='/netflix-naija/new-on-netflix/'><p className='py-3 font-bold text-center'>On Netflix Naija</p></Link> 
 </div>
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
 <Link href='/netflix-naija/coming-to-netflix/'><p className='py-3 font-bold text-center '>Coming to Netflix Naija</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full dark:text-gray-200'> 
 <FontAwesomeIcon icon={faNewspaper} className='text-2xl p-2'/>
 <Link href='/naija-wiki/'><p className='py-3 font-bold text-center'>Netflix News</p></Link>  
 </div> 
 </div> 
 
 <div className='hidden lg:block mx-1 py-4 max-w-sm dark:text-white text-gray-600'>  
   <div className="cursor-pointer py-6 shadow max-w-sm border px-3 font-bold flex items-center justify-between my-1"> 
   <Link href='/netflix-naija/new-on-netflix/'><li className='hover:text-gray-400 list-none'>New on Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
    <div className="cursor-pointer py-6 shadow max-w-sm border px-3 font-bold flex items-center justify-between my-1"> 
    <Link href='/netflix-naija/coming-to-netflix/'><li className='hover:text-gray-400 list-none'>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 

   <div className='mx-1 max-w-xs dark:text-white text-gray-600'>   
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black [&>*:nth-child(odd)]:dark:border-l-white [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
 {news_posts_netflix.slice(0,10).map((xy,i)=>
 <div key={xy.title + ' ' + i} className='shadow flex my-2 justify-between py-6 px-2'>
 <div>
 <Image
  className='border max-w-28 object-cover'
 src={xy?.featuredImage?.node.sourceUrl}
 width={200}
 height={205}
 alt={xy?.featuredImage?.node.altText}
 /> 
 
 </div>
 <div className='px-2 font-bold flex items-center justify-between my-1'>
 <Link href={`/netflix-naija/news/${xy.slug}/`}><h2 className='text-base hover:text-gray-400'>{xy.title} </h2></Link>
  </div> 
 </div> 
 )}</div>
 
 </div>  
 
    </div>
 
 
</div> 
<hr className='bg-black h-1 my-2'/>
<div className='bg-white px-3 dark:bg-black py-8 text-gray-800 dark:text-gray-200'> 
<div className='max-w-7xl m-auto'>
   <h2 className='text-2xl font-bold py-4'>Next</h2>
     </div>
<div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
   <div className='flex' style={{width:'1000px'}}>  
   {next_posts.slice(0,3).map((xy,i)=> 
    <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}>   
    <Link href={`/topic/${xy.node.contentTags.nodes?.slug}/`}></Link> <h3 className='text-red-500 text-sm italic py-1 hover:text-gray-700 cursor-pointer font-bold'>{xy.node.contentTags.nodes?.name} </h3>
    <Link href={`/netflix-naija/new-on-netflix/${xy.node.slug}/`}><h2 className="hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className=''>{moment(xy.node.date).fromNow()}</p> 
        <Link href={`/creator/${xy.node.author.node.slug}/`}>
          <p className='py-2 text-gray-800 font-medium hover:text-red-400 font-bold'>{xy.node.author.node.name}</p>
        </Link> 
      </div>   
     
    </div>
   )} 
    </div> 
    </div> 
  </div> 
  
</div>)
}
 
export default NewOnNetflixDetails