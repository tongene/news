
import Image from "next/image"
import Link from "next/link"
type ListUsers={
  node:{
     name:string;
  username:string;
  avatar_url:string;
  slug:string 
  }

}
   
const About = ({listedUsers}:{listedUsers:ListUsers[]}) => {   

  return (  
    <>   
<div className="p-11 bg-gray-600 my-4 text-center text-white">
<h1 className="text-center p-5 text-4xl dont-bold">About Us</h1>
<p className="text-center p-5 ">Culturays is an independent news outlet operating under Ngenet Studio and focused on events from around the world that affect Nigeria and the rest of Africa. </p>
 
<p className="text-center ">Ngenet Studio is a registered web developement and content creation startup based in Cape Verde.</p> 
<p className="">The idea behind this startup is to build and equip a team of writers with the right skills to deliver useful content to our readers and the general public.</p>
<p className="p-5">We have an innate desire to uplift others as well, so we are dedicating time to the helping those who might be interested in working with here at Ngenet Studio. </p>
 
 <p>Our resolve and unwavering determination lie with creators and everyone who want to make a change and be heard - volunteer and intern content writers alike.</p>

 <p>This idea is guided by a moral compass forged in the crucible of experience and conducted with honesty and transparency so as to earn the respect and admiration of readers and potential partners.</p>

 <p className="p-5">We are driven by a vision to create, and that backs our greatest endeavor yet — a journey to build a media company that transcends boundaries and empowers voices throughout Africa.</p>  
</div> 

<h2 className="text-center p-8 text-4xl">Our Team</h2>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4"> 
<div className="shadow-xl border p-3">
<Image
width={1200}
height={675} 
src="/assets/images/ngenet.jpg"
alt="christina-ngene"/>
<div className="">
<Link href={`/creator/${listedUsers?.length>0&&listedUsers[0]?.node.slug}`}><h2 className="font-bold text-2xl pt-4 hover:text-gray-500">Christina Ngene</h2></Link>
<p className="text-gray-400">Head of Content</p>
<p className="leading-relaxed mt-4">I am the originator of Culturays and I have years of experience programming and writing content. I intend to enable young people like me who may have challenges getting jobs, are out of jobs or even unemployed learn useful skills that will be beneficial to them through Ngenet Studio. I want to bring everyone with me into this process beginning from here - <Link href='/'><b>Culturays</b></Link>.</p>
 
<div className="w-1/2 m-auto">
<a target="_blank" href="https://chat.whatsapp.com/Fj7udgVONab515BzVk72zU"><button className="hover:border hover:border-yellow-600 p-4 text-white text-center cursor-pointer bg-black w-full my-4 hover:text-gray-400 font-bold">Contact</button></a> 
</div>
</div>
</div>
 
</div> 

    </>
  )
}

export default About
