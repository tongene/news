import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
title: "Nigeria’s Government & Policy Hub",
description:
"Explore Nigeria’s evolving government reforms, regulations, and public sector initiatives — from trade policy to digital governance.",
};

export default function GovernmentHubPage() {
return ( <main className="max-w-4xl mx-auto px-4 py-12"> <h1 className="text-4xl font-bold mb-6 text-indigo-800">
Nigeria’s Government & Public Policy Hub </h1> <p className="mb-8 text-gray-700 text-lg">
This page is your gateway to key coverage of Nigeria’s government initiatives, reforms, regulations, and the people shaping public policy. </p>

```
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-2">📘 Cornerstone Briefings</h2>
    <ul className="list-disc pl-6 text-blue-700">
      <li>
        <Link href="/policy-reforms-2025">Top 2025 Reforms to Watch in Nigeria</Link>
      </li>
      <li>
        <Link href="/digital-governance">Digital Governance and E-Citizenship in Nigeria</Link>
      </li>
    </ul>
  </section>

  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-2">🏛 Government Case Files</h2>
    <ul className="list-disc pl-6 text-blue-700">
      <li>
        <Link href="/trade-ministry-trends">Inside Nigeria’s Trade Ministry</Link>
      </li>
      <li>
        <Link href="/nass-bills-tracker">2025 NASS Bills Tracker</Link>
      </li>
    </ul>
  </section>

  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-2">📊 Regulation & Oversight</h2>
    <ul className="list-disc pl-6 text-blue-700">
      <li>
        <Link href="/anti-corruption-updates">EFCC & ICPC: New Anti-Corruption Push</Link>
      </li>
      <li>
        <Link href="/public-sector-wages">What’s Changing with Public Sector Wages?</Link>
      </li>
    </ul>
  </section>

  <p className="mt-10 text-sm text-gray-500">
    📌 Last updated: July 2025
  </p>
</main>


);
}
