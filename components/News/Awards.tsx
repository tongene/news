import moment from "moment"
import Image from "next/image"
import Link from "next/link"  
import { dateFormatter } from "@/utils/dateformat"
import SlideFxn from "../SlideFxn"  
import SideBar from "../Side"  
import { CineProps, Cursors, SideNode } from "@/app/types"
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
}
const Awards = ({awards_content, sidebarItems, news_outline, coming_titles}:{awards_content:PostProps[], sidebarItems:Cursors[], news_outline:SideNode[], coming_titles:CineProps[]}) => {  
    const replaceHTMLTags=(string:string)=>{
      const regex = /(<([^>]+)>)/gi;
      //(/<\/?[^>]+(>|$)/g, "") 
      const newString = string.replace(regex, "");
      return newString
       }
  
    const title_item=awards_content.map((ex)=>ex.contentTypeName)[0]
    return (
      <div className="bg-gray-100">  
 <div className="bg-white dark:bg-black m-auto md:flex justify-center px-3" style={{maxWidth:'1750px'}} >  
    <div className= "max-w-7xl"> 
    <SlideFxn title_item={title_item} content={awards_content}/> 
        <div className="text-center py-5"> 
        <h2 className="text-4xl font-bold text-gray-800 py-4">award</h2>
       <div className="sm:flex justify-center w-3/4 m-auto"> 
        <p className="bg-blue-900 p-2 text-gray-200 m-2">{new Date().toDateString()} </p>
         <p className="text-gray-800 text-xl m-2">Recent award</p>
        </div>
        </div> 
        <hr className="bg-gray-700 h-1 w-4/5 m-auto"/> 
 
<div className="lg:flex my-3 justify-center px-2">
{ awards_content.slice(4,5).map((ex,i)=>
<div key={ex.title + ' '+ i} className="relative m-auto md:m-0 md:mx-1 lg:max-w-xs max-w-lg xl:max-w-lg 2xl:max-w-2xl"> 
<Image 
src={ex.featuredImage.node.sourceUrl} 
style={{height:'42em', width:'100em'}}
width={100}
height={100}
  className='object-cover'
  alt={ex.featuredImage.node.altText}
  />
   </div>
)}
 
<div className="relative max-w-sm"> 
<div className="bg-blue-900 absolute -bottom-64 lg:relative lg:bottom-0 py-11"> 
  <h2 className="text-2xl text-white p-4 text-center">Top award News</h2>
{ awards_content.slice(5,11).map((ex,i)=>
<div key={ex.title + ' '+ i} className="mx-4 py-2 ">
  <ul className="text-gray-300 text-xl px-2 mx-1"> 
  <Link href={`/news/award/${ex.slug}`}><li className="list-disc p-2 hover:text-gray-500">{ex.title}</li></Link>
</ul>
 </div>
)}</div>
</div>
 </div>
 <div className="py-3 mt-64 lg:mt-5"> 
 {awards_content.slice(11,15).map((ex,i)=>
  <div key={ex.title + ' '+ i}className="[&:nth-child(2)]:border-b [&:nth-child(1)]:border-b [&:nth-child(3)]:border-b max-w-2xl m-auto">
<div className="xs:flex justify-center my-4">  
 <div className="p-2 xs:w-1/3 max-w-xs m-auto xs:m-0"> 
 <Image
  src={ex.featuredImage.node.sourceUrl}
width={1200}
height={675}
  alt={ex.featuredImage.node.altText}
  /> 
</div>
  <div className="md:w-2/3 max-w-sm m-auto"> 
  <Link href={`/news/award/${ex.slug}`}><h2 className="text-gray-700 overflow-hidden text-ellipsis text-2xl hover:text-gray-400 py-4 h-20 px-2"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title}</h2></Link>
  <Link href={`/news/award/${ex.slug}`}><h2 className="text-gray-700 overflow-hidden text-ellipsis  hover:text-gray-400 text-base px-2 py-4 h-24 leading-7"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{replaceHTMLTags(ex.excerpt)}</h2></Link>
    </div>
    </div>
 </div>
)}
</div>
  </div>
  <div className="md:mt-8"> 
 <SideBar sidebarItems={sidebarItems}
news_outline={news_outline} coming_titles={coming_titles}/>
  </div> 
</div> 

 
  <div className="bg-white m-auto" style={{maxWidth:'1750px'}}> 
 <div className="bg-blue-900 mx-1 px-2 py-4 my-8"> 
  <div className="xs:flex py-3"> 
{ awards_content.slice(15,18).map((ex,i)=>
  <div key={ex.title + ' '+ i} className="[&:nth-child(2)]:border-b [&:nth-child(1)]:border-b [&:nth-child(2)]:md:border-b-0 [&:nth-child(1)]:md:border-b-0 first:md:border-r [&:nth-child(2)]:md:border-r ">     
<div className="xs:flex justify-center py-6"> 
  <div className="xs:w-2/3 max-w-xs m-auto"> 
  <Link href={`/news/award/${ex.slug}`}><h2 className=" hover:text-gray-500 overflow-hidden text-ellipsis text-2xl text-white py-4 h-20 px-2 "style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title}</h2></Link>
  <Link href={`/news/award/${ex.slug}`}><h2 className="hover:text-gray-500 overflow-hidden text-ellipsis text-gray-300 text-base px-2  h-24 leading-7 py-4"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{replaceHTMLTags(ex.excerpt)}</h2></Link>
 </div> 
 <div className="p-2 xs:w-1/2 max-w-xs m-auto"> 
 <Image
  src={ex.featuredImage.node.sourceUrl}
width={1200}
height={675}
  alt={ex.featuredImage.node.altText}
  /> 
   </div> 
    </div> 
 </div>
)}</div>
<hr/>
<div className="md:flex py-3"> 
 {awards_content.slice(18,21).map((ex,i)=>
  <div key={ex.title + ' '+ i}className="[&:nth-child(2)]:border-b [&:nth-child(1)]:border-b [&:nth-child(2)]:md:border-b-0 [&:nth-child(1)]:md:border-b-0 first:md:border-r [&:nth-child(2)]:md:border-r md:w-1/2 max-w-2xl m-auto">
<div className="xs:flex justify-center my-3 ">  
 <div className="p-2 xs:w-1/3 max-w-xs m-auto xs:m-0"> 
 <Image
  src={ex.featuredImage.node.sourceUrl}
width={1200}
height={675}
  alt={ex.featuredImage.node.altText}
  /> 
</div>
  <div className="md:w-2/3 max-w-xs m-auto"> 
  <Link href={`/news/award/${ex.slug}`}><h2 className=" hover:text-gray-500 overflow-hidden text-ellipsis text-2xl text-white py-4 h-20 px-2"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title}</h2></Link>
  <Link href={`/news/award/${ex.slug}`}><h2 className=" hover:text-gray-500 overflow-hidden text-ellipsis text-gray-300 text-base px-2  py-4 h-24 leading-7"style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}>{replaceHTMLTags(ex.excerpt)}</h2></Link>
    </div>
    </div>
 </div>
)}
</div>
</div>

 <hr className="bg-gray-700 h-1 my-3"/>  

