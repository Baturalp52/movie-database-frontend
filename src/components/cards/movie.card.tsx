import {
  Box,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
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
import { BaseMovieType } from '@/services/movies/movie.type';

type Props = {
  movie: BaseMovieType;
};

export default function MovieCard({ movie }: Props) {
  const {
    id,
    title,
    posterPhotoFile,
    releaseDate: _releaseDate,
    summary,
    originalLanguage,
    rate,
  } = movie;
  const releaseDate = new Date(_releaseDate);

  const tooltipLabel =
    'Original Language: ' +
      findOne('officialLanguageCode' as CountryProperty, originalLanguage)
        ?.officialLanguageNameLocal ?? '';

  return (
    <Link href={`/movies/${kebabCase(title)}-${id}`} m={2}>
      <Card maxW="3xs">
        <CardBody position="relative">
          <Image
            src={getCDNPath(posterPhotoFile?.path)}
            alt={title}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <Heading size="md">{title}</Heading>
            <TextMaxLine maxLines={1} fontSize="2xs">
              {summary}
            </TextMaxLine>
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
          <Box
            position="absolute"
            top={0}
            right={0}
            w="fit-content"
            borderRadius="50%"
            overflow="hidden"
            transition="all 0.2s ease-in-out"
            _hover={{
              transform: 'scale(1.1)',
            }}
          >
            <CircularProgress
              size="60px"
              thickness="4px"
              color="teal"
              backgroundColor="white"
              value={(rate ?? 10) * 10}
            >
              <CircularProgressLabel color="teal">
                {rate ?? 'N/A'}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
        </CardBody>
      </Card>
    </Link>
  );
}
