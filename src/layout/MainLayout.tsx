
import { Navbar } from "@/components/navbar"
import { Outlet } from "react-router-dom"

// const geistSans = Geist({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })
// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

// export const metadata: Metadata = {
//   title: "TrackX - Gym Tracking App",
//   description: "Track your workouts and progress with TrackX",
// }

const MainLayout = () => {
  return (
      <main className={`font-sans antialiased bg-[#121212] text-white`}>
        <Navbar />
        <div className="pt-16">
            <Outlet />
        </div>
      </main>
  )
}

export default MainLayout