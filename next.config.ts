/** @type {import('next').NextConfig} */
const nextConfig = {
  
  env: {
      GOOGLE_AUTH_CLIENT_ID:process.env.GOOGLE_AUTH_CLIENT_ID,
      GOOGLE_AUTH_CLIENT_SECRET:process.env.GOOGLE_AUTH_CLIENT_SECRET,
      NEXT_PUBLIC_SUPABASE_ANON_KEY:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXTAUTH_URL:process.env.NEXTAUTH_URL,
      NEXTAUTH_URL_INTERNAL:process.env.NEXTAUTH_URL_INTERNAL,
      NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
      MAIL_GUN_API_KEY:process.env.MAIL_GUN_API_KEY,
      SUPABASE_SERVICE_ROLE_SECRET:process.env.SUPABASE_SERVICE_ROLE_SECRET,
      SUPABASE_PUBLIC_POST_IMAGE_URL:process.env.SUPABASE_PUBLIC_POST_IMAGE_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      EMAILJS_PUBLIC_API: process.env.EMAILJS_PUBLIC_API,
  },
   async redirects() {
    return [
         {
        source: '/world/news/:path*',
        destination: '/',
        permanent: true,
      },
        
       {
        source: '/africa/news/:path*',
        destination: '/',
        permanent: true,
      },
       {
        source: '/moviewikiafrica/wiki/:path*',
        destination: '/naija-wiki/character/:path*',
        permanent: true,
      }, 
      {
        source: '/moviewikiafrica/video/:path*',
        destination: '/news/videos/',
        permanent: true,
      },
         {
        source: '/nollywood/news/:path*',
        destination: '/news/nollywood/',
        permanent: true,
      }, 
       {
        source: '/comingtonetflix/naija/:path*',
        destination: '/netflix-naija/coming-to-netflix/',
        permanent: true,
      },
        {
        source: '/newonnetflix/naija/:path*',
        destination: '/netflix-naija/new-on-netflix/',
        permanent: true,
      },  
       {
        source: '/comingtonetflix',
        destination: '/netflix-naija/coming-to-netflix/',
        permanent: true,
      },
      {
        source: '/newonnetflix',
        destination: '/netflix-naija/new-on-netflix/',
        permanent: true,
      },
       {
        source: '/news/local',
        destination: '/news',
        permanent: true,
      },
       {
        source: '/news/foreign',
        destination: '/news',
        permanent: true,
      },
       {
        source: '/search-page',
        destination: '/search',
        permanent: true,
      },
       {
        source: '/innews/newspost',
        destination: '/',
        permanent: true,
      },
    ]
  },
 images: {
  unoptimized: true,
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
        
      },
        {  
        protocol: 'https',
        hostname: 'peezrwllibppqkolgsto.supabase.co',
        port: '',
        pathname: '/**',
        
      }, 
       {  
        protocol: 'https',
        hostname: 'content.culturays.com',
        port: '',
        pathname: '/**',
        
      },  
        {  
        protocol: 'https',
        hostname: 'culturays.com',
        port: '',
        pathname: '/**',
        
      },  
    ],
   
 
  },   
 
 
trailingSlash: true,
experimental: {
  taint: true, 
},

};

module.exports =nextConfig;
