/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
const nextConfig: NextConfig ={
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
        source: '/news/tech/:path*',
        destination: '/news/',
        permanent: true,
      },    
       {
        source: '/africa/news/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/topic/:path*',
        destination: '/news/:path*',
        permanent: true,
      } 
      ,
      {
        source: '/naija-events/event/:path*',
        destination: '/event/:path*',
        permanent: true,
      },
       {
        source: '/news/health/:path*',
        destination: '/news/:path*',
        permanent: true,
      } ,
       {
        source: '/news/technology/:path*',
        destination: '/news/:path*',
        permanent: true,
      } 
      , 
      {
        source: '/news/article/:path+',
        destination: '/news/:path*',
        permanent: true,
      }
       //  ,
      //      {
      //   source: '/forum/post/:path*',
      //   destination: '/post/:path*', 
      //   permanent: true,
      // }
      ,
      {
        source: '/news/economy/',
        destination: '/news/articles/', 
        permanent: true,
      }
        ,
      {
        source: '/news/trending/:path*',
        destination: '/trending/:path*', 
        permanent: true,
      } ,
        
      {
        source: '/news/business/',
        destination: '/news/articles/', 
        permanent: true,
      }, 
      {
        source: '/news/economy/:path*',
        destination: '/news/:path*',
        permanent: true,
      }  ,
      {
        source: '/news/environment/',
        destination: '/news/articles/', 
        permanent: true,
      }
        , 
      {
        source: '/news/environment/:path*',
        destination: '/news/:path*',
        permanent: true,
      }, 
      {
        source: '/news/nollywood/:path+',
        destination: '/news/:path*',
        permanent: true,
      }
         , 
      {
        source: '/news/award/',
        destination: '/news/nollywood/',
        permanent: true,
      },  
       
      {
        source: '/news/award/:path*',
        destination: '/news/:path*',
        permanent: true,
      },  
       
      {
        source: '/news/business/:path*',
        destination: '/news/:path*', 
        permanent: true,
      },

      {
        source: '/naija-wiki/characters/:path*',
        destination: '/characters/:path*',
        permanent: true,
      },
      {
        source: '/naija-wiki/',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/naija-wiki/movies/:path*',
        destination: '/movies/:path*',
        permanent: true,
      },
      {
        source: '/netflix-naija/coming-to-netflix/:path+',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/netflix-naija/coming-to-netflix/',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/netflix-naija/new-on-netflix/:path+',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/netflix-naija/new-on-netflix/',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/naija-wiki/character/:path*',
        destination: '/character/:path*',
        permanent: true,
      },
       {
        source: '/moviewikiafrica/wiki/:path*',
        destination: '/character/:path*',
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
        destination: '/news/nollywood/',
        permanent: true,
      },
        {
        source: '/newonnetflix/naija/:path*',
        destination: '/news/nollywood/',
        permanent: true,
      },  
       {
        source: '/comingtonetflix',
        destination: '/news/nollywood/',
        permanent: true,
      },
      {
        source: '/newonnetflix',
        destination: '/naija-wiki/',
        permanent: true,
      },
       {
        source: '/news/local',
        destination: '/news/',
        permanent: true,
      },
       {
        source: '/news/foreign',
        destination: '/news/',
        permanent: true,
      },
       {
        source: '/search-page',
        destination: '/search/',
        permanent: true,
      },
       {
        source: '/innews/newspost/',
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
  async rewrites() {
    return [
      {
        source: "/llms.txt",
        destination: "/api/llms",
      },
    ];
  },
 
//trailingSlash: true,
 skipTrailingSlashRedirect: true,
// experimental: {
//   taint: true, 

// },

};
 
export default nextConfig;