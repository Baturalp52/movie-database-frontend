'use client';

import withRole from '@/hocs/with-role.hoc';
import { UserRoleEnum } from '@/enums/role.enum';
import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Iconify from '@/components/iconify';
import { useCallback, useState } from 'react';
import useFetch from '@/hooks/use-fetch';
import LoadingLogo from '@/components/loading-logo';
import UserDrawer from './drawer';
import getCDNPath from '@/utils/get-cdn-path.util';
import { UsersPostSearchUserResponseType } from '@/services/users/users.type';
import UsersService from '@/services/users/users.service';
import Pagination from '@/components/pagination';

function ManagementUsersMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const [drawerUser, setDrawerUser] =
    useState<UsersPostSearchUserResponseType | null>(null);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);

  const fetchUsers = useCallback(
    async () => UsersService.searchAllUser(page, size),
    [page, size],
  );

  const { data, meta, loading, refetch } = useFetch(fetchUsers);

  const handleEditUser = (user: UsersPostSearchUserResponseType) => {
    setDrawerUser(user);
    onDrawerOpen();
  };

  const UserItem = (user: UsersPostSearchUserResponseType) => {
    const { firstName, lastName, profilePhotoFile, username } = user;
    return (
      <HStack borderRadius={2} background="orange" p={4} color="white">
        <HStack spacing={2} flex={1} alignItems="center">
          <Avatar
            size="sm"
            src={
              profilePhotoFile?.path ? getCDNPath(profilePhotoFile?.path) : ''
            }
            name={firstName && lastName ? firstName + ' ' + lastName : username}
          />
          <Text textAlign="start">
            {firstName && lastName
              ? `${firstName} ${lastName}`
              : `@${username}`}
          </Text>
        </HStack>
        <IconButton
          aria-label="edit"
          colorScheme="teal"
          variant="ghost"
          isRound
          icon={<Iconify icon="mdi:pencil" boxSize={6} />}
          onClick={() => {
            handleEditUser(user);
          }}
        />
      </HStack>
    );
  };

  if (loading)
    return (
      <Box width="100%" height="100%">
        <Center w="100%" h="100%">
          <LoadingLogo />
        </Center>
      </Box>
    );
  return (
    <>
      <Heading size="xl">Users</Heading>
      <SimpleGrid
        mt={2}
        spacing={4}
        columns={{
          base: 1,
          sm: 2,
          md: 4,
        }}
        textAlign="center"
      >
        {data?.map((user: UsersPostSearchUserResponseType) => (
          <UserItem key={`management-user-item-${user.id}`} {...user} />
        ))}
      </SimpleGrid>
      <Box mt={4} w="100%" textAlign="center">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={meta?.totalPage ?? 0}
        />
      </Box>
      {drawerUser && (
        <UserDrawer
          refetch={refetch}
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          user={drawerUser}
        />
      )}
    </>
  );
}

export default withRole(ManagementUsersMainSection, UserRoleEnum.ADMIN);
