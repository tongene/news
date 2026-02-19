"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Unsubscribe() {
const { token } = useParams();
const [status, setStatus] = useState("Processing...");

useEffect(() => {
fetch(`${process.env.NEXT_PUBLIC_BACKEND}/unsubscribe/${token}`, {
method: "POST",
}).then(() => setStatus("You have been unsubscribed."));
}, []);

return ( <div className="max-w-xl mx-auto mt-20 text-center"> <h1 className="text-2xl font-bold">Newsletter Preferences</h1> <p className="mt-6">{status}</p> </div>
);
}
