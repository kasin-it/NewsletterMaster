import Features from "@/components/features"
import FeaturesBlocks from "@/components/features-blocks"
import Hero from "@/components/hero"
import Newsletter from "@/components/newsletter"
import Testimonials from "@/components/testimonials"

export const metadata = {
   title: "Home - Simple",
   description: "Page description",
}

export default function Home() {
   return (
      <>
         <Hero />
         <Features />
         <FeaturesBlocks />
         <Testimonials />
         <Newsletter />
      </>
   )
}
