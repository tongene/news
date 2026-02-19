import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button"; 
import ResetForm from "../reset-form"; 

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
 }) { 
 const searchParams = await props.searchParams; 
  return (  
    <div className='login_form flex flex-col items-center justify-center bg-gray-800 m-auto max-w-7xl'> 
     <form className="w-96 flex flex-col gap-2.5 p-5 rounded tracking-wider" noValidate>
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
   <ResetForm/>
   <SubmitButton formAction={resetPasswordAction} className="w-max">
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>  
    </div>
 );
}
