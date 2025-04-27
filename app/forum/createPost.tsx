'use client' 
import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "./submit-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { InitialPosts, PostProps, UserPostProps } from "../types";
import { createPost, postEdit } from "./actions/postsActions";
import { usePathname, useRouter } from "next/navigation";
import { type User } from '@supabase/supabase-js'
import { faClose } from "@fortawesome/free-solid-svg-icons";
interface SetPostProps {
  setPost: React.Dispatch<React.SetStateAction<PostProps>>; 
  post:PostProps
  val:string,
  titleX:string,
  setEditId:React.Dispatch<React.SetStateAction<string>>
  user: User | null, 
  scrolledPosts:InitialPosts[]| UserPostProps[]
  setUserActions:React.Dispatch<React.SetStateAction<boolean>>
  setScrolledPosts: React.Dispatch<React.SetStateAction<InitialPosts[]>> | React.Dispatch<React.SetStateAction<UserPostProps[]>>
  
} 
const CreateForm: React.FC<SetPostProps>= ({ scrolledPosts, setScrolledPosts, post, val, setPost, setUserActions, user, setEditId, titleX }) => {  
 const clearRef=useRef<HTMLFormElement | null>(null);
 const router = useRouter()
 const pathname= usePathname()
 const [selectedImages, setSelectedImages] = useState<string[]>([]);
 useEffect(() => { 
  if(val){
  const timeoutVal= setTimeout(()=>{
    clearRef.current?.reset(); 
  },2000)
  window.scrollTo({ top:800, behavior: "smooth" })
  return () => clearTimeout(timeoutVal); 
  }

}, [createPost, postEdit]);

const createAction= async(formData:FormData)=>{
if(!user){
setUserActions(true)
}else{ 
const data= await createPost(formData, titleX)   
const title = formData.get('title')

const slug=(title as string)?.trim()?.toLowerCase().replace(/ /g,"-")  
const pt = scrolledPosts.filter((jx)=> jx?.slug!== slug) 
setScrolledPosts([...pt, ...(data ?? [])])
selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
setSelectedImages([]); 
setPost({})
router.refresh()
if(!title) router.push(pathname+'?message=Please Enter a Title', {scroll:false})

if(titleX){
  router.push(`/forum/?topic=${titleX.replace(/ /g,"-")}`, {scroll:false}) 
}
  else{
router.push(pathname+'?message=Post Created', {scroll:false}) 
  }

 }
// window.scrollTo({ top:-1500, behavior: "smooth" })
}
 

const editAction= async(formData: FormData, post:PostProps|UserPostProps)=>{  
 const data= await postEdit(formData, post, titleX) 
 setPost({})
 setEditId('')
 const pt = scrolledPosts.filter((ex)=> ex.id !== post.id) 
 setScrolledPosts([...pt, ...(data ?? [])]) 
  router.refresh()  
  selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
  setSelectedImages([]); 

  if(titleX){
    router.push(`/forum/?topic=${titleX.replace(/ /g,"-")}`, {scroll:false}) 
  }
    else{
  router.push(pathname+'?message=Post Updated', {scroll:false}) 
    }
  
} 

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

  return (
<> 
<form className='relative bg-transparent' ref={clearRef}> 
<input  
type='text' 
name='title' 
readOnly={titleX?true:false}
className='post-view bg-inherit shadow-3xl focus:outline-none resize-none inherit border-none mt-1 w-full p-6 leading-normal text-gray-300 text-lg rounded'
placeholder="Give your story a short title"
defaultValue={ post?.article_title?.replace(/-/g, " ")||''||titleX&&titleX?.replace(/-/g, " ") }
 maxLength={400}
/>

<textarea 
rows={4}
cols={50}  
name='story'
maxLength={1000}
className='post-view shadow-3xl bg-inherit focus:outline-none resize-none inherit border-none mt-1 w-full p-6 leading-normal text-gray-300 text-lg rounded'
placeholder="Tell your story. . . !"
defaultValue={post?.story||''}
/>
<label className="myFile edit-view m-5 block text-2xl text-white" htmlFor="file_input">
<p className="cursor-pointer"> 
<FontAwesomeIcon 
  icon={faImage}
  />
  </p>
   
<div className="flex"> 
  <input
className="block top-0 right-0 opacity-0 absolute p-2 text-text font-bold border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
id=""
type="file"
name='files'
multiple 
accept="image/*,video/*"
 onChange={handleImageUpload}
/> 
</div>
</label>
<div className="flex my-5 flex-wrap text-white focus:outline-none dark:placeholder-gray-400">
  <div className="mx-2 ">
<input
className="p-1 rounded-lg cursor-pointer"
name="family"
  type="checkbox"
  />
  <label htmlFor="family" className="text-text font-bold mx-1">Family</label>
  </div>
 
  <div className="mx-2 my-1">
  <input
className="p-1 rounded-lg cursor-pointer "
name="work"
  type="checkbox"
  />
  <label htmlFor="work" className="text-text font-bold mx-1">Work</label> 
   </div>
   <div className="mx-2  my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer  "
name="entertainment" 
  type="checkbox"
  />
  <label htmlFor="entertainment" className="text-text font-bold mx-1 ">Entertainment</label>
  </div>
  <div className="mx-2 my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer"
name="school"
type="checkbox"
  />
  <label htmlFor="school" className="text-text font-bold mx-1">School</label>
  </div>
  <div className="mx-2  my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer "
  name="friends" 
  type="checkbox"
  />
  <label htmlFor="friends" className="text-text font-bold mx-1">Friends</label>
  </div>
  <div className="mx-2 my-1"> 
  <input
className="p-1 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
name="folktale" 
  type="checkbox"
  />
  <label htmlFor="folktale" className="text-text font-bold mx-1">Folktale</label>
  </div>
</div>
<div className='w-1/3 flex justify-center m-auto bg-slate-600 rounded-lg gap-2.5 btn-link'>  
{!post.id&&<SubmitButton     
formAction={createAction}
className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 "
pendingText="Sending ..."  
>
   Create 

</SubmitButton>
}
{post.id&&<SubmitButton     
formAction={(e)=> editAction(e, post) }
className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 "
pendingText="Sending ..."  
>
  Update 

</SubmitButton>}

</div> 

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
 </> 
  )
}

export default CreateForm 