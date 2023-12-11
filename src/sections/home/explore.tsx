'use client';

import LoadingLogo from '@/components/loading-logo';
import useFetch from '@/hooks/use-fetch';
import { GenresGetAllGenreResponseType } from '@/services/genres/genre.type';
import GenresService from '@/services/genres/genres.service';
import { Box, Button, Container, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

export default function HomeExploreSection() {
  const fetchData = useCallback(async () => GenresService.getAllGenres(), []);
  const { data, loading } = useFetch<GenresGetAllGenreResponseType>(fetchData);

  return (
    <Container maxW="container.xl" p={4}>
      <Text fontSize="4xl">Explore Genres!</Text>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoadingLogo height={50} />
        </Box>
      ) : (
        data?.map((genre) => (
          <Button
            key={`genre-${genre.id}`}
            as="a"
            href={`/search?genre=${genre.id}`}
            variant="rounded"
            colorScheme="orange"
            m={2}
          >
            {genre.name}
          </Button>
        ))
      )}
    </Container>
  );
}
