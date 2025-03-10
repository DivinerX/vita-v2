"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { signinSchema } from "@/types/signin";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const result = signinSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      console.log(result);

      if (!result.success) {
        const fieldErrors: { [key: string]: string[] } = {};
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field].push(issue.message);
        });
        setErrors(fieldErrors);
        return;
      }

      const response = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        callbackUrl: window.location.search.includes('callbackUrl')
          ? decodeURIComponent(window.location.search.split('callbackUrl=')[1])
          : '/dashboard',
        redirect: true,
      });
      if (response?.error) {
        setErrors({ form: ['Invalid email or password'] });
      } else {
        toast.success('Login successful. Redirecting...');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ form: ['Login failed. Please try again.'] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c')" }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Your Vita Awaits—Let's Get Started!</CardTitle>
          <CardDescription className="text-center">
            Create your personal health companion
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="hello@example.com" required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.join(", ")}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.join(", ")}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full py-6 bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <span className="relative px-2 text-sm text-muted-foreground bg-white dark:bg-gray-800">
                Or continue with
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? "Signing in..." : (
                <>
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Sign in with Google
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? <Link href="/signup" className="text-blue-500 hover:text-blue-600">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}