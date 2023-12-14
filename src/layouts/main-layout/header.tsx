'use client';
import Logo from '@/components/logo';
import { ROUTES } from '@/utils/routes';
import {
  Link,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import LoginOrUser from './login-or-user';
import Iconify from '@/components/iconify';
import MovieRequestModal from './movie-request-modal';

export default function MainHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isOpen && <MovieRequestModal isOpen={isOpen} onClose={onClose} />}
      <HStack
        backgroundColor="teal"
        padding={4}
        gap={4}
        w="100%"
        position="sticky"
        top={0}
        spacing={0}
        zIndex={2}
      >
        <Link
          href="/"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Logo />
        </Link>
        <HStack color="white" flex={1}>
          <Link href={ROUTES.HOME}>Home</Link>
          <Link href={ROUTES.MOVIES}>Movies</Link>
          <Link href={ROUTES.PEOPLE}>People</Link>
        </HStack>
        <HStack color="white">
          <Tooltip label="Add new movie">
            <IconButton
              onClick={onOpen}
              colorScheme="orange"
              aria-label="add-new-movie"
              icon={<Iconify icon="icon-park-outline:plus" boxSize={10} />}
            />
          </Tooltip>
        </HStack>
        <HStack>
          <LoginOrUser />
        </HStack>
      </HStack>
    </>
  );
}
