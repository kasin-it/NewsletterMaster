import { Separator } from "@/components/ui/separator"

function SendEmails() {
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
      </main>
   )
}
export default SendEmails
