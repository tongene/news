"use client";
 
import { useFormStatus } from "react-dom"; 
import { type ComponentProps } from "react"
import { Button } from "@/components/ui/button";
type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};
export function SubmitButton({ children, pendingText, ...props }: Props ) {
 const { pending, action } = useFormStatus();
 const isPending = pending && action === props.formAction;   
  return (
     <button {...props} type="submit" aria-disabled={pending} className="text-white block border-none p-3 hover:text-gray-300 text-lg " >
      {isPending ? pendingText :children }
    </button>  
 
  
  );
}
