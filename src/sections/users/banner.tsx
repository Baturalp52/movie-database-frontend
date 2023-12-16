import Iconify from '@/components/iconify';
import Image from '@/components/image';
import RatingCircle from '@/components/rating-circle';
import { UserType } from '@/types/user.type';
import { formatDate } from '@/utils/format-date.util';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

type Props = {
  user: UserType;
};

export default function UserBannerSection({ user }: Props) {
  const {
    isOpen: isPosterModalOpen,
    onOpen: onProfilePhotoModalOpen,
    onClose: onPosterModalClose,
  } = useDisclosure();

  return (
    <>
      <Box
        backgroundImage={`url(${getCDNPath(
          user?.bannerPhotoFile?.path ?? '',
        )})`}
        backgroundSize="cover"
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
                <Image src={getCDNPath(user?.profilePhotoFile?.path ?? '')} />
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
                  onClick={onProfilePhotoModalOpen}
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
                <HStack alignItems="flex-end">
                  <Text fontSize="4xl" fontWeight="bold">
                    {user?.firstName && user?.lastName
                      ? `${user?.firstName} ${user?.lastName}`
                      : user?.detail?.username}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="gray">
                    Member since {formatDate(new Date(user?.createdAt))}
                  </Text>
                </HStack>
                <HStack>
                  <RatingCircle rate={user?.avgRating} />
                  <Text>Average Rating</Text>
                </HStack>

                <Text fontSize="xl" fontWeight="bold">
                  Bio
                </Text>
                <Text fontSize="md">{user?.bio}</Text>
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
            <Image src={getCDNPath(user?.profilePhotoFile?.path ?? '')} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
