"use client"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { faDeleteLeft, faPencil, faShare, faAngleDown, faUser, faAngleUp, faImage, faClose, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import ShareButtons from "../ShareButtons" 
import { useFormStatus } from "react-dom";  
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import LoginModal from "./LoginModal"
import { useInView } from "react-intersection-observer" 
import Events from "@/app/forum/Events"; 
import { createClient } from "@/utils/supabase/client"; 
import Bday from "../Bday";
import Trends from "./Trends"; 
import { Event, InitialPosts, PostProps, CommentProps, BdaysProps, ArticlesReplies} from "@/app/types";
import CreateForm from "@/app/forum/createPost";
import { type User } from '@supabase/supabase-js'
import { createComment, deleteTag, postDelete, postLike, postTag } from "@/app/forum/actions/postsActions";
import { postsItems } from "@/app/forum/actions/loadPosts"; 
import { FakeObj } from "@/app/data/trends";
import FakeTrends from "./FakeTrend";

function sortAscending(pb:PostProps, pa:PostProps){ 
  return (Number(pb?.id )-Number(pa?.id)) 
 }
 type FetchArguments = Parameters<typeof fetch>;
 type TrendyProp={
  title:string
  }
const Main = ({topic, val, user, trendX, initialPosts, filteredTrends }:{ user: User | null, trendX: TrendyProp[], initialPosts: InitialPosts[], filteredTrends: FakeObj[], topic: string, val: string } ) => {   
 const [events,setEvents]=useState<Event[]>([]) 
// const [initialPostsData,setInitialPostsData]=useState<InitialPosts[] >([])
const forumEvents =async ()=>{  
  const supabase = createClient() 
  const { data:event , error } = await supabase 
.from('events')
.select('*')
.gte('created_at', new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString())
.limit(1)
.order('id', { ascending: false })  
setEvents(event ?? [])

}
 
 useEffect(()=>{
 forumEvents() 
 },[])
 
const router = useRouter()   
const [onIdx, setOnIdx]=useState<number>()
const [activeReply,setActiveReply]=useState<any>(true)
const [showSuggestion, setShowSuggestion]=useState(false)  
const [deleteBtn,setDeleteBtn]=useState(false) 
const [searchVal, setSearchVal] = useState(null)
const [showIndex, setShowIndex]= useState<any>(null) 
const [editBtn,setEditBtn]=useState(false)
const [comment, setComment]=useState<CommentProps>({})
const [count,setCount]=useState(1) 
const [startScroll, setStartScroll]=useState(11) 
const [active, setActive]=useState(false)
const [post, setPost]=useState<PostProps>({})
const [activeIdx, setActiveIdx]=useState<any>(false)
const [userActions,setUserActions]=useState(false)
const [scrolledPosts, setScrolledPosts]=useState<InitialPosts[]>([])
const [selectedImages, setSelectedImages] = useState<string[]>([]);
const [notify, setNotify]=useState('')
const [ show, setShow]=useState(false)
const [imgIndex, setImgIndex]=useState('')
const [editId,setEditId]=useState('') 
const [imgZoom,setImgZoom]=useState({})
const[shareOptions, setShareOptions]=useState(false) 
const imgRef = useRef<HTMLDivElement | null>(null);
const elRef =useRef<HTMLFormElement | null>(null);
const createRef= useRef<HTMLDivElement | null>(null);
const { ref, inView } = useInView()
    const { pending, action } = useFormStatus(); 
    const isPending = pending && action
    //const topicParams= useSearchParams();
   // const titlesX = topicParams.get('topic') as string||'';
    //const titlesPath= titlesX.split('-').slice(0,3).join('/')
    //const titleX= titlesX.split('-').slice(3,-1).join('-')
 
    useEffect(() => {
      const xIntialPosts = initialPosts.filter((xy)=> xy.article_title)  
       const titleXIntialPosts = initialPosts.filter((xy)=> !xy.article_title )
      const title_X=xIntialPosts.filter((xy)=>xy.article_title===topic)
      const titleXIntialPosts2 = initialPosts.filter((xy)=> xy.title) 
      const btTitlesA=xIntialPosts.concat( titleXIntialPosts2) 
     
      if(!topic){
          setScrolledPosts( [...btTitlesA] )  
      }else{
           setScrolledPosts(title_X )
      } 
    
      }, [topic]);  


    const loadMorePosts = async () => {
     const apiP =await postsItems(startScroll, count)??[]
     const apiXIntialPosts = apiP.filter((xy)=> xy.article_title)
     const title_X=apiXIntialPosts.filter((xy)=>xy.article_title===topic)
      const apiXIntialTitles = apiP.filter((xy)=> !xy.article_title )
    if(apiP &&apiP?.length>0){
      if(!topic){ 
        setScrolledPosts([...scrolledPosts, ...apiXIntialTitles])
    }else{
         setScrolledPosts([...scrolledPosts, ...title_X] )
    }
   
   // setScrolledPosts(scrolledPosts?.concat(pt))
     }else return 
    
    setStartScroll((prev)=>prev + apiP?.length) 
    setCount((prev)=>prev * apiP?.length) 
    }
    useEffect(() => {
      if(inView){
        const clearInView= setTimeout(()=>{
          loadMorePosts() 
      
        },1000)
        return ()=> clearTimeout(clearInView) 
       }
      
    }, [inView])
 
    const opTitles=scrolledPosts?.sort(sortAscending) 
    function enlargeImgs(i:number, ix: number) {
      const files = (scrolledPosts[i]?.files ??[]).filter((xy:string)=>!xy?.includes('undefined'))
          setImgIndex(files[ix])

     imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'}) 
      setImgZoom({
        width:'200%',
        height:'auto',  
        transition: "width 0.5s ease", 
      })
    
      setShow(prev=> !prev) 
      if(show){
        setDeleteBtn(false)
        setImgZoom({
          width:'max-content', 
          transition: "width 0.5s ease",
         
        }
          )
      } 
    }
  const handleOpen = (post:number) => { 
        setOnIdx(post); 
        setShareOptions(false);
        if(!user){
          setUserActions(true) 
       }else{
        setActiveReply(true);
       } 
       
      };
      
  const showAll = (id:number) => { 
    setActiveIdx(id); 
    setEditBtn(false)
    setDeleteBtn(false)
    if(!user){
       setUserActions(true) 
    }else{
        setShareOptions(prev => !prev);
    }  
  }
   const openDelete=(id:number)=>{
  setDeleteBtn(prev => !prev)
  setEditBtn(false)
  setShareOptions(false);
setActiveIdx(id);
} 

const changeIndex = (i:number) => {
  setShowSuggestion(true)
  setShowIndex(i)
  if(showSuggestion && showIndex=== i){
  setShowSuggestion(false)  
   
  } 
 
};
const openEdit=(id:number )=>{
  setEditBtn(prev => !prev)
  setDeleteBtn(false)
  setActiveIdx(id);
  setShareOptions(false)
  }
 
  
  const editting=(p:PostProps)=>{ 
  setPost(p);
  //router.push(pathname+`?id=${p.id}`)
  editingRef.current?.scrollIntoView()
  setEditBtn(prev => !prev)
  }
  async function resetImg(imgs:PostProps,img:string) {
    const supabase= createClient()
    setImgZoom({
      width:'100%',
      height:"160px", 
      transition: "width 0.5s ease"
    })
 
  const updFiles=imgs?.files?.filter((ex)=> ex !==img)
  const { data, error } = await supabase
  .from('posts')
  .update({ files: [...updFiles ??[] ] })
  .eq('id', imgs.id)
  .select() 
  const { data:updateData, error:updateErr } = await supabase
  .storage
  .from('posts_imgs')
  .remove([img])
  
    if(error){
      console.log(error)
    }
    setShow(false)
    setNotify('Image Deleted')
    const pt = scrolledPosts.filter((te) => String(te.id) !== String(imgs.id))?? [];;
    setScrolledPosts([...pt, ...(data ?? [])]);
    const clearNotify= setTimeout(
      () =>setNotify(''),  
      2000 
    );
    router.refresh()
    return ()=> clearTimeout(clearNotify) 
  }
  
  const likeAction= async(postx:PostProps)=>{
    if(!user){
      setUserActions(true)
    }else{ 
  const data= await postLike(postx)
  const pt = scrolledPosts.filter((te)=> te.id !== postx.id) 
  setScrolledPosts([...pt, ...(data ?? [])]);
  router.refresh() 
 //createRef.current?.scrollIntoView()
 if(topic){
  router.push(`/forum/?topic=${topic.replace(/ /g,"-")}`, {scroll:false}) 
}
  else{
router.push(pathname+'?message=Like Updated', {scroll:false}) 
  }
  }}

  const commentAction= async(formData: FormData, postId:string)=>{ 
    if(!user){
      setUserActions(true) 
    }else{ 
      const data= await createComment(formData, postId,null)   
        const updatedPosts = scrolledPosts.map((p) => { 
          if (String(p.id) === String(postId)) {
            return {
              ...p,
              comments: [...p.comments??[], null]
            };
          }
          return p;
        }); 
         setActiveReply(false);
        setScrolledPosts(updatedPosts as InitialPosts[] ) ;
        router.refresh() 
         selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
         setSelectedImages([]); 
        
  }} 
      
      const tagAction =async (postx:PostProps , tagToDelete:string)=>{
        const datax = await postTag(postx, tagToDelete)
        const pt = scrolledPosts.filter((ex)=> ex.id !== postx.id) 
    setScrolledPosts(pt.concat(datax?.data as [])) 
    
      const ptData = scrolledPosts.filter((ex)=> ex.id !== postx.id)  
   setScrolledPosts(ptData.concat(datax?.updateData as [])) 
      router.refresh() 
      }

      const deleteTagAction=async (post:PostProps, tagToDelete:string)=>{
       const tagxData=  await deleteTag(post,tagToDelete)
      const pt = scrolledPosts.filter((ex)=> String(ex.id) !== String(post.id))  
      setScrolledPosts([...pt, ...tagxData ??[]])
      router.refresh()
      }


  const deletePostAction=async (id_:string)=>{
     await postDelete(id_) 
      const pt = scrolledPosts.filter((te)=> String(te.id)!== String(id_)) 
      setScrolledPosts(pt )
      setDeleteBtn(false)
  
      if(topic){ 
        router.push('/forum')
      } 
      router.refresh()
      }

   useEffect(() => { 
        const handler = (e: MouseEvent) => {
        if ( !elRef.current) {
        return;
        } 
        if (!elRef?.current?.contains(e?.target as Node)) { 
        setActiveReply(null)
        }
        
        };
        
        document.addEventListener("click", handler, true);
        
        return () => {
        document.removeEventListener("click", handler);
        };
        
        }, [setActiveReply]); 
          
        const editingRef=useRef<HTMLDivElement | null>(null) 
        
        // const { data: pepResource, isLoading, error } = useSWR('/api/ppleData', fetcher, {        
        //   fallbackData: bdaysData,
        // })      
 
       // const searchParams= useSearchParams();
       // const val = searchParams.get('message') as string;
        const pathname = usePathname() 
        useEffect(
          () => { 
        if(val){
          createRef.current?.scrollIntoView()
          router.push(pathname, {scroll:false})   
         //window.scrollTo({ top:800, behavior: "smooth" })
         }  
         return () => {
         (window as any).posted =''
        };
        
        },[val, router])
      
        const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
          }
        };
        
        const handleRemoveImage = (imageUrl: string) => {
          URL.revokeObjectURL(imageUrl);  
          setSelectedImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
        };
       
        const xxtx = initialPosts.filter((xy) => xy?.article_title !== null).flat(); 
        const uniqueTitles = new Map();  
        const gnrItx = xxtx.filter((item) => {
          if (!uniqueTitles.has(item.article_title)) {
            uniqueTitles.set(item.article_title, item); 
            return true;  
          }
          return false; 
        });
  const [titleOpens,setTitlesOpen]= useState(false)
  const [arrowOpens,setArrowOpen]= useState({})
 
  const rotateArrow=()=>{ 
    if(titleOpens){
      setTitlesOpen(prev=>!prev)
    setArrowOpen({ 
      transform: "translateX(8px)",
      transition: "transform 1s ease",
    })
  }else{
  setTitlesOpen(prev=>!prev)
 setArrowOpen({ 
      transform: "translateX(-280px)",
      transition: "transform 1s ease",
    }) 
  }
  }
 
  return (  
<div>    
<div className="w-24 m-auto "> 
{notify&&<p className="fixed top-0 text-center text-white p-3 text-lg z-10">{notify}</p>}
</div>
<div className={active?'hidden bg-slate-800 opacity-90':''}>
<Bday /> 
</div>
<Events
events={events} 
/> 
<div className="m-auto lg:flex justify-center">

<div className={active?'hidden bg-slate-800 opacity-90':'m-2 [&_.trendy]:mt-16 [&_.trendy]:m-0 [&_.trendy]:p-0 '}> 
<div className='main-forum relative m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0' ref={editingRef}> 
<div className='thoughts-text text-white p-8 text-center '> 
<h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
<p className="text-xl">Drop your thought to hear from other people! </p>  
</div>
<CreateForm 
 titleX={topic}
post={post}  
val={val}
user={user}
setPost={setPost}
scrolledPosts={scrolledPosts}
setScrolledPosts={setScrolledPosts}
setUserActions={setUserActions}
setEditId={setEditId}
  />
  {val && 
   <p className="absolute w-full top-0 left-0 text-center text-white p-3 bg-gray-400">
    {val} 
    </p>}

    </div> 
  </div> 
  <div className="lg:w-96">
    {trendX?.length>0 ? <Trends trendX={trendX}/>:<FakeTrends filteredTrends={filteredTrends}/> } 
</div> 

</div>
 <hr />
     {!topic&& 
    <main className="bg-mainBg py-6">  
<div className={opTitles.length===0?'hidden':"block relative top-20 z-30 w-max"}style={arrowOpens}onClick={rotateArrow}>  

  <div className="flex hover:bg-gray-900 dark:bg-gray-800 w-80 bg-white justify-end" > 
    {gnrItx.length>0 && <h2 className="text-2xl font-bold dark:bg-gray-800 bg-white text-center text-2xl font-bold dark:bg-gray-800 px-5 py-3 bg-white w-full">Articles</h2>} 
 <div className="w-max ml-full"> 
{titleOpens&& <p className="text-2xl p-4 cursor-pointer w-max hover:scale-100 hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900 border-b border-gray-200" > 
<FontAwesomeIcon icon={faAngleRight}/>
</p> }
 {!titleOpens&&<p className={`text-2xl p-4 cursor-pointer w-max hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900 hover:scale-100 border-b border-gray-200`} > 
<FontAwesomeIcon icon={faAngleLeft}/>
</p> }
 </div>
  </div> 

  <div className='absolute'>
  {gnrItx.map((vx, i)=>vx.article_title &&
  <div key={vx.article_title + ' ' + Math.random()} className="flex items-center border-b hover:bg-gray-400 dark:bg-gray-800 bg-white w-80 hover:dark:bg-gray-900" > 
<Link href={{ pathname: pathname, query: { topic:vx.article_title} }}><h2 className="capitalize text-lg p-6 cursor-pointer" >{vx.article_title.replace(/-/g," ")}</h2> </Link>

  </div>
  )}
   </div>
</div>
 
 {userActions &&<LoginModal setUserActions={setUserActions}/>}  
    {opTitles.map((xx , i)=> (
       xx.slug &&(xx.article_title===null || xx.article_title==='')&&
    <div key={xx.title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border my-1 border-t-4 border-gray-900 hover:bg-gray-900 cursor-pointer">  
   <div className="w-full overflow-hidden md:block justify-center" >
   
  <div ref={createRef}> 
{xx?.title&&!xx?.article_title&& <Link href={`/forum/post/${xx.slug}/${xx.id}/`}><h3 className="text-white opacity-70 text-2xl cursor-pointer px-4 text-center underline">{xx?.title}</h3></Link>} 
   <p className="text-white font-bold text-center text-lg my-1">Genres:</p>
   {xx?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="text-white text-center" key={vi}>
   <Link href={`/topic/${xy}/`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link>
   </div>  
   )}  
   
   </div>

   <div className=""> 
   <p style={{lineHeight:'28px'}} className="text-white opacity-70 cursor-pointer p-4 text-center">
   {xx?.story} <Link href={`/forum/post/${xx.slug}/${xx.id}/`}><small className="hover:text-green-400">See full story</small></Link>
   </p></div> 
   <div className="flex flex-wrap text-sm my-8 text-white"> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex m-1" key={xi}>
   <Link href={`/topic/${ex.replace('#', '')}/`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
 {xx?.user_id === user?.id && <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTagAction(xx, ex)}>x</small>}
   </div> ))} 
    
   </div>  
 
   <div className="flex flex-wrap w-3/4  text-white" > 
   {user?.id=== xx?.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2">Suggested Tags:</small> }
    
    {user?.id=== xx?.user_id && xx?.suggested_tags?.length !== 0&&
   xx?.suggested_tags?.map((ex, xi)=> 
   i===showIndex&&  
   <div className="flex text-sm" key={ex + ' ' + xi}>  
    <div className="flex w-full flex-wrap overflow-hidden ">
    
    {showSuggestion&&!xx?.tags?.includes(ex)&&Boolean(ex)!==false && ex.split(' ')?.filter((e, i, a)=> a.findIndex(item=>item.replace("'", '').replace(",", '').replace("-", '') === e) === i).filter((jx )=> jx!=='').map((xy, i)=>
    <p onClick={()=>tagAction(xx, xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer" >#{xy.replace('.', '')} 
   </p> ) } 
    </div>
   </div>
     
   ) }
   {user?.id=== xx.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-sm opacity-70 text-white" onClick={()=>changeIndex(i)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
   {user?.id=== xx.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-sm opacity-70 text-white"onClick={()=>changeIndex(i)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
   </div>
   </div> 
  
    <div className="flex overflow-auto w-auto scroll-smooth">  
     {xx?.files?.flat().filter((vx)=>!(vx as string)?.includes('undefined')).map((itx,ix)=> itx &&
     <div key={itx} className="mx-1 min-w-fit relative scroll-smooth" ref={imgIndex===itx?imgRef:null} title="double click to view"> 

    <Image 
   onClick={()=>enlargeImgs(i, ix)}  
   className={imgIndex===itx?'animate-in cursor-pointer mx-1 w-full h-40 my-4':'cursor-pointer mx-1 w-full h-40 my-4'} 
   src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${itx}`} 
   width={150} 
   height={150}
   style={imgIndex===itx?imgZoom:{} }
   alt={xx.title as string}
   />

    {show&&
     <> 
     {!deleteBtn && <span onClick={()=>openDelete(ix)} className={imgIndex===itx?'absolute top-4 text-gray-700 text-xl text-center rounded-full border bg-opacity-60 w-16 p-4 m-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
    {deleteBtn&&activeIdx=== ix && <span className={imgIndex===itx?'absolute left-4 top-4 text-white text-center py-3 m-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg( xx , itx)} >Delete Photo</span>} </> }
 
   </div> 
   )}
    </div> 
 
     <div className='text-white flex justify-center opacity-70 mt-8'> 
    <span className="m-2">by</span>    
     {xx?.avatar_url?     
     <Link href={`/profile/${xx?.user_id}/`}>      
       <img 
     width={40}
     height={40}
     src={xx?.avatar_url} 
     alt={xx?.username} 
     className='border cursor-pointer rounded-full opacity-70 hover:scale-105'/>
     </Link>:
     
     <Link href={`/profile/${xx?.user_id}/`}><p className='border cursor-pointer rounded-full w-full p-2 opacity-70 hover:scale-105'><FontAwesomeIcon icon={faUser} width={25}className="avatar_"/></p></Link> }  
   { xx?.username&& <Link href={`/profile/${xx?.user_id}/`}><p className="text-sm m-2 hover:scale-105" >{xx?.username} 
     </p></Link>} 
     {!xx?.username&& <Link href={`/profile/${xx?.user_id}/`}><p className="text-sm m-2 hover:scale-105" >{xx?.user_email} 
     </p></Link>}     
   </div>
  
    <div className="text-white flex justify-between mt-4 w-full m-auto flex justify-evenly mt-4" ref={ref}>  
   <button onClick={()=> likeAction(xx)}className="relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
   <FontAwesomeIcon icon={faThumbsUp} width={20}/>
   <p className="px-1 hover:shadow-3xl">{xx?.likes?.length}</p>
   </button>  
 <div> 
   <button onClick={()=>handleOpen(xx.id as number)} className="relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
   <FontAwesomeIcon width={20}icon={faComment}rotation={180}/>
   <p className="px-1 hover:shadow-3xl">{xx.comments?.length}</p>
   
   </button> 
   </div> 

   {user?.id=== xx?.user_id ?
   <>
   <div className="">
   <button onClick={()=>openEdit(xx.id as number)}className="relative justify-between left-0 flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== xx.id &&<button onClick={()=>editting(xx)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Edit</button>} 
   </div> 
   <div>
     <button onClick={()=>openDelete(xx.id as number)}className=" flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faDeleteLeft} rotation={180} /></button>
   
   {deleteBtn&&activeIdx === xx.id &&<button onClick={()=>deletePostAction(String(xx?.id))} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Delete
   </button>}
   </div> 
   </>
   
   :null}
   <div>
   <button onClick={()=>showAll(xx.id as number)} className="m-1 text-smlg rounded-none p-1 hover:shadow-3xl"> 
   <FontAwesomeIcon width={20}icon={faShare}  
   />
   </button>   
   </div>  
   
   </div>  
 
     {activeReply && onIdx=== xx.id&&
     <div className="relative"> 
     <form className='rxn-form animate-in flex justify-center text-center items-center' ref={elRef}>
 
   <textarea
   rows={6}
   cols={50}  
   name='title'
   maxLength={550}  
   className='w-full resize-none bg-inherit mt-1 p-5 leading-normal' 
   placeholder="Speak your Mind!"
   defaultValue={comment.title||''}
   /> 
    <div className="bottom-0 right-28 absolute">
<label className=" myFile edit-view block text-2xl text-gray-900 text-white cursor-pointer" htmlFor="file_input">
<p className=""> 
<FontAwesomeIcon 
  icon={faImage}
  />
  </p>
  
<div className="flex absolute top-0 right-0 w-24"> 
  <input
className="block opacity-0 p-2 text-text font-bold border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400 w-32"
id=""
type="file"
name='files'
multiple 
accept="image/*,video/*"
onChange={handleImageUpload}
/> 
</div>
</label>
</div>
   <button type="submit" aria-disabled={pending} formAction={(e)=>commentAction(e, String(xx.id))} className="w-24 h-20 mx-2 cursor-pointer border-0 rounded-full bg-gray-600 text-white block border-none hover:text-pink-900 text-lg p-2" >
   {isPending ? 'Waiting' : 'Reply'}
   </button> 
   
   </form> 
   <div className="flex flex-wrap gap-4 mt-4">
 
 {selectedImages.map((imageUrl) => (
   <div key={imageUrl} className="relative">
     <img src={imageUrl} alt="Uploaded preview" className="w-10 h-10 object-cover rounded-md" />
     <button
       onClick={() => handleRemoveImage(imageUrl)}
       className="absolute top-1 right-1 dark:text-white text-lg text-gray-400 rounded hover:bg-gray-300 px-1"
       title="Remove Image"
     >
       <FontAwesomeIcon icon={faClose} />
     </button>
   </div>
 ))}
</div>
   <Link href={`/forum/post/${xx.slug}/${xx.id}/`}><p className="text-white text-center my-1 text-xs rounded-none py-2">View Comments</p></Link>
   </div>
   }
   {userActions?
   <LoginModal  
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={xx}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    />   }
    </div> 
   )
     )}  
   </main>  
   }
 
{topic&& 
    <main className="bg-mainBg py-6">  
<div className={opTitles.length===0?'hidden':"block relative top-20 z-30 w-max "} style={arrowOpens}onClick={rotateArrow}> 
  <div >  
  <div className="flex border-b border-gray-200 hover:bg-gray-900 dark:bg-gray-800 w-80 bg-white" >  
 <h2 className="text-2xl font-bold dark:bg-gray-800 px-5 py-3 bg-white w-full">Articles</h2>
 <div className="relative "> 
{titleOpens&& <p className="text-2xl p-4 cursor-pointer w-max hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900 hover:scale-100 " > 
<FontAwesomeIcon icon={faAngleRight}/>
</p> }
 {!titleOpens&&<p className={`text-2xl p-4 cursor-pointer w-max hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-900 hover:scale-100`} > 
<FontAwesomeIcon icon={faAngleLeft}/>
</p> }
 </div>
  </div>

   </div>

{gnrItx.map((vx, i)=>
  <div className='absolute' key={vx.article_title +' ' + i}>  
  <div className="flex border-b hover:bg-gray-900 dark:bg-gray-800 w-80 bg-white" > 
<Link href={`/forum/post/${vx.slug}/${vx.id}/`}><h2 className="capitalize text-lg p-6 cursor-pointer">{vx.article_title.replace(/-/g, ' ')}</h2></Link>
   </div>

   </div>
   )}
</div>
 
 {userActions &&<LoginModal setUserActions={setUserActions}/>} 
  <h3 className="text-white capitalize opacity-70 text-2xl cursor-pointer px-4 text-center underline">{topic.replace(/-/g, ' ')}</h3>  
    {opTitles?.filter((xy)=>xy.article_title===topic).map((xx, i) =>(
   
    <div key={xx.article_title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border my-1 border-t-4 border-gray-900 hover:bg-gray-900 cursor-pointer">  
   <div className="w-full overflow-hidden md:block justify-center"> 

  <div ref={createRef}>   
   <p className="text-white font-bold text-center text-lg my-1">Genres:</p>
   {xx?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="text-white text-center" key={vi}>
   <Link href={`/topic/${xy}/`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link>
   </div>  
   )}  
   
   </div>

   <div className=""> 
   <p style={{lineHeight:'28px'}} className="text-white opacity-70 cursor-pointer p-4 text-center">
   {xx?.story} <Link href={`/forum/post/${xx.slug}/${xx.id}/`}><small className="hover:text-green-400">See full story</small></Link>
   </p></div> 

   <div className="flex flex-wrap text-sm my-8 text-white"> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex m-1" key={xi}>
   <Link href={`/topic/${ex.replace('#', '')}/`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
 {xx?.user_id === user?.id && <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTagAction(xx, ex)}>x</small>}
   </div> ))} 
    
   </div>  
 
   <div className="flex flex-wrap w-3/4  text-white" > 
   {user?.id=== xx?.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2">Suggested Tags:</small> }
    
    {user?.id=== xx?.user_id && xx?.suggested_tags?.length !== 0&&
   xx?.suggested_tags?.filter((e, i, a)=> a.findIndex(item=>item.replace('.', '') === e.replace('.', '')) === i).filter((jx )=> jx!=='').map((ex, xi)=> 
   i===showIndex&&  
   <div className="flex text-sm" key={ex + ' ' + xi}>  
    <div className="flex w-full flex-wrap overflow-hidden ">
    
    {showSuggestion&&!xx?.tags?.includes(ex)&&Boolean(ex)!==false && ex.split(' ').map((xy, i)=>
    <p onClick={()=>tagAction(xx, xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer" >#{xy.replace('.', '')} 
   </p> ) } 
    </div>
   </div>
     
   ) }
   {user?.id=== xx.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-sm opacity-70 text-white" onClick={()=>changeIndex(i)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
   {user?.id=== xx.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-sm opacity-70 text-white"onClick={()=>changeIndex(i)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
   </div>
   </div> 
  
    <div className="flex overflow-auto w-auto scroll-smooth">  
     {xx?.files?.flat().filter((vx)=>!(vx as string)?.includes('undefined')).map((itx,ix)=> itx &&
     <div key={itx} className="mx-1 min-w-fit relative scroll-smooth" ref={imgIndex===itx?imgRef:null} title="double click to view"> 

    <Image 
   onClick={()=>enlargeImgs(i, ix)}  
   className={imgIndex===itx?'animate-in cursor-pointer mx-1 w-full h-40 my-4':'cursor-pointer mx-1 w-full h-40 my-4'} 
   src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${itx}`} 
   width={150} 
   height={150}
   style={imgIndex===itx?imgZoom:{} }
   alt={xx.article_title as string}
   />

    {show&&
     <> 
     {!deleteBtn && <span onClick={()=>openDelete(ix)} className={imgIndex===itx?'absolute top-4 text-gray-700 text-xl text-center rounded-full border bg-opacity-60 w-16 p-4 m-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
    {deleteBtn&&activeIdx=== ix && <span className={imgIndex===itx?'absolute left-4 top-4 text-white text-center py-3 m-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg( xx , itx)} >Delete Photo</span>} </> }
 
   </div> 
   )}
    </div> 
 
     <div className='text-white flex justify-center opacity-70 mt-8'> 
    <span className="m-2">by</span>    
     {xx?.avatar_url?     
     <Link href={`/profile/${xx?.user_id}/`}>      
       <img 
     width={40}
     height={40}
     src={xx?.avatar_url} 
     alt={xx?.username} 
     className='border cursor-pointer rounded-full opacity-70 hover:scale-105'/>
     </Link>:
     
     <Link href={`/profile/${xx?.user_id}/`}><p className='border cursor-pointer rounded-full w-full p-2 opacity-70 hover:scale-105'><FontAwesomeIcon icon={faUser} width={25}className="avatar_"/></p></Link> }  
   { xx?.username&& <Link href={`/profile/${xx?.user_id}/`}><p className="text-sm m-2 hover:scale-105" >{xx?.username} 
     </p></Link>} 
     {!xx?.username&& <Link href={`/profile/${xx?.user_id}/`}><p className="text-sm m-2 hover:scale-105" >{xx?.user_email} 
     </p></Link>}     
   </div>
  
    <div className="text-white flex justify-between mt-4 w-full m-auto flex justify-evenly mt-4" ref={ref}>  
   <button onClick={()=> likeAction(xx)}className="relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
   <FontAwesomeIcon icon={faThumbsUp} width={20}/>
   <p className="px-1 hover:shadow-3xl">{xx?.likes?.length}</p>
   </button>  
 <div> 
   <button onClick={()=>handleOpen(xx.id as number)} className="relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
   <FontAwesomeIcon width={20}icon={faComment}rotation={180}/>
   <p className="px-1 hover:shadow-3xl">{xx.comments?.length}</p>
   
   </button> 
   </div> 

   {user?.id=== xx?.user_id ?
   <>
   <div className="">
   <button onClick={()=>openEdit(xx.id as number)}className="relative justify-between left-0 flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== xx.id &&<button onClick={()=>editting(xx)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Edit</button>} 
   </div> 
   <div>
     <button onClick={()=>openDelete(xx.id as number)}className=" flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faDeleteLeft} rotation={180} /></button>
   
   {deleteBtn&&activeIdx === xx.id &&<button onClick={()=>deletePostAction(String(xx?.id))} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-44 z-10 bg-slate-900">
   Delete
   </button>}
   </div> 
   </>
   
   :null}
   <div>
   <button onClick={()=>showAll(xx.id as number)} className="m-1 text-smlg rounded-none p-1 hover:shadow-3xl"> 
   <FontAwesomeIcon width={20}icon={faShare}  
   />
   </button>   
   </div>  
   
   </div>  
 
     {activeReply && onIdx=== xx.id&&
     <div className="relative"> 
     <form className='rxn-form animate-in flex justify-center text-center items-center' ref={elRef}>
 
   <textarea
   rows={6}
   cols={50}  
   name='title'
   maxLength={550}  
   className='w-full resize-none bg-inherit mt-1 p-5 leading-normal' 
   placeholder="Speak your Mind!"
   defaultValue={comment.title||''}
   /> 
    <div className="bottom-0 right-28 absolute">
<label className=" myFile edit-view block text-2xl text-gray-900 text-white cursor-pointer" htmlFor="file_input">
<p className=""> 
<FontAwesomeIcon 
  icon={faImage}
  />
  </p>
  
<div className="flex absolute top-0 right-0 w-24"> 
  <input
className="block opacity-0 p-2 text-text font-bold border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400 w-32"
id=""
type="file"
name='files'
multiple 
accept="image/*,video/*"
onChange={handleImageUpload}
/> 
</div>
</label>
</div>
   <button type="submit" aria-disabled={pending} formAction={(e)=>commentAction(e, String(xx.id))} className="w-24 h-20 mx-2 cursor-pointer border-0 rounded-full bg-gray-600 text-white block border-none hover:text-pink-900 text-lg p-2" >
   {isPending ? 'Waiting' : 'Reply'}
   </button> 
   
   </form> 
   <div className="flex flex-wrap gap-4 mt-4">
 
 {selectedImages.map((imageUrl) => (
   <div key={imageUrl} className="relative">
     <img src={imageUrl} alt="Uploaded preview" className="w-10 h-10 object-cover rounded-md" />
     <button
       onClick={() => handleRemoveImage(imageUrl)}
       className="absolute top-1 right-1 dark:text-white text-lg text-gray-400 rounded hover:bg-gray-300 px-1"
       title="Remove Image"
     >
       <FontAwesomeIcon icon={faClose} />
     </button>
   </div>
 ))}
</div>
   <Link href={`/forum/post/${xx.slug}/${xx.id}/`}><p className="text-white text-center my-1 text-xs rounded-none py-2">View Comments</p></Link>
   </div>
   }
   {userActions?
   <LoginModal  
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={xx}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    />   }
    </div> 
   )
     )}   
 
 
   </main>  
   } 
 {!inView?<p className="text-center">Loading...</p> :''} 
   </div> 
 
   )
}

export default Main