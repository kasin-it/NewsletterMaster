import { subscribe } from "@/actions/subscribe"

import { Button } from "@/components/ui/button"

function SubscribeButton() {
   return (
      <form action={subscribe} method="POST">
         <Button type="submit">Subscribe</Button>
      </form>
   )
}
export default SubscribeButton
