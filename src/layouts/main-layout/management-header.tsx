import Logo from '@/components/logo';
import { ROUTES } from '@/utils/routes';
import { Link, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import LoginOrUser from './login-or-user';
import Iconify from '@/components/iconify';

export default function MainHeader() {
  return (
    <HStack
      backgroundColor="teal"
      padding={4}
      gap={4}
      position="sticky"
      top={0}
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
        <Link href={ROUTES.MOVIES.ROOT}>Movies</Link>
        <Link href={ROUTES.PEOPLE.ROOT}>People</Link>
      </HStack>
      <HStack color="white">
        <Tooltip label="Add new movie">
          <IconButton
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
  );
}
