import MovieForm from '@/sections/management/movies/form';
import { MovieRequestsPostMovieRequestRequestType } from '@/services/movie-requests/movie-request.type';
import MovieRequestsService from '@/services/movie-requests/movie-requests.service';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useCallback } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MovieRequestModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const handleSubmit = useCallback(
    async (data: MovieRequestsPostMovieRequestRequestType) => {
      const res = await MovieRequestsService.postMovieRequest(data);
      if (res.success) {
        toast({
          title: 'Movie requested.',
          description: `The movie "${res.data?.title}" has been requested.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request a movie</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MovieForm movie={null} onSubmit={handleSubmit} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
