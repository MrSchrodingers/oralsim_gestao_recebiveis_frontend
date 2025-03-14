"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import type { IUser } from "@/interfaces/IUser";

interface AuthContextProps {
  user: IUser | null;
  isLoading: boolean;
  refetchUser: () => void; 
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  refetchUser: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o user assim que o app monta
  async function fetchUser() {
    setIsLoading(true);
    try {
      const res = await userService.getUser(); 
      setUser(res.data);
    } catch (err) {
      // Se 401/403, é porque não está logado
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function logout() {
    // Expor uma rota /logout no backend que apague o cookie.
    // Por simplicidade, limpamos local e redirecionamos manual:
    setUser(null);
    window.location.href = "/sign-out";
  }

  function refetchUser() {
    fetchUser();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, refetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
