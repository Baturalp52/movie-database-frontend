import Iconify from '@/components/iconify';
import Image from '@/components/image';
import useDialog from '@/hooks/use-dialog';
import { BaseMovieType } from '@/services/movies/movie.type';
import MoviesService from '@/services/movies/movies.service';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';

type Props = {
  movie: BaseMovieType;
  onEdit: (user: BaseMovieType) => void;
  refetch: () => void;
};

export default function MovieItem({ movie, refetch, onEdit }: Props) {
  const deleteDialogOpen = useDialog();
  const toast = useToast();

  const { id, title, posterPhotoFile, originalLanguage } = movie;
  return (
    <Card>
      <CardBody>
        <Image
          src={posterPhotoFile?.path ? getCDNPath(posterPhotoFile?.path) : ''}
        />
      </CardBody>
      <CardFooter>
        <HStack w="100%">
          <HStack flex={1}>
            <Text color="black">{title}</Text>
            <Iconify
              icon={`flag:${originalLanguage?.toLowerCase()}-4x3`}
              boxSize={4}
            />
          </HStack>
          <Menu>
            <IconButton
              as={MenuButton}
              aria-label="edit"
              colorScheme="gray"
              color="gray"
              variant="ghost"
              isRound
              icon={
                <Iconify
                  icon="ant-design:more-outlined"
                  boxSize={6}
                  mx="auto"
                />
              }
            />
            <MenuList>
              <MenuItem
                color="black"
                onClick={() => {
                  onEdit(movie);
                }}
              >
                <Iconify icon="mdi:pencil" boxSize={6} />
                Edit
              </MenuItem>
              <MenuItem
                color="red"
                onClick={() => {
                  const deleteMovie = async () => {
                    const res = await MoviesService.deleteMovie(id);
                    if (res.success) {
                      toast({
                        title: 'Delete movie',
                        description: `Movie ${title} deleted successfully`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      });
                    }
                    refetch();
                  };
                  deleteDialogOpen({
                    title: 'Delete movie',
                    description: `Are you sure you want to delete ${title}?`,
                    cancelText: 'Cancel',
                    confirmText: 'Delete',
                    colorScheme: 'red',
                    handleClose: deleteMovie,
                  });
                }}
              >
                <Iconify icon="mdi:delete" boxSize={6} />
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </CardFooter>
    </Card>
  );
}
