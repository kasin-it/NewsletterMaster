import { Loader2 } from "lucide-react"

function LoadingState() {
   return (
      <div className="flex aspect-square w-full max-w-2xl items-center justify-center">
         <Loader2 className=" animate-spin" />
      </div>
   )
}
export default LoadingState
