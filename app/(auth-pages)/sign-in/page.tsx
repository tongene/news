import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import LoginForm from "./form";
 
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
       <FormMessage message={searchParams} /> 
      </div>
    );
  } 

  return (
  
    <div className='flex flex-col items-center justify-center w-full py-6'> 
   <div> 
    <form className="login_form w-96 flex flex-col gap-2.5 p-5 rounded tracking-wider bg-gray-800" noValidate>
    <h1 className="text-2xl font-medium text-center text-white">Sign in</h1>      
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 border-b border-b-2 border-gray-300"> 
      <LoginForm />     
<FormMessage message={searchParams} />
  </div>
  
</form> 
<Link href='/forgot-password'><p className="p-2 cursor-pointer text-gray-800 dark:text-gray-200 text-center rounded dark:hover:text-gray-400 hover:text-gray-400">Forgot Password?</p></Link> 
 
 </div>  
  </div>
 
   ) 
}