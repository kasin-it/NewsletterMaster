"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const formSchema = z.object({
   email: z.string().email(),
})

type FormData = z.infer<typeof formSchema>

function NewsletterForm({ url }: { url: string }) {
   const [isSubscribed, setIsSubscribed] = useState(false)

   const { register, handleSubmit } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
   })

   const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
      setIsSubscribed(true)
      await axios.post(url, formData)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-auto">
         <div className="mx-auto flex max-w-xs flex-col justify-center sm:max-w-md sm:flex-row lg:mx-0">
            {isSubscribed ? (
               <p className="text-secondary">You have subscribed</p>
            ) : (
               <>
                  <Input
                     type="email"
                     className="form-input mb-2 w-full appearance-none rounded-sm border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-gray-600 sm:mb-0 sm:mr-2"
                     placeholder="Your email…"
                     aria-label="Your email…"
                     {...register("email")}
                  />
                  <Button className="btn bg-blue-600 text-white shadow hover:bg-blue-700">
                     Subscribe
                  </Button>
               </>
            )}
         </div>
         {/* Success message */}
         {/* <p className="text-sm text-gray-400 mt-3">Thanks for subscribing!</p> */}
         <p className="mt-3 text-sm text-gray-400">
            No spam. You can unsubscribe at any time.
         </p>
      </form>
   )
}
export default NewsletterForm
