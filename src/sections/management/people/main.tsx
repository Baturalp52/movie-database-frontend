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
import PersonDrawer from './drawer';
import Pagination from '@/components/pagination';
import PersonItem from './person-item';
import Iconify from '@/components/iconify';
import PersonsService from '@/services/persons/persons.service';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';

function ManagementPersonsMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const [drawerPersonId, setDrawerPersonId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');

  const fetchPersons = useCallback(
    async () =>
      PersonsService.postSearchPersons(page, 12, { text: searchText }),
    [page, searchText],
  );

  const { data, meta, loading, refetch } = useFetch(fetchPersons);

  const handleEditPerson = (person: PersonsPostSearchPersonType) => {
    setDrawerPersonId(person.id);
    onDrawerOpen();
  };

  const handleNewPerson = () => {
    setDrawerPersonId(null);
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
      <HStack w="100%" justifyContent="space-between">
        <Heading size="xl">People</Heading>
        <Button onClick={handleNewPerson}>
          <Iconify icon="mdi:plus" boxSize={6} />
          Add Person
        </Button>
      </HStack>
      <FormControl mt={4} w="100%">
        <InputGroup>
          <Input
            variant="filled"
            type="text"
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.currentTarget.value)}
            placeholder="Search People"
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
        {data?.map((person: PersonsPostSearchPersonType) => (
          <PersonItem
            refetch={refetch}
            key={`management-person-item-${person.id}`}
            person={person}
            onEdit={handleEditPerson}
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
      <PersonDrawer
        refetch={refetch}
        isOpen={isDrawerOpen}
        onClose={() => {
          onDrawerClose();
          setDrawerPersonId(null);
        }}
        personId={drawerPersonId}
      />
    </>
  );
}

export default withRole(ManagementPersonsMainSection, UserRoleEnum.ADMIN);
