import SendCampaign from "@/components/Campaign";
//URL → page → component → api → fastify → queue → worker → mailgun

export default async function CampaignPage({
  params,
}: {
  params: { id: string };
}) {
 
  const {id} =await params;
 
  return (
    <div>
      <h1>Subject Here</h1>
      <SendCampaign campaignId={id} />
    </div>
  );
}
