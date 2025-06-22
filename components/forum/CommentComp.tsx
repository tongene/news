 "use client"
import { useRouter } from 'next/navigation'
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment,  faDeleteLeft, faPencil, faShare,  faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import ShareButtons from '../ShareButtons'
import { dateFormatter } from '@/utils/dateformat'
import LoginModal from './LoginModal'
import { PostProps, SetCommentsProps } from '@/app/types' 
import { createClient } from '@/utils/supabase/client'

const CommentComp: React.FC<SetCommentsProps> = ({
post, 
user, 
setCommentObj,
comment,
show,
setShow ,
setEditId, 
imgIndex,
activeIdx,
setActiveIdx,
shareOptions,
setShareOptions,
setIsEditingComment,
isEditingComment, 
commentsByParentId,
replyId,
setReplyId,
setActiveCommentReply,
activeCommentReply,
commentObj,
likeCommAction, 
setUserActions,
userActions,
postReply,
setPostReply, 
commentCommAction,
deleteCommAction,
selectedImages,  
setSelectedImages
}) => {

const [deleteBtn,setDeleteBtn]=useState(false)
const [editBtn,setEditBtn]=useState(false)
const router= useRouter() 
const elRef = useRef<HTMLDivElement | null>(null);
const replyRef=useRef<HTMLDivElement | null>(null);
const [navDropper,setNavDropper]= useState(false) 
const dropperRef=useRef<HTMLDivElement | null>(null);
 const [showx,setShowx] = useState(false);
// function getReplies(parentId: number): InitialComments[] {
//   return commentsByParentId[parentId]
//   }
const childComments = commentsByParentId[comment?.id as number] || [];
const editting=()=>{ 
setEditBtn(false)
setCommentObj(comment)
setIsEditingComment(true)

}

const openEdit=(id:string|number )=>{
  setEditBtn(prev => !prev)
  setDeleteBtn(false)
  setActiveIdx(id);
  setShareOptions(false)
 
 }
//  useEffect(() => {
//   setScrolledComments(childComments)
//   // const newArray = [...scrolledComments.length+1, ...data];
//   // setCountComments(newArray.length);

// }, [comment]);

  const openDelete=(id:string|number )=>{
    setDeleteBtn(prev => !prev)
    setEditBtn(false)
    setShareOptions(false);
    setActiveIdx(id);
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
     setShowx(prev=>!prev)
     setCommentObj({})
  // setIsEditingComment(false)
  
 }

const showAll = (id:string|number ) => {
  if(!user){
    setUserActions(true)
 }else{
     setShareOptions(prev => !prev);
 }
  setActiveIdx(id);
  setDeleteBtn(false)
  setEditBtn(false)
};

useEffect(() => {
  const handler = (event: MouseEvent) => {
    if (!elRef.current) {
      return;
    }

 if (!elRef.current?.contains(event.target as Node)) {
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

 
function enlargeImgs(ix:number) {
// setImgIndex((comment.files??[])[ix])
 //imgRef.current?.scrollIntoView({ behavior: 'smooth',block: 'center'})
//   setImgZoom({
//   width:'200%',
//   height:'auto',
//   transition: "width 0.5s ease",

// }
//   )
 setShow(prev => !prev)
}

async function resetImg(imgs:PostProps,img:string ) {
  // setImgZoom({
  //   width:'100%',
  //   height:"160px",
  //   transition: "width 0.5s ease"
  // })
  const supabase= await createClient()
const updFiles=imgs?.files?.filter((ex)=> ex !==img)
const { data, error } = await supabase
.from('comments')
.update({ files: [...updFiles?? [] ] })
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
  // setNotify('Image Deleted')
  // const pt = scrolledPosts.filter((te)=> te.id!== imgs.id)
  // setScrolledPosts([...pt, ...data ] )
  // // setTimeout(
  //   () =>setNotify(''),
  //   2000
  // );
  router.refresh()
}
const [imgMode, setImgMode]=useState(false)
const [activeSlide,setActiveSlide] =useState(0)

const prevSlide=()=> {
  const slide =activeSlide - 1 < 0
    ?(comment?.files ??[]).length - 1
    :activeSlide -1;
    setActiveSlide(slide);

}
const nextSlide=()=> {
  const slide = activeSlide + 1 < (comment?.files ??[]).length
    ? activeSlide + 1
    : 0;
    setActiveSlide(slide);
}

const openImg =()=>{
  setImgMode(prev=>!prev)
}
const openImgDelete=(i:number)=>{
  setDeleteBtn(prev => !prev)
   setActiveIdx(i);
}

useEffect(() => {
const handler = (event:MouseEvent) => {
if (!dropperRef.current) {
        return;
 }
      if (!dropperRef.current.contains(event.target as Node)) {
        setNavDropper(false);
        setCommentObj({})
        
      }

    };
      document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };

  }, [navDropper,setCommentObj]);

//  const editAction=()=>{
//   setNavDropper(false)
//   setCommentObj()

// }

useEffect(() => {
  const handler = (event:MouseEvent) => {
    if (!replyRef.current) {
      return;
    }

    if (!replyRef.current.contains(event.target as Node)) {
   setCommentObj({})

    }

  };
    document.addEventListener("click", handler, true);

  return () => {
    document.removeEventListener("click", handler);
  };

}, [ setCommentObj])

const childOpen=()=>{
setShowx(prev=>!prev)
//  if(comment.parent_id !== null && childComments?.length>1){ 
//  router.push(`/forum/comment/${childComments[0].parent_id}`)
//  } 
if(comment.parent_id !== null&& childComments?.length >=2){
  router.push(`/forum/comment/${childComments[0].parent_id}/`)
  }
  if(comment.parent_id === null){ 
    router.push(`/forum/comment/${comment.id}/`)
    } 
}
 
 return (
 <>
 {userActions &&<LoginModal setUserActions={setUserActions}/>}
 <div className='max-w-2xl px-2 m-auto my-2'>
  <div className='border'> 
  <div className="h-max flex">
{comment.avatar_url&& <Link href={`/profile/${comment?.user_id}/`}><Image
src={comment.avatar_url}
width={50}
height={50}
className='rounded-full p-4 w-20 max-w-64'
alt={comment.user_name as string}/></Link> }
 {!comment.avatar_url&& <Link href={`/profile/${comment?.user_id}/`}><Image
src='/assets/images/placeholderimg.png'
width={50}
height={50}
className='rounded-full p-4 w-20 max-w-64'
alt={comment.user_name as string}/></Link> }
<p className="text-xl font-bold my-2 mt-11 w-32 overflow-hidden text-ellipsis xs:w-full"><Link href={`/profile/${comment.user_id}/`}>{comment.user_name||comment.user_email}</Link></p>
</div>

 <div className='p-3'><Link href={`/forum/comment/${comment.id}/`}>
 <p className='text-md leading-relaxed cursor-pointer pb-3 hover:text-gray-500'>
 {comment.title}</p></Link>
 
<small className="my-3">
 {comment?.created_at&&dateFormatter?.format(new Date(String(comment?.created_at)))}
 </small>
 </div>
 
<div className="">
 <div className='m-5'>
{comment.files?.map((xy:string, ix:number)=>ix === activeSlide &&
<div className={imgMode? 'fixed z-10 bg-gray-800 bg-opacity-80 h-full flex justify-center items-center left-0 top-0 w-full': 'mx-1 scroll-smooth text-center cursor-pointer'} key={xy + ' '+ comment.title}>

 <div className="flex justify-center">
{imgMode&&<p onClick={prevSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'>
<FontAwesomeIcon icon={faAngleLeft}/></p>}
<div className={!imgMode? 'w-1/2': 'w-full'}>
<Image
onClick={openImg}
src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}${xy}`}
width={600}
height={600}
className='animate-in cursor-pointer rounded-lg mx-1 my-2 border-2 border-gray-300'
alt={comment.title as string}
/>
<p className='p-1 text-sm dark:text-white mt-1 hover:scale-105 hover:opacity-80'>+ {(comment.files??[])?.length-1} </p>
 </div>
 {imgMode&&<p onClick={nextSlide} className='flex items-center text-4xl px-4 text-center text-white opacity-70 cursor-pointer'>
 <FontAwesomeIcon icon={faAngleRight}/> </p>}

 </div>

  {show&&
<>
{!deleteBtn && <span onClick={()=>openImgDelete(ix)} className={imgIndex===xy?'absolute top-4 text-gray-700 text-xl rounded-full border bg-opacity-60 p-4 mt-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
{deleteBtn && activeIdx=== ix && <span className={imgIndex===xy?'absolute right-4 top-4 text-white text-center py-3 mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(post, xy)} >Delete Photo</span>} </> }
   </div>
)}

  </div>

<div className='dark:text-gray-400 font-bold flex justify-evenly items-center mt-4 w-full border'>
 <button onClick={()=>likeCommAction(comment)} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon
width={30}
icon={faThumbsUp} 
/>
<p >{comment.likes?.length }</p>
</button>
 <button onClick={commentReplier} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon
icon={faComment}
width={30}
rotation={180}/>
<p >{childComments?.length }</p>
{/* <p >{comment.comments?.filter((ex)=> ex === String(comment.id).length) }</p> */}
</button>

{user?.id=== comment.user_id ?
<>
<div className=""> 
   <button onClick={()=>openEdit(String(comment.id) )}className="flex hover:scale-105 focus:outline-none justify-between my-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faPencil} /></button>
 
   {editBtn&&activeIdx===String(comment.id) &&<button onClick={editting} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
   Edit</button>}
   </div>
<div>
     <button onClick={()=>openDelete(Number(comment.id))}className="flex hover:scale-105 focus:outline-none justify-between m-5 text-xl rounded-none p-1"><FontAwesomeIcon width={30}icon={faDeleteLeft} rotation={180} /></button>

     {deleteBtn&&activeIdx=== Number(comment.id) && <button onClick={()=>deleteCommAction(comment)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-48 z-10 bg-slate-900">
     Delete
   </button>}
</div>
</>
:'' }

<button onClick={()=>showAll(Number(comment.id))} className='flex hover:scale-105 focus:outline-none justify-between flex my-5 text-lg rounded-none p-1'>
<FontAwesomeIcon icon={faShare}
width={30} />
</button>

</div>

</div>

  </div>
 {userActions?<LoginModal
    setUserActions={setUserActions} />:
    <div className='[&_.share-view]:bg-white [&_.share-view]:px-6 [&_.share-view] [&_.share-view]:text-black'> 
    <ShareButtons
    item={comment}
    shareOptions={shareOptions}
    activeIdx={activeIdx}
    />
    </div> } 
<div>

 {activeCommentReply &&Number(replyId)=== Number(comment.id)&& (
 <div ref={elRef} className='text-center opacity-90 rounded-none p-2'>
  <CommentForm 
  comment={comment}
  commentObj={commentObj}
  setUserActions={setUserActions}
  user={user}  
  postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
  />
<p className='cursor-pointer'onClick={childOpen}>+ { childComments?.length} more</p> 
 
 </div>
 )}
 {isEditingComment &&commentObj?.id ===comment?.id&&(
  <div ref={elRef}>   
<CommentForm
comment={comment} 
commentObj={commentObj}
user={user}
setUserActions={setUserActions} 
postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
/>

</div>
  )}

 <div className={`${showx?"relative ml-4":''}`}>
 {showx &&
<div title="close" onClick={childOpen} className='absolute -left-3 bg-gray-200 w-0.5 h-full cursor-pointer'/> }
{childComments !== null
 && childComments.length<=2 
 &&showx&& 
 (
<div>
<AllComments
replyId={replyId}
setReplyId={setReplyId}
comment={comment}
setCommentObj={setCommentObj}
commentObj={commentObj}
comments={childComments}
post={post}
user={user}
show={show}
setEditId={setEditId}
setShow={setShow}
imgIndex={imgIndex}
shareOptions={shareOptions}
activeCommentReply={activeCommentReply}
setActiveCommentReply={setActiveCommentReply} 
commentsByParentId={commentsByParentId}
setShareOptions={setShareOptions}
activeIdx={activeIdx}
setActiveIdx={setActiveIdx}
setIsEditingComment={setIsEditingComment}
isEditingComment={isEditingComment}
likeCommAction={likeCommAction} 
setUserActions={setUserActions}
userActions={userActions} 
postReply={postReply}
setPostReply={setPostReply}
commentCommAction={commentCommAction}
deleteCommAction={deleteCommAction}
selectedImages={selectedImages}
setSelectedImages={setSelectedImages}
 />

 </div>
)} 
</div>
</div>
</div>
 </> )
}

export default CommentComp