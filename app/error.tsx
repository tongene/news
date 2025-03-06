"use client"
import Link from "next/link"; 

 const Error=({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
})=> { 
    return (
      <div className="h-max"> 
      <div className="grid h-screen px-4 bg-opacity-80 place-content-center border border-b-4 border-b-green-600">
        <div className="text-center bg-black text-white dark:bg-white dark:text-black text-3xl md:text-7xl p-8">
          <h1 className=""> An Error has occured!</h1>   
   
        </div>
      </div>
      <div className="bg-green-600 text-center bg-opacity-30">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-block px-5 py-3 m-6 text-sm text-gray-700 bg-white rounded hover:bg-gray-300 font-bold focus:outline-none focus:ring"
          > 
            Try Again 
          </button>
        
          <Link href='/'><button
            type="button"
            className="inline-block px-5 py-3 m-6 text-sm text-gray-700 bg-white rounded hover:bg-gray-300 font-bold focus:outline-none focus:ring"
          > 
            Go Back 
          </button></Link>  
          </div>
      </div>
    );
  }

  export default Error