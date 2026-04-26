import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../utils/constants";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEFAULT_USERS: Array<User & { password: string }> = [
  {
    id: "u-1",
    name: "Admin User",
    email: "admin@autoelite.dev",
    role: "admin",
    password: "admin123",
  },
  {
    id: "u-2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "user",
    password: "password123",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        return JSON.parse(stored).user;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        return JSON.parse(stored).token;
      } catch {
        return null;
      }
    }
    return null;
  });

  const getStoredUsers = (): Array<User & { password: string }> => {
    const localUsers = localStorage.getItem("mock_users");
    return localUsers ? JSON.parse(localUsers) : DEFAULT_USERS;
  };

  const persist = useCallback((u: User | null, t: string | null) => {
    if (u && t) {
      localStorage.setItem("auth", JSON.stringify({ user: u, token: t }));
    } else {
      localStorage.removeItem("auth");
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const allUsers = getStoredUsers();
    const match = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) throw new Error("Invalid email or password");

    const { password: _pw, ...safeUser } = match;
    const fakeToken = `jwt-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setUser(safeUser);
    setToken(fakeToken);
    persist(safeUser, fakeToken);
  }, [persist]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const allUsers = getStoredUsers();
    const exists = allUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists) throw new Error("Email already registered");

    const newUser: User = { id: `u-${Date.now()}`, name, email, role: "user" };
    const updatedUsers = [...allUsers, { ...newUser, password }];
    localStorage.setItem("mock_users", JSON.stringify(updatedUsers));

    const fakeToken = `jwt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setUser(newUser);
    setToken(fakeToken);
    persist(newUser, fakeToken);
  }, [persist]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    persist(null, null);
  }, [persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
    }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}