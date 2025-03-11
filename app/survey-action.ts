"use server"

  export const submitSurvey=async (formData:FormData)=>{
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
 
  