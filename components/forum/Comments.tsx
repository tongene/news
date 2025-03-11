'use client' 
import {usePathname, useRouter, useSearchParams} from 'next/navigation'   
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import { useState,useEffect, useRef,useMemo } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faDeleteLeft, faPencil,faShare,faEllipsisVertical, faThumbsUp, faComment, faAngleDown, faAngleUp, faImage, faAngleLeft, faAngleRight, faClose } from '@fortawesome/free-solid-svg-icons' 
import Link from 'next/link' 
import Image from 'next/image' 
import ShareButtons from '../ShareButtons'
import { dateFormatter } from '@/utils/dateformat'
import moment from 'moment'
import { useInView } from 'react-intersection-observer' 
import LoginModal from './LoginModal'
import { createClient } from '@/utils/supabase/client' 
import Relevant from './Relevant'  
import Trends from './Trends'
import { CommentProps, InitialComments, InitialPosts, PostProps, RelatedProps, SetCommentXProps, TrendsProps } from '@/app/types'
import { createComment, deleteTag, postDelete, postLike, postTag } from '@/app/forum/actions/postsActions'
import { commentEdit, commentLike, createCxComment, deleteComment } from '@/app/forum/actions/loadComments'
import CreateForm from '@/app/forum/createPost'
import { type User } from '@supabase/supabase-js'
import FakeTrends from './FakeTrend'
import { FakeObj } from '@/app/data/trends'
let initialVal=""  
type TrendyProp={
  title:string
  
  }
