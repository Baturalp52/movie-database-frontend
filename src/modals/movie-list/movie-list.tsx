import FormProvider from '@/components/hook-form/form-provider';
import { MovieListType } from '@/types/movie-list.type';
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieListSchema } from './movie-list.schema';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import RHFInput from '@/components/hook-form/input';
import RHFSwitch from '@/components/hook-form/switch';
import MovieListsService from '@/services/movie-lists/movie-lists.service';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  movieList?: MovieListType | null;
  cb?: () => void;
};

export default function MovieListModal({
  isOpen,
  onClose,
  movieList,
  cb,
}: Props) {
  const toast = useToast();
  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      public: false,
    },
    resolver: yupResolver(movieListSchema),
  });

  const { reset, trigger } = methods;

  useEffect(() => {
    if (movieList) {
      reset({ name: movieList?.name, public: movieList?.public });
    } else {
      reset({
        name: '',
        public: false,
      });
    }
  }, [movieList, reset]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const handleSubmit = async (data: MovieListType) => {
    if (movieList?.id) {
      const res = await MovieListsService.putMovieList(movieList?.id, data);
      if (res.success) {
        toast({
          title: 'Movie List Updated!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const res = await MovieListsService.postMovieList(data);
      if (res.success) {
        toast({
          title: 'Movie List Created!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    onClose();
    if (cb) {
      cb();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>{movieList?.id ? 'Edit' : 'Create'} Movie List</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <ModalBody>
            <RHFInput name="name" label="Name" />
            <RHFSwitch name="public" label="Show to others? " />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
