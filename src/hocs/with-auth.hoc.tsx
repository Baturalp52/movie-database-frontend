'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IComponent {
  children?: React.ReactNode;
}

export default function withAuth<P extends IComponent>(
  Component: React.ComponentType<P>,
) {
  return function WithAuth(props: P) {
    const { push } = useRouter();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        push('/login');
      }
      setChecked(true);
    }, [push]);
    if (!checked) return null;
    return <Component {...props} />;
  };
}
