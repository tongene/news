"use client"
import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from "@fortawesome/free-solid-svg-icons" 
 
import Paginate from "../Paginate" 
import NewsLetter from "@/components/NewsLetter"

type TitleXProps={
  title:string
  slug:string
  excerpt:string
  date:string
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
    netflixNewsRelated:{
    nodes:[
    {
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
 

const ComingToNetflixNaija = ({coming_to_netflix_grouped, netflix_news_data,coming_to_netflix_naija}:{coming_to_netflix_grouped:TitleProps[], netflix_news_data:TitleProps[],coming_to_netflix_naija:TitleProps[]}) => { 
   const [slug]=coming_to_netflix_naija    
  const netflixNaija=coming_to_netflix_naija.map((xy)=> xy.node.naijaOnNetflix.edges).flat()
  const news_items = netflix_news_data.map((ex)=> ex.node.naijaOnNetflix?.nodes
 ).flat() 
 
 const replaceHTMLTags=(string:string)=>{
  // const regex = /(<([^>]+)>)/gi;
  // //(/<\/?[^>]+(>|$)/g, "")
  // const newString = string.replace(regex, "");
  // return newString
   }
   
  return (
 <div className='bg-gray-50'>  
<div className="bg-black px-4"> 
<div className='m-auto py-11 max-w-max lg:max-w-7xl' > 
<div>
<h2 className="py-6 text-lg xxs:text-2xl text-white font-bold" >Nigerian Movies on Netflix</h2> 
<hr className='my-2 h-2'/>
<p className="text-xl py-4 text-white leading-8 px-2" >Get a quick overview of the new movies, TV shows/series and documentaries coming to Netflix Naija everyday.</p>
</div>

  <section className='lg:flex relative'> 
  <div className='border-r my-1'> 
  {coming_to_netflix_grouped.slice(0,1).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt_vid'> 
  <div> 
  <Image
  className="grid-img"
width={1200}
        height={675}    
       src={nt.node.featuredImage.node.sourceUrl}     
       alt={nt.node.featuredImage.node.altText}
      />  
      </div>  
      <div className='absolute z-20 top-5 xs:mx-8 xs:top-20 sm:top-36 font-bold text-white mx-2 lg:w-1/2'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }} className='overflow-hidden text-ellipsis text-xl xs:text-3xl md:text-4xl  hover:text-gray-500 '> {nt.node.title}</h2></Link>
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}>
    <div className="py-2 xs:py-3">
    <div dangerouslySetInnerHTML={{__html:nt.node.excerpt}}style={{ display: '-webkit-box', WebkitLineClamp:1, WebkitBoxOrient: 'vertical' }} className='overflow-hidden text-ellipsis xs:block hover:text-gray-500'/></div></Link> 
    <span className='italic text-sm'>{moment(nt.node.date).subtract(1, 'hour').fromNow()} </span>
    </div>
    </div> 
       )
) }</div>  
<div className='relative overflow-hidden overflow-x-auto overflow-x-hidden h-max max-w-max xs:flex lg:block'>
 
  {coming_to_netflix_grouped.slice(1,4).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt_vid lg:text-white my-0.5 [&:nth-child(3)]:lg:mt-1 [&:nth-child(2)]:lg:mt-1'>
 <div className="lg:w-96">  
 <Image 
 className="object-cover h-56 xs:h-32 sm:h-44 md:h-48"
 src={nt.node.featuredImage.node.sourceUrl }
 width={1200}
 height={675}
 alt={nt.node.featuredImage.node.altText}
  />  
  </div>
  <div className='relative h-max text-white font-bold'>
        <div className='absolute bottom-8 xs:bottom-1 z-10'>
        <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='hover:text-gray-500 overflow-hidden text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg xs:text-base sm:text-lg lg:text-xl'>{nt.node.title}</h2></Link>
    <Link href={`/topic/${nt.node.contentTags.nodes?.slug}/`}><p className='text-sm mx-2 xs:text-xs sm:text-sm hover:text-gray-500 py-2'><span>{moment(nt.node.date).subtract(1, 'hour').fromNow()} |</span> {nt.node.contentTags.nodes?.name}</p ></Link> 

      </div> 
      
    </div>
    </div>  
       )    
) } </div> 
   
</section> 
  
</div> 
  
</div>  

<div className="sm:flex justify-between max-w-max bg-white m-auto"> 
<Paginate content={coming_to_netflix_grouped.slice(4)} pathString='coming-to-netflix' />
<div> 
  <div className='h-max rounded-t lg:hidden bg-transparent max-w-36 sm:m-0 m-auto cursor-pointer'>   

<div className='py-5 flex flex-col justify-center w-full cursor-pointer my-2 text-gray-600 px-2'> 
<FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
<Link href='/netflix-naija/new-on-netflix/'prefetch={false}><p className='p-2 font-bold text-center text-lg'>On Netflix Naija</p></Link> 
</div> 
<hr/>
<div className='py-5 flex flex-col justify-center w-full cursor-pointer my-2 bg-transparent text-gray-600'> 
<FontAwesomeIcon icon={faFilm} className='text-xl p-2'/> 
<Link href='/naija-wiki/'prefetch={false}><p className='p-2 font-bold text-center text-lg'>Netflix News</p></Link>  
</div>  
 
 </div>  


<div className='hidden lg:block mx-1 py-4 max-w-sm'> 

 <div className="cursor-pointer py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
 <Link href='/netflix-naija/new-on-netflix/'><li className='hover:text-gray-400 list-none'>New on Netflix Naija</li></Link>
<FontAwesomeIcon icon={faAngleRight}/>
</div> 

<div className='[&_.news-letter-unflexed>form]:lg:flex-wrap [&_.news-letter-unflexed]:w-80 [&_.news-letter-unflexed]:max-w-auto [&_.news-letter-unflexed]:md:m-0 [&_.news-letter-unflexed]:my-2 [&_.news-letter-buttonwidth]:md:w-auto [&_.news-letter-nowidth]:w-auto'>
<NewsLetter/>
</div>
<div className='mx-1 max-w-sm'>   
  <h2 className='text-3xl text-center font-bold py-4 border-b my-4 dark:text-black'>News</h2>
  <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
{news_items.slice(0,10).map((xy,i)=>
<div key={xy.title + ' ' + i} className='shadow flex my-2 justify-between py-3 px-2'>
<div>
<Image
className='border max-w-28 object-cover h-24' 
src={xy?.featuredImage?.node.sourceUrl}
width={200}
height={205}
alt={xy?.featuredImage?.node.altText}
/> 

</div>
<div className='px-2 font-bold'>
<p className='text-red-600'>{moment(xy.date).subtract(1, 'hour').fromNow()}</p> 
<Link href={`/netflix-naija/news/${xy.slug}/`}><h2 className='hover:text-gray-400 text-gray-600'>{xy.title} </h2></Link>
</div> 
</div> 
)}</div>

</div>  
 
 </div> 

</div>

 </div> 
 </div> 
 )
}

export default ComingToNetflixNaija