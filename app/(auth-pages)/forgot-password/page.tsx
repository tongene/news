import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import EmailReset from "./email-reset";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className='mx-0 p-0 flex flex-col items-center justify-center w-full my-6'>
      <form className="login_form w-96 flex flex-col gap-2.5 dark:bg-gray-800 p-5 rounded tracking-wider"noValidate>
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 [&>input]:mb-3 mt-8">
          <EmailReset/> 
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

    </div>
  );
}
