 'use client' 
 
import { usePathname, useRouter, useSearchParams} from 'next/navigation'  
import AllComments from './AllComments'
import { useState,useEffect, useRef,useMemo } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faDeleteLeft, faPencil,faShare,faEllipsisVertical, faThumbsUp, faComment, faAngleDown, faAngleUp, faImage, faAngleLeft, faAngleRight, faSearch, faClose } from '@fortawesome/free-solid-svg-icons' 
import Link from 'next/link' 
import Image from 'next/image'   
import ShareButtons from '../ShareButtons' 
import moment from 'moment'
import { useInView } from 'react-intersection-observer' 
import LoginModal from './LoginModal'
import { createClient } from '@/utils/supabase/client'
import { commentEdit, commentLike, createCxComment, deleteComment, getComments } from '@/app/forum/actions/loadComments' 
import Relevant from './Relevant'  
import Trends from './Trends'
import { type User } from '@supabase/supabase-js'
import { CommentProps, InitialComments, InitialPosts, PostProps } from '@/app/types'
import { createComment, deleteTag, postDelete, postLike, postTag } from '@/app/forum/actions/postsActions'
import CreateForm from '@/app/forum/createPost' 
import FakeTrends from './FakeTrend'
import { FakeObj } from '@/app/data/trends'

 type TrendyProp={
  title:string
  
  }
