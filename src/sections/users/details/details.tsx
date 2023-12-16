import { Box } from '@chakra-ui/react';
import AddedMoviesSection from './added-movies';
import { UserType } from '@/types/user.type';
import MovieLists from './movie-lists';

type Props = {
  user: UserType;
};

export default function DetailsSection({ user }: Props) {
  return (
    <Box>
      <AddedMoviesSection movies={user?.requestedMovies ?? []} />
      <MovieLists movieLists={user?.movieLists ?? []} />
    </Box>
  );
}
