import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/services/authService";
import type { User } from "@/types/users";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  async function loadUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
        
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);

      }

    }
  
  useEffect(() => {
    
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading,refreshUser:loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
