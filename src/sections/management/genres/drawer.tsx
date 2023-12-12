import GenresService from '@/services/genres/genres.service';
import { GenreType } from '@/types/genre.type';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  genreItem: GenreType | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function GenreItemDrawer({
  genreItem,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSave = async () => {
    setLoading(true);
    if (genreItem?.id) {
      const res = await GenresService.putGenre(genreItem.id, { name });
      if (res.success) {
        toast({
          title: 'Update genre',
          description: `Genre ${name} updated successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    } else {
      const res = await GenresService.postGenre({ name });
      if (res.success) {
        toast({
          title: 'Create genre',
          description: `Genre ${name} created successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    }
    refetch();
    setLoading(false);
  };

  useEffect(() => {
    if (genreItem?.id) {
      setName(genreItem.name);
    } else {
      setName('');
    }
  }, [genreItem]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{genreItem?.id ? 'Edit' : 'Create'} Genre</DrawerHeader>

        <DrawerBody>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              variant="filled"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={loading}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
