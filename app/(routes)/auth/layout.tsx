import { Metadata } from "next"

import Logo from "@/components/ui/logo"

export const metadata: Metadata = {
   title: "Authentication",
   description: "Authentication forms built using the components.",
}

export default function AuthLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
         <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            {/* <Image
               src={"/image.webp"}
               alt="ai generated image"
               width={720}
               height={720}
               className="absolute bottom-0 z-50"
            /> */}
            <div className="relative z-20 flex items-center text-lg font-medium">
               <Logo />
            </div>
            <div className="relative z-20 mt-auto">
               <blockquote className="space-y-2">
                  <p className="text-lg">
                     &ldquo;This library has saved me countless hours of work
                     and helped me deliver stunning designs to my clients faster
                     than ever before.&rdquo;
                  </p>
                  <footer className="text-sm">Sofia Davis</footer>
               </blockquote>
            </div>
         </div>
         {children}
      </div>
   )
}
