'use client';

import MovieCard from '@/components/cards/movie.card';
import Iconify from '@/components/iconify';
import withAuth from '@/hocs/with-auth.hoc';
import useFetch from '@/hooks/use-fetch';
import MovieListModal from '@/modals/movie-list/movie-list';
import MovieListsMoviesService from '@/services/movie-lists-movies/movie-lists-moviess.service';
import MovieListsService from '@/services/movie-lists/movie-lists.service';
import ProfileService from '@/services/profile/profile.service';
import { MovieListType } from '@/types/movie-list.type';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  SlideFade,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

function ListsPageMainSection() {
  const { isOpen: isMovieDetailOpen, onOpen: onMovieDetailOpen } =
    useDisclosure();
  const {
    isOpen: isMovieListModalOpen,
    onOpen: onMovieListModalOpen,
    onClose: onMovieListModalClose,
  } = useDisclosure();

  const toast = useToast();

  const [movieListDetail, setMovieListDetail] =
    useState<MovieListType | null>();
  const fetchLists = useCallback(
    async () => ProfileService.getProfileMovieLists(),
    [],
  );

  const { data: lists = [], refetch: _refetch } = useFetch(fetchLists);

  const refetch = () => {
    _refetch();
    handleViewListDetail(movieListDetail?.id || 0)();
  };

  const handleViewListDetail = (id: number) => async () => {
    const res = await MovieListsService.getMovieList(id);
    if (res.success) {
      setMovieListDetail(res.data);
    }
    onMovieDetailOpen();
  };

  const handleRemoveMovie = (movieId: number) => async () => {
    if (movieListDetail?.id) {
      const res = await MovieListsMoviesService.deleteMovie(
        movieListDetail?.id,
        movieId,
      );
      if (res.success) {
        toast({
          title: 'Movie removed',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refetch();
      }
    }
  };

  return (
    <>
      <Container maxW="container.xl" py={4}>
        <Heading>My Movie Lists</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <VStack alignItems="stretch">
              {lists?.map(({ id, name }) => (
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
                    <Box>
                      <Heading>{movieListDetail?.name}</Heading>
                      <Text fontSize="xl">
                        List is {!movieListDetail?.public && <i>not</i>} public
                      </Text>
                    </Box>
                    <Menu>
                      <IconButton
                        as={MenuButton}
                        colorScheme="gray"
                        color="gray"
                        variant="ghost"
                        isRound
                        aria-label="More menu"
                        icon={
                          <Iconify
                            mx="auto"
                            icon="mdi:dots-vertical"
                            boxSize={6}
                          />
                        }
                      />
                      <MenuList>
                        <MenuItem
                          icon={<Iconify icon="mdi:pencil" boxSize={6} />}
                          onClick={onMovieListModalOpen}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          color="red"
                          icon={<Iconify icon="mdi:delete" boxSize={6} />}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
                    {movieListDetail?.movies?.map((movie) => (
                      <VStack key={`user-movie-list-movie-${movie.id}`}>
                        <MovieCard movie={movie} />
                        <Button
                          color="red"
                          colorScheme="red"
                          variant="ghost"
                          onClick={handleRemoveMovie(movie.id)}
                        >
                          <Iconify icon="ic:round-close" boxSize={6} />
                          <Text>Remove</Text>
                        </Button>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </SlideFade>
          </GridItem>
        </Grid>
      </Container>
      <MovieListModal
        isOpen={isMovieListModalOpen}
        onClose={onMovieListModalClose}
        movieList={movieListDetail}
        cb={refetch}
      />
    </>
  );
}

export default withAuth(ListsPageMainSection);
