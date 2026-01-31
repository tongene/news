"use client" 
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "./ShareButtons";
import SideBar from "./Side";
import { PostTypeProps, NextTypeProps, Cursors, SideNode, InnerEdges} from "@/app/types";
import moment from "moment";
import { useEffect, useRef, useState } from "react"; 
import { useParams } from "next/navigation";


async function sidePlusViews(slug:string){ 
    const res= fetch('https://content.culturays.com/graphql',{ 
              method: "POST",
               headers: {
                   'Content-Type':'application/json'
                  },
                  cache: 'force-cache', 
              body: JSON.stringify({
                query:`
                query WPPOSTS { 
             posts(first: 10, where: {categoryName: "Latest"}) { 
           pageInfo {
        endCursor
      }
         edges{ 
            node{
             
            categories {
                  nodes {
                    name
                    slug
                  }
                } 
       }
          } }} 
               ` 
              
              }) 
            }).then((res) => res.json() )
            .then((data) => data.data ) 
           .catch((err) => console.log("err", err)) 
           const dataView= await res
    const postX = dataView.posts?.pageInfo?.endCursor 
if(!postX)return
      const wpx = fetch('https://content.culturays.com/graphql',{     
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
         cache: 'force-cache', 
        body: JSON.stringify({
          query:`
          query WPPOSTS($after: String) {                  
             posts(first:4 ,after:$after, where: {categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
           } 
        } 
         `, variables:{
          after:postX 
         }
        
        })
        })
        .then(response => response.json() )  
        .then(data => data.data.posts ) 
        .catch(error => console.error('Error:', error));  

    const latestPosts= await wpx  
  const latestStr=latestPosts?.pageInfo?.endCursor  
     const wprest = fetch('https://content.culturays.com/graphql', { 
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
          query:`
          query WPPOSTS {                  
             posts(first:4 ,after:"${latestStr}" , where: {notIn:["${slug}"],categoryName: "Latest"}) {
                pageInfo {
              startCursor
              endCursor
              hasNextPage
            } 
                edges{
               cursor
              node{
               id
                title
                  slug
                  tags {
                    nodes {
                    id
                      name
                      slug
                    }
                  }
                  
                   categories {
                    nodes {
                      name
                      slug
                    }
                  }
                excerpt
                  date
                   author {
                 node {
                firstName
                lastName
                name
                slug
                description
              }
            }
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
       
         }
           }  } 
        } 
         ` 
        
        })
        
        }).then(response => response.json()) 
        .then(data => data.data) 
        .catch(error => console.error('Error:', error)); 
      // const response = wprest?.data?.posts?.edges
   
    return wprest
  } 

  
