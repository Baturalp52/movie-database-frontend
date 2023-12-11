'use client';

import { useContext, useEffect } from 'react';
import AuthContext, { AuthContextType } from '@/contexts/auth.context';

export default function useAuth(): AuthContextType {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  useEffect(() => {
    if (!authContext.isInitialized) {
      authContext.init();
    }
  }, [authContext]);

  return authContext;
}
