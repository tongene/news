"use client"
import Link from "next/link"; 
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";  
import { useEffect, useState } from "react"; 
import { useSearchParams } from "next/navigation"; 
import { sidePanelNewsItems } from "@/app/sidex";
import MoviesWidget from "./MoviesWidget";

type Node ={
    node:{
        title:string;
        featuredImage:{node:{altText:string,sourceUrl:string}};
        excerpt:string;
        slug:string
    
    };  
  } 
const TabNav = () => {
 const [sideBarData, setSideBarData]= useState<Node[]>([]) 
const [closeQuestion, setCloseQuestion]= useState(false) 
  const [success, setSuccess] = useState({
    succeeded: false, 
    })
  const [status, setStatus] = useState('') 
   const searchParams = useSearchParams();
   const params = new URLSearchParams(searchParams);
   const name = params.get('name')as string 
   
   const get_other_content= async ()=>{    
      const sidebar_news=await sidePanelNewsItems() 
      setSideBarData(sidebar_news)
    }
    useEffect(()=> {
      if(closeQuestion){
      get_other_content()
    }
    },[closeQuestion])  

    const submitSurvey=async (formData:FormData)=>{
      const name = formData.get('name')
      const email = formData.get('email')
      const content = formData.get('content') 
      const biased = formData.get('biased-yes') === "on"
      const unbiased = formData.get('biased-no') === "on"
      const accurate = formData.get('accurate')=== "on"
      const inaccurate = formData.get('inaccurate')=== "on"
      const form = {name , email , content , biased , unbiased, accurate, inaccurate} 
      const response =await fetch('/api/surveyhandler', {
      method: "POST",
      headers:{ 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
      }) 
      const content_data = await response.json() 
        if(response.ok){
        return content_data ??[]
         } 
      formData.set('name','')
      formData.set('email','')
      formData.set('content','')
      // formData.set('biased','off')
      // formData.set('inaccurate','off')
         }
 
const navAction=async (formData:FormData)=>{
if(closeQuestion){
  const data = await submitSurvey(formData)
if(data){
  setStatus('Success! Thank you for your response!')
  setSuccess({ succeeded: !success.succeeded });
}else{
  setStatus('Error')
  setSuccess({ succeeded: success.succeeded });
}
 }
}
 
const [selectedAccurate, setSelectedAccurate] = useState<string | null>(null);

const checkAccurate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const name = target.name; 
  setSelectedAccurate((prev) => (prev === name ? null : name));
};
const [selectedBiased, setSelectedBiased] = useState<string | null>(null);

const checkBiased = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const name = target.name; 
  setSelectedBiased((prev) => (prev === name ? null : name));
};
 
  return (
 
  <div className="">  
   <div className={closeQuestion ||name?'hidden': "text-8xl -mt-6 text-orange-600 ml-24 cursor-pointer hover:text-gray-400"} onClick={()=>setCloseQuestion(prev=> !prev)}> 
  <FontAwesomeIcon icon={faCaretDown} width={50} />  
 </div>
   <div className={closeQuestion?'fixed text-6xl w-max h-8 mt-6 -ml-3 text-orange-600 cursor-pointer bottom-0 top-0 left-0': "hidden"} onClick={()=>setCloseQuestion(prev=> !prev)}> 
  <FontAwesomeIcon icon={faCaretLeft} width={50}/>  
 </div>
  {closeQuestion &&
  <div className="grid_slide fixed pb-80 bg-gray-900 bottom-0 top-0 left-4 bg-opacity-90 h-full overflow-y-auto px-1 z-50 border lg:w-11/12 xs:w-4/5 max-w-md animate-in text-gray-200"onClick={()=>setCloseQuestion(false)}>  

  <div className="my-4 text-xl p-6"> 
 <h2 className="text-gray-300 font-medium text-3xl">Explore More</h2> 
 
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/>
<Link href='/news/nollywood/'><h3 className="cursor-pointer" >Nollywood </h3></Link> 
<hr className="w-1/4 my-3"/> 
 
</div>
 
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
<Link href='/daily/'><h3 className="cursor-pointer" onClick={()=>setCloseQuestion(false)}>Awards</h3></Link>  
<hr className="w-1/4 my-3"/>  
</div>
<div className="p-6 text-gray-200 flex justify-between hover:scale-105"> 
<hr className="w-1/4 my-3"/> 
<Link href='/news/videos/'><h3 className="cursor-pointer">Videos</h3></Link>  
<hr className="w-1/4 my-3"/>  
</div>
 
</div>
<hr className="my-4 h-1"/>
<div className="relative my-4 p-6 bg-white text-gray-700">
 <h3 className="font-medium text-3xl">What You Missed</h3>
 <div className=""> 
  {sideBarData?.map((ex, i)=>  
<div key={ex.node.title + ' ' + i} className="m-1 p-2 flex border-b border-b-red-500" >
 <div className="w-1/2 mx-1 px-1">   
<Image  
src={ex.node.featuredImage.node.sourceUrl}  
width={1200}
height={675}
  className='object-cover '
  alt={ex.node.featuredImage.node.altText}
  />
   </div> 
 
  <div className=" w-3/4 mx-1 px-1 text-lg"> 
 <Link href={`/news/${ex.node.slug}/`}>
 <div dangerouslySetInnerHTML={{__html:ex.node.excerpt}} className="text-ellipsis overflow-hidden " style={{ display: '-webkit-box', WebkitLineClamp:3, WebkitBoxOrient: 'vertical' }}/>
 </Link> 
</div>
</div>

)}  
</div>  
</div>

<hr className="my-4 h-1"/>

<div className="w-11/12 m-auto px-4"> 
   <h3 className="p-3 text-2xl font-bold m-2 text-center text-gray-300">Tell us what you think...</h3>  
       <div className="flex flex-col md:p-4 p-1">   
      {status ?
        <div>{status} 
     </div>:''
   }

 <form className="flex flex-col bg-gray-900 text-gray-200 py-4" >
         <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Email :</label>
            <input type="text" className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" placeholder="Email" name="email" />
          </div> 
          <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Name:</label>
            <input type="text"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" placeholder="Name" name="name"  />
          </div>
          <div className="flex flex-col mx-1"> 

            <div className="flex"> 
            <label className="font-bold p-2 m-1">
         Are the content of this site inaccurate?</label>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" name="accurate" checked={selectedAccurate === 'accurate'}onChange={(e)=>checkAccurate(e)}/><small className="pt-6">Yes</small>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" name="inaccurate"checked={selectedAccurate === 'inaccurate'} onChange={(e)=>checkAccurate(e)}/><small className="pt-6">No</small>
            </div>
            <div className="flex"> 
            <label className="font-bold p-2 m-1">
           Was this site biased?</label>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" name="biased-yes"onChange={(e)=>checkBiased(e)} checked={selectedBiased === 'biased-yes'}/><small className="py-3" >Yes</small>
            <input type="checkbox"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black" name="biased-no" onChange={(e)=>checkBiased(e)}checked={selectedBiased === 'biased-no'}/><small className="py-3" >No</small>
            </div>
          </div>
          <div className="flex flex-col mx-1"> 
            <label className="font-bold p-2 m-1">Tell us what&apos;s happening in your area now.</label>
            <textarea className="resize-none p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" placeholder="Reply" name="content"  />
          </div>           
       
          <button type="submit" formAction={navAction} className="bg-gray-800 text-white mt-3 cursor-pointer font-bold hover:bg-opacity-80 rounded border w-1/2 m-auto h-max p-3" >Send</button> 
        </form> 
     </div> 
     </div> 
 <MoviesWidget/> 
   </div> 
}  

 </div>
  )
}

export default TabNav
