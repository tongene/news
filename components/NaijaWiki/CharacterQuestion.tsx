"use client" 
import React, { useState } from "react" 
function CharacterQuestion() {
  const [formData, setFormData] = useState({
    title: "Culturays | Characters",
    content:""
  });

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")
 const [closeQuestion, setCloseQuestion]= useState(false)
 
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const ourPassword = process.env.NEXT_PUBLIC_WP_SECRET
  const ourUsername = "Christina Ngene"
  const submitForm = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault() 
    const formURL =e.target?.action
    const data = new FormData() 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })
     
    fetch(formURL, {
      method: "POST",
      body: data,        
      headers: {
        'accept': 'application/json',
        "Authorization": "Basic " + Buffer.from(`${ourUsername}:${ourPassword}`).toString("base64")
      },
    }).then((response) => response.json())
    .then((data) => {
    
if(data){  
  setFormSuccess(true)
  setFormSuccessMessage("Character Noted!")
 
}  setFormData({ 
        title: "",
        content:""
      })

      setTimeout(
        () =>setFormSuccessMessage(' '),  
        2000 
      );

    })
  } 
  

  return (
    <div className="py-3 m-auto sm:max-w-xl w-80 relative md:w-3/4 max-w-xs border bg-gray-900 text-gray-200 z-10 m-auto rounded-lg my-4"> 
    {!closeQuestion&& <p onClick={()=> setCloseQuestion(prev => !prev)} className="cursor-pointer px-4 text-2xl font-bold opacity-90 m-2">X</p> }
 {closeQuestion&&  <p onClick={()=> setCloseQuestion(prev => !prev)} className="cursor-pointer px-4 text-2xl font-bold opacity-90 m-2">&#x2014;</p>} 
      <h3 className="p-4 text-2xl font-bold opacity-90 m-2 text-center">What Other Characters Would You Like To See Here?</h3>  
       <div className="flex flex-col md:p-4 p-1">   
      {formSuccess ?
        <div className='text-center font-bold'>{formSuccessMessage} 
       
        </div>:''
   }
  

  {!closeQuestion&& 
  
        <form method="POST" action="https://content.culturays.com/wp-json/wp/v2/naija-wiki"className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:p-4 md:w-full md:justify-center items-center  p-1" onSubmit={submitForm}>
         <div className="flex flex-col "> 
            <label className="font-bold p-2 m-1">Character :</label>
            <input type="text" className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" placeholder="New Character Here" name="title" onChange={handleInput} value={formData.title} />
          </div> 
          <div className="flex flex-col"> 
            <label className="font-bold p-2 m-1">Film Title:</label>
            <input type="text"className="p-3 text-sm m-2 focus:outline-none border rounded border-green-500 text-black dark:text-gray-300" placeholder="What Film Do They Appear In" name="content" onChange={handleInput} value={formData.content} />
          </div>
          <div className="mt-10"> 
          <button type="submit" className=" bg-gray-800 text-white cursor-pointer font-bold hover:bg-opacity-70 rounded border py-3 px-8" >Send</button>  
            </div>
        </form> }
     </div>
      </div>
    
    )
}

export default CharacterQuestion