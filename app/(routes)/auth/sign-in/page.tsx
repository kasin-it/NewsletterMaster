"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBrowserClient } from "@supabase/ssr"
import { AlertTriangle } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/ui/logo"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import SignInWithProviders from "@/components/sign-in-providers"

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
   email: z.string(),
   password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
})

export default function SignInPage() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
   })

   const { toast } = useToast()

   const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
      const supabase = createBrowserClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL!,
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: _, error } = await supabase.auth.signInWithPassword({
         email: formData.email,
         password: formData.password,
      })
      if (error) {
         toast({
            title: error.message,
            variant: "destructive",
         })
         return
      }

      window.location.href = "/dashboard"
   }

   return (
      <>
         <Link
            href="/auth/sign-up"
            className={cn(
               buttonVariants({ variant: "ghost" }),
               "absolute right-10 top-7"
            )}
         >
            Sign Up
         </Link>
         <div className="absolute left-10 top-9 text-lg text-black lg:hidden">
            <Logo />
         </div>
         <div className="flex h-full items-center lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col space-y-2 text-left">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Sign in to
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     Enter your email below to sign in
                  </p>
               </div>
               <div className={"grid gap-6"}>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                     <div className="grid gap-6">
                        <div className="grid gap-1">
                           <Label
                              className="text-muted-foreground"
                              htmlFor="email"
                           >
                              Email
                           </Label>
                           <div className="relative flex gap-3">
                              <Input
                                 id="email"
                                 placeholder="name@example.com"
                                 type="email"
                                 autoCapitalize="none"
                                 autoComplete="email"
                                 autoCorrect="off"
                                 disabled={isSubmitting}
                                 {...register("email")}
                              />
                              {errors.email ? (
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger className="absolute bottom-2 right-2">
                                          <AlertTriangle className="text-red-500" />
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p>{errors.email.message}</p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              ) : null}
                           </div>
                        </div>
                        <div className="grid gap-1">
                           <Label
                              className="text-muted-foreground"
                              htmlFor="password"
                           >
                              Password
                           </Label>

                           <div className="relative flex gap-3">
                              <Input
                                 id="password"
                                 placeholder="******"
                                 type="password"
                                 autoCapitalize="none"
                                 autoComplete="password"
                                 autoCorrect="off"
                                 disabled={isSubmitting}
                                 {...register("password")}
                              />
                              {errors.password ? (
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger className="absolute bottom-2 right-2">
                                          <AlertTriangle className="text-red-500" />
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p>{errors.password.message}</p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              ) : null}
                           </div>
                        </div>
                        <Button disabled={isSubmitting} type="submit">
                           {isSubmitting && (
                              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                           )}
                           Sign In
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
                  <SignInWithProviders />
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
