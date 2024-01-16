import LandingNavbar from "@/components/landing-navbar"

function LandingPageLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <LandingNavbar />
         {children}
      </>
   )
}
export default LandingPageLayout
