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
import MovieDrawer from './drawer';
import Pagination from '@/components/pagination';
import MovieItem from './movie-item';
import Iconify from '@/components/iconify';
import MoviesService from '@/services/movies/movies.service';
import { BaseMovieType } from '@/services/movies/movie.type';

function ManagementMoviesMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const [drawerMovieId, setDrawerMovieId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchInputText, setSearchInputText] = useState('');

  const fetchMovies = useCallback(
    async () => MoviesService.postSearchMovies(page, 12, { text: searchText }),
    [page, searchText],
  );

  const { data, meta, loading, refetch } = useFetch(fetchMovies);

  const handleEditMovie = (movie: BaseMovieType) => {
    setDrawerMovieId(movie.id);
    onDrawerOpen();
  };

  const handleNewMovie = () => {
    setDrawerMovieId(null);
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
        <Heading size="xl">Movies</Heading>
        <Button onClick={handleNewMovie}>
          <Iconify icon="mdi:plus" boxSize={6} />
          Add Movie
        </Button>
      </HStack>
      <FormControl mt={4} w="100%">
        <InputGroup>
          <Input
            variant="filled"
            type="text"
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.currentTarget.value)}
            placeholder="Search Movies"
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
        {data?.map((movie: BaseMovieType) => (
          <MovieItem
            refetch={refetch}
            key={`management-movie-item-${movie.id}`}
            movie={movie}
            onEdit={handleEditMovie}
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
      <MovieDrawer
        refetch={refetch}
        isOpen={isDrawerOpen}
        onClose={() => {
          onDrawerClose();
          setDrawerMovieId(null);
        }}
        movieId={drawerMovieId}
      />
    </>
  );
}

export default withRole(ManagementMoviesMainSection, UserRoleEnum.ADMIN);
