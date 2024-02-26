import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"

function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <DashboardHeader />
         {children}
         <Footer />
      </>
   )
}
export default DashboardLayout
