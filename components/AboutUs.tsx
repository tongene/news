
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
<a target="_blank" href="https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9"><button className="hover:border hover:border-yellow-600 p-4 text-white text-center cursor-pointer bg-black w-full my-4 hover:text-gray-400 font-bold">Contact</button></a> 
</div> 
</div>
</div>
 
</div> 
{/* African Music has always had an upper hand in African entertainment. Though movies and other forms of entertainment in Africa are thriving and have been getting on the international stage. They still have some time before they can get up to the level of music. We will make sure to give you all the fun facts about African music and artists. There is no better place to follow up music in Africa than here at Nollymania.




American Movies - Movies, just like music are a universal language and we like to see every kind of artwork as an element that connects all humans.

From our side of the world, we are trying to get people to see and understand how movies can be used properly whether America or African.

We are also challenged by the method which American movies are made. This is why we like to take our time to analyse and write about it and hope that our readers see it the same way.

These days we also find it difficult to differentiate certain films as we see more and more collaborations both in music and movie. So we like to help people understand such partnership and provide all the details that we have access to.

Filmmaking is as much big business in Africa as it is in America. So, it only makes it harder to accept certain opinions that say the African movie industries are still budding. That is only fair on some level as there is still a need to improve on several factors like film quality and storytelling. So, when we see American movies and storytelling, there is always a need to scrutinize it to compare what makes it different from the ones made in Africa.

 



	
There is no way to tell exactly what’s missing in the system of education in Africa. If the continent holds the highest number of young people in the world, it should translate to strength.

In Africa, many people seem not to be getting what they asked for in when it comes to education. From leaders to toddlers. But who is to blame for that?

In more ways than one, students in Africa, mostly in Nigeria, Africa’s giant, protest the system of education. Strikes are now a standard format in universities which is apparently a drag for any nation.

The promising leaders are getting education abroad but they come back and only to seek bigger lives. Apparently, being opportune to get a big education abroad translates to getting big jobs and living high.

Many young people in Africa clearly feel cheated by this system that allows certain people access to certain things that might be considered “best”.

After getting a foreign education, do these people comes back to make an impact in their countries or are they just like everyone else? Do the government care about what happens in schools? How do they handle gender-based issues in universities around Africa and do they have an interest in creating an educational haven?

Get to know Africa on Africareinvented.






The End SARS protest quickly turned bloody in Nigeria as te military gena to kill peaceful protesters.

The government is yet to meet with the demand of the protesters and the SERAP is suing President Muhammdu Buhari.

Being one of the darkest days in the nation, many people around the world are no lending their voices to protesters and giving support.

Sadly, criminal orders are also taking advantage of the situation, insecurity heightened in the country.

Until President Muhammadu Buhari and the Inspector General of Police Mohammad Adamu agree to the protest demands, the protesters have sworn to keep going.
*/}
    </>
  )
}

export default About
