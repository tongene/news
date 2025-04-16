import axios from 'axios';
import http from 'http'
export const agent = new http.Agent({
  keepAlive: true,
});

// export const fetchWithRetry = async (url:string, options:{}, retries = 3) => {
//     for (let i = 0; i < retries; i++) {
//       try {
//         const response = await fetch(url, options); 
//         if (!response) {
//         // console.log(response)
//          throw new Error( response); 
//         }
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         return response.json();
//       }catch (error) {
//        // console.error(`Fetch error (attempt ${i + 1}):`, error);
//         //if (i === retries - 1) throw error;
//       }
      
//     }
//   };
  