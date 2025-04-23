import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl shadow-card px-2 py-1 glass-card animate-fade-in">
      <CardHeader>
        <div className="flex flex-col items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-primary/10">
            <User className="text-primary" size={28} />
          </span>
          <CardTitle className="text-3xl font-bold text-gradient-primary">
            Create an account
          </CardTitle>
        </div>
        <CardDescription className="text-center">
          Start your <span className="gold-text font-semibold">JotGenie</span> journey
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium gold-text">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              className="bg-secondary/50 text-foreground border border-primary/20 focus:ring-primary"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium gold-text">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              className="bg-secondary/50 text-foreground border border-primary/20 focus:ring-primary"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full font-bold bg-gradient-to-r from-primary to-sidebar-primary text-secondary-foreground hover:opacity-90 shadow-lg border-none"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
