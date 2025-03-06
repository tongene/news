
import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
    const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  );
}
