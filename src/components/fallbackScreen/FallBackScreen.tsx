import { Loader2 } from "lucide-react"

const  FallbackScreen = ()  =>{
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] text-white">
      <div className="flex flex-col items-center space-y-4">
        <span className="text-3xl font-bold">
          Track<span className="text-[#00BFFF]">X</span>
        </span>
        <Loader2 className="h-12 w-12 animate-spin text-[#00BFFF]" />
        <p className="text-lg">Loading your fitness journey...</p>
      </div>
    </div>
  )
}

export default FallbackScreen