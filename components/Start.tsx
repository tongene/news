"use client"

import { CampaignProps } from "@/app/dashboard/new/page";

const Start = ({campaigns}:{campaigns: CampaignProps[]}) => {
     const API_URL = process.env.BACKEND_URL || 'http://34.116.251.165:4000';
     //${API_URL}
    async function sendNewsletter() {
    const res=await fetch(`https://culturays.com/mailer/admin/send-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({campaigns})
    })
    const data = await res.json()
  
     console.log (`Scheduled ${data.scheduled} emails`)
    }
  return (
    <div>      
        <table className="table-auto">
  <thead>
    <tr>
      <th>Campaigns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td onClick={sendNewsletter}>
          Send Newsletter
      </td>      
    </tr>     
  </tbody>
</table>
    </div>
  )
}

export default Start
