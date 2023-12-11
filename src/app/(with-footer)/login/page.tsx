import { Container } from '@chakra-ui/react';

import LoginForm from '@/sections/login/form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Container p={20}>
      <LoginForm />
    </Container>
  );
}
