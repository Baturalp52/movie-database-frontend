import { MovieType } from '@/types/movie.type';
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { kebabCase } from 'change-case';
import Image from '../image';
import getCDNPath from '@/utils/get-cdn-path.util';
import TextMaxLine from '../text-max-line';
import Iconify from '../iconify';
import { formatDate } from '@/utils/format-date.util';

type Props = {
  movie: MovieType;
};

export default function MovieCard({ movie }: Props) {
  const {
    id,
    title,
    posterPhotoFile,
    releaseDate: _releaseDate,
    summary,
    originalLanguage,
  } = movie;
  const releaseDate = new Date(_releaseDate);
  return (
    <Link href={`/movies/${kebabCase(title)}-${id}`}>
      <Card maxW="3xs">
        <CardBody>
          <Image
            src={getCDNPath(posterPhotoFile?.path)}
            alt={title}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">{title}</Heading>
            <TextMaxLine fontSize="2xs">{summary}</TextMaxLine>
            <Stack direction="row" alignItems="center" spacing="2">
              <Iconify
                icon={`flag:${originalLanguage?.toLowerCase()}-4x3`}
                boxSize={8}
              />
              <Text fontSize={12} color="gray">
                {formatDate(releaseDate)}
              </Text>
            </Stack>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
