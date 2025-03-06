"use server"
import mime from  'mime' ; 
import path, { join }  from'path'   
import { createClient } from './supabase/server';
import axios from 'axios'; 

 async function getFileNameFromSilverBirds(url:string) { 
 if(url=== undefined )return
 let urlString = url?.split(' ')?.slice(-2)[0];
let pathname = '';

if (urlString) {
  try { 
      pathname = new URL(urlString).pathname;
  } catch (err) { 
      pathname = urlString;
  }
}
const basename = path.basename(pathname || '');
 return basename
  }


  async function downloadSBImage(url: string) {
    if (url === undefined || url.trim() === '') {
        console.error('URL is undefined or empty');
        return;
    }

    try {
        const extractedUrl = url.split(' ').slice(-2)[0];
       // console.log('Extracted URL:', extractedUrl);

        if (!extractedUrl || !/^https?:\/\/.+$/.test(extractedUrl)) {
            throw new Error(`Invalid URL: ${extractedUrl}`);
        }

        const response = await axios.get(extractedUrl, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error downloading the file');
    }
}


   export async function processSbImages(url:string ) { 
 if(url=== undefined )return
  const fileName = await getFileNameFromSilverBirds(url) as string
        const fileBuffer:any = await downloadSBImage(url)
         const mimeType = mime.getType(fileName);
       
         const supabase = await createClient()
         if(fileName=== undefined )return   
          if(mimeType !== null){
         const { error } = await supabase.storage
               .from('cinema_imgs') 
               .upload(fileName, fileBuffer, {contentType: mimeType, upsert: true, cacheControl: '3600', }); 
             if (error instanceof Error){ 
              console.log(error)
              throw new Error(error.message);
            } 
   }       
    // console.log(`File uploaded as ${fileName}`);
       //const imgX = await uploadImageToSupabase(fileName, fileBuffer, mimeType) 
  return fileName
 
  }
   