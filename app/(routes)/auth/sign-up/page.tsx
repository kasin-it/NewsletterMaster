"use client"

import { useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function SignUpPage() {
   const [isLoading, setIsLoading] = useState<boolean>(false)

   async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault()
      setIsLoading(true)

      setTimeout(() => {
         setIsLoading(false)
      }, 3000)
   }

   return (
      <>
         <Link
            href="/auth/sign-in"
            className={cn(
               buttonVariants({ variant: "ghost" }),
               "absolute right-4 top-4 md:right-8 md:top-8"
            )}
         >
            Sign In
         </Link>
         <div className="flex h-full items-center lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     Enter your email below to create your account
                  </p>
               </div>
               <div className={"grid gap-6"}>
                  <form onSubmit={onSubmit}>
                     <div className="grid gap-6">
                        <div className="grid gap-1">
                           <Label
                              className="text-muted-foreground"
                              htmlFor="email"
                           >
                              Email
                           </Label>
                           <Input
                              id="email"
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={isLoading}
                           />
                        </div>
                        <div className="grid gap-1">
                           <Label
                              className="text-muted-foreground"
                              htmlFor="username"
                           >
                              Username
                           </Label>
                           <Input
                              id="username"
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="username"
                              autoCorrect="off"
                              disabled={isLoading}
                           />
                        </div>
                        <div className="grid gap-1">
                           <Label
                              className="text-muted-foreground"
                              htmlFor="password"
                           >
                              Password
                           </Label>
                           <Input
                              id="password"
                              placeholder="name@example.com"
                              type="password"
                              autoCapitalize="none"
                              autoComplete="password"
                              autoCorrect="off"
                              disabled={isLoading}
                           />
                        </div>
                        <Button disabled={isLoading}>
                           {isLoading && (
                              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                           )}
                           Sign Up
                        </Button>
                     </div>
                  </form>
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                           Or continue with
                        </span>
                     </div>
                  </div>
                  <Button variant="outline" type="button" disabled={isLoading}>
                     {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                     ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                     )}{" "}
                     GitHub
                  </Button>
               </div>

               <p className="px-8 text-center text-sm text-muted-foreground">
                  By clicking continue, you agree to our{" "}
                  <Link
                     href="/terms"
                     className="underline underline-offset-4 hover:text-primary"
                  >
                     Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                     href="/privacy"
                     className="underline underline-offset-4 hover:text-primary"
                  >
                     Privacy Policy
                  </Link>
                  .
               </p>
            </div>
         </div>
      </>
   )
}
