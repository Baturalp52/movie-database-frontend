import { Box } from '@chakra-ui/react';
import MainHeader from './header';
import MainFooter from './footer';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      <Box as="main" minH="100vh">
        {children}
      </Box>
      <MainFooter />
    </>
  );
}
