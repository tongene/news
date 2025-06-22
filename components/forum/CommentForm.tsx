"use client"
import { useFormStatus } from "react-dom"; 
import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentProps} from "@/app/types"; 
import { type User } from "@supabase/supabase-js"; 
import { useState } from "react";
const CommentForm =({  
comment,
commentObj,
commentCommAction, 
}: {user:User, setUserActions:React.Dispatch<React.SetStateAction<boolean>>, comment:CommentProps,commentObj:CommentProps,setPostReply:React.Dispatch<React.SetStateAction<boolean>>,postReply:boolean,commentCommAction:Function})=>{ 
const { pending, action } = useFormStatus();
const isPending = pending && action 
const [selectedImages, setSelectedImages] = useState<string[]>([]);
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
<form className='animate-in flex relative justify-center items-center'>
<textarea
rows={6}
cols={70} 
name='title'
maxLength={550}
defaultValue={comment?.id===commentObj.id?comment?.title:''}
className='w-full resize-none bg-inherit p-5 leading-normal focus:outline-none border-2 rounded ' 
placeholder="Speak your Mind!"
/>  
<div className="right-36 bottom-5 absolute">
 <label className="block text-2xl relative overflow-hidden float-left clear-left hover:scale-105  myFile edit-view block text-gray-900 dark:text-white" htmlFor="file_input">
 <p className="cursor-pointer "> 
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

 <button type="submit" aria-disabled={pending} formAction={(e)=>commentCommAction(e, comment)} className="w-24 h-20 mx-2 cursor-pointer border-0 rounded-full bg-gray-600 text-white block border-none hover:text-pink-900 text-lg p-2" >
 {isPending ? 'Waiting' :commentObj?.id? 'Update' :'Reply'}
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
  </>
    )
} 

export default CommentForm
 