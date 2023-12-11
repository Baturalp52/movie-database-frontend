'use client';

import MovieCard from '@/components/cards/movie.card';
import LoadingLogo from '@/components/loading-logo';
import useFetch from '@/hooks/use-fetch';
import MoviesService from '@/services/movies/movies.service';
import { Box, Container, Link, Text } from '@chakra-ui/react';
import Slider, { Settings as SlickSettings } from 'react-slick';
import { useCallback } from 'react';
import Iconify from '@/components/iconify';

const slickSettings: SlickSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: (
    <Iconify
      icon="gravity-ui:chevron-left"
      color="black"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        color: 'gray.500',
        transition: 'all 0.2s ease-in-out',
      }}
    />
  ),
  nextArrow: (
    <Iconify
      icon="gravity-ui:chevron-right"
      color="black"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        color: 'gray.500',
        transition: 'all 0.2s ease-in-out',
      }}
    />
  ),
};

export default function HomeTrendingMoviesSection() {
  const fetchTrendingMovies = useCallback(
    () => MoviesService.getTrendingMovies(),
    [],
  );
  const { data = [], loading } = useFetch(fetchTrendingMovies);
  return (
    <Container maxW="container.xl" p={4}>
      <Text fontSize="4xl">Trending Movies</Text>
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoadingLogo height={50} />
        </Box>
      ) : data ? (
        <Slider {...slickSettings}>
          {
            data.map((movie) => (
              <div key={`movie-${movie.id}`}>
                <MovieCard movie={movie} />
              </div>
            )) as any
          }
          <div>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
              padding={4}
              color="orange"
              _hover={{
                '& > a': {
                  borderColor: 'orange.100',
                },
                color: 'orange.100',
                cursor: 'pointer',
              }}
            >
              <Link
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth={4}
                borderStyle="dashed"
                borderColor="orange"
                borderRadius={2}
                transition={'all 0.2s ease-in-out'}
                href="/movies"
              >
                Show More
              </Link>
            </Box>
          </div>
        </Slider>
      ) : null}
    </Container>
  );
}