function Post ({
  initiaComms,  
  postData,   
  trendX,
  comments, 
  user,
  related , 
  filteredTrends
}:
{
user: User,
postData:PostProps, 
initiaComms:InitialComments[],
comments:InitialComments[],
trendX:TrendyProp[],
related:InitialPosts[],
filteredTrends:FakeObj[]
}) {

const router = useRouter()    
const [navDropper,setNavDropper]= useState(false) 
const [commentObj,setCommentObj]=useState<CommentProps>({}) 
const [deleteBtn,setDeleteBtn]=useState(false)  
const [onIdx, setOnIdx]=useState('') 
const [showIndex, setShowIndex]= useState(0)
const [postReply,setPostReply]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [emoji_, setEmoji] = useState("");
const [editId,setEditId]=useState('')
const [scrolledPosts, setScrolledPosts]=useState<InitialPosts[]>([]) 
const [scrolledComments, setScrolledComments]=useState<InitialComments[]>(initiaComms)
const [userActions,setUserActions]=useState(false)
const [count,setCount]=useState(1) 
const [startScroll,setStartScroll]=useState(2)
const [notify,setNotify]=useState('')
const [imgIndex,setImgIndex]= useState('')  
const [imgZoom,setImgZoom]=useState({})
const [show, setShow] = useState(false);
const [replyId,setReplyId]=useState('') 
const [isEditingComment, setIsEditingComment] = useState(false) 
const [shareOptions,setShareOptions]=useState(false) 
const [activeCommentReply, setActiveCommentReply]=useState(false)
const [selectedImages, setSelectedImages] = useState<string[]>([]);
const [activeIdx,setActiveIdx]=useState<string | number>('') 
const imgRef = useRef<HTMLDivElement | null>(null);
const [ post, setPost ]=useState({})
const { ref, inView } = useInView()
const dropperRef= useRef<HTMLDivElement | null>(null);
const replyRef= useRef<HTMLDivElement | null>(null);
const elRef= useRef<HTMLDivElement | null>(null);
const [dataLength,setDataLength]=useState({
   comments:0,
   likes:0,
 
})
  useEffect(()=>{ 
  setDataLength({
    ...dataLength, 
    likes:(postData.likes as PostProps[]).length, 
    comments: scrolledComments.length
  })
  },[scrolledComments]) 
 
const loadMorePosts = async () => {
  const apix = await getComments(startScroll, startScroll+count-1, postData) 
  if(apix &&apix?.length>0){
  setScrolledComments([...scrolledComments, ...apix])  
  }  
  setStartScroll((prev)=>prev+(scrolledComments??[])?.length)  
  setCount((prev)=>prev+(scrolledComments??[])?.length) 
  }

useEffect(() => { 
    if (inView) {
      loadMorePosts()   
    }
  //count dep
  }, [inView, scrolledComments, count])
 
useEffect(()=>{ 
if(editId){ 
setPost(postData)
} 

 },[editId, post, setPost])
//  const openDelete=(i)=>{
//   setDeleteBtn(prev => !prev)  
//   setActiveIdx(i);
// }

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

 
const commentsByParentId = useMemo(() => {
  const groupParent: { [parentId: number ]: InitialComments[] } = {};
  scrolledComments?.forEach((commentx) => {
    groupParent[commentx?.parent_id as unknown as number] ||= [] ;
    groupParent[commentx?.parent_id as unknown as number].push(commentx);
  });
//as InitialComments[]
  return groupParent ;
}, [scrolledComments]);
 const rootComments = commentsByParentId[null as unknown as number] || [];
    
 useEffect(() => {
  const handler = (event:MouseEvent) => {
  if (!dropperRef.current) {           
  return;
  }
  
  if (!dropperRef.current?.contains(event.target as Node)) {
  setNavDropper(false); 
  } 
  
  };
  document.addEventListener("click", handler, true);
  
  return () => {
  document.removeEventListener("click", handler);
  };
  
  }, [navDropper, setEditId]);
  
  
  useEffect(() => {
  const handler = (event: MouseEvent) => {
  if (!imgRef.current) {           
  return;
  }
  
  if (!imgRef.current?.contains(event.target as Node)) {
  setShow(false);
  setActiveIdx('')
  setDeleteBtn(false)
  } 
  
  };
  document.addEventListener("click", handler, true);
  
  return () => {
  document.removeEventListener("click", handler);
  };
  
  }, []);
  
useEffect(() => {
const handler = (event:MouseEvent) => {
if (!replyRef.current) {           
return;
}

if (!replyRef.current.contains(event.target as Node)) {
setEditId('')

} 

};
document.addEventListener("click", handler, true);

return () => {
document.removeEventListener("click", handler);
};

}, [setEditId]); 
  
 const editAXN=()=>{
  setNavDropper(false)
  setEditId(String(postData?.id))
}
 
// function enlargeImgs(ex,ix) {  
//   setImgIndex(ex)
//   imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'}) 
//   setImgZoom({
//   width:'fit-content',
//   height:'auto',  
//   transition: "width 0.5s ease", 
// }
//   )

//  setShow(prev => !prev)
// }
  
// const changeIndex = (i) => {
//  setShowSuggestion(true)
//  setShowIndex(i)
//  if(showSuggestion && showIndex=== i){
//  setShowSuggestion(false)  
  
//  } 

// };
 const handleOpen = (post:PostProps) => {
   setOnIdx(String(post?.id));  
   setShareOptions(false);
   if(!user){
    setUserActions(true) 
 }else{
  setPostReply(true);
 } 
 }
const showAll = (id:number) => { 
  if(!user){
    setUserActions(true) 
 }else{
     setShareOptions(prev => !prev);
 } 
 setActiveIdx( Number(id) ); 
   setDeleteBtn(false)
   //setEditBtn(false)
 }
const searchParams= useSearchParams();
const val = searchParams.get('message')||'';
const pathname = usePathname() 

useEffect(
  () => { 
    if(val !==''){ 
      router.push(pathname, {scroll:true}); 
      (window as any).posted='posted' 
      // setTimeout(()=>{
      //  // clearRef.current?.reset();
      // },1000)
       
      }  
    
  
},[val, searchParams, router ])
 
useEffect(() => {
  const handler = (event:MouseEvent) => {
  if ( !elRef.current) {
  return;
  } 
  if (!elRef.current.contains(event.target as Node)) { 
    setPostReply(false)
    selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));  
    setSelectedImages([]); 
  
  }
  
  };
  
  document.addEventListener("click", handler, true);
  
  return () => {
  document.removeEventListener("click", handler);
  };
  
  }, []);
 
  const [activeSlide,setActiveSlide] =useState(0) 
  const [imgMode, setImgMode]=useState(false)
  const prevSlide=()=> { 
    const slide =activeSlide - 1 < 0
      ? (postData.files??[]).filter((vx)=>!(vx as string)?.includes('undefined')).length - 1
      :activeSlide -1;
      setActiveSlide(slide); 
  }
  const nextSlide=()=> {
    const slide = activeSlide + 1 < (postData.files??[]).filter((vx)=>!(vx as string)?.includes('undefined')).length 
      ? activeSlide + 1
      : 0;
      setActiveSlide(slide);  
  }
  const openImg =()=>{
    setImgMode(prev=>!prev)
  }
  async function resetImg(postsImgx:PostProps,img:string) {
    // setImgZoom({
    //   width:'100%',
    //   height:"160px",
    //   transition: "width 0.5s ease"
    // })
   
  const updFiles=postsImgx?.files?.filter((ex)=> ex !==img)??[]
  const supabase= createClient()
  const { data, error } = await supabase
  .from('comments')
  .update({ files: [...updFiles ] })
  .eq('post_id', postsImgx.id)
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
    router.push(`/forum/post/${postsImgx.slug}/${postsImgx.id}`,{ scroll:false}) 
    setTimeout(
      () =>setNotify(''),  
      2000 
    );
    router.refresh()
  }
