'use client';

import { UserRoleEnum } from '@/enums/role.enum';
import useAuth from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IComponent {
  children?: React.ReactNode;
}

export default function withRole<P extends IComponent>(
  Component: React.ComponentType<P>,
  role: UserRoleEnum,
) {
  return function WithRole(props: P) {
    const { push } = useRouter();
    const { user, isInitialized } = useAuth();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (isInitialized) {
        if (!user) {
          push('/login');
          return;
        }
        if (user.role < role) {
          push('/');
        }
        setChecked(true);
      }
    }, [isInitialized, push, user]);
    if (!checked) return null;
    return <Component {...props} />;
  };
}
