'use client';

import { UserProvider } from '@/contexts/user/user.context';
import { theme } from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top-right' } }}
      theme={theme}
    >
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
  );
}
