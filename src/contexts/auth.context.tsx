import { createContext, useState } from 'react';
import { UserType } from '../types/user.type';
import AuthService from '@/services/auth/auth.service';
import ProfileService from '@/services/profile/profile.service';

export type AuthContextType = {
  user: UserType | null;
  isInitialized: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    username: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => boolean;
  init: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitialized: false,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => false,
  init: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function init() {
    setIsLoading(true);
    if (localStorage.getItem('token')) {
      const userRes = await ProfileService.getProfile();
      setUser(userRes.data || null);
    } else {
      setUser(null);
    }
    setIsInitialized(true);
    setIsLoading(false);
  }

  async function login(emailOrUsername: string, password: string) {
    setIsLoading(true);

    const authRes = await AuthService.login({ emailOrUsername, password });
    if (authRes.success) {
      if (!authRes.data?.token) return false;
      localStorage.setItem('token', authRes.data?.token);
      await init();
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);

    return true;
  }

  async function register(email: string, username: string, password: string) {
    setIsLoading(true);
    const authRes = await AuthService.register({ email, username, password });
    if (authRes.success) {
      if (!authRes.data?.token) return false;
      localStorage.setItem('token', authRes.data?.token);
      await init();
      return true;
    }

    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        isLoading,
        login,
        logout,
        register,
        init,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
