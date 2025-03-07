import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server" 
 
export async function GET() {
    await new Promise((resolve)=> {
      setTimeout(()=>{
      resolve(true)
        },5000)
       })
       const forumBdays =async ()=>{
        const supabase =await createClient()
        const { data: bday, error } = await supabase
        .from('bday')
        .select('*')
        if(error)throw new Error('An Error has Occured')
        return bday
      }
      
       const bday =await forumBdays() 
    return NextResponse.json({bday }, {status:200})
  }