'use client';

import LoadingLogo from '@/components/loading-logo';
import useFetch from '@/hooks/use-fetch';
import MoviesService from '@/services/movies/movies.service';
import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { useCallback } from 'react';
import MovieBannerSection from './banner';
import DetailsSection from './details';
import SideInfoSection from './side-info';

type Props = {
  movieId: number;
};

export default function MovieDetailMainSection({ movieId }: Props) {
  const fetchMovie = useCallback(
    async () => MoviesService.getMovie(movieId),
    [movieId],
  );

  const { data, loading, refetch } = useFetch(fetchMovie);

  if (loading)
    return (
      <Box width="100%" height="100%">
        <Center w="100%" h="100%">
          <LoadingLogo />
        </Center>
      </Box>
    );

  if (!data) {
    return null;
  }

  return (
    <Box my={4}>
      <MovieBannerSection movie={data} refetch={refetch} />
      <Grid templateColumns="repeat(4,1fr)" gap={4} p={4}>
        <GridItem colSpan={3}>
          <DetailsSection moviePersons={data?.moviePersons ?? []} />
        </GridItem>
        <GridItem>
          <SideInfoSection movie={data} />
        </GridItem>
      </Grid>
    </Box>
  );
}
