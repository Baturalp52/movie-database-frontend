'use client';

import MovieCard from '@/components/cards/movie.card';
import Iconify from '@/components/iconify';
import LoadingLogo from '@/components/loading-logo';
import Pagination from '@/components/pagination';
import useFetch from '@/hooks/use-fetch';
import {
  BaseMovieType,
  MoviesPostSearchMovieRequestType,
} from '@/services/movies/movie.type';
import MoviesService from '@/services/movies/movies.service';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Grid,
  GridItem,
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
import MoviesFilter from './filter';

export default function MoviesPageMainSection() {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  const [page, setPage] = useState(1);
  const [searchInputText, setSearchInputText] = useState('');

  const [filter, setFilter] = useState<MoviesPostSearchMovieRequestType>({
    text: '',
    releaseYear: null,
    releaseCountry: '',
    originalLanguage: '',
    genres: [],
    rate: null,
  });

  const fetchMovies = useCallback(
    async () => MoviesService.postSearchMovies(page, 12, filter),
    [filter, page],
  );

  const handleSearch = () => {
    setPage(1);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('q', searchInputText);
    replace(pathname + '?' + newSearchParams.toString());
    setFilter((filter) => ({
      ...filter,
      text: searchInputText,
    }));
  };

  useEffect(() => {
    const filterObj: Record<string, string | number> = {};
    searchParams.forEach((value, key) => {
      if (key === 'q') filterObj['text'] = value;
      else filterObj[key] = isNaN(Number(value)) ? value : parseInt(value);
    });
    setFilter(filterObj);
    setSearchInputText(searchParams.get('q') ?? '');
  }, [searchParams]);

  const { data, meta, loading } = useFetch(fetchMovies);
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
      <Container maxW="5xl" py={4}>
        <Heading size="2xl">Movies</Heading>
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
                  handleSearch();
                }
              }}
            />
            <InputRightElement>
              <Tooltip label="Search" aria-label="Search">
                <IconButton
                  aria-label="Search"
                  icon={<Iconify icon="material-symbols:search" boxSize={6} />}
                  onClick={handleSearch}
                />
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {filter.text && (
          <HStack my={4}>
            <Text>Search results for: {filter.text}</Text>
            <Button
              variant="ghost"
              color="gray"
              colorScheme="orange"
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('q');

                setFilter((filter) => ({ ...filter, text: '' }));
                replace(pathname + '?' + newSearchParams.toString());
                setSearchInputText('');
              }}
            >
              Clear <Iconify icon="mdi:close" boxSize={6} />
            </Button>
          </HStack>
        )}
        <Grid
          my={4}
          alignItems="flex-start"
          gridTemplateColumns="repeat(3,1fr);"
          gap={2}
        >
          <GridItem>
            <MoviesFilter filter={filter} setFilter={setFilter} />
          </GridItem>
          <GridItem colSpan={2} textAlign="center">
            {!data?.length && (
              <Text fontSize="4xl">No movies found for the given filter!</Text>
            )}
            {!!data?.length && (
              <SimpleGrid
                spacing={4}
                columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                }}
                textAlign="center"
              >
                {data?.map((movie: BaseMovieType) => (
                  <MovieCard key={`movie-item-${movie.id}`} movie={movie} />
                ))}
              </SimpleGrid>
            )}
          </GridItem>
        </Grid>
        <Box my={4} w="100%" textAlign="center">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={meta?.totalPage ?? 0}
          />
        </Box>
      </Container>
    </>
  );
}
