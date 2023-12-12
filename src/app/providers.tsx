'use client';

import { AuthProvider } from '@/contexts/auth.context';
import { DialogProvider } from '@/contexts/dialog.context';
import { theme } from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top-right' } }}
      theme={theme}
    >
      <AuthProvider>
        <DialogProvider>{children}</DialogProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
