import { unsubscribe } from "@/actions/unsubscribe"

import { Button } from "@/components/ui/button"

function UnSubscribeButton({ children }: { children: React.ReactNode }) {
   return (
      <form action={unsubscribe}>
         <Button type="submit" variant={"secondary"}>
            {children}
         </Button>
      </form>
   )
}
export default UnSubscribeButton
