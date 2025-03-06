'use client'
import { handleOauthLogin, signInAction, signUpAction } from "@/app/actions";
import { useState } from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'   
import { SubmitButton } from "./submit-button"; 
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type formVals = {
  full_name?: string;
  email?: string;
  password?: string;
 
};
type formErrors = {
  full_name?: string;
  email?: string;
  password?: string;
};

const LoginForm = () => {
const [passType, setPassType] = useState('password');
const [icon, setIcon] = useState(faEyeSlash);
const [errors, setErrors] = useState<formVals>({});

const password_pattern=new RegExp(`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$`) as any
const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`) as any
const name_pattern=new RegExp(`^[A-Za-z0-9]{3,10}$`)as any
 
const handleToggle = (textPass: string) => {
if (passType===textPass){
  setIcon(faEye);
  setPassType('text') 
} else { 
  setIcon(faEyeSlash) 
  setPassType(textPass)
}
}

const validateForm = (data: {name:string, value:string}) => {
  const errors: formErrors  = {}; 
  if (data.name === 'full_name'&&!name_pattern.test(data.value.trim())) {
      errors.full_name = 'Username is Incorrect';  
  }
  if (data.name === 'email'&&!email_pattern.test(data.value.trim())) {
    errors.email = 'Please Enter a Correct Email';  
}
if (data.name === 'password'&&!password_pattern.test(data.value.trim())) {
  errors.password = 'Password is Incorrect';  
}
 
    return errors;
    };
 
  const handleFocus=(e: React.ChangeEvent<HTMLInputElement>)=>{
  const newErrors = validateForm(e.currentTarget)
  setErrors(newErrors);  
  }
 
return (  
   <>
<label className="text-md block text-white text-xl" htmlFor="full_name">
Username
</label>
<input
className='login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider'
name="full_name"
placeholder="Username"
type="text"
pattern={name_pattern} 
required={!!errors.full_name}
onBlur={(e) =>handleFocus(e)}  
/>
{errors.full_name &&
  <span className='text-red-600'>{errors.full_name}</span>
 }

 <label className="text-md block text-white text-xl" htmlFor="email">
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

{errors.email &&
<span className="text-red-600">
{errors.email}
</span>
 }
<div className="relative"> 
<label className="text-md block text-white text-xl" htmlFor="password">
Password
</label>
<input
className="login_input rounded-b-sm w-full border-solid border-0 focus:outline-none p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white "
name="password"
placeholder="••••••••••••••"
type={passType}
pattern={password_pattern}
required={!!errors.password}
onBlur={(e) =>handleFocus(e)} 
/>
{errors.password &&
<span className="text-red-600">
{errors.password}
</span>
}
{errors.password&&
<ul className="text-white m-4">
<li className="list-disc p-1">At least two uppercase letters.</li>
<li className="list-disc p-1">At least one special character from the set !@#$&*.</li>
<li className="list-disc p-1">At least two digits.</li>
<li className="list-disc p-1">At least three lowercase letters.</li>
<li className="list-disc p-1">Length between 8 and 20 characters.</li>
</ul>}

<span className="absolute right-11 top-8 mt-2 cursor-pointer" onClick={()=>handleToggle("password")}>
<FontAwesomeIcon className="text-gray-600" icon={icon} width={25}/>
</span> 
</div>  
 
<div className='flex justify-end items-center gap-2.5 btn-link cursor-pointer p-3 p-2 block border-none p-3 '> 
{!errors.full_name ||!errors.email ||!errors.password? 
<SubmitButton 
formAction={signInAction}
className="hover:text-pink-900 rounded-md p-4 mb-2 w-1/2 hover:bg-gray-700 bg-gray-700 text-white"
pendingText="Signing In..."
>Sign In

</SubmitButton>:null}
{!errors.full_name ||!errors.email ||!errors.password?
 <SubmitButton
formAction={signUpAction}
className="hover:text-pink-900 rounded-md p-4 mb-2 w-1/2 hover:bg-gray-700 bg-gray-700 text-white"
pendingText="Signing Up..."  
>
Sign up 
</SubmitButton>:null}
</div>
<small className="text-white text-center cursor-pointer">or </small> 
  <button type="submit" formAction={handleOauthLogin} className="bg-tranparent"><p className="text-white cursor-pointer p-2 text-lg bg-gray-700 my-2 hover:text-gray-400"><FontAwesomeIcon icon={faGoogle} className="px-2"/>Sign in with Google</p></button>
</>)
}
 
export default LoginForm
