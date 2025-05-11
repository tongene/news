const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
? `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in` 
: "http://localhost:3000/sign-in";
export const metadata = {
metadataBase: new URL(defaultUrl), 
 title:"Urban News | Sign In",  
description: "Sign in to Explore Topics",
alternates: {
  canonical: 'https://culturays.com/sign-in',

}, 
 openGraph: {
  title: 'Culturays | Sign In',
}
}; 
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start m-auto">{children}</div>
  );
}
