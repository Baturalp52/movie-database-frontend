'use client';

import { useContext, useEffect } from 'react';
import UserContext, { UserContextType } from '@/contexts/user/user.context';

export default function useUser(): UserContextType {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }

  useEffect(() => {
    if (!userContext.isInitialized) {
      userContext.init();
    }
  }, [userContext]);

  return userContext;
}
