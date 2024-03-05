import { subscribe } from "@/actions/subscribe"

import { Button } from "@/components/ui/button"

function SubscribeButton({ children }: { children: React.ReactNode }) {
   return (
      <form action={subscribe}>
         <Button type="submit" variant={"secondary"}>
            {children}
         </Button>
      </form>
   )
}
export default SubscribeButton
