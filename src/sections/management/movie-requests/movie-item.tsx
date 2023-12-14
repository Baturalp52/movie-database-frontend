import Iconify from '@/components/iconify';
import Image from '@/components/image';
import { BaseMovieType } from '@/services/movies/movie.type';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';

type Props = {
  movie: BaseMovieType;
  onViewDetail: (movieId: number) => void;
  refetch: () => void;
};

export default function MovieRequestItem({ movie, onViewDetail }: Props) {
  const { id, title, posterPhotoFile, originalLanguage } = movie;
  return (
    <Card>
      <CardBody>
        <Image
          src={posterPhotoFile?.path ? getCDNPath(posterPhotoFile?.path) : ''}
        />
      </CardBody>
      <CardFooter>
        <HStack w="100%">
          <HStack flex={1}>
            <Text color="black">{title}</Text>
            <Iconify
              icon={`flag:${originalLanguage?.toLowerCase()}-4x3`}
              boxSize={4}
            />
          </HStack>

          <Tooltip label="View Details">
            <IconButton
              aria-label="edit"
              colorScheme="gray"
              color="gray"
              variant="ghost"
              onClick={() => onViewDetail(id)}
              isRound
              icon={<Iconify icon="mdi:eye" boxSize={6} mx="auto" />}
            />
          </Tooltip>
        </HStack>
      </CardFooter>
    </Card>
  );
}
