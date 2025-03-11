'use client'
import React, { useState,useEffect, useRef, useCallback} from "react";  
import { Concert_One, Playfair, Bellota_Text,  Merriweather, Courgette, Sacramento , Monoton} from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom"; 
import Avatar from "./Avatar";
import {faDeleteLeft, faPencil, faThumbsUp, faShare,faImage, faComment, faEllipsisVertical,faFilePen, faUser, faHouse, faTrash, faUpload, faAngleDown, faAngleUp, faClose } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser"; 
import CreateForm from "@/app/forum/createPost"; 
import { createClient } from "@/utils/supabase/client";
import LoginModal from "./forum/LoginModal";
import ShareButtons from "./ShareButtons"; 
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { createComment, deleteTag, getUserPosts, postDelete, postLike, postTag } from "@/app/forum/actions/postsActions";
import { deleteProfile, updateProfile  } from "@/app/profile/profileActions";
import { type User } from "@supabase/supabase-js";
import { UserPostProps } from "@/app/types";
type UserDataProps={ 
  avatar_url:string, 
  email:string,  
  education:string,
  address:string,
  password:string,
  website:string,
  fullname:string,
  about:string
  full_name:string,
  username:string
}



const monoton =Monoton({
  subsets:['latin'], 
   weight:'400',
   display: 'swap', 
   })
const concert =Concert_One({
  subsets:['latin'], 
   weight:'400',
   display: 'swap', 
   })


const play =Playfair({
subsets:['latin'], 
weight:'400',
display: 'swap', 
}) 
 
 const meri =Merriweather({
subsets:['latin'], 
 weight:['400'],
 display: 'swap', 
 })
const curgette =Courgette({
subsets:['latin'], 
 weight:['400'],
 display: 'swap', 
 })

const sacramento =Sacramento({
subsets:['latin'], 
weight:['400'],
display: 'swap', 
}) 
const bellota =Bellota_Text({
subsets:['latin'], 
weight:['300', '400', '700'],
display: 'swap', 
})   
function sortAscending(pb:UserPostProps, pa:UserPostProps){ 
  return (  Number(pb?.id )-Number(pa?.id)) 
 }
 
