import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/shared/hooks";
import { validateEmail, validatePassword } from "@/shared/helpers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPassValid = useMemo(() => validatePassword(password), [password]);

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEmailValid || !isPassValid) {
      setShowError(true);
      return;
    }
    await login({ email, password });
  };

  useEffect(() => {
    setShowError(false);
  }, [email, password]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 mx-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={
                  showError && !isEmailValid ? "Invalid email address" : null
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={
                  showError && !isPassValid
                    ? "Password must be 6+ chars with upper, lower, and special character."
                    : null
                }
              />
            </div>
            <Button
              className="w-full relative mt-4"
              onClick={onLogin}
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
