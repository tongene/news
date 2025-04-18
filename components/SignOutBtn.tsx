"use client"
import { usePathname, useRouter } from "next/navigation"

const SignOutBtn = ({rtx}:{rtx:string}) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div>
    <div className="m-1 flex m-auto justify-center">  
 <button onClick={()=>router.push(`${rtx}?confirm=logout`)}  className="button block m-1 ml-2 rounded-md no-underline bg-btn-background text-lg hover:scale-105 mt-5" type="button">
   Sign out
 </button> 
 
</div>
 </div>  
  )
} 

export default SignOutBtn