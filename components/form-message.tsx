"use client"
export type Message =
  | { success: string }
  | { error: string }
  | { message: string } 
  | { name: string } 
  | { confirm: string } 
export function FormMessage({ message }: { message: Message }) {
 
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-foreground border-l-2 border-foreground p-4 dark:text-white text-black mt-4 bg-foreground/10 text-center">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-foreground border-l-2 border-foreground p-4 text-black dark:text-white mt-4 bg-foreground/10 text-center">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 border-foreground p-4 text-black dark:text-white mt-4 bg-foreground/10 text-center">{message.message}</div>
      )}
       {"name" in message && (
        <div className="text-foreground border-l-2 border-foreground p-4 text-black dark:text-white mt-4 bg-foreground/10 text-center">{message.name}</div>
      )}
        {"confirm" in message && (
        <div className="text-foreground border-l-2 border-foreground p-4 text-black dark:text-white mt-4 bg-foreground/10 text-center">{message.confirm}</div>
      )}
    </div>
  );
}
