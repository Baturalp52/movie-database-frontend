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
  Tooltip,
} from '@chakra-ui/react';
import { kebabCase } from 'change-case';
import Image from '../image';
import getCDNPath from '@/utils/get-cdn-path.util';
import TextMaxLine from '../text-max-line';
import Iconify from '../iconify';
import { formatDate } from '@/utils/format-date.util';
import { CountryProperty, findOne } from 'country-codes-list';

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

  const tooltipLabel =
    'Original Language: ' +
      findOne('countryCode' as CountryProperty, originalLanguage)
        ?.countryNameLocal ?? '';

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
              <Tooltip label={tooltipLabel} aria-label={tooltipLabel}>
                <div>
                  <Iconify
                    icon={`flag:${originalLanguage?.toLowerCase()}-4x3`}
                    boxSize={8}
                  />
                </div>
              </Tooltip>
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
