'use client';

import withRole from '@/hocs/with-role.hoc';
import { UserRoleEnum } from '@/enums/role.enum';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import useFetch from '@/hooks/use-fetch';
import LoadingLogo from '@/components/loading-logo';
import UserDrawer from './drawer';
import { UsersPostSearchUserResponseType } from '@/services/users/users.type';
import UsersService from '@/services/users/users.service';
import Pagination from '@/components/pagination';
import UserItem from './user-item';
import Iconify from '@/components/iconify';

function ManagementUsersMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const [drawerUser, setDrawerUser] =
    useState<UsersPostSearchUserResponseType | null>(null);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');

  const fetchUsers = useCallback(
    async () => UsersService.searchAllUser(page, 12, { text: searchText }),
    [page, searchText],
  );

  const { data, meta, loading, refetch } = useFetch(fetchUsers);

  const handleEditUser = (user: UsersPostSearchUserResponseType) => {
    setDrawerUser(user);
    onDrawerOpen();
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
      <FormControl mt={4} w="100%">
        <InputGroup>
          <Input
            variant="filled"
            type="text"
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.currentTarget.value)}
            placeholder="Search User"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPage(1);
                setSearchText(searchInputText);
              }
            }}
          />
          <InputRightElement>
            <Tooltip label="Search" aria-label="Search">
              <IconButton
                aria-label="Search"
                icon={<Iconify icon="material-symbols:search" boxSize={6} />}
                onClick={() => {
                  setPage(1);
                  setSearchText(searchInputText);
                }}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {searchText && (
        <HStack my={4}>
          <Text>Search results for: {searchText}</Text>
          <Button
            variant="ghost"
            color="gray"
            colorScheme="orange"
            onClick={() => {
              setSearchText('');
              setSearchInputText('');
            }}
          >
            Clear <Iconify icon="mdi:close" boxSize={6} />
          </Button>
        </HStack>
      )}
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
          <UserItem
            key={`management-user-item-${user.id}`}
            user={user}
            onEdit={handleEditUser}
          />
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
