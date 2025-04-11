 
import Link from "next/link"; 
import { createClient } from "@/utils/supabase/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 
import SignOutBtn from "./SignOutBtn";   
export default async function AuthButton() {
  const supabase = await createClient();

  const { 
    data: { user },
  } = await supabase.auth.getUser();
  
  return user ? (
  <> 
 
 <div className="flex flex-col items-center pb-2 leading-none"> 
<div className="flex items-center"> 
<Link href={`/profile/${user.id}`}><p className="m-1 text-lg hover:scale-105">Hey, {user.user_metadata.full_name}!</p></Link>  
</div>

<div className="m-1 flex m-auto justify-center">  
{!user.user_metadata.picture && <Link href={`/profile/${user.id}`}>
 <FontAwesomeIcon 
 width={15}
 height={15} 
 className="p-3 m-1 cursor-pointer border rounded-full"icon={faUser}/></Link> } 
  {user.user_metadata.picture&& 
   <Link href={`/profile/${user.id}`}>
   <div > 
      <Image
 src={user.user_metadata.picture} 
 width={50}
 height={50}
 className="cursor-pointer border rounded-full hover:scale-105 h-10 w-10"
 alt={user.user_metadata.full_name}
 /> 
 </div></Link> }
 <SignOutBtn/>  
</div>
</div> 
</> ) : (  
  <>
<div className="flex flex-col items-center pb-2 leading-none text-xs my-6">
<Link
href="/sign-in"
className="flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-xs"
>
  <button className="text-lg rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border border-4 py-3 px-6">
  Login
</button> 
</Link> 
                     
</div>
    
    </>
  );
}

