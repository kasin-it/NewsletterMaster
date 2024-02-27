import { Alert, AlertTitle } from "@/components/ui/alert"
import CopyToClipboardButton from "@/components/ui/copy-to-clipboard-button"

function EndpointsPage() {
   const API_ENDPOINT = "http://localhost:5000/form/d12312k3j12lkj31231j"

   return (
      <Alert className="w-ma">
         <AlertTitle className="text-lg font-bold uppercase">
            API ENDPOINT
         </AlertTitle>

         <div className="flex items-center gap-4">
            <div className="border p-3 px-5 ">http:sdfsdf/dd/dsfsdf</div>
            <CopyToClipboardButton value={API_ENDPOINT} />
         </div>
      </Alert>
   )
}
export default EndpointsPage
