"use client"
import { useState } from "react";
type formVals = {
    email?: string;   
  };
   
const EmailReset = () => {
 const [errors, setErrors] = useState<formVals>({});
const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`) as any
const validateForm = (data: {name:string, value:string}) => {
  const errors: formVals  = {};  
  if (data.name === 'email'&&!email_pattern.test(data.value.trim())) {
    errors.email = 'Please Enter a Correct Email';  
}
    return errors;
    };
 
  const handleFocus=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const newErrors = validateForm(e.currentTarget)
    setErrors(newErrors);  
    }
  return (
    <>
    <div>
      <label className="text-md block text-white text-xl " htmlFor="email">
Email
</label>
<input
className='login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider'
name="email"
type="text"
placeholder="you@email.com"
pattern={email_pattern}
required={!!errors.email}
onBlur={(e) =>handleFocus(e)}  
/>
<div>{errors.email &&
<span className="text-red-600">
{errors.email}
</span>
 } </div>
    </div>
</>
  )
}

export default EmailReset
