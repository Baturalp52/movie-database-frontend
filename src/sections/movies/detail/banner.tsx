import Iconify from '@/components/iconify';
import Image from '@/components/image';
import StarRating from '@/components/star-rating';
import { CertificationEnum } from '@/enums/certification.enum';
import useAuth from '@/hooks/use-auth';
import MovieRatesService from '@/services/movie-rates/movie-rates.service';
import { MovieType } from '@/types/movie.type';
import { formatDate } from '@/utils/format-date.util';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  movie: MovieType;
  refetch: () => void;
};

export default function MovieBannerSection({ movie, refetch }: Props) {
  const {
    isOpen: isPosterModalOpen,
    onOpen: onPosterModalOpen,
    onClose: onPosterModalClose,
  } = useDisclosure();
  const {
    isOpen: isTrailerModalOpen,
    onOpen: onTrailerModalOpen,
    onClose: onTrailerModalClose,
  } = useDisclosure();
  const { user } = useAuth();
  const releaseDate = new Date(movie?.releaseDate);
  const runtimeHours = Math.floor((movie?.runtime ?? 0) / 3600);
  const runtimeMinutes = Math.floor(((movie?.runtime ?? 0) / 60) % 60);
  const runtime = `${runtimeHours}h ${runtimeMinutes}m`;
  const toast = useToast();

  const embedIdRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const embedId = movie?.trailer?.match(embedIdRegex)?.[1];

  const [userRate, setUserRate] = useState(0);

  const handleRate = async (rating: number) => {
    if (movie?.userRate === rating) {
      return;
    }
    if (movie?.userRate) {
      const res = await MovieRatesService.putMovieRate(movie.id, rating);
      if (res.success) {
        toast({
          title: 'Success',
          description: 'Your rate has been updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refetch();
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const res = await MovieRatesService.postMovieRate(movie.id, rating);
      if (res.success) {
        toast({
          title: 'Success',
          description: 'Your rate has been added',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refetch();
      }
    }
    setUserRate(rating);
  };
  const handleRemoveRate = async () => {
    if (!movie?.userRate) {
      return;
    }

    const res = await MovieRatesService.deleteMovieRate(movie.id);
    if (res.success) {
      toast({
        title: 'Success',
        description: 'Your rate has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
    }

    setUserRate(0);
  };

  useEffect(() => {
    setUserRate(movie?.userRate ?? 0);
  }, [movie?.userRate]);

  return (
    <>
      <Box
        backgroundImage={`url(${getCDNPath(
          movie?.bannerPhotoFile?.path ?? '',
        )})`}
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        w="100%"
        h="100%"
      >
        <Box
          p={16}
          background="linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%);"
        >
          <Grid gridTemplateColumns="repeat(4,1fr)">
            <GridItem>
              <Box borderRadius={8} overflow="hidden" position="relative">
                <Image src={getCDNPath(movie?.posterPhotoFile?.path ?? '')} />
                <Box
                  position="absolute"
                  p={4}
                  top={0}
                  width="100%"
                  height="100%"
                  backgroundColor="black"
                  opacity={0}
                  transition="opacity 0.3s"
                  _hover={{ opacity: 0.7, cursor: 'pointer' }}
                  onClick={onPosterModalOpen}
                >
                  <Stack
                    spacing={2}
                    border="2px dashed white"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Iconify icon="gg:expand" color="white" boxSize={20} />
                    <Text color="white">Expand</Text>
                  </Stack>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={3} p={4}>
              <Stack spacing={4} color="white">
                <Text fontSize="4xl" fontWeight="bold">
                  {movie?.title} ({releaseDate.getFullYear()})
                </Text>
                <HStack>
                  <Badge colorScheme="gray">
                    {
                      CertificationEnum[
                        movie?.certification ?? CertificationEnum.G
                      ]
                    }
                  </Badge>
                  <Text>{formatDate(releaseDate)}</Text>
                  <Text>•</Text>
                  <HStack>
                    {movie?.genres?.map((genre, index) => (
                      <Link
                        key={`genre-${genre.id}`}
                        href={`${ROUTES.MOVIES.SEARCH(
                          new URLSearchParams({
                            genres: '' + genre.id,
                          }).toString(),
                        )}`}
                      >
                        {genre.name}
                        {(movie?.genres?.length ?? 0) - 1 !== index && ','}
                      </Link>
                    ))}
                  </HStack>
                  <Text>•</Text>
                  <Text>{runtime}</Text>
                </HStack>
                <HStack>
                  <Box
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
                      value={(movie?.rate ?? 10) * 10}
                    >
                      <CircularProgressLabel color="teal">
                        {movie?.rate ?? 'N/A'}
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                  <Text>User Rating</Text>
                  <Menu>
                    <Tooltip label="Add to watchlist">
                      <IconButton
                        as={MenuButton}
                        isRound
                        aria-label="Add to watchlist"
                        variant="ghost"
                        icon={<Iconify mx="auto" icon="mdi:plus" boxSize={8} />}
                      />
                    </Tooltip>
                    <MenuList color="black">
                      <MenuItem icon={<Iconify icon="mdi:plus" boxSize={6} />}>
                        New List
                      </MenuItem>
                      <MenuGroup title="My Lists">
                        <MenuItem icon={<Iconify icon="gg:list" boxSize={6} />}>
                          List 1
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  <Button colorScheme="orange" onClick={onTrailerModalOpen}>
                    <Iconify icon="mdi:play" boxSize={6} />
                    Play Trailer
                  </Button>
                </HStack>
                {user && (
                  <HStack>
                    <Text fontSize="md" fontWeight="bold">
                      Your Rate:
                    </Text>
                    <StarRating
                      rating={userRate}
                      setRating={handleRate}
                      count={10}
                    />
                    {movie?.userRate && (
                      <Tooltip label="Remove your rate">
                        <IconButton
                          colorScheme="red"
                          isRound
                          variant="ghost"
                          aria-label="Remove your rate"
                          icon={<Iconify icon="gala:remove" boxSize={6} />}
                          onClick={handleRemoveRate}
                        />
                      </Tooltip>
                    )}
                  </HStack>
                )}
                <Text fontSize="lg" color="gray" fontStyle="italic">
                  {movie?.tagline}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  Summary
                </Text>
                <Text fontSize="md">{movie?.summary}</Text>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Modal isOpen={isPosterModalOpen} onClose={onPosterModalClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody py={4}>
            <Image src={getCDNPath(movie?.posterPhotoFile?.path ?? '')} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isTrailerModalOpen}
        onClose={onTrailerModalClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody py={4}>
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${embedId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
