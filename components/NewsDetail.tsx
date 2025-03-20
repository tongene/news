"use client"
import { dateFormatter } from "@/utils/dateformat"
import * as cheerio from 'cheerio';
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "./ShareButtons"; 
import SideBar from "./Side";
import { PostTypeProps, NextTypeProps, CineProps, Cursors, SideNode} from "@/app/types";
import moment from "moment"; 
import { usePathname } from "next/navigation";
            
const NewsDetail = ({post, next_naija_news, sidebarItems, news_outline, coming_titles}:{post:PostTypeProps, next_naija_news:NextTypeProps[], sidebarItems:Cursors[], news_outline:SideNode[], coming_titles:CineProps[]}) => { 

  const $ = cheerio.load( post.content ) 
  let data_texts= ''
  let data_link:number[]= [] 
  let data_imgs= []
  const h2t_index:number[]=[]
  const h3r_index:number[]=[]
  const link_texts=[] 
      $('img', post.content).each( (index,element)=>{
        const img = $(element).attr('src') 
        data_imgs.push(img)
        })
        $('p', post.content).each((index,element)=>{
          const text = $(element).text()
          data_texts+=text
          })
    
      post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h2')){
              h2t_index.push(index )
           } 
          })});
           post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('h3')){
              h3r_index.push(index )
           } 
          })}); 
        post.content.split('\n').filter((xy)=> xy!=='').forEach((item, index) => {
            const tags = item.match(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
            tags?.map((xy)=>{
            if(xy?.includes('href')){
              data_link.push(index)
              $('a', xy).each((index,element)=>{
                const linked = $(element).attr('href')  
               link_texts.push({
                item:linked,
                index
               })
            
            }) 
           } 
          })});
 
          const post_related= post.postnewsgroup.relatedPosts?.edges   
            const nextPosts = next_naija_news.filter((tx)=> tx.contentTypeName !== "added-netflix-naija").filter((tx)=> tx.contentTypeName !== "outline").filter((xy)=> xy.contentTypeName!== 'live')?.filter((xy)=> xy.contentTypeName !== 'anticpated-nollywood')?.filter((xy)=> xy.contentTypeName !== 'anticpated-african')?.filter((xy)=> xy.contentTypeName !== 'anticpated-foreign')?.filter((xy)=> xy.contentTypeName !== 'netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'what-to-watch').filter((xy)=> xy.contentTypeName !== 'list-netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'char')?.filter((xy)=> xy.contentTypeName !== 'naija-wiki')?.filter((xy)=> xy.contentTypeName !== 'latest')?.filter((xy)=> xy.contentTypeName !== 'outline')?.filter((xy)=> xy.contentTypeName!== 'page').filter((xy)=> xy.contentTypeName!== 'live') 
  
         const pathname = usePathname()
      
  return (
    <div>
      <div className="px-5"> 
<div className="">
<div className="px-4 lg:px-16 py-8 m-auto max-w-7xl" > 
<div className="flex justify-between text-ld py-4 px-2"> 
<p>{dateFormatter.format(Date.parse(post.date))}</p>
<p>{(post.categories.nodes??[][0]).name}</p>
</div>
    <hr className="bg-black h-1 w-full my-1"/> 
<hr className="bg-black h-1 w-full my-1"/>  
  
 <h1 className="text-4xl md:text-5xl font-bold  py-4 " style={{lineHeight:'52px'}}>
   {post.title} 
  </h1>
  <div className="border-t border-t-4 border-t-orange-600">
  <div className="xs:flex justify-between items-center py-6">
    <div className="flex"> 
 <small className="text-lg">by:</small><Image  
   className='rounded-full'
  src={post.author.node.avatar.url}
  width={50}
   height={50}
  alt={post.author.node.name} 
  />  
 <Link href={`/creator/${post?.author.node.slug}`}><h2 className="text-lg px-2 text-orange-600 font-bold hover:text-gray-600 cursor-pointer">{post.author.node.name}</h2></Link>
  </div>

  <div className="
  [&_.share-view]:relative [&_.share-view]:bg-white [&_.share-view]:dark:bg-transparent [&_.shadow-sharebtn]:my-2 [&_.share-view]:text-gray-800 [&_.share-view] [&_.share-view]:dark:text-gray-200 [&_.share-view]:w-64 [&_.share-view]:left-0 [&_.share-view]:right-0 text-xl sm:my-11 [&_.share-view]:p-1"> 
 <ShareButtons 
 item={post} 
 shareOptions={true} 
 activeIdx={post.id}
 />
</div>
 </div>
<hr/>
  <div dangerouslySetInnerHTML={{__html:post.excerpt}} className="py-4 text-xl font-medium italic leading-8"/>
</div>  
 </div>
 
 <Image 
  className="flex flex-col items-center justify-center bg-cover bg-center h-1/2 w-full object-cover border-t border-t-8 rounded-t border-t-orange-600"
     src={post.featuredImage.node.sourceUrl}
     width={1250}
     height={675}
     alt={post.featuredImage.node.altText}
     />
 <div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:post.featuredImage.node.caption}} className="absolute bottom-20 left-8 p-6 leading-8 shadow-xl font-mono"/> 
 </div>
</div> 
<div className="lg:flex mx-auto"style={{maxWidth:'1450px'}}> 
  <div className="lg:max-w-2xl min-[1060px]:max-w-2xl min-[1140px]:max-w-3xl xl:max-w-4xl 2xl:max-w-max mx-auto">