const openImgDelete=(id:number)=>{
  setDeleteBtn(prev => !prev)  
   setActiveSlide(id);
}
  

  const likeAction= async(postx:PostProps)=>{ 
    if(!user){
      setUserActions(true)
    }else{ 
  await postLike(postx) 
   router.refresh()
  //router.push(pathname+'?message=Like Updated', {scroll:false})  
 router.push(`/forum/post/${postx.slug}/${postx.id}`,{ scroll:false}) 
  }}

  const commentAction= async(formData: FormData, postId:string)=>{ 
    if(!user){
      setUserActions(true)
    }else{      
      const data= await createComment(formData, postId , null)   
      setScrolledComments([...scrolledComments, ...data??[]]) 
        setPostReply(false);
    
        router.refresh()
        selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));  
        setSelectedImages([]);
       
        //clearRef.current?.scrollIntoView()
        //window.scrollTo({ top:1500, behavior: "smooth" })
  }}

 
  const tagAction =async (postx:PostProps , tagToDelete:string)=>{
  await postTag(postx, tagToDelete)  
    router.push(`/forum/post/${postx.slug}/${postx.id}`,{ scroll:false}) 
  }
       
      const deleteTagAction=async (post:PostProps, tagToDelete:string)=>{
       await deleteTag(post,tagToDelete) 
       router.push(`/forum/post/${post.slug}/${post.id}`,{ scroll:false}) 
  
      }

 
      const likeCommAction= async(comment:CommentProps )=>{
        // deleteCommAction:Function, likeCommAction:Function
        if(!user){
          setUserActions(true)
        }else{ 
       const data= await commentLike(comment) ?? []
       router.refresh() 
      const pt = scrolledComments?.filter((te )=> te.id !== comment.id) 
      setScrolledComments([...pt, ...(data ?? [])]); 
     //setScrolledComments( pt.concat(data)); 
       
      } 
      
      } 


 
      const commentCommAction= async(formData: FormData, comment:CommentProps ) =>{

        if(!user){
          setUserActions(true)
        }else{
         
            if(commentObj?.id){
            const data= await commentEdit(formData,  comment)
             const pt = scrolledComments.filter((te)=> String(te?.id) !== String(comment.id))        
           setIsEditingComment(false) 
          setScrolledComments([...pt, ...data??[]])
          router.refresh()
          selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
          setSelectedImages([]); 
         } 
          else {  
          const data= await createCxComment(formData, comment.post_id as string, String(comment.id))   
          setPostReply(false);
           setScrolledComments([...scrolledComments, ...data??[]]) 
            router.refresh()
            selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
            setSelectedImages([]); 
        }
      }
   setActiveCommentReply(false)
    }
  
      const deleteCommAction=async (comment:CommentProps)=>{
        await deleteComment(comment, scrolledComments) 
         const pt = scrolledComments.filter((te)=> String(te.id)!== String(comment.id)) 
         
         setScrolledComments(pt) 
         router.refresh()
        // //  const comms = scrolledComments.filter((te)=> te.id!== comment.id)  
        // //  setScrolledComments(comms) 
        
         }


         const deletePostAction=async (postid:string)=>{
          await postDelete(postid) 
          router.push('/forum')
          // router.back()
           }
       
