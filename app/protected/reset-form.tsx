'use client'
import { useState } from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
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

const ResetForm = () => {
    const [passType, setPassType] = useState('password'); 
    const [icon, setIcon] = useState(faEyeSlash); 
    const [confirmType, setConfirmType] = useState('password'); 
    const [iconX, setIconX] = useState(faEyeSlash); 
    const [errors, setErrors] = useState<formVals>({});
    const router=useRouter()
    const password_pattern=new RegExp(`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$`) as any 
    
    const togglePass = () => {
      setPassType('text')
      setIcon(faEye) 
     if (passType==='text' ){
        setPassType('password')
        setIcon(faEyeSlash) 
        } 
      
    } 
    const toggleConfirm = () => {
      setConfirmType('text')
      setIconX(faEye) 
     if (confirmType==='text' ){
      setConfirmType('password')
        setIconX(faEyeSlash) 
        } 
        
    } 
    const validateForm = (data: {name:string, value:string}) => {
      const errors: formErrors  = {}; 
    
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
<div className="relative py-2"> 
<Label htmlFor="password" className="text-md block text-white" >New password</Label>
      <Input
      className="rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider" 
        name={passType}
        placeholder="••••••••••••••"
        type={passType}
        pattern={password_pattern}
        required={!!errors.password}
        onBlur={(e) =>handleFocus(e )} 
      />
    <span className="absolute right-5 top-11 cursor-pointer" onMouseOut={()=>{
       setPassType('password')
 setIcon(faEyeSlash)}}
  onClick={togglePass}>
<FontAwesomeIcon className="text-gray-600" icon={icon} width={35}/>
</span> 
{errors.password &&
<span className='text-red-600'>{errors.password}</span>
}
</div> 

<div className="relative py-2"> 
<Label htmlFor="confirmPassword" className="text-md block text-white" >Confirm password</Label>
      <Input
      className="rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider" 
        name='confirmPassword'
        placeholder="••••••••••••••"
        type={confirmType}
        pattern={password_pattern}
        required={!!errors.password}
        onBlur={(e) =>handleFocus(e)} 
      />
    <span className="absolute right-5 top-11 cursor-pointer"onMouseOut={()=>{
 setConfirmType('password')
 setIconX(faEyeSlash)
    }} onClick={toggleConfirm}>
<FontAwesomeIcon className="text-gray-600" icon={iconX} width={35}/>
</span> 
{errors.password &&
<span className="text-red-600">
{errors.password}
</span>
}
</div> 
 
{errors.password&&
<ul className="text-white m-4">
<li className="list-disc p-1">At least two uppercase letters.</li>
<li className="list-disc p-1">At least one special character from the set !@#$&*.</li>
<li className="list-disc p-1">At least two digits.</li>
<li className="list-disc p-1">At least three lowercase letters.</li>
<li className="list-disc p-1">Length between 8 and 20 characters.</li>
</ul>} 
 </>

  )
}
 
export default ResetForm
