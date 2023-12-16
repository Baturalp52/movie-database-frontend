import MovieCard from '@/components/cards/movie.card';
import MovieListsService from '@/services/movie-lists/movie-lists.service';
import { MovieListType } from '@/types/movie-list.type';
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  SlideFade,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  movieLists: MovieListType[];
};

export default function MovieLists({ movieLists }: Props) {
  const {
    isOpen: isMovieDetailOpen,
    onOpen: onMovieDetailOpen,
    onClose: onMovieDetailClose,
  } = useDisclosure();

  const [movieListDetail, setMovieListDetail] =
    useState<MovieListType | null>();

  const handleViewListDetail = (id: number) => async () => {
    if (id === movieListDetail?.id && isMovieDetailOpen) {
      onMovieDetailClose();
      return;
    }
    const res = await MovieListsService.getMovieList(id);
    if (res.success) {
      setMovieListDetail(res.data);
    }
    onMovieDetailOpen();
  };

  return (
    <Card my={2}>
      <CardHeader>
        <Heading>Movie Lists</Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <VStack alignItems="stretch">
              {movieLists?.map(({ id, name }) => (
                <Card
                  variant="elevated"
                  key={`user-movie-list-${id}`}
                  my={2}
                  onClick={handleViewListDetail(id)}
                  _hover={{
                    cursor: 'pointer',
                    filter: 'brightness(0.9)',
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <CardBody>
                    <Heading>{name}</Heading>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <SlideFade in={isMovieDetailOpen}>
              <Card>
                <CardHeader>
                  <HStack justifyContent="space-between">
                    <Heading>{movieListDetail?.name}</Heading>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
                    {movieListDetail?.movies?.map((movie) => (
                      <VStack key={`user-movie-list-movie-${movie.id}`}>
                        <MovieCard movie={movie} />
                      </VStack>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </SlideFade>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
