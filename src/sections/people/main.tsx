'use client';

import PersonCard from '@/components/cards/person.card';
import Iconify from '@/components/iconify';
import LoadingLogo from '@/components/loading-logo';
import Pagination from '@/components/pagination';
import useFetch from '@/hooks/use-fetch';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';
import PersonsService from '@/services/persons/persons.service';
import {
  Box,
  Button,
  Center,
  Container,
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
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function PeoplePageMainSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');
  const fetchPeople = useCallback(
    async () =>
      PersonsService.postSearchPersons(page, 12, { text: searchText }),
    [page, searchText],
  );

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearchText(searchParams.get('q') ?? '');
      setSearchInputText(searchParams.get('q') ?? '');
    }
  }, [searchParams]);

  const { data, meta, loading } = useFetch(fetchPeople);
  if (loading)
    return (
      <Box width="100%" height="100%">
        <Center w="100%" h="100%">
          <LoadingLogo />
        </Center>
      </Box>
    );

  return (
    <Container maxW="4xl" py={4}>
      <Heading size="2xl">People</Heading>
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
              replace(pathname);
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
          <PersonCard key={`person-item-${person.id}`} person={person} />
        ))}
      </SimpleGrid>
      <Box my={4} w="100%" textAlign="center">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={meta?.totalPage ?? 0}
        />
      </Box>
    </Container>
  );
}
