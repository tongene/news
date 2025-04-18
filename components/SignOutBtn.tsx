import { headers } from "next/headers";
import { redirect } from "next/navigation";
const SignOutBtn = async() => {   
  const headersList = await headers() 
 const router = headersList?.get('x-url') 
  const pathChanged=async()=>{
    "use server"
    //return NextResponse.redirect(new URL("/sign-in", request.url));
 return redirect(`${router}?confirm=logout`);  
  }
   
  return (
    <form action={pathChanged}>
    <div className="m-1 flex m-auto justify-center">  
  <button className="button block m-1 ml-2 rounded-md no-underline bg-btn-background text-lg hover:scale-105 mt-5" type="submit">
   Sign out
 </button>  
 
</div>
 </form>  
  )
} 

export default SignOutBtn