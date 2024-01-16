import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function Home() {
   return (
      <main className="">
         <div className="container">
            <Card className="relative flex items-center justify-center overflow-hidden rounded-3xl border-foreground bg-background">
               <Image
                  src="/home-bg.webp" // Corrected the path
                  alt="home background"
                  // width={1368}
                  // height={680}
                  fill
                  className="z-0 object-cover object-bottom"
                  draggable={false}
               />
               <section className="z-20 flex flex-col items-center gap-12 px-4 py-32">
                  <h1 className="text-pretty bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text py-2 text-center text-3xl font-bold text-transparent sm:text-5xl">
                     Generative AI Platform for <br />
                     Creating Your Own Influencer
                  </h1>
                  <Button
                     className="rounded-xl border border-foreground py-8 text-sm font-semibold"
                     size={"lg"}
                     variant={"outline"}
                  >
                     GET STARTED FOR FREE
                  </Button>
               </section>
            </Card>
         </div>
      </main>
   )
}

export default Home