function sortAscending(pb:InitialComments, pa:InitialComments){ 
  return (pb?.id ??0)-( pa?.id ??0);
 } 
 const CommentX = ({ trendX, post_comments, postData, user, comment, related, filteredTrends}:{trendX:TrendyProp[], post_comments:InitialComments[], postData:PostProps,user:User , comment:CommentProps, related:InitialPosts[], filteredTrends:FakeObj[]} )=>{ 
const [userActions,setUserActions]=useState(false)
const [locateItem, setLocateItem]=useState(false)
const [notify,setNotify]=useState('')
const [ post, setPost ]=useState({})
const [navDropper,setNavDropper]= useState(false)
const [editId,setEditId]=useState('')
const [imgMode, setImgMode]=useState(false)
const [commentImgMode, setCommentImgMode]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [deleteBtn,setDeleteBtn]=useState(false)
const [activeIdx,setActiveIdx]=useState<string | number>('') 
const [replyId,setReplyId]=useState('')  
const [scrolledPosts, setScrolledPosts]=useState<InitialPosts[]>([]) 
const [scrolledComments, setScrolledComments]=useState<InitialComments[]>([])
const [currentParent, setCurrentParent]=useState<InitialComments[]>([])
const [activeSlide,setActiveSlide] =useState(0) 
const [imgIndex,setImgIndex]= useState('')
const [isChildComment, setIsChildComment]= useState(false)
const [isEditingComment, setIsEditingComment] = useState(false) 
const [onIdx, setOnIdx]=useState(null)
const [editBtn,setEditBtn]=useState(false) 
const [postReply,setPostReply]=useState(false)
const [shareOptions,setShareOptions]=useState(false)
const [commentObj,setCommentObj]=useState<CommentProps>({})  
const [selectedImages, setSelectedImages] = useState<string[]>([]);
const [show, setShow] = useState(false);
const [activeCommentReply, setActiveCommentReply]=useState(false)
const dropperRef=useRef<HTMLDivElement | null>(null);
const replyRef=useRef<HTMLDivElement | null>(null);
const elRef=useRef<HTMLDivElement | null>(null);
 
const router = useRouter()   
const searchParams= useSearchParams(); 
const val = searchParams.get('message') as string;
const pathname = usePathname() 
useEffect(()=>{ 
  if(editId){ 
  setPost(postData)
  } 
  
   },[editId, post, setPost]) 
   useEffect(
    () => { 
      if(val !==''){
        router.push(pathname, {scroll:false}); 
        (window as any).posted='posted' 
        // setTimeout(()=>{
        //   clearRef.current?.reset();
        // },1000)
         
        }  
      
    
  },[val, searchParams, router ])

const editAction=()=>{
  setNavDropper(false)
  setEditId(postData?.id as string )
}
const handleOpen = (post:PostProps) => {
 // setOnIdx(post?.id);  
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
    setActiveIdx(id ); 
   setDeleteBtn(false)
   setEditBtn(false)
   setPostReply(false)
 }
const prevSlide=()=> { 
const slide =activeSlide - 1 < 0
? (postData.files??[]).filter((vx)=>!(vx as string)?.includes('undefined')).length - 1
:activeSlide -1;
setActiveSlide(slide);
}
const openImgDelete=(i:number)=>{
  setDeleteBtn(prev => !prev)  
   setActiveIdx(i);
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
const openCommentImg =()=>{
  setCommentImgMode(prev=>!prev)
  } 
  const commentReplier =()=>{ 
    if(!user){
      setUserActions(true) 
   }else{
    setActiveCommentReply(prev=> !prev)
   } 
    setReplyId(String(comment.id))
    setDeleteBtn(false)
    setEditBtn(false)
    setShareOptions(false);
   
   }
   const openEdit=(id:string|number )=>{
    setEditBtn(prev => !prev)
    setDeleteBtn(false)
    setActiveIdx(id);
    setShareOptions(false)
   }
   
   const editting=()=>{ 
    setEditBtn(false)
    setCommentObj(comment)
     setIsEditingComment(true) 
   // editingRef.current?.scrollIntoView()
    }
       const openDelete=(id:number)=>{
      setDeleteBtn(prev => !prev)
      setEditBtn(false)
      setShareOptions(false);
      setActiveIdx(id);
    }   
//     // const openDelete=(i)=>{
//     //   setDeleteBtn(prev => !prev)  
//     //   setActiveIdx(i);
//     // } 
 
   
  useEffect(() => { 
      const handler = (event:MouseEvent) => {
        if (!elRef.current) {
          return;
        }
    
     if (!(elRef.current)?.contains(event.target as Node)) {
      setCommentObj({});
      setIsEditingComment(false)
      setReplyId('')
      setActiveCommentReply(false)
      selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
        setSelectedImages([]); 
     }
    
      };
      
      document.addEventListener("click", handler, true);

      return () => {
        document.removeEventListener("click", handler);
      };
    
    }, []);
    useEffect(() => {
      const handler = (event: MouseEvent) => {
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
      
const commentsByChildId = useMemo(() => {
const groupParent: { [parent_id: number ]: InitialComments[] }  = {}
post_comments.forEach((xy)=>{
groupParent[xy?.parent_id as unknown as number] ||= []
groupParent[xy?.parent_id as unknown as number].push(xy)

}
 )
return groupParent
}, [post_comments]) 

const commentsByParentId = useMemo(() => {
  const groupParent: { [id: number ]: InitialComments[] } = {};
  post_comments.forEach((xy)=>{
    groupParent[xy?.id as unknown as number] ||= [] ;
    groupParent[xy?.id as unknown as number].push(xy);
  } )
    
  return groupParent;
}, [post_comments]); 

const childComments = commentsByChildId[comment.id as number] || []
//commentsByParentId[null as unknown as number] || []; 
 
useEffect(() => {
  if(childComments) {
      setScrolledComments([...scrolledComments,  ...childComments])
  } 
 
}, []); 

const tx = scrolledComments?.sort(sortAscending)
 
const likeAction= async(postx:PostProps)=>{
  if(!user){
    setUserActions(true)
  }else{ 
const data= await postLike(postx)
router.refresh()
router.push(pathname+'?message=Like Updated', {scroll:false})  
//createRef.current?.scrollIntoView()
}}

const commentAction= async(formData: FormData )=>{
  
  if(!user){
    setUserActions(true)
  }else{      
  const data= await createComment(formData, String(postData.id) , null)
   setPostReply(false); 
      router.refresh() 
      router.push(`/forum/post/${postData.slug}/${postData.id}`,{ scroll:false}) 
      selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));  
      setSelectedImages([]);  
  
}}

const tagAction =async (postx:PostProps , tagToDelete:string)=>{
  await postTag(postx, tagToDelete) 
  router.refresh()
    //router.push(`/forum/post/${postx.slug}/${postx.id}`,{ scroll:false}) 
  }
       
      const deleteTagAction=async (post:PostProps, tagToDelete:string)=>{
       await deleteTag(post,tagToDelete)
       router.refresh()
      }

const deletePostAction=async (postid:string)=>{
   await postDelete(postid) 
   router.push('/forum')
    }
    const likeCommAction= async(commentx:CommentProps )=>{
      // deleteCommAction:Function, likeCommAction:Function
      if(!user){
        setUserActions(true)
      }else{ 
     const data= await commentLike(commentx) ?? []
     router.refresh()
    const pt = scrolledComments?.filter((te )=> te.id !== commentx.id) 
    setScrolledComments([...pt, ...(data ?? [])]); 
    //setScrolledComments( pt.concat(data)); 
     
    } 
    
    } 
 
    const commentCommAction= async(formData: FormData, commentx:CommentProps ) =>{
 
      if(!user){
        setUserActions(true)
      }else{
       
          if(commentObj?.id){
          const data= await commentEdit(formData,  commentx)
           const pt = scrolledComments.filter((te)=> String(te?.id) !== String(commentx.id)) 
           setIsEditingComment(false) 
           router.refresh() 
           if(comment.id !==commentx.id){
            setScrolledComments([...pt, ...data??[]]) 
            }
           
        selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
        setSelectedImages([]); 
       } 
        else {  
        const data= await createCxComment(formData, commentx.post_id as string, String(commentx.id)) 
          setPostReply(false);
          router.refresh() 
 
         if(comment.id ===commentx.id){
         setScrolledComments([...scrolledComments, ...data??[]]) 
         } 

          selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
          setSelectedImages([]); 
      }
    }}
     
    const deleteCommAction=async (comment:CommentProps)=>{
      await deleteComment(comment, scrolledComments) 
      
       const pt = scrolledComments.filter((te)=> String(te.id)!== String(comment.id)) 
       
       setScrolledComments(pt ) 
       router.refresh()
      // //  const comms = scrolledComments.filter((te)=> te.id!== comment.id)  
      // //  setScrolledComments(comms) 
      if(!comment.parent_id)return router.back()
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
      
        setTimeout(
          () =>setNotify(''),  
          2000 
        );
        router.refresh()
      }
    
const fetchParent = async()=>{
  if(!comment.parent_id)return
       const parent_Comment = commentsByParentId[comment.parent_id as unknown as number] || [];       
        const [id]=parent_Comment 
        setCurrentParent(parent_Comment) 
       router.push(`/forum/comment/${id?.id}`, {scroll:false})  
 }  
 
 
  return( 
    <> 
 {userActions &&<LoginModal setUserActions={setUserActions}  />} 
<div className='flex justify-between relative'> 
<p onClick={() => router.back()}><FontAwesomeIcon icon={faChevronLeft}width={50} className="text-lg hover:scale-125 my-8 opacity-80 border p-3 m-2 cursor-pointer"/></p> 

</div>
<div className='w-full flex items-center justify-center'> {notify&&<p className="m-auto fixed z-10 top-0 bg-green-500 border-2 text-center text-white p-3 text-xl">{notify}</p>}</div>
 
 <div className='lg:flex justify-center max-w-6xl m-auto px-4'> 
 
 {navDropper?
 (<div ref={dropperRef} className="relative">  
 { postData?.user_id=== user?.id?
 <div className='p-2 absolute text-white text-center z-10 py-3 left-96 text-md rounded-none shadow-4xl p-3 border w-56 bg-slate-900 top-48'> 

 <div className='flex justify-between text-xl p-2 cursor-pointer'><FontAwesomeIcon icon={faDeleteLeft}width={20} /><p onClick={()=> deletePostAction(postData.id as string) }>Delete</p></div>

 <div className='flex justify-between text-xl p-2 cursor-pointer' onClick={editAction}><FontAwesomeIcon icon={faPencil} /><p>Edit</p> 
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

<div>
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
<div className='relative ' >
<small className="my-4">
{moment(postData.created_at, "YYYYMMDD").fromNow() }  
</small> 
<Link href={`/forum/post/${postData.slug}/${postData.id}`}><h3 className='text-2xl p-3 underline text-center capitalize'>{postData?.title ||postData?.article_title?.replace(/-/g, ' ') } </h3> </Link>
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
 <div className="flex flex-wrap text-md m-3"> 
{postData?.tags?.map((xy, vi)=>
xy.split(',').map((ex, xi)=> ex&&
<div className="flex mx-1 my-4" key={xi}>
<Link href={`/search/?searchVal=${ex.replace('#', '')}`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>

  {postData.user_id === user.id && <small className="p-2 hover:bg-gray-400 cursor-pointer" onClick={()=>deleteTagAction(postData, ex)}>x</small>} 
</div> ))} 
 
</div> 
<hr/>
<div className="flex flex-wrap w-3/4 mx-3 my-4" > 
{user?.id=== postData.user_id && <small className="text-lg dark:text-white text-gray-800 cursor-pointer mx-2 text-center mx-2">Suggested Tags:</small> }
 
 {user?.id=== postData.user_id && (postData.suggested_tags??[]).length !== 0&&
postData?.suggested_tags?.map((ex, xi)=>    
<div className="flex text-sm" key={ex + ' ' + xi}>
  
 <div className="flex w-full flex-wrap overflow-hidden "> 
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
{postData.files?.filter((vx)=>!(vx as string)?.includes('undefined'))?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full ':' mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ postData.title}>
  
 <div className="flex"> 
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
<div className=''>
<Image 
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${xy}`}  
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
 {/* <=2  */}
  {show&&
<> 
{!deleteBtn && <span onClick={()=>openImgDelete(ix)} className={imgIndex===xy?'absolute top-4 text-gray-700 text-xl rounded-full border bg-opacity-60 p-4 mt-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
{deleteBtn&&activeIdx=== ix && <span className={imgIndex===xy?'absolute right-4 top-4 text-white text-center py-3 mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(post, xy)} >Delete Photo</span>} </> }  
   </div>
)}
   
  </div>

</div>: 
  
<div ref={replyRef} className='p-2 [&_.post-view]:shadow-none [&_.btn-link]:w-1/4 [&_.btn-link]:m-auto [&_.post-view]:text-lg [&_.post-view]:border-gray-900 [&_.post-view]:bg-transparent [&_.edit-view]:bg-black [&_.edit-view]:p-1 [&_.edit-view]:border-slate-900 [&_.edit-view]:border-2'>
<CreateForm post={postData} setPost={setPost} scrolledPosts={scrolledPosts} setScrolledPosts={setScrolledPosts} val={val} setUserActions={setUserActions} user={user} setEditId={setEditId} titleX=''/>  
</div> 
} 
<hr/>
 <div className=" flex justify-evenly mt-4 w-full m-auto my-2">  
 <button onClick={()=>likeAction(postData)}className="hover:scale-105 relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
 <FontAwesomeIcon icon={faThumbsUp} width={25}/>
 <p className="px-1 ">{postData?.likes?.length}</p> 
 </button>  
 <div> 
 <button onClick={()=>handleOpen(postData)} className="hover:scale-105 relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
 <FontAwesomeIcon width={25}icon={faComment}rotation={180}/>
 <p className="px-1 ">{(postData.comments??[]).length}</p>
 </button>
   
 </div> 
 
 <div>
 <button onClick={()=>showAll(postData.id as number)} className="m-1 text-lg rounded-none p-1 hover:scale-105"> 
 <FontAwesomeIcon width={25}icon={faShare}  
 />
 </button>   
 </div>  
 
 </div>
 <hr/>
 {postReply &&
   <div className="text-center" ref={elRef} > 
 <form className='relative animate-in flex justify-center items-center' >  
 <textarea
 rows={6} 
 cols={400}
 name='title' 
 className='resize-none border pt-4 resize-none bg-inherit m-3 text-md leading-normal hover:bg-transparent rounded-b-sm focus:outline-none px-2' 
 placeholder="Speak your Mind!"
 />  
 <div className='right-36 bottom-5 absolute'>
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
 <button type="submit" formAction={(e)=>commentAction(e)}className="mx-2 rounded-full h-20 text-white p-4 text-lg bg-gray-800 block border-none hover:text-pink-900 m-1" >Reply
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
    <ShareButtons  
    item={postData}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    /> }

  </div> 

  <div className='max-w-2xl px-2 m-auto my-2'> 
  <div className={!comment.parent_id?'text-gray-400 p-5 cursor-auto opacity-90 text-sm':'p-5 cursor-pointer opacity-90 text-sm hover:text-gray-400'} onClick={fetchParent} >Show Leading Comments</div>
  <div className="relative ml-6">  
<div title="close" className={!comment.parent_id?'':'absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'}/>  
  <div className='border '> 
  <div className="h-max flex">
{comment.avatar_url&& <Link href={`/profile/${comment?.user_id}`}><Image
src={comment.avatar_url}
width={50}
height={50}
className='rounded-full p-4 w-20 max-w-64'
alt={comment.user_name as string}/></Link> }
 {!comment.avatar_url&& <Link href={`/profile/${comment?.user_id}`}><Image
src='/assets/images/placeholderimg.png'
width={50}
height={50}
className='rounded-full p-4 w-20 max-w-64'
alt={comment.user_name as string}/></Link> }
<p className="text-xl font-bold my-2 mt-11 w-32 overflow-hidden text-ellipsis xs:w-full"><Link href={`/profile/${comment.user_id}`}>{comment.user_name||comment.user_email}</Link></p>
</div>

 <div className='p-3'><Link href={`/forum/comment/${comment.id}`}>
<p className='text-md leading-relaxed cursor-pointer pb-3 hover:text-gray-300'>
 {comment.title} </p></Link>
<small className="my-3">
 {dateFormatter?.format(new Date(comment?.created_at as Date))}

 </small>
 </div>
<div className="">
 <div className='m-5'> 
{Number(comment.files?.length) > 0 && comment.files?.map((xy, ix)=>ix === activeSlide && xy&&
<div className={commentImgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full': 'mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ comment.title}>
 <div className="flex justify-center"> 
{commentImgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
<FontAwesomeIcon icon={faAngleLeft}/> </p>}
 <div className={!commentImgMode? 'w-1/2': 'w-full'}>
<Image 
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${xy}`}  
width={600}
onClick={openCommentImg}
height={600} 
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={comment.title as string}
/>
<p className='p-1 text-sm text-white mt-1 hover:scale-105 hover:opacity-80'>+ {Number(comment.files?.length)-1} </p>
 </div>  
 {commentImgMode&&<p onClick={nextSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'> 
 <FontAwesomeIcon icon={faAngleRight}/> </p>}

 </div>  
 
  {show&&<> 
{!deleteBtn && <span onClick={()=>openImgDelete(ix)} className={imgIndex===xy?'absolute top-4 text-gray-700 text-xl rounded-full border bg-opacity-60 p-4 mt-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
{deleteBtn&&activeIdx=== ix && <span className={imgIndex===xy?'absolute right-4 top-4 text-white text-center py-3 mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(post, xy)} >Delete Photo</span>} </> }  
   </div>
)}
   
  </div>  

  <div className='dark:text-gray-400 font-bold flex justify-evenly items-center mt-4 w-full border'>
  
 <button onClick={()=>likeCommAction(comment)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
width={30}
icon={faThumbsUp}
/>
<p >{comment.likes?.length}</p>  
</button>  
 <button onClick={commentReplier} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon 
icon={faComment} 
width={30}
rotation={180}/>
<p >{childComments?.length ||0}</p> 
</button>  

{user?.id=== comment.user_id ?
<>  
<div className="">
   <button onClick={()=>openEdit(comment.id as number|string )}className="flex hover:scale-105 focus:outline-none justify-between my-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faPencil} /></button>
 
   {editBtn&&activeIdx=== comment.id &&<button onClick={editting} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
   Edit</button>} 
   </div>
<div>
     <button onClick={()=>openDelete(comment.id as number )}className="flex hover:scale-105 focus:outline-none justify-between m-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faDeleteLeft} rotation={180} /></button>
   
     {deleteBtn&&activeIdx=== comment.id && <button onClick={()=>deleteCommAction(comment)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
     Delete
   </button>}
</div> 
</> 
:'' }

<button onClick={()=>showAll(comment.id as number)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon icon={faShare}  
width={30} />
</button>  

</div> 
 
</div> 

  </div>
  {userActions?<LoginModal 
    setUserActions={setUserActions} />: 
    <ShareButtons  
    item={comment}
    shareOptions={shareOptions}
    activeIdx={activeIdx}  
    /> }  
<div>  
 {activeCommentReply &&Number(replyId)=== Number(comment.id)&& (
 <div ref={elRef} className='text-center opacity-90 text-sm rounded-none p-2'>  
  <CommentForm 
  comment={comment}
  commentObj={commentObj}
  setUserActions={setUserActions}
  user={user}  
  postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
  />

 </div> 
 )}
  {isEditingComment &&comment?.id ===commentObj?.id&&(  
 <div ref={elRef}>
<CommentForm 
  comment={comment}
  commentObj={commentObj}
  setUserActions={setUserActions}
  user={user}  
  postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
/>

</div>
  )} 
  
{childComments !== null 
 && childComments?.length <=2  
 && isChildComment&& 
 (
<> 
<AllComments  
replyId={replyId}
setReplyId={setReplyId} 
commentObj={commentObj}
setCommentObj={setCommentObj}  
post={post}
comment={{}}
imgIndex={imgIndex}  
comments={childComments}  
show={show}
setShow={setShow} 
user={user}
setEditId={setEditId} 
userActions={userActions}
likeCommAction={likeCommAction}
setUserActions={setUserActions}
deleteCommAction={deleteCommAction}
shareOptions={shareOptions} 
activeCommentReply={activeCommentReply}
setActiveCommentReply={setActiveCommentReply} 
 
commentsByParentId={commentsByParentId}
setShareOptions={setShareOptions}
activeIdx={activeIdx}  
setActiveIdx={setActiveIdx}
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
commentCommAction={commentCommAction}
postReply={postReply}
setPostReply={setPostReply} 
selectedImages={selectedImages}
setSelectedImages={setSelectedImages}
 /> 

 </> 
)} 

</div> 
</div> 
    </div> 

<section className='my-4'>
{tx && tx.length > 0 && 
 (
<div className="relative left-14 max-w-xl m-auto" > 
<div className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer' /> 
<AllComments
user={user}
post={post}
comment={{}}
commentObj={commentObj} 
setCommentObj={setCommentObj} 
comments={tx}    
commentsByParentId={commentsByChildId} 
 
activeIdx={activeIdx}
setActiveIdx={setActiveIdx} 
shareOptions={shareOptions}
setShareOptions={setShareOptions} 
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment} 
show={show}
setShow={setShow} 
setEditId={setEditId}  
imgIndex={imgIndex}   
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
</div> 
    </>
  )
 }
export default CommentX

