import Footer from "@/components/footer"
import Header from "@/components/header"

function HomeLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}
export default HomeLayout
