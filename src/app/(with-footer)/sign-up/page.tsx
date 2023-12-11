import { Container } from '@chakra-ui/react';

import { Metadata } from 'next';
import SignUpForm from '@/sections/sign-up/form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function SignUpPage() {
  return (
    <Container p={20}>
      <SignUpForm />
    </Container>
  );
}
