import moment from 'moment';
import Image from "next/image";
import ShareButtons from "../ShareButtons";
import Link from 'next/link';
import { NextTypeProps, TopNews } from '@/app/types';
const ArticleDetail = ({news_detail, next_top_news}:{news_detail:TopNews, next_top_news:NextTypeProps[]}) => {
  
    const related_content =news_detail?.newsGroup.related?.edges??[]
     
  return (
    
 <article className='bg-white max-w-6xl lg:max-w-2xl min-[1100px]:max-w-3xl sm:p-6 xl:max-w-4xl 2xl:max-w-5xl xl:p-8 dark:text-gray-900' > 
  <h1 className="text-4xl font-bold md:text-5xl py-8"style={{lineHeight:'50px'}}>{news_detail?.title}</h1>
<hr/>
  <div dangerouslySetInnerHTML={{__html:news_detail?.excerpt}}className='py-4 text-lg italic'/> 
<div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:news_detail?.featuredImage?.node?.caption}} className="absolute top-0 left-6 p-4 leading-6 shadow-xl font-mono max-w-xl"/> 
 
 </div>
  <Image  
src={news_detail?.featuredImage?.node?.sourceUrl} 
width={1200}
height={675}
alt={news_detail?.featuredImage?.node?.altText} 
priority={true}
/>  

<div className='sm:flex'> 
<div className='border-r sm:w-60'>
 <div className='h-32 px-2'>  
  <div className='py-4 justify-between'> 
    <div className='flex'> 
  <div className='w-12'> 
    <Image 
    className='rounded-full'
    src={news_detail?.author?.node?.avatar.url}
    width={1200}
    height={675}
    alt={news_detail?.author?.node?.name}

    />

   </div>  
<Link href={`/creator/${news_detail?.author?.node?.slug}`}><p className='text-lg p-3 underline font-bold dark:text-gray-900'>{news_detail?.author?.node?.name} </p></Link> </div>
<p className='text-sm dark:text-gray-900 text-red-600 italic my-1 px-2'>{moment(news_detail?.date).fromNow()} </p>
</div> 
<hr className='bg-black p-0.5 m-0.5'/>
<hr className='bg-black p-0.5 m-0.5'/>
</div>  
<div className="[&_.share-view]:bg-white [&_.share-view]:sm:absolute [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:m-auto [&_.share-view]:left-0 [&_.share-view]:right-0 [&_.share-view]:sm:flex-col [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:sm:py-3 sm:my-11 [&_.share-view]:p-1 [&_.share-view]:sm:left-20 [&_.share-view]:sm:right-0 [&_.share-view]:xl:left-32">
 <ShareButtons 
 item={news_detail} 
 activeIdx={news_detail?.id}
  shareOptions={true}
    />  
     </div> 
</div>
  
