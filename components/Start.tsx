"use client"

import { CampaignProps } from "@/app/dashboard/new/page";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
const supabase = createClient()
const Start = ({campaigns}:{campaigns: CampaignProps[]}) => {
  const router = useRouter()
     const API_URL = process.env.BACKEND_URL || 'http://34.116.251.165:4000';
     //${API_URL}
     //https://culturays.com/mailer/admin/send-send-newsletter
      
    async function sendNewsletter() {
    const res=await fetch(`http://localhost:4000/admin/send-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({campaigns})
    })
const ids = campaigns.map(c => c.id);
     const { data, error } = await supabase
      .from("campaigns") 
      .update({ status: "sent" })
      .in("id", ids)
      .select()
     router.refresh()
      
     //console.log (`Scheduled ${data.scheduled} emails`)
    }
  return (
   
 <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Campaigns
          </h2>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition">
            + New Campaign
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {campaigns.map((item) => (
                <tr
                
                  key={item.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                   onClick={sendNewsletter} >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.title}
                  </td>

                  <td className="px-6 py-4"title="send newsletter" onClick={sendNewsletter}>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Sent"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600" >
                    {item?.sent_at}
                  </td>

                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-orange-500 hover:text-orange-700 font-medium">
                      Edit
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   
  )
}

export default Start
