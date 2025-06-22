"use client"

import Link from "next/link"
import moment from "moment/moment"
import Image from "next/image"  
import { useEffect, useMemo, useState } from "react"
import Pagination from "@/components/Pagination"
import { faAngleRight, faFilm } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"  
import NewsLetter from "@/components/NewsLetter"
import { NAPINewsProps } from "@/app/types"
 type TitleXProps={
  addedOnNetflixNaijas:{
    nodes:[]
    id:string
    slug:string
    title:string
    }
     title:string
     content:string 
     featuredImage:{
        node:{
        sourceUrl:string
        caption:string
        altText:string
        }
        }
        addednewsgroup:{
          intro:string
          filmTitle:string
          genre:string
          director:string
          cast:string[]
          creators:string
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
    addednewsgroup:{
    intro:string
    filmTitle:string
    genre:string
    director:string
    cast:string[]
    creators:string
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
    addedOnNetflixNaijas:{
      edges:{
         node:TitleXProps
     id:string
        slug:string
        title:string
        }[]
      nodes:[]
      id:string
      slug:string
      title:string
      }
node:TitleXProps
naijaOnNetflix:{
  nodes:[]
}
pageInfo:{
hasNextPage:boolean,
endCursor:string
}
  
}  
 

const NewlyRealeasedNetflixNaija = ({
  made_in_africa, 
  non_africa,    
  added_on_netflix_naija, 
  new_on_netflix_naija,
  netflix_news_data
}:{made_in_africa:TitleProps[], non_africa:TitleProps[], added_on_netflix_naija:TitleProps, new_on_netflix_naija:NAPINewsProps[], netflix_news_data:NAPINewsProps[]}) => {  

 const [slug]=new_on_netflix_naija 
  const [posts, setPosts]=useState([])   
  const [currPg, setCurrPg]=useState(1)
  const [postPerPage, setPostPerP]=useState(10)
  const [title_view, setTitleView]=useState<TitleProps[]>([]) 
   const news_items = netflix_news_data.map((ex)=> ex.node.naijaOnNetflix?.nodes
 ).flat() 
  const added_items = added_on_netflix_naija.addedOnNetflixNaijas.edges.map((ex)=> ex.node).flat() 
   const netflixNaija=new_on_netflix_naija.map((xy)=> xy.node.naijaOnNetflix.edges).flat()  
   
const africa_made = made_in_africa.map((ex)=> ex.node.addedOnNetflixNaijas?.nodes).flat()
 const non_africa_made = non_africa.map((ex)=> ex.node.addedOnNetflixNaijas?.nodes).flat() 
 
   function decrement() {
   setCurrPg(currPg - 1); 
 }
 function increment() {
   setCurrPg(currPg + 1); 
 }
  
 const changeView =(e:React.ChangeEvent<HTMLSelectElement>)=>{ 
  if(e.target.value=== 'made-in-africa'){  
   setTitleView([...africa_made])
    
  }else if(e.target.value=== 'non-african'){
  setTitleView([...non_africa_made])
  }else{
   setTitleView([...added_items as TitleProps[]]);
  }
 
 } 
 
 const idxLastPs= currPg * postPerPage
 const idxFsPage = idxLastPs - postPerPage
  useEffect(() => {
  setTitleView([...added_items as TitleProps[]]);
}, []);

 
 const paginating=(pageNumber:number)=>{  
 setCurrPg(pageNumber) 
 }
 
 const postByTitle= useMemo(() => {
  const group:{ [title: string ]: TitleXProps[] } = {} 
  title_view&&title_view.forEach(ev => {
  group[ev.title] ||= []     
 group[ev.title].push(ev)

}
 )
  return group
  }, [title_view]) 

  const grouped_titles = {
    groupTitle: Object.keys(postByTitle),
    groupData: Object.values(postByTitle),  
  }
 const currentTitles = grouped_titles.groupTitle.slice(idxFsPage, idxLastPs)
 const currentPosts = grouped_titles.groupData.slice(idxFsPage, idxLastPs)   
 
  return (
 <div className='bg-gray-50'>
  <div className="bg-black"> 
<div className='m-auto py-11 px-4 max-w-max lg:max-w-7xl'> 
<div>
<h2 className="py-6 text-lg xxs:text-2xl text-white font-bold" >Nigerian Movies on Netflix</h2>
<hr className='my-2 h-2'/>
<p className="text-xl py-4 text-white leading-8 px-2" >Get a quick overview of the new movies, TV shows/series and documentaries on Netflix Naija.</p>
</div>
  
<section className='lg:flex relative '> 
  <div className='border-r my-1'> 
  {netflixNaija.slice(0,1).map((nt)=>(
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
      <div className='absolute z-20 top-0 sm:top-28 xs:mx-8 py-5 font-bold text-white mx-2 lg:w-1/2'>   
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}><h2 className='text-xl xs:text-3xl md:text-4xl md:py-2 hover:text-gray-500'> {nt.node.title}</h2></Link>
    <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}><div className='xs:text-lg text-sm py-2 xs:block hover:text-gray-500' dangerouslySetInnerHTML={{__html:nt.node.excerpt}}/>  </Link> 
    <span className='text-end text-sm mt-11 italic'>{moment(nt.node.date).fromNow()} </span>
    </div>
    </div> 
       )
) }</div>  
<div className='relative overflow-hidden overflow-x-auto overflow-x-hidden h-max xs:flex  lg:block'>
  
  {netflixNaija.slice(1,4).map((nt)=>(
  <div key={nt.node.slug} className='home_grid_alt2 lg:text-white [&:nth-child(3)]:lg:mt-1 [&:nth-child(2)]:lg:mt-1'>
 <div className="w-96 lg:my-0.5">  
 <Image 
 className="object-cover h-54 xs:h-32 sm:h-44 md:h-48"
 src={nt.node.featuredImage.node.sourceUrl }
 width={1200}
 height={675}
 alt={nt.node.featuredImage.node.altText}
  />  
  </div>
  <div className='relative h-max text-white'>
        <div className='absolute bottom-8 xs:bottom-1 z-10'>
        <Link href={`/netflix-naija/${slug.node.slug}/${nt.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} className='hover:text-gray-500 overflow-hidden text-ellipsis mx-2 sm:w-56 lg:w-64 text-lg xs:text-base sm:text-lg lg:text-xl'>{nt.node.title}</h2></Link>
    <Link href={`/topic/${(nt.node.contentTags.nodes??[][0])?.slug}/`}><p className='text-sm mx-2 xs:text-xs sm:text-sm hover:text-gray-500 py-2'><span>{moment(nt.node.date).fromNow()} |</span> {(nt.node.contentTags.nodes??[][0]).name}</p ></Link>
      </div> 
      
    </div>
    </div>  
       )    
) } </div> 
  
</section> 
</div> 
  
</div>  
 <div className="bg-white m-auto"style={{maxWidth:'1500px'}}> 
<section className="rounded-b-4 sm:flex justify-center" > 
  <div className="border-b-2 border-b-black border-r-4 border-r-gray-400 h-fit sm:max-w-3xl lg:max-w-6xl px-11"> 
  
  <form className="flex flex-wrap my-4 "> 
<label htmlFor="library" className="block font-medium text-gray-900 text-xl m-2">Choose a Library:</label>
  <select id="" onChange={(e)=>changeView(e)} className="block  py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-none ">  
    <option value="Choose Library to View"className="p-4">All Libraries:</option>
    <option value="non-african"className="p-4">Non African</option>
    <option value="made-in-africa"className="p-4">Made in Africa</option> 
  </select> 
    </form>
    <div className="bg-gray-200 p-4 border-r-4 border-l-4 border-blue-700 text-gray-700 text-lg"> 
  <p className="font-bold">Netflix Naija Titles Available Now</p>
    
  </div>
  
 <div> 

 {currentTitles.map((ex, i)=>
 <div key={i + Math.random()} className=""> 
 <><hr className="bg-black p-0.5 my-2"/>
  <h2 className="text-3xl py-6 text-center font-bold dark:text-black">{ex} </h2>
  <hr className="bg-black p-0.5 my-2"/></>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-1"> 
{currentPosts.map((ix, fi)=>ix.map((itx,index)=>fi===i&&
  <div className="relative" key={index + Math.random()}> 
 {/* fi===i&& || itx.title === ex */}
  <div >
  <Image 
   className="object-cover h-96"
 src={itx?.featuredImage?.node.sourceUrl}
 width={1200}
 height={675} 
 alt={itx.title} 
 />  
  </div> 
  <div className="text-white absolute left-0 right-0 top-0 px-6 bg-gray-700 bg-opacity-70 cursor-pointer hover:bg-opacity-90 h-full text-lg  after:content-['...']"> 
  
   <h2 className="text-2xl my-1 py-2 font-bold"> {itx.addednewsgroup?.filmTitle}</h2><ul className="px-3" >
  <li className="list-disc m-2 py-1">
  Genre: {itx.addednewsgroup?.genre|| 'N/A'} </li> 
  <li className="list-disc m-2">
  Director: {itx.addednewsgroup?.director|| 'N/A'}
  </li>
  <li className="list-disc m-2">
  Creators: {itx.addednewsgroup?.creators|| 'N/A'} 
  </li> 
  <li className="list-disc m-2 truncate">
  Cast: {itx.addednewsgroup?.cast|| 'N/A'} </li>  
 </ul>  
 {/* <div className="lg:flex bottom-32 xs:bottom-52 top-0 relative max-w-xl m-auto px-6">  */}
<div className="leading-7 text-lg hover:absolute top-11 hover:bg-gray-600 hover:bg-opacity-90 hover:px-3 hover:h-max hover:z-50 h-28 overflow-hidden"> 
   {itx.content.split('\n').filter((xy)=> xy !=='').map((line)=> 
 <div dangerouslySetInnerHTML={{__html:line}} key={line + ' ' + Math.random()}className="py-1" /> 
 
)} 
 
   </div> 
{/* </div>  */}
 </div> 
    </div> 
))}
</div>
</div>
 
)} 
 
 </div>
 
 <div className="justify-between flex my-4">
  {currPg === 1 ? 
  '':<button onClick={decrement} className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white my-4 mx-1">
        <span>&#x226A;</span> Previous Page 
      </button> }
     <div > {currPg === postPerPage ?'': <button onClick={increment}className="text-xl rounded p-4 cursor-pointer font-bold bg-gray-600 text-white my-4 mx-1">
       Next Page<span>&#x226B;</span> 
        </button> }</div>
      </div>
      
</div>
     
  <div className='h-max rounded-t lg:hidden bg-transparent max-w-36 sm:m-0 m-auto cursor-pointer'>
<div className='py-5 flex flex-col justify-center w-full cursor-pointer my-2 text-gray-600 px-2'> 
<FontAwesomeIcon icon={faFilm}className='text-xl'/>
<Link href='/netflix-naija/coming-to-netflix/'><p className='p-2 font-bold text-center'>Coming to Netflix Naija</p></Link> 
</div> 
<hr/>
<div className='py-5 flex flex-col justify-center w-full cursor-pointer my-2 bg-transparent text-gray-600'> 
<FontAwesomeIcon icon={faFilm} className='text-xl p-2'/>
{/* has all netfix naija news as no page was built for netflix naija */}
<Link href='/naija-wiki/'><p className='p-2 font-bold text-center text-lg'>Netflix News</p></Link>   
</div>  
 
 </div> 
  
 <div className='hidden lg:block mx-1 py-4 max-w-sm'> 
    <div className="cursor-pointer py-6 shadow max-w-sm border px-3 font-bold text-gray-600 flex items-center justify-between my-1"> 
    <Link href='/netflix-naija/coming-to-netflix/'><li className='hover:text-gray-400 list-none'>Coming to Netflix Naija</li></Link>
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
 <div className='px-2 font-bold flex justify-between'>
 <Link href={`/netflix-naija/news/${xy.slug}/`}><h2 className='hover:text-gray-400 text-gray-600 text-xl overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{xy.title} </h2></Link>
  </div> 
 </div> 
 )}</div>
 
 </div>  
 
    </div>
   
 </section> 
  
 </div>    
   <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginating={paginating} />
 
 </div> ) 
}

export default NewlyRealeasedNetflixNaija