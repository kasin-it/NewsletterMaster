"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

function SignInWithProviders() {
   const [isLoading, setIsLoading] = useState(false)
   const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )

   const { toast } = useToast()

   async function signInWithGithub() {
      try {
         setIsLoading(true)
         const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
         })
         setIsLoading(false)

         if (error) {
            console.error("GitHub sign-in error:", error)
            toast({
               title: "Uh oh! Something went wrong.",
               variant: "destructive",
            })
            return
         }
      } catch (error) {
         console.error("An unexpected error occurred:", error)
         toast({
            title: "Uh oh! Something went wrong.",
            variant: "destructive",
         })
         return
      }
   }

   return (
      <>
         <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={signInWithGithub}
         >
            {isLoading ? (
               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            GitHub
         </Button>
      </>
   )
}

export default SignInWithProviders
