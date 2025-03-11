import AllBirthdays from "@/components/AllBirthdays"
import { createClient } from "@/utils/supabase/server"


const BdaysPage = async() => {
     const forumBdays =async ()=>{
        const supabase = await createClient()
        const { data: bday, error } = await supabase
        .from('bday')
        .select('*')
        if(error)throw new Error('An Error has Occured')
          return bday  
      }
       const data = await forumBdays()
  return (
    <div>
      <AllBirthdays data={data} />
    </div>
  )
}

export default BdaysPage
