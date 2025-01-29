import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegister } from "@/hooks"

export default function RegisterForm() {
  const {formik, isPending} = useRegister();

  return (
    <Card className="w-full max-w-md bg-[#1E1E1E] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
      </CardHeader> 
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#00BFFF] hover:bg-[#33CCFF] text-white" disabled={isPending}>
            {isPending ? "Loading..." : "Register"}
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