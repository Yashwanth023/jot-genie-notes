
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthStatus } from "@/types";
import Dashboard from "./Dashboard";
import Auth from "./Auth";

const Index = () => {
  const { status } = useAuth();
  
  // Add pulse animation while loading
  if (status === AuthStatus.Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Render dashboard if authenticated, auth page otherwise
  return status === AuthStatus.Authenticated ? <Dashboard /> : <Auth />;
};

export default Index;
