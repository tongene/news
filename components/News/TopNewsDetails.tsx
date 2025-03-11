 
import * as cheerio from 'cheerio';
import moment from 'moment';
import Image from "next/image";
import React from "react";  
import ShareButtons from "../ShareButtons";
import Link from 'next/link'; 
import { TopNews } from '@/app/types';
const TopNewsDetails = ({news_detail}:{news_detail:TopNews}) => {
  const $ = cheerio.load( news_detail.content )
  let data_texts= ''
  let data_imgs= []
  const header_index=[]
  const h2t_index=[]
  const h3r_index=[] 
  news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h2')){
              h2t_index.push(index )
           } 
          })});
          news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h3')){
              h3r_index.push(index )
           } 
          })}); 

  const replaceHTMLTags=(string:string)=>{
    const regex = /(<([^>]+)>)/gi; 
    const newString = string.replace(regex, "");
    return newString
     }

     const related_content=news_detail.postnewsgroup.relatedPosts?.edges

     $('img', news_detail.content).each( function(){
      const img = $(this).attr('src') 
      data_imgs.push(img)
      })
      $('p', news_detail.content).each( function(){
        const text = $(this).text()
        data_texts+=text
        })
        ///[&:not(:first-child)]
     
        const result = data_texts.replace(/(?:\.[^.]*){2}\./g, (match) => match + "<br/>");
        news_detail.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
          const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          tags?.map((xy)=>{
              if(xy?.includes('h2')){
            header_index.push(index )
         } 
        })});
     
  return (  
 <div className='bg-white max-w-6xl lg:max-w-2xl xl:max-w-max sm:p-6' > 
<h1 className="text-4xl font-bold md:text-5xl "style={{lineHeight:'50px'}}>{news_detail.title}</h1>
<p className='py-4 text-lg italic'>{replaceHTMLTags(news_detail.excerpt)}</p>
<div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:news_detail.featuredImage.node.caption}} className="absolute top-0 left-6 p-4 leading-6 shadow-xl font-mono max-w-xl"/>
 
 </div>
<Image 
src={news_detail.featuredImage.node.sourceUrl}
width={1200}
height={675}
alt={news_detail.featuredImage.node.altText} 
/> 

<div className='xs:flex'> 
<div className='border-r xs:w-full'> 

<div className='h-32 px-2'>  
  <div className='flex xs:block sm:flex py-4'> 
  <div className='w-10'> 
    <Image 
    className='rounded-full'
    src={news_detail.author.node.avatar.url}
    width={1200}
    height={675}
    alt={news_detail.author.node.name}
    />
   </div> 
 
<Link href={`/creator/${news_detail.author.node.slug}`}><p className='text-lg p-3 underline font-bold'>{news_detail.author.node.name} </p></Link> 

</div>
<hr className='bg-black p-0.5 m-0.5'/>
<hr className='bg-black p-0.5 m-0.5'/>
</div><p className='text-sm  text-red-600 italic my-1 text-end'>{moment(news_detail.date).fromNow()} </p>
<div className="[&_.share-view]:bg-white [&_.share-view]:xs:absolute [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:xs:flex-col [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:xs:py-3  xs:my-11">
  <ShareButtons 
 item={news_detail} 
 activeIdx={news_detail.id}
  shareOptions={true}
    /> 
     </div> 
</div>
  
<div className='py-11 relative xs:my-0 xs:bottom-44 md:max-w-3xl lg:max-w-md xl:max-w-4xl'>
<hr className='h-2 bg-gray-800'/> 
<div className='xs:px-6 xs:py-8 bg-white 6'>
{news_detail.tags.nodes.map((xy)=>
<div key={xy.name + ' ' + Math.random()} className='my-3'>
 <Link href={`/topic/${xy.slug}`}><h4 className='hover:bg-gray-600 hover:text-gray-200 border border-gray-600 bg-gray-50 text-gray-600 p-3 text-xl w-32 text-center'>{xy.name} </h4></Link>
 <hr className='bg-black p-0.5 m-0.5'/>
<hr className='bg-black p-0.5 m-0.5'/>
</div>)}

{news_detail.content.split('\n').filter((xy)=> xy !=='').map((line, index) =>(
  <div key={index + ' ' + Math.random()}className='p-1 my-1'>
    <div dangerouslySetInnerHTML={{__html:line}} className="[&_h2]:text-3xl [&_h2]:py-3 [&_h2]:mt-4 [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:py-3 [&_h2]:mt-4 [&_h3]:font-bold my-1 text-lg leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm [&_figure>figcaption]:text-center [&_img]:max-w-xs [&_img]:sm:max-w-sm [&_img]:md:max-w-2xl [&_img]:max-h-96 [&_img]:m-auto"/>
    {index===5&&     
     <div className='bg-white md:flex lg:block xl:flex m-auto md:m-0'>  
      {related_content?.slice(0,2).map((ex)=>   
       <div key={ex.node.title + ' ' + Math.random()} className="py-4 first:border-b border px-3 max-w-xs m-auto sm:m-0"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
         <Link href={`/news/${news_detail.contentTypeName}/${ex.node.slug}`}><h2 className="text-gray-600 hover:text-red-300 text-lg py-2">{ex.node.title} </h2></Link>  
       </div> 
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto">      
     <Image 
     src={ex.node?.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.node?.featuredImage?.node.altText}
     /> 
      
      </div> 
     
       </div>
        <Link href={`/news/${ex.node.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
        </div>  
       )} 
 </div>}
   </div> ))}

</div>  
</div>
 
</div>
</div> 
  )
}

export default TopNewsDetails

 