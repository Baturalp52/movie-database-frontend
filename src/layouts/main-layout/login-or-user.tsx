'use client';

import useAuth from '@/hooks/use-auth';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import {
  Avatar,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

export default function LoginOrUser() {
  const { user, isLoading, isInitialized, logout } = useAuth();
  const { refresh } = useRouter();

  if (!isInitialized) return null;

  return (
    <Skeleton isLoaded={!isLoading}>
      {user ? (
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            _hover={{
              backgroundColor: 'teal.500',
            }}
          >
            <HStack>
              <Avatar
                size="sm"
                name={
                  user?.firstName && user?.lastName
                    ? user?.firstName + ' ' + user?.lastName
                    : user?.auth?.username
                }
                src={
                  user?.profilePhotoFile?.path
                    ? getCDNPath(user?.profilePhotoFile?.path)
                    : ''
                }
              />
              <Text color="white">
                {user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : '@' + user?.auth?.username}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Link}
              href={ROUTES.PROFILE}
              _hover={{
                textDecoration: 'none',
                userSelect: 'none',
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                refresh();
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack>
          <NextLink href={ROUTES.LOGIN} passHref legacyBehavior>
            <Button as="a" variant="ghost">
              Login
            </Button>
          </NextLink>
          <NextLink href={ROUTES.SIGN_UP} passHref legacyBehavior>
            <Button as="a" variant="solid" colorScheme="orange">
              Signup
            </Button>
          </NextLink>
        </HStack>
      )}
    </Skeleton>
  );
}
