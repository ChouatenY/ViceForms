"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LocalUser {
  id: string;
  name: string;
}

interface LocalUserContextType {
  user: LocalUser | null;
  updateUserName: (name: string) => Promise<void>;
  clearUser: () => Promise<void>;
  isLoading: boolean;
}

const LocalUserContext = createContext<LocalUserContextType | undefined>(undefined);

export function LocalUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from server
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserName = async (name: string) => {
    try {
      const response = await fetch("/api/user/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setUser(prev => prev ? { ...prev, name } : null);
      }
    } catch (error) {
      console.error("Failed to update user name:", error);
    }
  };

  const clearUser = async () => {
    try {
      await fetch("/api/user/clear", { method: "POST" });
      setUser(null);
      // Reload the page to get a new user ID
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear user:", error);
    }
  };

  return (
    <LocalUserContext.Provider value={{ user, updateUserName, clearUser, isLoading }}>
      {children}
    </LocalUserContext.Provider>
  );
}

export function useLocalUser() {
  const context = useContext(LocalUserContext);
  if (context === undefined) {
    throw new Error("useLocalUser must be used within a LocalUserProvider");
  }
  return context;
}
