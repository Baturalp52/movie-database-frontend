import Iconify from '@/components/iconify';
import { MovieType } from '@/types/movie.type';
import { formatDate } from '@/utils/format-date.util';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import { Avatar, Box, HStack, Link, Tag, Text, VStack } from '@chakra-ui/react';
import { kebabCase } from 'change-case';
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

  const { user } = movie;

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
      {!!user && (
        <Box>
          <Text fontWeight="bold">Adder User:</Text>
          <Link
            variant="ghost"
            href={ROUTES.USER.DETAIL(
              kebabCase(
                (user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : user?.detail?.username) +
                  ' ' +
                  user?.id,
              ),
            )}
          >
            <HStack>
              <Avatar
                size="sm"
                name={
                  user?.firstName && user?.lastName
                    ? user?.firstName + ' ' + user?.lastName
                    : user?.auth?.username
                }
                src={
                  user?.profilePhotoFile?.path
                    ? getCDNPath(user?.profilePhotoFile?.path)
                    : ''
                }
              />
              <Text>
                {user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : '@' + user?.auth?.username}
              </Text>
            </HStack>
          </Link>
        </Box>
      )}
    </VStack>
  );
}
