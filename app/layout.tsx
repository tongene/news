import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import HeaderAuth from "@/components/header-auth";  
import Script from "next/script";  
import "./globals.css";
// import GoogleAnalytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Latests from "@/components/Latests";
import TabNav from "@/components/TabNav";
import SearchItems from "@/components/SearchItems";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import SocialNav from "@/components/SociaNav"; 
import { Suspense } from "react";
import type { Metadata } from 'next' 

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/`
  : "http://localhost:3000/";
 
  const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
  });


  export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#fff'},
      { media: '(prefers-color-scheme: dark)', color: '#41414f'},
   
    ],
  }

 
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Urban Naija | News, Nigeria",
  description: "This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.",

 generator: 'Urban Naija',
  applicationName: 'Urban Naija | News, Nigeria',
  referrer: 'origin-when-cross-origin',
  keywords:"News, Nigeria, Trade, Inflation, Money, CBN, Dangote, Sports, Market, Tech, Nollywood, Netflix Naija, Business, Movies, Naija Birthdays, Economy, Naija Wiki, Naija Events, Africa, Trade, Growth, Entertainment, Politics, Sports, Government, Africa, Tech, Food, Money, Lifestyle, People, Culture, Finance, Industry, Production, Conflict, GDP, Investment, Dollar, Naira, Binance, Bitcoin, Crude Oil, Gold, Mining, Stocks",
  authors: [{ name: 'Christina Ngene', url: 'https://culturays.com/creator/christina-ngene/' }],
  creator: 'Christina Ngene',
  publisher: 'Christina Ngene',
 
  openGraph: {
  title: 'Urban Naija | News, Nigeria',
  description: 'This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',
  url: 'https://culturays.com/', 
  siteName: 'Urban Naija', 
  images: [
  {
  url: 'https://culturays.com/culturays-no-bg.png',  
  width: 800,
  height: 600,
  alt: 'Urban Naija Image & Logo',
  },
    {
          url: 'https://culturays.com/culturays.png', 
          width: 800,
          height: 600,
          alt: 'Urban Naija Image & Logo',
        },
      ], 
      locale: 'en_NG',
      type: 'website',
    },
    robots: {
      // index: false,
      // follow: true,
      // nocache: true,
      googleBot: {
        index: true,
       // follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      } ,
    },
   
    icons: { 
      shortcut: ['/favicon.ico'],
      apple: [
        { url: '/favicon.ico' }, 
      ],
   
    },
  
    alternates: {
      canonical: 'https://culturays.com/', 
      languages: { 
          'en-US': '/en-US',          
      },
    },
   
   manifest: 'https://culturays.com/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: 'Urban Naija | News, Nigeria',
      description: 'This is an upcoming news outlet that gives coverage to events in Nigeria, Africa and the rest of the world.',    
      images: ['https://culturays.com/culturays-no-bg.png'],  
    },    
    
    verification: {
      google: 'google',  
    },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const GA_ID = process.env.GA_ID as string
 
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning><Script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/59a9b3a3d624c41b3150d9c6/script.js"/><Script
id='gt-manager'
strategy="afterInteractive"
dangerouslySetInnerHTML={{
  __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${process.env.GTM}')`
}

}
/><Script dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                   gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });` }}></Script><Script async strategy="afterInteractive" 
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA}`}/><Script id='google-analytics'strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA}');`, 
                }}
            /><Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.AW}`}/><Script dangerouslySetInnerHTML={{
              __html: `gtag('event', 'conversion', {'send_to': '${process.env.AW}/PeRqCICmn-MBEKrYg_UC'});`, 
              }}/><body className="bg-background text-foreground"><Script
              id="gtm-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtm.js?id='${process.env.GTM}'`}
            /><ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange 
        ><main className="m-auto"style={{maxWidth:'100%'}} ><div><Header/><SocialNav/><Nav /><Suspense fallback={<p>Loading...</p>}><TabNav /><SearchItems/></Suspense><div className="flex flex-col">{children}</div><Latests/><Footer/></div></main></ThemeProvider></body></html>
  );
}
 
