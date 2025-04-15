
import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"  
import SideBar from "../Side" 
import { CineProps, Cursors, SideNode } from "@/app/types"
import Paginate from "../Paginate"

type PostProps={ 
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
  featuredImage:{
    node:{
    sourceUrl:string
    caption:string
    altText:string
    }
    }
    contentTypeName:string
    contentTags:{
      id:string
    slug: string
    name: string 
    nodes:{
      id:string
    slug: string
    name: string
    
    }[]
    }
}
const Nollywood = ({nollywood_news, sidebarItems, news_outline, coming_titles}:{nollywood_news:PostProps[], sidebarItems:Cursors[], news_outline:SideNode[], coming_titles:CineProps[]}) => {
 
 const replaceHTMLTags=(string:string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
   
  return (
 <div className=''>  
  <div className="bg-black"> 
<div className='m-auto py-11' style={{maxWidth:'1420px'}}> 
<div className="w-max mx-11 xl:mx-28">
<h2 className="py-6 px-2 bg-yellow-600 rounded xs:text-2xl text-white font-bold border w-80 text-center" >Nollywood News</h2>
<p className="text-xl py-4 text-white max-w-2xl" >Get a quick overview of new Nollywood movies & TV shows/series.</p>
</div>  
 <section className='xl:flex relative m-auto justify-center grid-x-page' > 
  <div className='border'>
  {nollywood_news?.slice(0,1).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt'>
    <Image
    className="grid-img"
        width={1200}
        height={675}    
       src={nt.featuredImage.node.sourceUrl}     
       alt={nt.featuredImage.node.altText || nt.title}
      /> 
      <div className='absolute z-20 top-0 sm:top-28 xs:mx-8 py-5 font-bold text-white mx-2 w-3/4'>  
      <div className="py-2"> 
    <Link href={`/news/nollywood/${nt.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}  className='overflow-hidden text-ellipsis text-xl xs:text-3xl md:text-4xl leading-8 hover:text-gray-600'> {nt.title}</h2></Link></div>
    <Link href={`/news/nollywood/${nt.slug}`}><div dangerouslySetInnerHTML={{__html:nt.excerpt}} className='overflow-hidden text-ellipsis xs:text-lg text-sm xs:block leading-6 w-3/4 hover:text-gray-600'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}/></Link> 
    <span className='text-end text-sm mt-11 italic py-2'>{moment(nt.date).fromNow()} </span>
    </div>
    </div> 
       )    
) }</div> 

<div className='overflow-hidden overflow-x-auto sm:overflow-x-hidden h-max xs:flex xl:block'>
  {nollywood_news?.slice(1,4).map((nt)=>(
  <div key={nt.slug} className='home_grid_alt2 border-b lg:border-b-0 lg:text-white lg:relative my-1 xl:my-0 '>
    <div className="xl:w-96 lg:my-0.5">  
    <Image 
    className="object-cover h-56 xs:h-32 sm:h-44 md:h-48"
    src={nt.featuredImage.node.sourceUrl }
    width={1200}
    height={675}
    alt={nt.featuredImage.node.altText}
     />  
     </div>
     <div className='relative h-max text-white font-bold'>
        <div className='absolute bottom-8 xs:bottom-1 z-10'>
        <Link href={`/news/nollywood/${nt.slug}`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='hover:text-gray-500 overflow-hidden text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg xs:text-base sm:text-lg lg:text-xl'>{nt.title}</h2></Link>
        <Link href={`/topic/${nt.contentTags.nodes[0]?.slug}`}><p className='text-sm mx-2 xs:text-xs sm:text-sm hover:text-gray-500 py-2'><span>{moment(nt.date).fromNow()} |</span> {nt.contentTags.nodes[0]?.name}</p ></Link> 

      </div> 
      
    </div>
    
    </div> 
       )    
) }
    </div> 
  
</section>
</div> 
  
</div> 
<div className="md:flex justify-between max-w-max"> 
<Paginate content={nollywood_news?.slice(4)}/>
<SideBar sidebarItems={sidebarItems}
news_outline={news_outline} coming_titles={coming_titles}/>
 </div>  
 </div>
 )
}

export default Nollywood