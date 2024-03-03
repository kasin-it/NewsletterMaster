import { Loader2 } from "lucide-react"

function LoadingState() {
   return (
      <div className="flex aspect-video w-full items-center justify-center">
         <Loader2 className=" animate-spin" />
      </div>
   )
}
export default LoadingState
