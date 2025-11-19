"use server"
import mime from 'mime' ; 
import path, { join }  from'path'   
import { createClient } from './supabase/server';
import axios from 'axios'; 

 async function getFileNameFromUrl(url :string ) {
  if(url=== undefined )return
    try{
   return path.basename(new URL(url ).pathname); 
    }catch(error){
      console.log(error)
    }
     
    }
  
    async function downloadImage(url:string) {  
      if(url=== undefined )return
        try {
          const response = await axios.get(url, { responseType: 'arraybuffer' }, );
          return Buffer.from(response.data, 'binary');
        } catch (error) { 
           console.error('Error downloading the file:');
           throw new Error('Error downloading the file:');
        }
      }


      export async function processImgs(url:string, location:string) { 
        if(url=== undefined )return 
            const fileName = await getFileNameFromUrl(url) as string; 
            const fileBuffer = await downloadImage(url) as Buffer; 
             const mimeType = mime.getType(fileName)as string; 
             const supabase = await createClient() 
             if(mimeType !== null && fileName !== undefined|| fileName.endsWith('jpg')|| fileName.endsWith('png')){  
             const { error } = await supabase
                    .storage
                   .from(location) 
                   .upload(fileName , fileBuffer, {contentType: mimeType, upsert: true ,cacheControl: '3600', });
             if(error){ 
                console.log(error)
                  return
             }
      } 
      //      if(mimeType !== null && fileName !== undefined|| !fileName.endsWith('jpg')|| !fileName.endsWith('png')){  
      //        const { error } = await supabase
      //               .storage
      //              .from(location) 
      //              .upload(fileName , fileBuffer, {contentType: mimeType, upsert: true ,cacheControl: '3600', });
      //        if(error){ 
      //           console.log(error)
      //             return
      //        }
      // } 
          //console.log(`File uploaded as ${fileName}`);
         // const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType);
     
        return fileName
      
      }
    
    