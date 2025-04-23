
import AuthTabs from "@/components/auth/AuthTabs";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#202230] via-[#141726] to-[#181c22]">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter text-gradient-primary mb-1">
            <span className="gold-text">JotGenie</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Night-mode AI-powered notes app
          </p>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}
