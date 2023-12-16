'use client';

import Iconify from '@/components/iconify';
import { UserRoleEnum } from '@/enums/role.enum';
import useAuth from '@/hooks/use-auth';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { kebabCase } from 'change-case';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginOrUser() {
  const { user, isLoading, isInitialized, logout } = useAuth();

  const { push } = useRouter();

  if (!isInitialized) return null;

  return (
    <Skeleton isLoaded={!isLoading}>
      {user ? (
        <>
          {user?.role >= UserRoleEnum.EDITOR && (
            <Tooltip label="Open Management">
              <IconButton
                colorScheme="orange"
                variant="ghost"
                onClick={() => {
                  push(ROUTES.MANAGEMENT.ROOT);
                }}
                aria-label="add-new-movie"
                icon={<Iconify icon="ic:round-dashboard" boxSize={10} />}
              />
            </Tooltip>
          )}
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
                href={ROUTES.USER.DETAIL(
                  kebabCase(
                    (user?.firstName && user?.lastName
                      ? user?.firstName + ' ' + user?.lastName
                      : user?.auth?.username) +
                      ' ' +
                      user?.id,
                  ),
                )}
                _hover={{
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
              >
                View Profile
              </MenuItem>
              <MenuItem
                as={Link}
                href={ROUTES.RATINGS}
                _hover={{
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
              >
                Ratings
              </MenuItem>
              <MenuItem
                as={Link}
                href={ROUTES.LISTS.ROOT}
                _hover={{
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
              >
                Lists
              </MenuItem>
              <MenuDivider />
              <MenuItem
                as={Link}
                href={ROUTES.SETTINGS.ROOT}
                _hover={{
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                as={Link}
                href={ROUTES.SETTINGS.SETTINGS}
                _hover={{
                  textDecoration: 'none',
                  userSelect: 'none',
                }}
              >
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </>
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
