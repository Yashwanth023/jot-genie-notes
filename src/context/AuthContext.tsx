
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthStatus, User } from "@/types";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  status: AuthStatus;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Loading);
  const { toast } = useToast();

  // This is a mock authentication for demo purposes
  // In a real app, this would connect to Supabase
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus(AuthStatus.Authenticated);
    } else {
      setStatus(AuthStatus.Unauthenticated);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - in a real app, this would call Supabase
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      // Create a mock user
      const newUser = {
        id: crypto.randomUUID(),
        email,
      };
      
      setUser(newUser);
      setStatus(AuthStatus.Authenticated);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${email}!`,
      });
    } catch (error) {
      toast({
        title: "Failed to sign in",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Mock sign up - in a real app, this would call Supabase
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Create a mock user
      const newUser = {
        id: crypto.randomUUID(),
        email,
      };
      
      setUser(newUser);
      setStatus(AuthStatus.Authenticated);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Successfully created your account!",
      });
    } catch (error) {
      toast({
        title: "Failed to create account",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    // Mock sign out
    setUser(null);
    setStatus(AuthStatus.Unauthenticated);
    localStorage.removeItem("user");
    localStorage.removeItem("notes");
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, status, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
