 
import {google} from 'googleapis'
import { type NextRequest, NextResponse } from 'next/server';
export async function POST(req:NextRequest){

    if(req.method !== "POST"){
        return NextResponse.json({ message: 'Posts Only'}, {status:405})
    }
  
 
try{ 
    const resp = await req.json()
const auth = new google.auth.GoogleAuth( {
    credentials:{
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes:[
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.file',
'https://www.googleapis.com/auth/spreadsheets',
    ]
})  
const sheets= google.sheets({
    auth,
    version: 'v4'
})

const response =await sheets.spreadsheets.values.append({
    spreadsheetId:process.env.SPREADSHEET_NEWSLETTER_ID,
    range:'A1:B1',     
    valueInputOption: 'USER_ENTERED',
    requestBody:{
        values:  [
            [resp.name, resp.email]
        ],
    }
})

return NextResponse.json({ message: response }, {status:200}) 

}catch(err){
return NextResponse.json({ message: err }, {status:400})

}
}

