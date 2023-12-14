import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import MovieForm from './form';
import LoadingLogo from '@/components/loading-logo';
import { MovieType } from '@/types/movie.type';
import { CountryProperty, filter as filterCountries } from 'country-codes-list';
import MovieRequestsService from '@/services/movie-requests/movie-requests.service';

type Props = {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function MovieRequestDrawer({
  movieId,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [movieRequest, setMovieRequest] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieRequest = useCallback(async () => {
    setLoading(true);
    if (!movieId) {
      setMovieRequest(null);
    } else {
      const res = await MovieRequestsService.getMovieRequest(movieId);
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
        setMovieRequest(res.data);
      }
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchMovieRequest();
    } else {
      setMovieRequest(null);
    }
  }, [fetchMovieRequest, movieId]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Movie Request</Heading>
        </DrawerHeader>
        {loading ? (
          <DrawerBody>
            <Box width="100%" height="100%">
              <LoadingLogo w="fit-content" mx="auto" />
            </Box>
          </DrawerBody>
        ) : (
          <MovieForm
            refetch={refetch}
            movie={movieRequest}
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
