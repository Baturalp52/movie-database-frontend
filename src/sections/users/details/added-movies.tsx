import MovieCard from '@/components/cards/movie.card';
import Iconify from '@/components/iconify';
import { MovieType } from '@/types/movie.type';
import { Box, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import Slider, { Settings as SlickSettings } from 'react-slick';

const slickSettings: SlickSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
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

type Props = {
  movies: MovieType[];
};

export default function AddedMoviesSection({ movies }: Props) {
  return (
    <Card my={2}>
      <CardHeader>
        <Heading>Added Movies</Heading>
      </CardHeader>
      <CardBody>
        <Box px={4}>
          <Slider {...slickSettings}>
            {
              movies.map((movie) => (
                <div key={`movie-${movie.id}`}>
                  <MovieCard movie={movie} />
                </div>
              )) as any
            }
          </Slider>
        </Box>
      </CardBody>
    </Card>
  );
}