const Profile = ({  
userPosts,
user,
profile 
   
}:{userPosts:UserPostProps[], user: User, profile:{user:{id:string}, avatar_url:string , email:string, education:string,address:string, password:string, website:string, fullname:string, about:string,full_name:string, username:string }}) => {
const [showInput, setShowInput]= useState(false)
const [imgHandle, setImgHandle]=useState('') 
const btnRef =useRef(null) 
const [profileUpdater, setProfileUpdater]=useState(false) 
const supabase = createClient()
const [uploading, setUploading] = useState(false) 
const [loading, setLoading] = useState(true)
const [userProfile,setUserProfile]=useState<UserDataProps>({
  avatar_url: "",
  email: "",
  education: "",
  address: "",
  password: "",
  website: "",
  fullname: "",
  about: "",
  full_name: "",
  username: ""
}) 
const [avatar_url, setAvatarUrl] = useState(null)
const [password, setPassword] = useState(null)
const { pending, action } = useFormStatus();
const [editId,setEditId]=useState('') 
const [userActions,setUserActions]=useState(false) 
const [scrolledPosts,setScrolledPosts]=useState<UserPostProps[]>([])
const [scrolledComments,setScrolledComments]=useState([])
const [shareOptions,setShareOptions]=useState(false)
const [notify,setNotify]=useState('')
const [imgZoom,setImgZoom]=useState({})
const [show, setShow] = useState(false); 
const [imgIndex,setImgIndex]= useState('')  
const [activeIdx,setActiveIdx]=useState<string|number>('')  
const [post,setPost]= useState({})
const [showIndex, setShowIndex]= useState(0)
const [onIdx, setOnIdx]=useState<string|number>('') 
const [editBtn, setEditBtn]=useState(false)
const [showSuggestion, setShowSuggestion]=useState(false)
const [deleteBtn,setDeleteBtn]=useState(false) 
const [activeReply,setActiveReply]=useState<boolean>(false)
const [openNav,setOpenNav]= useState(false)
const [selectedImages, setSelectedImages] = useState<string[]>([]);
const router = useRouter()
const dropperRef=useRef<HTMLDivElement | null>(null)
const uploadRef = useRef<HTMLDivElement | null>(null)
const updaterRef=useRef<HTMLDivElement | null>(null)
const createRef=useRef<HTMLDivElement | null>(null)
const imgRef = useRef<HTMLDivElement | null>(null);
const pathname = usePathname() 
const editingRef=useRef<HTMLDivElement | null>(null)
const searchParams= useSearchParams();
const val = searchParams.get('message') as string;
const {id} = useParams()
const elRef=useRef<HTMLDivElement | null>(null);
const { ref, inView } = useInView()
const isPending = pending && action 
 
   const [count,setCount]=useState(2) 
   const [startScroll, setStartScroll]=useState(3)
const [chosenFont, setChosenFont]=useState<string>('')
const [showFont, setShowFont]=useState(false)
const font_x =[play, bellota, concert, meri, curgette, sacramento, monoton]
const font_y =[ "play", "bellota", "concert", "meri" , "courgette","sacramento", "monoton"]

const chooseFont =(i:number)=>{
setChosenFont( font_x[i]?.className )
localStorage.setItem('font_choice', font_x[i]?.className )
setShowFont(false) 
} 
    useEffect(()=>{
   const font= localStorage?.getItem('font_choice') as string
   setChosenFont(font) 
    }, [])
    
useEffect(() => {
setScrolledPosts(userPosts)
}, []);  
const loadMorePosts = async () => {
const apiP = await getUserPosts(startScroll, startScroll + 1, (id as string)) 
if(apiP){
setScrolledPosts(scrolledPosts?.concat(apiP))
}else return

setStartScroll((prev)=>prev + apiP?.length) 
setCount((prev)=>prev * apiP?.length) 

}
useEffect(() => { 
if (inView) {
loadMorePosts()   
}

}, [inView]) 
const postsSorted=scrolledPosts?.sort(sortAscending)
const getProfile = useCallback(async () => { 
try {
  setLoading(true) 
  setUserProfile({
    fullname: profile.full_name ,
    username: profile.full_name ,
     avatar_url:profile.avatar_url,
     education: profile.education ,
     website: profile.website ,
    address: profile.address ,
    password: profile.password,
    about: profile.about,
    email:profile.email,
    full_name: profile.full_name ,
  })

 
} catch (error) {
console.log('Error loading user data!')
} finally {
setLoading(false)
}
}, [profile,supabase])

useEffect(() => {
getProfile()
}, [profile,getProfile])
 
  const runUpdateOpen=()=>{
    setProfileUpdater(prev => !prev);   
    setOpenNav(false)
  }
  
  useEffect(() => {
    const handler = (event:MouseEvent) => {
      if (!dropperRef.current) {           
        return;
      }
     
      if (!dropperRef.current.contains(event.target as Node)) {
        setOpenNav(false);
      } 
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, []);

  useEffect(() => {
    const handler = (event:MouseEvent) => {
      if (!uploadRef.current) {           
        return;
      }
     
      if (!uploadRef.current.contains(event.target as Node)) {
        setShowInput(false);
      }    
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, [showInput]);


  useEffect(() => {
    const handler = (event:MouseEvent) => {
      if (!updaterRef.current) {           
        return;
      }
     
      if (!updaterRef.current.contains(event.target as Node)) {
        setProfileUpdater(false);          
       
      } 
    
 
    };
      document.addEventListener("click", handler, true);
   
    return () => {
      document.removeEventListener("click", handler);
    };
   
  }, [profileUpdater]);
 
  const handleMailsJS = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const serviceId = "culturays_12345";
    const templateId = "template_8rg34lq" 
    emailjs.init(process.env.EMAILJS_PUBLIC_API as string) 

    try {
       setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name:profile.full_name,
        recipient: profile.email, 
        user:user?.user_metadata?.full_name
      });
  
    } catch (error) {
      console.log(error);
    } finally {
        console.log('done')
          setNotify("Email successfully sent. Check your mail");
          setLoading(false);
    }
    setTimeout(
      () =>setNotify(''), 
      2000 
    );  
  }
 

 const uploadAvatar = async (event:React.ChangeEvent<HTMLInputElement>) => {
  try {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${user?.id}-${Math.random()}.${fileExt}`
    
     const { error: uploadError } = await supabase.storage.from('profile_avatars').upload(filePath, file)
    if (uploadError) {
      console.log(uploadError)
      throw uploadError
    }  
  
      setUserProfile({...userProfile, avatar_url:filePath})
       updateProfile({
      user, 
      fullname:userProfile.fullname, 
      username:userProfile.fullname, 
      avatar_url: filePath, 
      about:userProfile.about, 
       education:userProfile.education,
      address:userProfile.address,
      password:userProfile.password,
      website:userProfile.website,
      email:userProfile.email
    })
    
  } catch (error) {
   console.log('Error uploading avatar!', error)
  } finally { 
    setShowInput(prev=> !prev)
    setUploading(false)
  }
}
 
const update_user=async()=>{ 
  setLoading(true) 
    try {
      await updateProfile({
        user,
        avatar_url:userProfile.avatar_url, 
        email:userProfile.email, 
        education:userProfile.education,
        address:userProfile.address,
        password:userProfile.password,
        website:userProfile.website,
        fullname:userProfile.fullname,
        username:userProfile.username,
        about:userProfile.about, 
        
      })
    
   } catch (error) {
       console.log('Error updating the data!')
  } finally {
    setLoading(false)
    setProfileUpdater(false)
  }
  }
  const accountDelete =async()=>{
    await deleteProfile(user.id)
  }


      useEffect(() => {
        const handler = (event:MouseEvent) => {
        if ( !elRef.current) {
        return;
        } 
        if (!elRef.current.contains(event.target as Node)) { 
        setActiveReply(false)
        }
        
        };
        
        document.addEventListener("click", handler, true);
        
        return () => {
        document.removeEventListener("click", handler);
        };
        
        }, [setActiveReply]);

const openEdit=(id:string|number)=>{
  setEditBtn(prev => !prev)
  setDeleteBtn(false)
  setActiveIdx(id);
  setShareOptions(false)
}
  const openDelete=(id:string|number)=>{
    setDeleteBtn(prev => !prev)
    setEditBtn(false)
    setShareOptions(false);
    setActiveIdx(id);
  } 
const editting=(p:UserPostProps)=>{ 
setPost(p)  
editingRef.current?.scrollIntoView()
}
const likeAction= async(postx:UserPostProps)=>{
  if(!user){
    setUserActions(true)
  }else{ 
const data= await postLike(postx)
const pt = scrolledPosts.filter((te)=> te.id !== postx.id) 
setScrolledPosts([...pt, ...(data ?? [])]);
router.refresh()
router.push(pathname+'?message=Like Updated', {scroll:false})  
//createRef.current?.scrollIntoView()
}}

const commentAction= async(formData: FormData, postId:string)=>{ 
  if(!user){
    setUserActions(true)
  }else{ 
    const data= await createComment(formData,postId,null)   
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
      setScrolledPosts(updatedPosts as UserPostProps[] ) ;
      router.refresh()
      /// router.push(pathname+'?message=Comment Created', {scroll:false})  
       //createRef.current?.scrollIntoView()
       selectedImages.forEach((imageUrl) => URL.revokeObjectURL(imageUrl)); 
       setSelectedImages([]); 
      
}} 
    
    const tagAction =async (postx:UserPostProps , tagToDelete:string)=>{
      const datax = await postTag(postx, tagToDelete)
      const pt = scrolledPosts.filter((ex)=> ex.id !== postx.id) 
      setScrolledPosts(pt.concat(datax?.data as [])) 
      router.refresh()
      //  if(data?.data?.includes(tagToDelete)){
//  const pt = scrolledPosts.filter((ex)=> ex.id !== postx.id) 
//       setScrolledPosts([...pt.concat( data?.updTags as [])]) ;
//       router.refresh()
      // }
   
     const ptData = scrolledPosts.filter((ex)=> ex.id !== postx.id)  
    setScrolledPosts(ptData.concat(datax?.updateData as [])) 
    router.refresh() 
    }

    const deleteTagAction=async (post:UserPostProps, tagToDelete:string)=>{
     const tagxData=  await deleteTag(post,tagToDelete)
    const pt = scrolledPosts.filter((ex)=> String(ex.id) !== String(post.id))  
    setScrolledPosts([...pt, ...tagxData ??[]])
    router.refresh()
    }


const deletePostAction=async (id_:string| number )=>{
   await postDelete(id_) 
    const pt = scrolledPosts.filter((te)=> String(te.id)!== String(id_)) 
    setScrolledPosts(pt )
    setDeleteBtn(false)
    router.refresh()
    }
      
 const changeIndex = (i:number) => {
          setShowSuggestion(true)
          setShowIndex(i)
          if(showSuggestion && showIndex=== i){
          setShowSuggestion(false)  
           
          } 
         
        };
        const handleOpen = (post:UserPostProps) => { 
          setOnIdx(post?.id);  
          setShareOptions(false);
          if(!user){
           setUserActions(true) 
        }else{
         setActiveReply(true);
        } 
        }
        
        const showAll = (id:number|string) => {  
          setActiveIdx(id);
          setEditBtn(false)
          setDeleteBtn(false)
          if(!user){
             setUserActions(true) 
          }else{
              setShareOptions(prev => !prev);
          } 
        
        }

        
        useEffect(
          () => { 
            if(val !==''){
              router.push(pathname, {scroll:false}); 
              (window as any).posted='posted' 
            
               
              }  
            
          
        },[val, searchParams, router ])


      async function resetImg(imgs:UserPostProps,img:string) {
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
        setTimeout(
          () =>setNotify(''),  
          2000 
        );
        router.refresh()
      }
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
      const [showPro, setShowPro]=useState(false)
     const openx=()=>{
      setShowPro(prev =>!prev )
      
     }
     function handleDragStart(ev: React.DragEvent<HTMLDivElement>) {
      ev.dataTransfer.setData("text", ev.currentTarget.id);
    }
  
    function drop(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      const draggedElement = document.getElementById(data);
      
      if (draggedElement && ev.target instanceof HTMLElement) {
        ev.target.appendChild(draggedElement);
      }
    }
  
    function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
    }
    
 return (  
  <> 
 <div className="flex justify-center "> 
    {notify&&<p className=" fixed top-0 bg-green-500 border-2 text-center text-white p-5 text-xl">{notify}</p>}
  </div>
  {showInput&& 
    <div className="w-full fixed top-0 z-50 h-full flex items-center justify-center bg-gray-800 bg-opacity-70" >
    <div ref={uploadRef}className="w-full m-11 lg:w-2/5 h-2/5 p-2 bg-white rounded-8 shadow-2xl flex flex-col items-center justify-center" >
      <div style={{ width: 150 }} className="text-center w-1/2 p-2 relative cursor-pointer">
      <div className="border-4 p-5"> 
        <FontAwesomeIcon icon={faUpload} className="text-gray-700" />           
        <label className="button primary block text-lg cursor-pointer" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        </div>
        <input
         className="absolute top-11 h-1/4 opacity-0 bottom-0 w-full cursor-pointer"
          // style={{
          //   visibility: 'hidden',
          //   position: 'absolute',
          // }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div> 
    </div>   
 }
 
 <div className="relative top-96 mx-2" ref={updaterRef}> 
  {profileUpdater?( 

  <div className="absolute w-max z-40 px-8 shadow-2xl mx-2 bg-gray-500 rounded py-6 top-0"> 
<div className="p-1 text-xl m-1 flex justify-center text-gray-300">
<label htmlFor="email" className="m-1 p-3">Email:</label>
<input id="email" type="text" className="bg-transparent m-1" value={user?.email} disabled />
</div>
<div className="p-1 text-xl m-1 flex justify-center ">
<label htmlFor="fullname" className="m-1 p-3 text-gray-300">Full Name:</label>
<input
  id="fullname"
  type="text"
  name='fullname'
  className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
  defaultValue={userProfile.fullname}
  onChange={(e) => setUserProfile({...userProfile, fullname:e.target.value})}
/>
</div>

<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="password" className="m-1 text-gray-300 p-3">Password:</label>
<input
id="password"
type="password"
className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
defaultValue={userProfile.password}
onChange={(e) => setUserProfile({...userProfile, password:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="address" className="m-1 text-gray-300 px-3">Address:</label>
<input
id="address"
type="address"
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600" 
defaultValue={userProfile.address}
onChange={(e) => setUserProfile({...userProfile, address:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="education" className="m-1 text-gray-300 px-3">Education:</label>
<input
id="education"
type="text"
className="bg-gray-300 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600"  
defaultValue={userProfile.education}
onChange={(e) => setUserProfile({...userProfile, education:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="website" className="m-1 text-gray-300 px-3">Website:</label>
<input
id="website"
type="url"
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600"  
defaultValue={userProfile.website}
onChange={(e) => setUserProfile({...userProfile, website:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 flex justify-center">
<label htmlFor="website" className="m-1 text-gray-300 px-3">About:</label>
<textarea
id="about" 
rows={6}
cols={30}
className="bg-gray-300 m-1 mx-5 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-600 resize-none"  
defaultValue={userProfile.about}
onChange={(e) => setUserProfile({...userProfile, about:e.target.value})}
/>
</div>
<div className="p-1 text-xl m-1 ">
<button
className="button primary block bg-gray-600 m-1 p-4 bg-opacity-90 rounded border-0 focus:outline-none hover:opacity-80 text-gray-200"
onClick={update_user}
disabled={loading}
>
{loading ? 'Loading ...' : 'Update'}
</button>

</div>
</div>
): 
( 
  <div>
    <p onClick={openx}><FontAwesomeIcon icon={faClose} width={10} className="absolute z-50 cursor-pointer hover:scale-100" /> </p>  
 {!showPro&& <div className="absolute top-0" > 

 <div className="h-max px-3 leading-9 cursor-pointer max-w-xl z-30 bg-opacity-10 top-0 hover:text-gray-300 hover:bg-black hover:bg-opacity-60  bg-gray-900 about_shadow my-4" > 
  <h2 className="font-bold text-4xl text-center px-6 py-3">Profile</h2>
 <div  > 
    <p className="text-xl p-2">Education: {userProfile.education} </p>
  <p className="text-xl p-2">Website: {userProfile.website}</p>
  <p className="text-xl p-2 ">Address: {userProfile.address}</p>  
  <p className="text-xl p-2">About: { userProfile.about }</p>
   </div>    
  </div>
   </div>}  </div>
) }
 </div>
   <Avatar
   alternativeUrl={user.user_metadata.avatar_url}
url={userProfile.avatar_url}
size={150}
/> 
  
 <div className="relative ">  
 {user.id===id ?
  <div ref={dropperRef}className={!userProfile.avatar_url &&!user?.user_metadata.avatar_url?`absolute bottom-full cursor-pointer right-11 text-3xl text-gray-600 z-50`:'absolute bottom-full cursor-pointer right-11 text-3xl text-dark z-50'} onClick={()=>setOpenNav(prev=> !prev)}><FontAwesomeIcon icon={faEllipsisVertical} /> </div> :null} 

  <div className="absolute right-5 bg-transparent z-50" ref={dropperRef}>
   {openNav?
 (  <nav className='bg-gray-800'> 
    <Link href="/forum"><div className='flex justify-between text-lg p-3 text-white'><FontAwesomeIcon icon={faHouse} width={25} /><p className="mx-2">Home</p></div></Link>
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={()=> setShowInput(prev => !prev)}><FontAwesomeIcon icon={faImage}width={20} /><p className="mx-2">Change Photo</p></div> 
  <div className='flex justify-between text-lg p-3 mx-2 text-white cursor-pointer' onClick={accountDelete}><FontAwesomeIcon icon={faTrash}width={20} /><p className="mx-2">Delete Profile</p>
  </div>
  <div className='flex justify-between text-lg p-3 text-white cursor-pointer'onClick={runUpdateOpen}><FontAwesomeIcon icon={faPencil}width={20} /><p className="mx-2">Edit Profile</p>
  </div> 
  <div className='flex'> 
 </div>
    </nav>) 
 :
null
}  
 </div> 
 <div className="absolute left-0 right-0 m-auto p-4 cursor-pointer w-3/4 bottom-full z-50 bg-gray-900 bg-opacity-90"> 
  <div className="flex justify-center my-2 px-2"> 
 
  <h2 className={!userProfile.avatar_url &&!user?.user_metadata.avatar_url?`text-gray-600 text-2xl sm:text-4xl m-1 font-bold p-4 font-bold ${chosenFont}`:` ${chosenFont} text-2xl sm:text-4xl m-1 font-bold p-4 text-white font-bold`}>{userProfile.fullname || user?.user_metadata.full_name}</h2>
  <div onClick={()=> setShowFont(prev =>!prev)} className={!userProfile.avatar_url&&!user?.user_metadata.avatar_url?'text-gray-600 text-xl m-1 font-bold p-4 font-bold':"cursor-pointer text-white"}><FontAwesomeIcon icon={faPencil}/></div>

  </div>
 <div className="w-4/5 sm:w-1/5 bg-gray-700 m-auto "> {showFont&& font_y.map((ex, ix)=><p  key={ex + ' ' + ix}onClick={()=>chooseFont(ix)}className="p-3 border cursor-pointer text-white text-center">{ex}</p>)}</div>

  <div className="bg-gray-800 hover:border hover:bg-yellow-800 hover:text-gray-400 font-bold text-lg text-center text-white w-1/2 sm:w-1/5 m-auto"> 
 <button type="submit"className="text-2xl p-3"onClick={handleMailsJS} >Invite</button> </div>
  </div> 
</div>


  <div className='px-5 sm:px-16 my-2 m-auto xl:flex justify-center'> 
    <div className='main-forum m-auto xl:m-0 px-6 py-2 m-1.5 max-w-xl md:mt-0'ref={editingRef} > 
  <h2 className='p-2 text-2xl font-bold text-white'>Explore the Topic</h2>
    <CreateForm
    titleX=''
    post={post}  
    val={val}
    user={user}
    setPost={setPost}
     scrolledPosts={scrolledPosts}
     setScrolledPosts={setScrolledPosts}
     setUserActions={setUserActions}
     setEditId={setEditId}
    />
    {/* {val && 
   <p className="text-center text-white p-2 bg-gray-400">
    {val} 
    </p>} */}
    </div>     
     </div>


   <main className="bg-mainBg"> 
     {userActions &&<LoginModal setUserActions={setUserActions}/>} 
    {postsSorted?.map((xx, i)=> (  
    <div key={xx.title +  ' ' + i }className="sm:max-w-lg md:max-w-xl m-auto p-4 border-gray-900 hover:bg-gray-900 cursor-pointer border rounded my-1">  
   <div className="w-full overflow-hidden md:block justify-center" ref={ref}>
   <div onClick={()=>router.push(`/forum/post/${xx.slug}/${xx.id}`)}className="" ref={createRef}> 
   <h3 className="text-white opacity-70 text-2xl cursor-pointer px-4 text-center underline capitalize">
   {xx?.title }  
   </h3>  
   <p className="text-white font-bold text-center text-lg my-1">Genres:</p>
   {xx?.genre?.slice(0,3)?.map((xy, vi)=>
   <div className="text-white text-center" key={vi}>
   <Link href={`/topic/${xy}`}><p className="m-1 hover:opacity-70 cursor-pointer" >{ xy} </p></Link> 
   </div>
   )} 
  
   </div> 
   <div className="h-44 text-white opacity-70 cursor-pointer px-2 text-center py-8">
   <p className="text_truncate_at" style={{lineHeight:'30px'}}>
   {xx?.story} 
   </p>
   <Link href={`/forum/post/${xx?.slug}/${xx.id}`}><small className="hover:text-green-400  text-white opacity-70 cursor-pointer px-2">See full story</small></Link> </div>
   <div className="flex flex-wrap text-sm "> 
   {xx?.tags?.map((xy, vi)=> 
   xy.split(',').map((ex, xi)=> ex&&
   <div className="flex bg-gray-100 mx-1 my-8" key={xi}>
    
   <Link href={`/topic/${ex.replace('#', '')}'`}><p className="p-1 m-1 hover:opacity-70 cursor-pointer" >{'#' + ex.replace('.', '')} </p></Link>
   <small className="p-2 hover:bg-gray-400" onClick={()=>deleteTagAction(xx, ex)}>x</small>
   </div> ))} 
    
   </div> 
   <div className="flex flex-wrap w-3/4" > 
   {user?.id=== xx.user_id && <small className="text-xs text-white opacity-70 cursor-pointer text-center mx-2 my-4">Suggested Tags:</small> }
 
    {user?.id=== xx.user_id &&  xx?.suggested_tags?.length !== 0&&
   (xx?.suggested_tags??[]).map((xy)=> xy.split(' ').filter((jx )=> jx!=='').map((mx)=> mx.replace(/\./g,'')).filter((item, index, self) =>  index === self.findIndex((t) => t === item)) ).map((ex, xi)=> 
   i===showIndex&&  
   <div className="flex text-sm" key={ex + ' ' + xi}>  
    <div className="flex w-full flex-wrap overflow-hidden ">
    {showSuggestion&&!xx?.tags?.includes(String(ex))&& Boolean(ex) !==false && ex.map((xy, i)=> <p onClick={()=>tagAction(xx , xy)}key={i}className="p-1 m-1 hover:opacity-70 cursor-pointer bg-gray-100" >#{xy} 
   </p> ) }  
    </div>
   </div>
     
   ) }
   {user?.id=== xx.user_id && showSuggestion&&<p className="cursor-pointer m-1 text-sm opacity-70 text-white" onClick={()=>changeIndex(i)}> <FontAwesomeIcon icon={faAngleUp} /></p> }
   {user?.id=== xx.user_id && !showSuggestion&& <p className="cursor-pointer m-1 text-sm opacity-70 text-white"onClick={()=>changeIndex(i)}><FontAwesomeIcon icon={faAngleDown} /> </p> }  
   </div>
   </div> 
   
    <div className="flex overflow-auto w-auto scroll-smooth">  
     {xx?.files?.flat().map((itx,ix)=> itx &&
     <div key={itx} className="mx-1 min-w-fit relative scroll-smooth" ref={imgIndex===itx?imgRef:null} title="double click to view"> 
 
    <Image 
   onClick={()=>enlargeImgs( i, ix)}  
   className={imgIndex===itx?'animate-in cursor-pointer mx-1 w-full h-40 my-4':'cursor-pointer mx-1 w-full h-40 my-4'} 
   src={`${process.env.SUPABASE_PUBLIC_POST_IMAGE_URL}/${itx}`} 
   width={150} 
   height={150}
   style={imgIndex===itx?imgZoom:{} }
   alt={xx.title as string}
   />  
    {show&&
     <> 
     {!deleteBtn && <span onClick={()=>openDelete(ix)} className={imgIndex===itx?'absolute top-4 text-gray-700 text-xl text-center rounded-full border bg-opacity-60 w-16 p-4 m-2 font-bold hover:scale-105 cursor-pointer':'hidden'}>X</span> }
    {deleteBtn&&activeIdx=== ix && <span className={imgIndex===itx?'absolute left-4 top-4 text-white text-center py-3 m-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900':'hidden'}onClick={()=>resetImg(xx, itx)} >Delete Photo</span>} </> }
 
   </div> 
   )}
    </div> 
     <div className='text-white flex justify-center opacity-70 mt-8'> 
    <span className="m-2">by</span>    
     {xx?.avatar_url?     
     <Link href={`/profile/${xx?.user_id}`}>      
       <Image 
     width={40}
     height={40}
     src={xx?.avatar_url} 
     alt={xx?.username} 
     className='border cursor-pointer rounded-full opacity-70 hover:scale-105'/>
     </Link>:
     
     <Link href={`/profile/${xx?.user_id}`}><p className='border cursor-pointer rounded-full w-full p-2 opacity-70 hover:scale-105'><FontAwesomeIcon icon={faUser} width={25}className="avatar_"/></p></Link> }  
   { xx?.username&& <Link href={`/profile/${xx?.user_id}`}><p className="text-sm m-2 hover:scale-105" >{xx?.username} 
     </p></Link>} 
     {!xx?.username&& <Link href={`/profile/${xx?.user_id}`}><p className="text-sm m-2 hover:scale-105" >{xx?.user_email} 
     </p></Link>}     
   </div>
  
    <div className="text-white flex justify-between mt-4 w-full m-auto flex justify-evenly mt-4">  
   <button onClick={()=> likeAction(xx)}className="relative justify-between focus:outline-none left-0 flex m-1 text-lg rounded-none p-1 bg-inherit">
   <FontAwesomeIcon icon={faThumbsUp} width={20}/>
   <p className="px-1 hover:shadow-3xl">{xx?.likes?.length}</p>
   </button>  
 <div> 
   <button onClick={()=>handleOpen(xx)} className="relative focus:outline-none justify-between left-0 flex m-1 text-lg rounded-none p-1">
   <FontAwesomeIcon width={20}icon={faComment}rotation={180}/>
   <p className="px-1 hover:shadow-3xl">{xx.comments?.length}</p>
   
   </button> 
   </div> 

   {user?.id=== xx?.user_id ?
   <>
   <div className="">
   <button onClick={()=>openEdit(xx.id )}className="relative justify-between left-0 flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faPencil} /></button>
   
   {editBtn&&activeIdx=== xx.id &&<button onClick={()=>editting(xx)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
   Edit</button>} 
   </div> 
   <div>
     <button onClick={()=>openDelete(xx.id )}className=" flex m-1 text-lg rounded-none p-1 hover:shadow-3xl"><FontAwesomeIcon width={20}icon={faDeleteLeft} rotation={180} /></button>
   
   {deleteBtn&&activeIdx === xx.id &&<button onClick={()=>deletePostAction(xx?.id as number|string)} className="absolute text-white text-center py-3 align-self-center justify-self-center mt-2 text-md rounded-none shadow-4xl p-3 border w-1/4 z-10 bg-slate-900">
   Delete
   </button>}
   </div> 
   </>
   
   :null}
   <div>
   <button onClick={()=>showAll(xx.id as number|string)} className="m-1 text-smlg rounded-none p-1 hover:shadow-3xl"> 
   <FontAwesomeIcon width={20}icon={faShare}  
   />
   </button>   
   </div>  
   
   </div>  

     {activeReply && onIdx=== xx.id&&
     <div className="text-center"ref={elRef}> 
     <form className='rxn-form animate-in flex justify-center'  >    
   <textarea
   rows={6}
   cols={50} 
   name='title'   
   className='w-full resize-none bg-inherit mt-1 text-sm p-5 leading-normal' 
   placeholder="Speak your Mind!"
   />  
   <button type="submit" aria-disabled={pending} formAction={(e)=>commentAction(e, String(xx.id))} className="block border-none p-3 hover:text-pink-900 m-2 text-lg" >
   {isPending ? 'Waiting' : 'Reply'}
   </button>    
   </form>     
   <Link href={`/forum/post/${xx.slug}/${xx.id}`} className="text-white m-1 text-sm rounded-none p-2">View All Comments</Link>
   </div>
   }
  {userActions?<LoginModal 
    setUserActions={setUserActions}
    />: 
    <ShareButtons  
    item={xx} 
    activeIdx={activeIdx}
    shareOptions={shareOptions}
    />   }  
    </div> 
   )
     )}   
   </main> 

 </>
    );
};

export default Profile;