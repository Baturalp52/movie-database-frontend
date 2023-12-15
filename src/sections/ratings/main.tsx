'use client';

import Iconify from '@/components/iconify';
import Image from '@/components/image';
import LoadingLogo from '@/components/loading-logo';
import TextMaxLine from '@/components/text-max-line';
import withAuth from '@/hocs/with-auth.hoc';
import useFetch from '@/hooks/use-fetch';
import UserRatesService from '@/services/user-rates/user-rates.service';
import { UserRatesGetUserRatesResponseType } from '@/services/user-rates/user-rates.type';
import { formatDate } from '@/utils/format-date.util';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import {
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { kebabCase } from 'change-case';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function RatingsPageMainSection() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<UserRatesGetUserRatesResponseType[]>([]);

  const fetchRatings = useCallback(async () => {
    const res = await UserRatesService.getAllUserRates(page);
    if (res.success) {
      setMovies(
        (movies) =>
          [
            ...movies,
            ...(res.data ?? []),
          ] as UserRatesGetUserRatesResponseType[],
      );
    }
    return res;
  }, [page]);

  const { meta } = useFetch(fetchRatings);

  const fetchData = () => {
    setPage((page) => page + 1);
  };

  return (
    <Container maxW="container.xl">
      <Heading>My Ratings</Heading>
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={fetchData}
        hasMore={page < (meta?.totalPage ?? 0)}
        loader={<LoadingLogo />}
        endMessage={
          <Text fontSize="2xl" my={4} textAlign="center">
            You have seen it all
          </Text>
        }
        style={{ padding: '20px' }}
      >
        {movies.map(({ movie, updatedAt, rate }) => (
          <Card variant="elevated" key={`user-rate-movie-${movie.id}`} my={2}>
            <CardBody>
              <HStack alignItems="flex-start" spacing={4}>
                <Link
                  href={ROUTES.MOVIES.DETAIL(
                    kebabCase(movie?.title + ' ' + movie?.id),
                  )}
                >
                  <Image
                    src={getCDNPath(movie?.posterPhotoFile?.path ?? '')}
                    alt={movie.title}
                    w={75}
                  />
                </Link>
                <VStack flex={1} alignItems="flex-start">
                  <HStack>
                    <Heading
                      as={Link}
                      href={ROUTES.MOVIES.DETAIL(
                        kebabCase(movie?.title + ' ' + movie?.id),
                      )}
                    >
                      {movie.title} ({new Date(movie.releaseDate).getFullYear()}
                      )
                    </Heading>
                  </HStack>
                  <TextMaxLine>{movie.summary}</TextMaxLine>
                </VStack>
                <VStack alignItems="flex-start" minW={325}>
                  <Text>
                    Rated on: <b>{formatDate(new Date(updatedAt))}</b>
                  </Text>
                  <HStack>
                    {Array.from({ length: rate }).map((_, index) => (
                      <Iconify
                        key={`rate-${index}`}
                        boxSize={6}
                        icon="bx:bxs-star"
                        color="#ffc107"
                      />
                    ))}
                  </HStack>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </InfiniteScroll>
    </Container>
  );
}

export default withAuth(RatingsPageMainSection);
