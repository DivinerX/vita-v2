"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToneSelector } from "@/components/signup/tone-selector";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import api from "@/config/axios";
import { signupSchema } from "@/types/signup";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [vitaName, setVitaName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const result = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        vitaName: formData.get("vitaName"),
        vitaTone: formData.get("vitaTone"),
      });

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
      await api.post('/auth/register', result.data);
      toast.success('Registration successful. Please check your email for verification.');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      setErrors({ form: ['Registration failed. Please try again.'] });
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
            {errors.form && <p className="text-red-500 text-sm">{errors.form.join(", ")}</p>}
            <div className="space-y-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.join(", ")}</p>}
            </div>

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

            <div className="space-y-3">
              <Label htmlFor="vita-name">Name Your Vita</Label>
              <Input
                id="vita-name"
                name="vitaName"
                placeholder="Emma, Leo, etc."
                value={vitaName}
                onChange={(e) => setVitaName(e.target.value)}
                required
              />
              {errors.vitaName && <p className="text-red-500 text-sm">{errors.vitaName.join(", ")}</p>}
            </div>

            <div className="space-y-3">
              <Label>Select Vita's Tone</Label>
              <ToneSelector name="vitaTone" selectedTone={selectedTone} setSelectedTone={setSelectedTone} />
              {errors.vitaTone && <p className="text-red-500 text-sm">{errors.vitaTone.join(", ")}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full py-6 bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Unlocking..." : "Unlock Your Health Now"}
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
              Already have an account? <Link href="/signin" className="text-blue-500 hover:text-blue-600">Sign in</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}