<div className="px-2 py-8 m-auto"style={{maxWidth:'1700px'}}>
 
<div className="min-[420px]:flex flex-wrap max-w-5xl m-auto">
 <div className="min-[420px]:w-1/2 px-2 h-max">
{ post.postnewsgroup?.heroImage?.node.sourceUrl&&
<div className=" h-72 lg:h-96">
 <Image 
  className="object-cover h-full border-t border-t-8 rounded-t border-t-orange-600"
     src={post.postnewsgroup?.heroImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={post.postnewsgroup?.heroImage?.node.altText}
     /> 
 </div>}
<div dangerouslySetInnerHTML={{__html: post.postnewsgroup?.heroImage?.node.caption}} className="italic py-2 text-sm "/>
 <div>
{post.content.split('\n').filter((xy)=> xy !=='').slice(0,post.content.split('\n').length/10).map((line, index) =>(
  <div key={index + ' ' + Math.random()} className="">
 
     <div>
        <div dangerouslySetInnerHTML={{__html:line}} className="py-2 my-1 text-lg leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm  [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold [&_h2]:border-b [&_h2]:border-b-4"/>
        {index===0&&     
     <div className='bg-white w-11/12 lg:w-4/5'>
      {post_related?.slice(0,2).map((ex)=> 
       <div key={ex.node.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
       <Link href={`/news/topic/${ex.node.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}className="overflow-hidden text-ellipsis  text-orange-600 hover:text-red-300 text-lg py-1 font-bold">{ex.node.title} </h2></Link>
       </div>
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto"> 
     <Image 
     src={ex.node.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.node.featuredImage?.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/topic/${ex.node.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   
        </div>  
       )} 
      </div>
            }
       </div>
    
   </div> ))}

</div>  
   </div>
  
  <div className="min-[420px]:w-1/2 px-2 h-max">
  {post.content.split('\n').filter((xy)=> xy !=='').slice(post.content.split('\n').length/10).map((line, index) =>(
  <div key={index + ' ' + Math.random()}>  
   <div>
        <div dangerouslySetInnerHTML={{__html:line}} className="py-2 my-1 text-lg leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm  [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold [&_h2]:border-b [&_h2]:border-b-4"/>
        {index===3&&     
     <div className='bg-white w-11/12 m-auto lg:w-4/5'>
      {post_related?.slice(2).map((ex)=> 
       <div key={ex.node.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3"> 
       <div className="sm:flex justify-center"> 
       <div className="px-1 sm:w-4/5">
       <Link href={`/news/topic/${ex.node.slug}`}><h2 className="text-orange-600 hover:text-red-300 py-1 font-bold">{ex.node.title} </h2></Link>
       </div>
       
     <div className="px-4 py-2 sm:w-2/3 sm:px-0 sm:m-0 m-auto"> 
     <Image 
     src={ex.node.featuredImage?.node.sourceUrl}
     width={1200}
     height={675}
     alt={ex.node.featuredImage?.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/topic/${ex.node.slug}`}><button className="my-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
        </div>  
       )} 
      </div>
            }
       </div>     

 </div>
))}

 </div> 

 </div>
</div>
<div className='flex flex-wrap py-2'> 
  {post?.tags?.nodes.map((xy)=>
<div key={xy?.name + ' ' + Math.random()} className='m-1'>
 <Link href={`/topic/${xy?.slug}`}><h4 className='hover:bg-gray-600 hover:text-gray-200 border border-gray-600 bg-gray-50 text-gray-600 p-2 text-lg w-max text-center'>{xy?.name} </h4></Link>

</div>)} 
</div>
<div className="text-xl text-center border py-5 my-11 mx-2 bg-red-700 hover:bg-red-900 font-mono font-bold text-white dark:text-auto">
  
 <Link href={{ pathname: '/forum', query: { topic:post.slug} }}><button>Join or Start a conversation on the topic - Go to Forum</button></Link> 
</div>
 
<div className='bg-white dark:bg-transparent px-3'> 
<div className='max-w-7xl m-auto'>
   <h2 className='text-2xl font-bold py-4'>Next</h2>
     </div>
  <div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
   <div className='flex' style={{width:'1000px'}}> 
   {nextPosts.filter((vx)=> vx.contentTypeName==='post').slice(0,3).map((xy,i)=>   
   <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}> 
  
    <Link href={`/topic/${xy.tags.nodes[0]?.slug}`}> <h3 className='text-red-500 text-sm italic py-2 hover:dark:text-gray-500'>{xy.tags?.nodes[0]?.name} </h3></Link>
    <Link href={`/news/topic/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-xl hover:dark:text-gray-500 dark:text-gray-300 font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer "style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className='text-gray-600 dark:text-red-600'>{moment(xy.date).fromNow()}</p> 
        <Link href={`/creator/${xy.author.node.slug}`}>
          <p className='py-2 text-gray-800 font-medium hover:dark:text-gray-500 dark:text-gray-300'>{xy.author.node.name}</p>
        </Link> 
      </div> 
     
    </div> 
 
  )}  

  </div> 
    </div>
     
  </div>
 </div>
  <SideBar sidebarItems={sidebarItems}news_outline={news_outline} coming_titles={coming_titles}/> 
  </div>
 </div>
 
</div>
  )
}

export default NewsDetail