return ( 
<> 
{userActions &&<LoginModal setUserActions={setUserActions}/>} 
<div className='flex justify-between relative'> 
<p onClick={() => router.back()}><FontAwesomeIcon icon={faChevronLeft}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> 
 {/* <Link href='/search'><p onClick={searchLocation}><FontAwesomeIcon icon={faSearch}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p></Link> */}

</div>
<div className='w-full flex items-center justify-center'> {notify&&<p className="m-auto fixed z-10 top-0 bg-green-500 border-2 text-center text-white p-3 text-xl">{notify}</p>}</div> 
 <div className='lg:flex justify-center max-w-6xl m-auto px-4 relative'>  
  {navDropper?
 (<div ref={dropperRef} className="absolute top-48 z-20 right-20 md:right-40 lg:right-96 lg:mr-8">  
 { postData?.user_id=== user?.id?
 <div className='p-2 text-white text-center py-3 text-md rounded-none shadow-4xl p-3 border w-60 bg-slate-900 md:w-64'> 

 <div className='flex justify-between text-xl p-2 cursor-pointer'><FontAwesomeIcon icon={faDeleteLeft}width={20} /><p onClick={()=> deletePostAction(postData.id as string) }>Delete</p></div>

 <div className='flex justify-between text-xl p-2 cursor-pointer' onClick={editAXN}><FontAwesomeIcon icon={faPencil} /><p>Edit</p> 
  </div>
 </div>
 :null} 
  
 </div>) 
 :
null}
<div className='lg:flex justify-center px-4 flex-row-reverse'> 
  <div>
<div className='lg:w-96'>
{trendX?.length>0 ? <Trends trendX={trendX}/>:<FakeTrends filteredTrends={filteredTrends}/> } 
</div>
<div className='hidden lg:block overflow-hidden lg:w-96'> 
<Relevant 
item={postData}
related={related}
/>
</div>

 </div>
 <div className='py-3'> 
 {val && <p className="w-1/2 text-center m-auto my-2 text-white p-2 bg-gray-400">
{val}
</p>}

<div className='shadow-2xl m-auto max-w-2xl px-3'>

<div className='m-auto flex flex-col items-center border-b-2'> 
{postData?.avatar_url? <Link href={`/profile/${postData?.user_id}`}><Image src={postData?.avatar_url} 
width={80} 
height={80}
className='rounded-full'
alt={postData?.user_email as string}/></Link>:
<Link href={`/profile/${postData?.user_id}`}><Image src={'/assets/images/culturays.png'} 
width={80} 
height={80} 
className='rounded-full'
alt={postData?.user_email as string}/></Link> }  
<Link href={`/profile/${postData?.user_id}`}><h3 className='p-3 text-lg font-bold'>{postData?.user_email} </h3></Link>
</div> 
 
{!editId ?
<div ref={replyRef}> 
<div className='m-2 p-3'>   
<div className='relative'>
<small className="my-4">
{moment(postData.created_at , "YYYYMMDD").fromNow() }  
</small> 
<p className='text-2xl p-3 underline text-center capitalize'>{postData?.title ||postData?.article_title?.replace(/-/g, ' ') } </p> 
 {postData.user_id === user?.id&& <p onClick={() => setNavDropper(prev=> !prev)} className='absolute z-50 opacity-80 cursor-pointer text-xl right-0 top-0'> <FontAwesomeIcon icon={faEllipsisVertical} /></p>}
 <p className="dark:text-white text-gray-800 font-bold text-center text-lg my-1">Genres:</p>
   {postData?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="dark:text-white text-gray-800 text-center" key={vi}>
   <Link href={`/topic/${xy}'`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link>
   </div> 
   )} 
 </div>
 <p className='text-lg py-2 leading-relaxed'>{postData?.story} </p> 
  </div> 
  <hr/>
 <div className="flex flex-wrap text-md mx-3"> 
{postData?.tags?.map((xy, vi)=>
xy.split(',').map((ex, xi)=> ex&&
<div className="flex mx-1 my-4" key={xi}>
<Link href={`/search/?searchVal=${ex.replace('#', '')}`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
 {postData.user_id === user?.id && <small className="p-2 hover:bg-gray-400 cursor-pointer" onClick={()=>deleteTagAction(postData, ex)}>x</small>} 
</div> ))} 
 
</div> 
<hr/>
 
<div className="flex flex-wrap w-3/4 mx-3 my-4" > 
{user?.id=== postData.user_id && <small className="text-lg dark:text-white text-gray-800 cursor-pointer mx-2 text-center mx-2">Suggested Tags:</small> }
 
 {user?.id=== postData.user_id && postData.suggested_tags?.length !== 0&&
postData?.suggested_tags?.map((ex, xi)=>    
<div className="flex text-sm" key={ex + ' ' + xi}>  
 <div className="flex w-full flex-wrap overflow-hidden"> 
 {showSuggestion&&!postData?.tags?.includes(ex)&&Boolean(ex)!==false && ex.split(' ')?.filter((e, i, a)=> a.findIndex(item=>item.replace("'", '').replace(",", '').replace("-", '') === e) === i).filter((jx )=> jx!=='').map((xy, i)=> <p onClick={()=>tagAction(postData , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer" >#{xy.replace('.', '')}  
</p> ) } 
 </div>
</div>
  
) }
{user?.id=== postData.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-md opacity-70" onClick={()=> setShowSuggestion(prev => !prev)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
{user?.id=== postData.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-md opacity-70 "onClick={()=> setShowSuggestion(prev => !prev)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
</div>
 
 <div className='m-5 '
> 
{postData.files?.filter((vx)=>!(vx as string)?.includes('undefined'))?.map((xy, ix)=>ix === activeSlide &&  
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full ':' mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ postData.title}>
 
 <div className="flex"> 
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
<div className=' '>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={805} 
height={605} 
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={postData.title as string}
/>
<p className='p-1 text-sm dark:text-white mt-1 hover:scale-105 hover:opacity-80'>+ {(postData.files??[]).filter((vx)=>!(vx as string)?.includes('undefined'))?.length -1} </p>
 </div> 
 {imgMode&&<p onClick={nextSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </p>}

 </div>
 
  {show&&
<> 
{!deleteBtn && <span onClick={()=>openImgDelete(ix)} className={imgIndex===xy?'absolute top-4 text-gray-700 text-xl rounded-full border bg-opacity-60 p-4 mt-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
{deleteBtn&&activeSlide=== ix && <span className={imgIndex===xy?'absolute right-4 top-4 text-white text-center py-3 mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(postData, xy)} >Delete Photo</span>} </> }  
   </div>
)}
   
  </div>

</div>:  
  
<div ref={replyRef} className='p-2 [&_.post-view]:shadow-none [&_.btn-link]:w-1/4 [&_.btn-link]:m-auto [&_.post-view]:text-lg [&_.post-view]:border-gray-900 [&_.post-view]:bg-transparent [&_.edit-view]:bg-black [&_.edit-view]:p-1 [&_.edit-view]:border-slate-900 [&_.edit-view]:border-2'>
<CreateForm post={postData} setPost={setPost} scrolledPosts={scrolledPosts} setScrolledPosts={setScrolledPosts} val={val} setUserActions={setUserActions} user={user} setEditId={setEditId} titleX=''/>  
</div> 
} 
<hr/>
 <div className=" flex justify-evenly mt-4 w-full m-auto font-bold" ref={ref}>  
 <button onClick={()=>likeAction(postData )}className="hover:scale-105 relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
 <FontAwesomeIcon icon={faThumbsUp} width={25}/>
 <p className="px-1 ">{(postData.likes as PostProps[]).length}</p> 
 </button>  
 <div> 
 <button onClick={()=>handleOpen(postData)} className="hover:scale-105 relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
 <FontAwesomeIcon width={25}icon={faComment}rotation={180}/>
  <p className="px-1 ">{rootComments.length}</p> 
 </button>

 </div> 
 
 <div>
 
 <button onClick={()=>showAll(postData.id as number)} className="m-1 text-lg rounded-none p-1 hover:scale-105"> 
 <FontAwesomeIcon width={25}icon={faShare}  
 />
 </button>   
 </div>  
 
 </div>
 
 {postReply &&
   <div className="text-center"ref={elRef} > 
 <form className='relative animate-in flex justify-center items-center' >  
 <textarea
 rows={6}
 cols={400}
 name='title'
 maxLength={550}
 className='resize-none border pt-4 resize-none bg-inherit my-3 text-md leading-normal hover:bg-transparent rounded-b-sm focus:outline-none px-2' 
 placeholder="Speak your Mind!"
 />  
  <div className="right-36 bottom-5 absolute">
 <label className="block text-2xl relative overflow-hidden float-left clear-left hover:scale-105  myFile edit-view block text-gray-900 dark:text-white" htmlFor="file_input">
 <p className="cursor-pointer"> 
 <FontAwesomeIcon 
   icon={faImage}
   width={20}
   />
   </p> 

 <div className="flex absolute top-0 right-0 w-24"> 
   <input
   size={80}
 className="absolute top-0 z-20 opacity-0 text-2xl text-text font-bold border-none rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
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
 <button type="submit" formAction={(e)=>commentAction(e, String(postData.id))}className="mx-2 rounded-full h-20 text-white p-4 text-lg bg-gray-800 block border-none  hover:text-pink-900 m-1" >Reply
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
 </div>
 } 
 
    {userActions?<LoginModal
    setUserActions={setUserActions} />: 
    <div className='[&_.share-view]:bg-white [&_.share-view]:px-6 [&_.share-view] [&_.share-view]:text-black'> 
    <ShareButtons  
    item={postData}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    /> 
     </div>} 

  </div> 

<section className='my-4'>
{rootComments && Number(rootComments.length )> 0 && 
 (
<div className=""> 
<AllComments 
post={post}
comment={{}}
commentObj={commentObj}
setCommentObj={setCommentObj}
comments={rootComments}  
commentsByParentId={commentsByParentId} 
show={show}
setShow={setShow} 
setEditId={setEditId}  
imgIndex={imgIndex}  
activeIdx={activeIdx}  
setActiveIdx={setActiveIdx}
 shareOptions={shareOptions}
 setShareOptions={setShareOptions}
 isEditingComment={isEditingComment}
 setIsEditingComment={setIsEditingComment}
 user={user}
 replyId={replyId}
 setReplyId={setReplyId}
 setActiveCommentReply={setActiveCommentReply}
 activeCommentReply={activeCommentReply} 
 likeCommAction={likeCommAction}
 commentCommAction={commentCommAction}
 setUserActions={setUserActions}
 userActions={userActions}
 postReply={postReply}
setPostReply={setPostReply} 
deleteCommAction={deleteCommAction}
selectedImages={selectedImages}
setSelectedImages={setSelectedImages}
/> 
</div>
  )} 
</section> 
   
</div>

</div>
</div>
 
{inView&& <p >Loading</p>}
 </>)
}

export default Post 