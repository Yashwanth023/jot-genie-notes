
import AuthTabs from "@/components/auth/AuthTabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">JotGenie</h1>
          <p className="text-muted-foreground">Your AI-powered notes app</p>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}
