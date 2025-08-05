import AllBirthdays from "@/components/AllBirthdays" 
import StructuredData from "@/components/StructuredData"
import { createClient } from "@/utils/supabase/server"  
import { BlogPosting, WithContext } from "schema-dts"

const BdaysPage = async() => {
     const forumBdays =async ()=>{
        const supabase = await createClient()
        const { data: bday, error } = await supabase
        .from('b_day')
        .select('*')
 
        if(error)throw new Error('An Error has Occured')
          return bday  
      }
 const data = await forumBdays()
 const peopleObj = data.map((dy)=> dy.person_obj) 
  
  return (  
    <div>  
    <AllBirthdays data={peopleObj} datax={data} /> 
    </div>
  )
}

export default BdaysPage
