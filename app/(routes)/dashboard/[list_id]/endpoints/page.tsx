import { DatabaseIcon } from "lucide-react"

import CopyToClipboardButton from "@/components/ui/copy-to-clipboard-button"
import { Separator } from "@/components/ui/separator"

function EndpointsPage({
   params: { list_id },
}: {
   params: { list_id: string }
}) {
   const API_ENDPOINT = `${process.env.WEBSITE_URI}/api/newsletter/?id=${list_id}`

   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">My list endpoints</h1>
            <p className="text-sm text-gray-500">
               This is your API endpoint. You can use this URL to make requests
               to the API.
            </p>
         </div>
         <Separator />

         <div className="shad:overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="shad:grid-rows-2 grid gap-4 px-4 py-4 md:grid-cols-2 md:gap-0">
               <div className="flex items-center space-x-4">
                  <DatabaseIcon className="h-6 w-6 text-gray-500" />
                  <h3 className="text-lg font-medium leading-none">
                     POST API ENDPOINT
                  </h3>
               </div>
               <div className="flex items-center space-x-4 md:justify-self-end">
                  <CopyToClipboardButton value={API_ENDPOINT} />
               </div>
            </div>
            <div className="border-t border-gray-200">
               <div className="px-4 py-4">
                  <code className="select-all text-sm font-medium">
                     {API_ENDPOINT}
                  </code>
               </div>
            </div>
         </div>
      </main>
   )
}
export default EndpointsPage
