
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, signOut } = useAuth();
  const [dark, setDark] = useState(true);

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const handleThemeToggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-sidebar-border bg-gradient-to-r from-background to-sidebar/90 shadow-lg supports-[backdrop-filter]:bg-background/60 px-0">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl gold-text tracking-widest mr-2 drop-shadow-lg">
            JotGenie
          </span>
          <Button
            variant="ghost"
            size="icon"
            title={dark ? "Switch to light" : "Switch to dark"}
            className="rounded-full hover:bg-sidebar-primary/10 transition"
            onClick={handleThemeToggle}
          >
            {dark ? <Sun className="text-sidebar-primary" /> : <Moon />}
          </Button>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition"
              title="Team"
            >
              <Users className="text-primary" size={22} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 bg-secondary-foreground">
                    <AvatarFallback className="font-bold text-lg gold-text">{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover rounded-xl shadow-lg">
                <DropdownMenuItem className="font-medium">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="hover:text-destructive font-semibold">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition"
              title="Settings"
            >
              <Settings className="text-primary" size={22} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

