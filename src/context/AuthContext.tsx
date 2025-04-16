
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Buyer, Seller } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  registerBuyer: (buyerData: Omit<Buyer, 'id'>) => void;
  registerSeller: (sellerData: Omit<Seller, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const registerBuyer = (buyerData: Omit<Buyer, 'id'>) => {
    const newBuyer: Buyer = {
      ...buyerData,
      id: `buyer-${Date.now()}`, // Simple ID generation
    };
    setUser(newBuyer);
    localStorage.setItem('user', JSON.stringify(newBuyer));
  };

  const registerSeller = (sellerData: Omit<Seller, 'id'>) => {
    const newSeller: Seller = {
      ...sellerData,
      id: `seller-${Date.now()}`, // Simple ID generation
    };
    setUser(newSeller);
    localStorage.setItem('user', JSON.stringify(newSeller));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUserProfile,
        registerBuyer,
        registerSeller,
      }}
    >
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
