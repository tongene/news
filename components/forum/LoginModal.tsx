"use client"
import { useState } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons"; 
import LoginForm from "@/app/(auth-pages)/sign-in/form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface LoginModalProps {
  setUserActions: React.Dispatch<React.SetStateAction<boolean>>;
 
}
const LoginModal: React.FC<LoginModalProps> = ({ setUserActions }) => { 
const [current, setCurrent] = useState(true); 
const search=useSearchParams()
const message=search.get('message')
const error=search.get('error')
const success=search.get('success')

const closeActions=()=>{
  setCurrent(false) 
  setUserActions(prev=> !prev)
}
 
  return (
  <div className="p-8 bg-gray-800 bg-opacity-40 m-auto z-50 h-full -top-1 fixed w-full left-0 text-center flex flex-col items-center justify-center"> 
 <p className="text-5xl text-gray-600 absolute top-0 right-0 m-5 cursor-pointer"onClick={closeActions} ><FontAwesomeIcon icon={faClose}/></p> 
  {current &&
   
<div className='flex flex-col items-center justify-center w-full py-6'> 
<div> 
<form className="login_form w-96 flex flex-col gap-2.5 p-5 rounded tracking-wider bg-gray-800" noValidate>
<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 border-b border-b-2 border-gray-300"> 
    <LoginForm /> 
    {error?<p className="text-foreground border-l-2 border-foreground p-4 text-white mt-4 bg-foreground/10 text-foreground text-center">{error}</p>:''}
    {message?<p className="text-foreground border-l-2 border-foreground p-4 text-white mt-4 bg-foreground/10 text-foreground text-center">{message}</p>:''}
    {success?<p className="text-foreground border-l-2 border-foreground p-4 text-white mt-4 bg-foreground/10 text-foreground text-center">{success}</p>:''}
</div>

</form> 
<Link href='/forgot-password/'><p className="p-2 cursor-pointer text-gray-800 dark:text-gray-200 text-center rounded dark:hover:text-gray-400 hover:text-gray-400">Forgot Password?</p></Link> 

</div>
</div>
}
 
</div>
  )
}

export default LoginModal
