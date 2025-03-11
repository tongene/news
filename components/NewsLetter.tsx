'use client'; 
import { useEffect, useState }from "react"
type Text={
  name:string;
  email:string
}

function NewsLetter() { 
  const [success, setSuccess] = useState({
    succeeded: false, 
  })
const [status, setStatus] = useState('')  
const [subNm,setSubNm]=useState({
name:'',
email:'', 
})
 
useEffect(()=>{
  if (success) {
    setInterval(()=>{
      setSuccess({ succeeded: success.succeeded })
    },11000) 
    }
    
},[])
  const saveForm=async (e: React.FormEvent)=>{
e.preventDefault()
const form = {name:subNm.name, email:subNm.email }

const response =await fetch('/api/newsletterhandler', {
method: "POST",
headers:{ 
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify(form)
}) 
const content = await response.json() 
  
  if(response.ok){
    setStatus('Success! Thank you for your response!');
    setSuccess({ succeeded: !success.succeeded });
   }else{
    setStatus('Error')
    setSuccess({ succeeded: success.succeeded })
   }  
   (e.target as HTMLFormElement).reset();
  }
  const [closeQuestion, setCloseQuestion]= useState(false)
    return (
<div className='news-letter-unflexed py-3 w-80 relative md:w-3/4 max-w-xl border bg-gray-900 z-10 m-auto rounded-lg my-4 text-white'>

    {!closeQuestion&& <p onClick={()=> setCloseQuestion(prev => !prev)} className="cursor-pointer px-4 text-2xl font-bold opacity-90 m-2">X</p> }
 {closeQuestion&& <p onClick={()=> setCloseQuestion(prev => !prev)} className="cursor-pointer px-4 text-2xl font-bold opacity-90 m-2">&#x2014;</p>} 
 <h3 className="p-4 text-2xl font-bold opacity-90 m-2 text-center news-form-side">Unlock News Faster ...Sign Up</h3>        
{!closeQuestion&& <form onSubmit={saveForm} className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:p-4 md:w-full md:justify-center items-center p-1"> 
 {/* <div className="flex flex-col "> 
<label htmlFor="name" className="font-bold">
Name:
</label> 
<input 
id="name"
type="name" 
name="name"
className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black"
placeholder='name'
onChange={(e)=> setSubNm({...subNm, name:e.target.value} )}
/> 
</div> */}
<div className="news-letter-nowidth flex flex-col justify-between w-3/4">
<label htmlFor="email" className="font-bold">
Email:
</label>
<input
required
id="email"
type="email" 
name="email"
className="p-4 text-sm focus:outline-none border rounded border-green-500 text-black dark:text-gray-300"
placeholder='you@email.com'
onChange={(e)=> setSubNm({...subNm, email:e.target.value} )}
/> 
</div>  
 <div className="news-letter-buttonwidth mt-5 mx-2 bg-gray-800 cursor-pointer font-bold hover:bg-opacity-80 rounded border md:w-1/5 h-max p-4"> 
<button type="submit" >
  Submit
</button> 
</div>
</form> } 
     {success &&(
<p className="p-4 text-center text-sm text-gray-300">
 {status} 
</p>
)}
{status=== 'Error'&&(
<p className="p-4 text-center text-sm text-gray-300">
{status} There was an error processing your form!
</p>
)}
 </div>
    );
  }
  export default NewsLetter