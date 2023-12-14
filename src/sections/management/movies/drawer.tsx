import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import MovieForm from './form';
import LoadingLogo from '@/components/loading-logo';
import MoviesService from '@/services/movies/movies.service';
import { MovieType } from '@/types/movie.type';
import { CountryProperty, filter as filterCountries } from 'country-codes-list';
import {
  MoviesPostMovieRequestType,
  MoviesPutMovieRequestType,
} from '@/services/movies/movie.type';

type Props = {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function MovieDrawer({
  movieId,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchMovie = useCallback(async () => {
    setLoading(true);
    if (!movieId) {
      setMovie(null);
    } else {
      const res = await MoviesService.getMovie(movieId);
      if (res.success && res.data) {
        res.data.releaseDate = new Date(res.data.releaseDate)
          .toISOString()
          .split('T')[0] as any;
        if (res.data.runtime) {
          const runtime: any = {};

          runtime.hours = Math.floor(res.data.runtime / 3600);
          runtime.minutes = Math.floor((res.data.runtime % 3600) / 60);
          runtime.seconds = res.data.runtime % 60;

          res.data.runtime = runtime;
        }

        res.data.originalLanguage = filterCountries(
          'officialLanguageCode' as CountryProperty,
          res.data.originalLanguage,
        )[0] as any;
        res.data.releaseCountry = filterCountries(
          'countryCode' as CountryProperty,
          res.data.releaseCountry ?? '',
        )[0] as any;

        delete res.data.rate;
        res.data.moviePersons = (res.data?.moviePersons?.map(
          (moviePerson: any) => ({
            ...moviePerson.person,
            roleName: moviePerson.roleName,
            personTypes: moviePerson.personTypes,
          }),
        ) ?? []) as any;
        if (res.data.budget === null) {
          res.data.budget = 0;
        }
        if (res.data.revenue === null) {
          res.data.revenue = 0;
        }
        setMovie(res.data);
      }
    }
    setLoading(false);
  }, [movieId]);

  const handleSubmit = useCallback(
    async (data: MoviesPostMovieRequestType | MoviesPutMovieRequestType) => {
      if (movie?.id) {
        delete (data as any).id;
        const res = await MoviesService.putMovie(movie?.id, data);
        if (res.success) {
          toast({
            title: 'Movie updated.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      } else {
        const res = await MoviesService.postMovie(
          data as MoviesPostMovieRequestType,
        );
        if (res.success) {
          toast({
            title: 'Movie created.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      }
    },
    [movie?.id, toast],
  );

  useEffect(() => {
    if (movieId) {
      fetchMovie();
    } else {
      setMovie(null);
    }
  }, [fetchMovie, movieId]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>{movie?.id ? 'Edit' : 'Create'} Movie</Heading>
        </DrawerHeader>
        {loading ? (
          <DrawerBody>
            <Box width="100%" height="100%">
              <LoadingLogo w="fit-content" mx="auto" />
            </Box>
          </DrawerBody>
        ) : (
          <MovieForm
            movie={movie}
            onSubmit={handleSubmit}
            onClose={() => {
              refetch();
              onClose();
            }}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