<div className="px-2">
<div className="xl:flex gap-8 lg:px-8 max-w-4xl xl:max-w-max m-auto my-8 ">
  <div className="md:flex gap-2 max-w-3xl m-auto"> 
<div className=" max-w-sm m-auto">
<h2 className="text-5xl text-gray-800 font-medium">Local</h2> 
<hr className="bg-yellow-700 h-1 my-3"/>
{awards_content.slice(21, 24).map((ex,i)=>
<div className="border border-black rounded-b-4 max-w-xs m-auto my-2" key={ex.title + ' '+ i} > 
   <Link href={`/news/award/${ex.slug}`}><h2 className="text-2xl font-bold p-3 text-ellipsis overflow-hidden hover:text-gray-500"style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{ex.title} </h2></Link>
   <p className="italic text-gray-400 px-4 pb-2 py-2">{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
<Image 
className="p-1 border border-black"
  src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
  alt={ex.featuredImage.node.altText}
  />  
  </div>
 )}

</div>

<div className="max-w-sm m-auto md:m-0 h-max border border-b-2 border-b-black bg-gray-50 text-gray-700 my-6" > 
<h2 className="text-2xl text-gray-800 font-medium m-4">Foreign</h2>
<hr className="bg-yellow-700 h-1 my-3 max-w-sm m-auto"/>
{awards_content.slice(24,30).map((ex,i)=>
<div className="border-b mx-2" key={ex.title + ' ' + Math.random()}> 
  <Link href={`/news/award/${ex.slug}`}><h2 className="hover:text-gray-500 text-3xl leading-10 py-3 my-3 xs:px-3" key={ex.title + ' '+ i} >{ex.title} </h2></Link>
 </div>
 )}

</div>
</div>


<div className="max-w-lg m-auto xl:block my-4">
<div className='m-auto lg:m-0'>
 
 {awards_content.slice(30,35).map((ex)=>
<div className='shadow flex' key={ex.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/4 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 lg:h-20'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div>

 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/award/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div>

 
<div className='m-auto max-w-lg lg:m-0'>
 {awards_content.slice(35,40).map((ex)=>
<div className='shadow flex' key={ex.title + ' ' + Math.random()}>
 <div className='w-1/4 lg:w-1/4 mx-1 py-6 '> 
 <Image
 className='xs:h-20 h-11 lg:h-20'
 src={ex.featuredImage?.node.sourceUrl} 
 width={1200} 
 height={675} 
 alt={ex.featuredImage?.node.altText}/>  
 
 </div> 
 <div className='w-4/5 mx-2 py-6'> 
 <div className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>
 <Link href={`/news/award/${ex.slug}`}><h2 className='font-bold text-base hover:text-gray-400' >{ex.title}</h2></Link>
</div>
<div className='flex text-base text-gray-400 justify-between items-center leading-8 '> 
<Link href={`/creator/${ex?.author.node.slug}`}><p >{ ex?.author.node.name }</p> </Link>
 <p>{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
</div>
</div>
</div>
)} 

</div>

  </div>
</div>
  


<div className="max-w-max m-auto" >
<hr className="bg-gray-700 h-1 w-4/5 m-auto"/> 
  <h2 className="text-4xl text-gray-800 font-medium my-4 text-center">Music</h2>
  <hr className="bg-gray-700 h-1 w-1/2 m-auto"/> 
  <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 my-4  m-auto">
 {awards_content.slice(40).map((ex,i)=>
<div className="shadow-lg rounded-b-lg max-w-xs" key={ex.title + ' '+ i} >
 
  <Image
  className="h-44"
  src={ex.featuredImage.node.sourceUrl}
 width={1200}
 height={675}
  alt={ex.featuredImage.node.altText}
  /> 
  <h2 className="text-lg px-4 py-7">{ex.title} </h2> 
  <p className="italic text-gray-400 px-4 pb-2">{ dateFormatter?.format(Date.parse(ex?.date)) }</p>
  </div>  
 )}
    </div> 
 </div>
    </div>
    </div>
    </div>
 )
  }
  
  export default Awards
