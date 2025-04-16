
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AppHeaderProps {
  title: string;
  onLogout?: () => void;
}

export default function AppHeader({ title, onLogout }: AppHeaderProps) {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=80&h=80&q=80" 
            alt="Green Harvest Network" 
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold text-green-700">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <>
              {user.role === "buyer" ? (
                <Link to="/buyer-dashboard">
                  <Button variant="link" className="text-green-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/seller-dashboard">
                  <Button variant="link" className="text-green-700">
                    Dashboard
                  </Button>
                </Link>
              )}
              
              {onLogout && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
