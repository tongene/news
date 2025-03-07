
'use client'
import { useEffect, useState }from "react"  
function ContactUs() { 
const [success, setSuccess] = useState({
succeeded: false, 
})
const [status, setStatus] = useState<string> ('')  
const [subNm,setSubNm]=useState({
name:'',
email:'',
message:'',
})

useEffect(()=>{
if (success) {
setInterval(()=>{
setSuccess({ succeeded: !success.succeeded })
},3000) 
}

},[])
const saveForm=async (e:React.ChangeEvent<HTMLFormElement>)=>{
e.preventDefault()
const form = {name:subNm.name, email:subNm.email , message:subNm.message}

const response =await fetch('/api/contacthandler', {
method: "POST",
headers:{ 
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify(form)
}) 
const content = await response.json() 
if(response.ok){
setStatus('Success! We will get back to you shortly.')
setSuccess({succeeded:!success.succeeded})
}else{
setStatus('Error')
setSuccess({succeeded:success.succeeded})
}  
e.target.reset();
}

return (
<div className='py-3'> 
<h2 className="pb-2 text-xl text-center ">Contact Us</h2> 
<div className="m-auto w-1/2 mb-8"> <hr /> </div>          
<form onSubmit={saveForm} className="flex flex-col shadow-1xl max-w-xs w-80 p-8">  
<label htmlFor="name"/>
Name:
<input 
id="name"
type="name" 
name="name"
className="p-2 text-sm my-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300"
placeholder='name'
onChange={(e)=> setSubNm({...subNm, name:e.target.value} )}
/>
<label htmlFor="email">
Email:
</label>
<input
required
id="email"
type="email" 
name="email"
className="p-2 text-sm my-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300"
placeholder='you@email.com'
onChange={(e)=> setSubNm({...subNm, email:e.target.value} )}
/>
<label htmlFor="message">
Message:
</label>
<textarea
className="p-2 resize-none overflow-auto text-sm my-2 focus:outline-none rounded border border-green-500 text-black dark:text-gray-300"
id="message"
name="message"
placeholder='your message'
onChange={(e)=> setSubNm({...subNm, message:e.target.value} )}

/>
<button type="submit" className="bg-gray-400 mt-3 p-2 cursor-pointer bg-opacity-20 hover:bg-opacity-40 rounded border" >
Submit
</button> 

{success &&(
<p className="p-4 text-center text-white text-sm text-gray-300">
{status} 
</p>
)}
{status=== 'Error'&&(
<p className="p-4 text-center text-white text-sm text-gray-300">
{status} There was an error processing your form!
</p>
)}
</form>  

</div>
);
}
export default ContactUs