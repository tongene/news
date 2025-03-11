"use client"
import React from 'react' 
import Image from 'next/image'; 
import Link from 'next/link'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAward, faClapperboard, faFilm } from '@fortawesome/free-solid-svg-icons';
import ShareButtons from '@/components/ShareButtons';
import moment from 'moment';
import { faClock, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';


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



const CategoryComingDetails = ({coming_to_netflix_naija,  netflix_related, netflix_news, coming_to_netflix_details }:{coming_to_netflix_details:TitleProps, coming_to_netflix_naija:TitleProps[], netflix_related:TitleProps[], netflix_news:TitleProps[]}) => {  

const itempub =new Date(coming_to_netflix_details.date)   
 const {netflixEmbeds} = coming_to_netflix_details.netflixNewsGroup 
 const news_posts_netflix=netflix_news.map((tx)=> tx.node.naijaOnNetflix.nodes).flat()
 const next_posts=coming_to_netflix_naija.map((tx)=> tx.node.naijaOnNetflix.edges).flat()
//   //const {embedText}=new_on_details.netflixNewsGroup
 const {intro}=coming_to_netflix_details.netflixNewsGroup 
 
return (
  <div className=' bg-gray-50'> 
 <div className='flex bg-white m-auto justify-center m-auto' style={{maxWidth:'1450px'}}>
  <div className='border-r border-r-4 lg:px-6'>

  <div className="px-2">
    <div className='flex flex-col justify-center items-center m-6'> 
    <p className='p-4 text-gray-700 font-bold text-center text-xl border-t border-t-black'> Movies and Series on Netflix Naija </p>  
 </div>
    <hr className=' h-0.5 mx-2 mt-4 bg-black'/> 
    <div className="[&_.share-view]:bg-white [&_.share-view]:relative [&_.share-view]:max-w-max [&_.share-view]:shadow-none [&_.share-view]:md:left-2/3 [&_.share-view]:border-0 [&_.share-view]:items-stretch [&_.share-view]:w-full [&_.share-view]:text-gray-800 text-xl [&_.shadow-sharebtn]:px-3 [&_.shadow-sharebtn]:py-3">
  <ShareButtons 
 item={coming_to_netflix_details} 
 activeIdx={coming_to_netflix_details.id}
  shareOptions={true}
    /> 
     </div>
    <div className='px-4 my-2 border-b '> 
  <h2 className='text-4xl my-2 font-bold text-gray-700 leading-10'>{coming_to_netflix_details.title}</h2> 
   <Link href={`/creator/${coming_to_netflix_details.author.node.slug}`}><p className='py-2 text-blue-400 hover:text-gray-700'><span className='text-gray-700 italic pr-2 text-xs'>by </span>{coming_to_netflix_details.author.node.name}</p></Link>  
  <p className='text-white text-xs italic'>Published on {itempub.toDateString()}</p>
  
 </div> 
 
  </div> 

 <div className="sm:max-w-3xl lg:max-w-4xl px-6"> 
 <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.excerpt}}className='text-lg py-2 leading-10'/>  
<hr className='bg-black h-1 my-2'/> 
<div className='relative px-5'> 
<Image 
 src={coming_to_netflix_details.featuredImage.node.sourceUrl}
 width={1200}
  height={675}
 alt={coming_to_netflix_details.title}
 />  
  <div dangerouslySetInnerHTML={{__html:coming_to_netflix_details.featuredImage.node.caption}} className="absolute bottom-0 left-8 p-6 leading-8 shadow-xl font-mono"/> 
 </div>
 <div dangerouslySetInnerHTML={{__html:intro}} className='text-lg py-2 leading-10'/> 
 <hr className='bg-black h-1 my-2'/>  
 <div className="[&_iframe]:w-1/2" > 
  {coming_to_netflix_details.content.split('\n').map((xy, index)=> 
  <div key={xy+ ' ' + index} className=' '> 
  <div dangerouslySetInnerHTML={{__html:xy}} className="[&_p]:py-2 [&_iframe]:w-1/2 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm text-lg leading-9 [&>figure]:px-8 [&>h3]:text-3xl [&>h3]:font-bold [&>h2]:text-3xl [&>h5]:font-bold [&>h5]:text-xl [&>h2]:font-bold [&>h4]:text-3xl [&>h4]:font-bold [&_p>a]:hover:bg-green-900 [&_p>a]:text-green-600 py-0.5 [&>h5]:py-8 [&>h4]:py-8 [&>h2]:py-8 [&>h3]:py-8 [&>h2]:bg-gray-700 [&>h3]:bg-gray-700 [&>h4]:bg-gray-700 [&>h2]:text-gray-200 [&>h3]:text-gray-200 [&>h4]:text-gray-200 [&>h2]:px-3 [&>h3]:px-3 [&>h4]:px-3 [&_img]:m-auto"/> 
 {index===4 && 
   <div className='my-4 px-2'>
 <hr className='bg-black h-1'/>
<h3 className='text-center text-gray-600 text-3xl py-4 px-1'>More on the Topic</h3> 
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
  <div className='px-2 py-4 text-gray-700 font-light text-lg flex flex-col xs:max-w-xs flex-col-reverse'> 
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

</div>} 
 {/*  <iframe className='md:w-4/5 w-11/12 m-auto h-72 lg:h-96'
 title={xy}
 width={1200}
 height={675}
 src={src}
 frameBorder="0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
 referrerPolicy="strict-origin-when-cross-origin"
 allowFullScreen
></iframe>
 */}
 
</div> 
)} 
  
 </div> 

  </div>



   </div> 
   <div className='h-max mx-1 rounded-t lg:hidden absolute -right-28 -mr-2 md:bg-transparent md:relative hover:right-0 md:right-0 md:w-auto cursor-pointer '>   
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-gray-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faClapperboard}className='text-xl'/>
 <Link href='/netflix-naija/new-on-netflix'><p className='p-3 font-bold text-center'>On Netflix Naija</p></Link> 
 </div>
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
 <Link href='/netflix-naija/coming-to-netflix'><p className='p-3 font-bold text-center'>Coming to Netflix Naija</p></Link>  
 </div> 
 <div className='py-5 text-gray-200 flex flex-col justify-center w-32 h-32 cursor-pointer bg-yellow-500 my-2 md:bg-transparent md:text-gray-600 md:rounded-none rounded-full'> 
 <FontAwesomeIcon icon={faNewspaper} className='text-2xl p-2'/>
 <Link href='/naija-wiki/'><p className='p-3 font-bold text-center'>Netflix News</p></Link>  
 </div> 
 </div>
 <div className='hidden lg:block mx-1 py-4 max-w-sm'>  
   <div className="cursor-pointer text-base py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
   <Link href='/netflix-naija/new-on-netflix'><li className='hover:text-gray-400 list-none'>New on Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 
    <div className="cursor-pointer text-sm py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
    <Link href='/netflix-naija/coming-to-netflix'><li className='hover:text-gray-400 list-none'>Coming to Netflix Naija</li></Link>
  <FontAwesomeIcon icon={faAngleRight}/>
  </div> 

   <div className='mx-1 max-w-xs'>   
     <h2 className='text-3xl text-center font-bold py-4 border-b my-4'>News</h2>
     <div className='[&>*:nth-child(odd)]:border-l-4 [&>*:nth-child(odd)]:border-l-black  [&>*:nth-child(even)]:border-l-4 [&>*:nth-child(even)]:border-l-orange-500 my-2'> 
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
 <div className='px-2  font-bold flex items-center justify-between my-1'>
 <Link href={`/netflix-naija/news/${xy.slug}`}><h2 className='text-base hover:text-gray-400 text-gray-600'>{xy.title} </h2></Link>
  </div> 
 </div> 
 )}</div>
 
 </div>  
 
    </div> 
</div>
 <hr className='bg-black h-1 my-2'/>
 
 <div className='bg-white px-3'> 
  <div className='max-w-7xl m-auto'>
   <h2 className='text-2xl text-gray-700 font-bold py-4'>Next</h2>
     </div>
<div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
   <div className='flex' style={{width:'1000px'}}> 
   {next_posts.slice(0,3).map((xy,i)=> 
    <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}>   
    <Link href={`/topic/${(xy.node.contentTags.nodes??[][0]).slug}`}></Link> <h3 className='text-red-500 text-sm italic'>{(xy.node.contentTags.nodes??[][0]).name} </h3>
    <Link href={`/netflix-naija/coming-to-netflix/${xy.node.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-base font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.node.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className='text-gray-600'>{moment(xy.node.date).fromNow()}</p> 
        <Link href={`/creator/${xy.node.author.node.slug}`}>
          <p className='py-2 text-gray-800 font-medium'>{xy.node.author.node.name}</p>
        </Link> 
      </div>   
     
    </div>
   )} 
    </div> 
    </div> 
  </div>  
</div>
)
}
 
export default CategoryComingDetails