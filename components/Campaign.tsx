"use client"
import { useState } from "react";

export default function SendCampaign({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  
  const campaignSend = async () => {
    setLoading(true); 
    const res = await fetch(`/api/campaigns/${campaignId}/send`, {
      method: "POST",
    })  
    setLoading(false);
  };

  return (
    <div>
      <button onClick={campaignSend} disabled={loading}>
        {loading ? "Sending..." : "Send Campaign"}
      </button>
    </div>
  );
}

