"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const SignOutBtn = ({rtx}:{rtx:string}) => {
    const router = useRouter()
    const pathname = usePathname()
    const [load, setLoading]=useState(false)
  return (
    <div>
    <div className="m-1 flex m-auto justify-center">  
 <button className="button block m-1 ml-2 rounded-md no-underline bg-btn-background text-xl hover:scale-105 mt-5" type="button"> 
  <Link href={`${rtx}?confirm=logout/`}>
   Sign out  
</Link> 
 </button>  
</div>
 </div>  
  )
} 

export default SignOutBtn