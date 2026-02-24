"use client"

import { CampaignProps } from "@/app/dashboard/new/page";

const Start = ({campaigns}:{campaigns: CampaignProps[]}) => {
     const API_URL = process.env.BACKEND_URL || 'http://34.116.251.165:4000';
     //${API_URL}
    async function sendNewsletter() {
    const res=await fetch(`http://localhost:4000/admin/send-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({campaigns})
    })
    const data = await res.json()
  
     console.log (`Scheduled ${data.scheduled} emails`)
    }
  return (
    <div>
        <button onClick={sendNewsletter} style={{ marginTop: 20, padding: 12 }}>
          Send Newsletter
        </button>
    </div>
  )
}

export default Start
