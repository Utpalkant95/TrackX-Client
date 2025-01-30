import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const { formik, isPending } = useLogin();
  return (
    <Card className="w-full max-w-md bg-[#1E1E1E] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4" autoComplete="off">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              autoComplete="email"
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="current-password"
              name="password"
              className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#00BFFF] hover:bg-[#33CCFF] text-white"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-[#00BFFF] hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
