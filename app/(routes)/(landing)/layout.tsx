import Footer from "@/components/footer"
import Header from "@/components/header"

function LandingPageLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}
export default LandingPageLayout
