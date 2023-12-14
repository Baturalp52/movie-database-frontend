import Iconify from '@/components/iconify';
import { MovieType } from '@/types/movie.type';
import { formatDate } from '@/utils/format-date.util';
import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { CountryProperty, filter as filterCountries } from 'country-codes-list';

type Props = {
  movie: MovieType;
};

export default function SideInfoSection({ movie }: Props) {
  const originalLanguage = filterCountries(
    'officialLanguageCode' as CountryProperty,
    movie?.originalLanguage,
  )[0];
  const releaseCountry = filterCountries(
    'countryCode' as CountryProperty,
    movie?.releaseCountry ?? '',
  )[0];

  const releaseDate = new Date(movie?.releaseDate ?? '');

  return (
    <VStack alignItems="flex-start">
      <Box>
        <Text fontWeight="bold">Original Language</Text>
        <HStack>
          <Iconify
            icon={`flag:${movie?.originalLanguage.toLowerCase()}-4x3`}
            boxSize={6}
          />
          <Text>{originalLanguage?.officialLanguageNameLocal}</Text>
        </HStack>
      </Box>
      <Box>
        <Text fontWeight="bold">Release Country</Text>
        <HStack>
          <Iconify
            icon={`flag:${movie?.releaseCountry?.toLowerCase()}-4x3`}
            boxSize={6}
          />
          <Text>{releaseCountry?.countryNameLocal}</Text>
        </HStack>
      </Box>
      <Box>
        <Text fontWeight="bold">Release Date</Text>
        <Text>{formatDate(releaseDate)}</Text>
      </Box>
      {!!movie?.budget && (
        <Box>
          <Text fontWeight="bold">Budget</Text>
          <Text>${movie?.budget}</Text>
        </Box>
      )}
      {!!movie?.revenue && (
        <Box>
          <Text fontWeight="bold">Revenue</Text>
          <Text>${movie?.revenue}</Text>
        </Box>
      )}
      {!!movie?.keywords?.length && (
        <Box>
          <Text fontWeight="bold">Keywords</Text>

          {movie?.keywords?.map((keyword, i) => (
            <Tag mr={1} key={`keyowrds-${keyword}-${i}`} colorScheme="gray">
              {keyword}
            </Tag>
          ))}
        </Box>
      )}
    </VStack>
  );
}