const readNextPosts = async(notIn:string[])=>{  
  const wprest = fetch('https://content.culturays.com/graphql',{
    method: 'POST',
    headers:{ 
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
      query: `query NEXTCONTENT($notIn:[ID]) {
     contentNodes(first:20, where: {notIn:$notIn}){
 nodes {  
      ... on Post {
        id
        title
        slug
        date
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
    
  }
}
  }`, variables:{
    notIn:notIn
  }
 })
    
    }).then(response => response.json())   
    .then(data => data.data.contentNodes.nodes )
    .catch(error => console.error('Error:', error));
 //  const response = wprest?.data.contentNodes.nodes 
  return wprest
}
const NewsDetail = ({post}:{post:PostTypeProps}) => {  
     const[loading, setLoading]=useState(false) 
     const [sideBarPlus, setSideBarPlus]=useState <Cursors[]>([])
     const [nextPlus, setNextPlus]=useState <NextTypeProps[]>([])
      const news2related = post?.postnewsgroup?.relatedPosts?.edges.map((tx:{node:{id:string}})=> tx.node.id)     
      const post_related= post?.postnewsgroup.relatedPosts?.edges 
      const exitingPosts= post_related?.map((fx)=>(fx?.cursor) )??[]  
       const getDetails1=async()=>{ 
       setLoading(false)      
       const next_x_news = await readNextPosts([post?.id, news2related].flat() as string[])       
       setNextPlus(next_x_news)
        const sidebarItems=await sidePlusViews(post?.id as string)
       const txPlus=sidebarItems.posts?.edges.map((dy:InnerEdges)=>dy.node) 
       setSideBarPlus(txPlus)

     }
 
        useEffect(() => {
          setLoading(true)
         getDetails1()
          }, []);

 const nextPosts = nextPlus.filter((tx)=> tx.contentTypeName !== "added-netflix-naija").filter((tx)=> tx.contentTypeName !== "outline").filter((xy)=> xy.contentTypeName!== 'live')?.filter((xy)=> xy.contentTypeName !== 'anticpated-nollywood')?.filter((xy)=> xy.contentTypeName !== 'anticpated-african')?.filter((xy)=> xy.contentTypeName !== 'anticpated-foreign')?.filter((xy)=> xy.contentTypeName !== 'netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'what-to-watch').filter((xy)=> xy.contentTypeName !== 'list-netflix-naija')?.filter((xy)=> xy.contentTypeName !== 'char')?.filter((xy)=> xy.contentTypeName !== 'naija-wiki')?.filter((xy)=> xy.contentTypeName !== 'latest')?.filter((xy)=> xy.contentTypeName !== 'outline')?.filter((xy)=> xy.contentTypeName!== 'page').filter((xy)=> xy.contentTypeName!== 'live')  

  const html2pdfRef = useRef<any>(null);
  useEffect(() => {
    import('html2pdf.js').then((mod) => { 
      html2pdfRef.current = mod.default;
    });
  }, []); 
  
  const [revealChild, setRevealChild]=useState(false)
  const showItem =()=>{
setRevealChild(prev=> !prev)
const hideItem =setTimeout(()=>{
  setRevealChild(false)
},200)
return ()=> clearTimeout(hideItem)
  }
  const handleDownload = () => {
    if (!html2pdfRef.current) return; 
    const element = document.getElementById('post-content'); 
    showItem()
    const opt = {
      margin: 0.5,
      filename: `${post?.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
return html2pdfRef.current().set(opt).from(element).save();
  };

 
  return  ( 
    <div> 
      <div>  
<div className="">
<div className="px-4 lg:px-16 py-8 m-auto max-w-7xl" > 
<div className="flex justify-between text-ld py-4 px-2"> 
   {loading && <span className="loader dark:before:border dark:before:border-2 dark:before:border-white dark:after:border dark:after:border-2 dark:after:border-white"></span>} 
{post?.date &&<p>{new Date(post?.date as string ).toLocaleDateString()}</p>}
<p>{(post?.categories.nodes??[][0])?.name}</p>
</div>
    <hr className="bg-black h-1 w-full my-1"/> 
<hr className="bg-black h-1 w-full my-1"/>  
  
 <h1 className="text-4xl md:text-5xl font-bold  py-4 " style={{lineHeight:'52px'}}>
   {post?.title} 
  </h1>
  <div className="border-t border-t-4 border-t-orange-600">
  <div className="xs:flex justify-between items-center py-6">
    <div className="flex"> 
 <small className="text-lg">by:</small>{post?.author.node.avatar.url&&<Image  
   className='rounded-full'
  src={post?.author.node.avatar.url as string}
  width={50}
   height={50}
  alt={post?.author.node.name as string} 
  />  }
 <Link href={`/creator/${post?.author.node.slug}/`}><h2 className="text-lg px-2 text-orange-600 font-bold hover:text-gray-600 cursor-pointer">{post?.author.node.name}</h2></Link>
  </div>

  <div className="
  [&_.share-view]:relative [&_.share-view]:bg-white [&_.share-view]:dark:bg-transparent [&_.shadow-sharebtn]:my-2 [&_.share-view]:text-gray-800 [&_.share-view] [&_.share-view]:dark:text-gray-200 [&_.share-view]:w-64 [&_.share-view]:left-0 [&_.share-view]:right-0 text-xl sm:my-11 [&_.share-view]:p-1"> 
 <ShareButtons 
 item={post} 
 shareOptions={true} 
 activeIdx={post?.id}
 />
</div>
 </div>
<hr/>
  <div dangerouslySetInnerHTML={{__html:post?.excerpt as string}} className="py-4 my-4 text-xl font-medium italic leading-8"/>
</div>  
 </div>
 
{post?.featuredImage?.node.sourceUrl && <Image 
  className="flex flex-col items-center justify-center bg-cover bg-center h-1/2 w-full object-cover border-t border-t-8 rounded-t border-t-orange-600"
     src={post?.featuredImage?.node.sourceUrl as string}
     width={1250}
     height={675}
     alt={post?.featuredImage?.node.altText as string}
     />}
 <div className="bg-gray-600 relative text-gray-200">
  <div dangerouslySetInnerHTML={{__html:post?.featuredImage?.node.caption as string}} className="absolute bottom-20 left-8 p-6 leading-8 shadow-xl font-mono"/> 
 </div>
</div> 
<div className="lg:flex mx-auto"style={{maxWidth:'1450px'}}> 
  <div className="lg:max-w-2xl min-[1060px]:max-w-2xl min-[1140px]:max-w-3xl xl:max-w-4xl 2xl:max-w-max mx-auto">

<div className="px-2 py-8 m-auto"style={{maxWidth:'1700px'}}>
 
<div className="min-[420px]:flex flex-wrap max-w-5xl m-auto">
 <div className="min-[420px]:w-1/2 px-2 h-max">
{ post?.postnewsgroup?.heroImage?.node.sourceUrl&&
<div className=" h-72 lg:h-96">
 <Image 
  className="object-cover h-full border-t border-t-8 rounded-t border-t-orange-600"
     src={post?.postnewsgroup?.heroImage?.node.sourceUrl }
     width={1200}
     height={675}
     alt={post?.postnewsgroup?.heroImage?.node.altText}
     /> 
 </div>}
<div dangerouslySetInnerHTML={{__html: post?.postnewsgroup?.heroImage?.node.caption as string}} className="italic py-2 text-sm"/>
 <div id="post-content">
 <div className="p-4"  > 
 <div id='add-child'className={!revealChild?'hidden':'block'}><h2 className="text-2xl font-bold text-center dark:from-white dark:to-green-400 text-gradient-to-r to-sky-500 from-red-600 bg-clip-text">Urban Naija</h2>
 <h3>{post?.title}</h3>

   <img 
  className="object-cover h-full border-t border-t-8 rounded-t border-t-orange-600"
     src='/culturays-no-bg.png'
     width={50}
     height={50}
     alt={post?.title as string}
     />  <Link href={`/news/${post?.slug}/`}><h3 className="text-black">{post?.slug}</h3></Link></div> 
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Article as PDF
      </button>
    </div>
{post?.content.split('\n').filter((xy)=> xy !=='').slice(0, post?.content.split('\n').length/10).map((line, index) =>(
  <div key={index + ' ' + Math.random()}>
 
     <div>
        <div dangerouslySetInnerHTML={{__html:line}}className="py-2 my-1 text-xl leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm  [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold [&_h2]:border-b [&_h2]:border-b-4"/>
        {index===0&&     
     <div className='bg-white w-11/12'>
      {post_related?.slice(0,2).map((ex)=> 
       <div key={ex.node.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3 lg:px-0"> 
       <div className="md:flex lg:block justify-center"> 
       <div className="px-1 md:w-4/5 m-auto">
       <Link href={`/news/${ex.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}className="overflow-hidden text-ellipsis text-orange-600 hover:text-red-300 text-xl py-1 font-bold">{ex.node.title} </h2></Link>
       </div>
       
     <div className="px-2 md:w-2/3 lg:w-4/5 md:px-0 md:m-0 lg:m-auto m-auto"> 
     <Image 
     src={ex.node.featuredImage?.node.sourceUrl||'/culturays-no-bg.png'}
     width={1200}
     height={675}
     alt={ex.node.featuredImage?.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/${ex.node.slug}/`}><button className="m-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   
        </div>  
       )} 
      </div>
            }
       </div>
    
   </div> ))}

</div>  
   </div>
  
  <div className="min-[420px]:w-1/2 px-2 h-max">
  {post?.content.split('\n').filter((xy)=> xy !=='').slice(post?.content.split('\n').length/10).map((line, index) =>(
  <div key={index + ' ' + Math.random()}>  
   <div>
        <div dangerouslySetInnerHTML={{__html:line}} className="py-2 my-1 text-xl leading-9 [&_figure>figcaption]:italic [&_figure>figcaption]:py-2 [&_figure>figcaption]:text-sm  [&_p>a]:text-green-600 [&_p>a]:hover:bg-green-800 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-3xl [&_h3]:font-bold [&_h2]:border-b [&_h2]:border-b-4"/>
        {index===3&&     
     <div className='bg-white w-11/12 m-auto lg:w-4/5'>
      {post_related?.slice(2).map((ex)=> 
       <div key={ex.node.title + ' ' + Math.random()} className=" py-4 first:border-b border px-3 lg:px-0"> 
       <div className="md:flex lg:block justify-center"> 
       <div className="px-1 md:w-4/5 m-auto">
       <Link href={`/news/${ex.node.slug}/`}><h2 style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}className="overflow-hidden text-ellipsis text-orange-600 hover:text-red-300 text-lg py-1 font-bold">{ex.node.title} </h2></Link>
       </div> 
       
     <div className="px-2 md:w-2/3 lg:w-4/5 md:px-0 md:m-0 lg:m-auto m-auto"> 
     <Image 
     src={ex.node.featuredImage?.node.sourceUrl || '/culturays-no-bg.png'}
     width={1200}
     height={675}
     alt={ex.node.featuredImage?.node.altText}
     /> 
      </div> 
     
       </div>
        <Link href={`/news/${ex.node.slug}/`}><button className="m-2 p-3 text-red-700 bg-gray-300 hover:text-red-300 hover:bg-black font-medium rounded-lg">Read</button></Link> 
   
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
 <Link href={`/topic/${xy?.slug}/`}><h4 className='hover:bg-gray-600 hover:text-gray-200 border border-gray-600 bg-gray-50 text-gray-600 p-2 text-lg w-max text-center'>{xy?.name} </h4></Link>

</div>)} 
</div>

{/* <div className="text-xl text-center border p-5 my-11 mx-2 bg-red-700 hover:bg-red-900 font-mono font-bold text-white dark:text-auto">
 
 <Link href={`/forum?topic=${post?.slug}/`}><button>Join or Start a conversation on the topic - Go to Forum</button></Link> 
</div> */}
 
<div className='bg-white dark:bg-transparent px-3'> 

<div className='max-w-7xl m-auto'>
   <h2 className='text-2xl font-bold py-4'>Next</h2>
     </div> 
        
<div className="max-w-7xl m-auto overflow-auto pt-4 px-1 hidden-scroll" > 
   <div className='flex' style={{width:'1000px'}}> 
   {nextPosts.filter(vx => Object.keys(vx).length > 0).slice(0,3).map((xy,i)=>   
   <div className='border pt-5 px-3 w-96' key={i + ' ' + Math.random()}> 
  
    <Link href={`/topic/${xy.tags.nodes[0]?.slug}/`}> <h3 className='text-red-500 text-sm italic py-2 hover:dark:text-gray-500'>{xy.tags?.nodes[0]?.name} </h3></Link>
    <Link href={`/news/${xy.slug}`}><h2 className="text-gray-800 hover:text-gray-700 text-xl hover:dark:text-gray-500 dark:text-gray-300 font-bold overflow-hidden text-ellipsis hover:text-gray-500 cursor-pointer "style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }}>{xy.title}</h2></Link>            
      <div className='py-2 text-sm'> 
        <p className='text-gray-600 dark:text-red-600'>{moment(xy.date).subtract(1, 'hour').fromNow()}</p> 
        {/* <Link href={`/creator/${xy.author.node.slug}/`}>
          <p className='py-2 text-gray-800 font-medium hover:dark:text-gray-500 dark:text-gray-300'>{xy.author.node.name}</p>
        </Link>  */}
      </div> 
     
    </div> 
 
  )}  

  </div> 
    </div>
  </div>
 </div>
 <SideBar sideBarPlus={sideBarPlus}/>  
  </div>
 </div> 
  
</div>
 ) 
}

export default NewsDetail