<div className='py-8 relative sm:my-0 sm:bottom-36'>
<hr className='h-2 bg-gray-800'/> 
<div className='sm:px-4 sm:py-8 bg-white'>
  <div className='flex flex-wrap max-w-xs py-2'> 
  {news_detail?.contentTags?.nodes.map((xy)=>
<div key={xy?.name + ' ' + Math.random()} className='m-1'>
 <Link href={`/topic/${xy?.slug}`}><h4 className='hover:bg-gray-600 hover:text-gray-200 border border-gray-600 bg-gray-50 text-gray-600 p-2 text-lg w-max text-center'>{xy?.name} </h4></Link>

</div>)} 
</div>
<hr className='bg-black p-0.5 m-0.5'/>
<hr className='bg-black p-0.5 m-0.5'/>
{news_detail?.content?.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
  <div key={index + ' ' + Math.random()}className='p-1 my-1'> 
    <div dangerouslySetInnerHTML={{__html:line}} className="[&_h2]:text-3xl [&_h2]:py-3 [&_h2]:mt-4 [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:py-3 [&_h2]:mt-4 [&_h3]:font-bold my-1 text-xl leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm [&_figure>figcaption]:text-center [&_img]:max-w-xs [&_img]:sm:max-w-sm [&_img]:md:max-w-2xl [&_img]:max-h-96 [&_img]:m-auto dark:text-gray-900 [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_.wp-block-file>a]:text-gray-300 [&_.wp-block-file]:hover:bg-green-800 [&_.wp-block-file]:p-5 [&_.wp-block-file]:text-lg [&_.wp-block-file]:bg-orange-800 [&_.wp-block-file]:flex [&_.wp-block-file]:flex-col [&_.wp-block-file]:sm:flex-row [&_.wp-block-file]:justify-between [&_.wp-block-file]:first:border-r [&_.wp-block-file]:first:border-r-4 [&_.wp-block-file]:border-green-400 [&_.wp-block-file]:items-center [&_.wp-block-file]:font-bold [&_.wp-element-button]:border [&_.wp-element-button]:border-l-4 [&_.wp-element-button]:p-3 [&_.wp-element-button]:border-gray-300 [&_h2]:border-b [&_h2]:border-b-4 [&_.wp-element-button]:hover:bg-red-600 lg:max-w-md xl:max-w-xl 2xl:max-w-2xl"/> 
 
    {index===5&&
     <div className='bg-white md:flex lg:block xl:flex m-auto md:m-0'>  
      {related_content?.slice(0,2).map((ex)=>
       <div key={ex?.node?.title + ' ' + Math.random()} className="py-4 first:border-b border px-3 max-w-xs m-auto sm:m-0"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
         <Link href={`/news/${news_detail?.contentTypeName}/${ex?.node?.slug}`}><h2 className="text-gray-600 hover:text-red-300 text-lg font-bold text-xl py-2">{ex?.node?.title} </h2></Link>  
       </div> 
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto">      
     <Image 
     src={ex?.node?.featuredImage?.node?.sourceUrl}
     width={1200}
     height={675}
     alt={ex?.node?.featuredImage?.node?.altText}
     /> 
      
      </div> 
     
       </div>
        <Link href={`/news/${news_detail?.contentTypeName}/${ex?.node?.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black  rounded-lg">Read</button></Link>  
        </div>  
       )} 
 </div>} 
   </div> ))}

</div> 

</div>

</div>
<div className="text-xl text-center border py-5 my-11 mx-2 bg-red-700 hover:bg-red-900 font-mono font-bold text-white dark:text-auto">
  
 <Link href={{ pathname: '/forum', query: { topic:news_detail.slug} }}><button>Join or Start a conversation on the topic - Go to Forum</button></Link> 
</div>
<div className='px-3 lg:w-screen ' > 
<div className='max-w-5xl'>
   <h2 className='text-2xl font-bold py-4'>Next</h2>
     </div>
  
  <div className="overflow-auto pt-4 px-1 hidden-scroll lg:max-w-4xl xl:max-w-6xl" > 
   <div className='flex' style={{width:'1100px'}}> 
   {next_top_news.filter((vx)=> vx.contentTypeName!=='post').filter((xx)=> xx.contentTypeName!=="netflix-naija").filter((x1)=> x1.contentTypeName!=="trending").filter((x1)=> x1.contentTypeName!=="char")?.filter((xy)=> xy.contentTypeName !== 'anticpated-nollywood')?.filter((xy)=> xy.contentTypeName !== 'anticpated-african')?.filter((xy)=> xy.contentTypeName !== 'anticpated-foreign')?.filter((xy)=> xy.contentTypeName !== 'netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'what-to-watch').filter((xy)=> xy.contentTypeName !== 'list-netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'char')?.filter((xy)=> xy.contentTypeName !== 'naija-wiki')?.filter((xy)=> xy.contentTypeName !== 'latest')?.filter((xy)=> xy.contentTypeName !== 'outline')?.filter((xy)=> xy.contentTypeName!== 'page').filter((xy)=> xy.contentTypeName!== 'live').filter((xy)=> xy.contentTypeName!== 'added-netflix-naija').slice(0,3).map((xy,i)=>   
   <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}> 
    
    <Link href={`/topic/${xy?.contentTags?.nodes[0]?.slug}`}><h3 className='font-bold text-red-500 text-sm italic py-2 hover:text-gray-500'>{xy?.contentTags?.nodes[0]?.name} </h3></Link> 
    <Link href={`/news/${xy.contentTypeName}/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-lg font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer "style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className='text-gray-600 dark:text-red-600'>{moment(xy.date).fromNow()}</p> 
  
        <Link href={`/creator/${xy.author.node.slug}`}><p className='py-2 text-blue-400 hover:text-gray-700 py-2 text-gray-800 font-medium'><span className='text-gray-700 italic pr-2 text-xs'>by </span>{xy?.author?.node?.name}</p></Link> 
      </div>   
   
    </div>   
  )} 
 
    </div> 
    </div>  
  </div>
</article> 

 
 )
}

export default ArticleDetail

 