import { useState } from "react"
import { User, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, password, confirmPassword })
  }

  return (
    <Card className="w-full max-w-md bg-[#1E1E1E] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
      </CardHeader> 
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#00BFFF] hover:bg-[#33CCFF] text-white">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#00BFFF] hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

