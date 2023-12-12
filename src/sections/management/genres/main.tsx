'use client';

import withRole from '@/hocs/with-role.hoc';
import { UserRoleEnum } from '@/enums/role.enum';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Iconify from '@/components/iconify';
import { useCallback, useState } from 'react';
import GenresService from '@/services/genres/genres.service';
import useFetch from '@/hooks/use-fetch';
import LoadingLogo from '@/components/loading-logo';
import { GenreType } from '@/types/genre.type';
import useDialog from '@/hooks/use-dialog';
import GenreItemDrawer from './drawer';

function ManagementGenresMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const deleteDialogOpen = useDialog();
  const toast = useToast();
  const [drawerGenreItem, setDrawerGenreItem] = useState<GenreType | null>(
    null,
  );

  const fetchGenres = useCallback(async () => GenresService.getAllGenres(), []);

  const { data, loading, refetch } = useFetch(fetchGenres);

  const handleNewGenre = () => {
    setDrawerGenreItem(null);
    onDrawerOpen();
  };

  const handleEditGenre = (genreItem: GenreType) => {
    setDrawerGenreItem(genreItem);
    onDrawerOpen();
  };

  const GenreItem = (genreItem: GenreType) => {
    const { id, name } = genreItem;
    return (
      <HStack borderRadius={2} background="orange" p={4} color="white">
        <Text flex={1} textAlign="start">
          {name}
        </Text>
        <IconButton
          aria-label="edit"
          colorScheme="teal"
          variant="ghost"
          isRound
          icon={<Iconify icon="mdi:pencil" boxSize={6} />}
          onClick={() => {
            handleEditGenre(genreItem);
          }}
        />
        <IconButton
          aria-label="delete"
          colorScheme="red"
          isRound
          variant="ghost"
          icon={<Iconify icon="mdi:delete" boxSize={6} />}
          onClick={() => {
            const deleteGenre = async () => {
              const res = await GenresService.deleteGenre(id);
              if (res.success) {
                toast({
                  title: 'Delete genre',
                  description: `Genre ${name} deleted successfully`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }
              refetch();
            };
            deleteDialogOpen({
              title: 'Delete genre',
              description: `Are you sure you want to delete ${name}?`,
              cancelText: 'Cancel',
              confirmText: 'Delete',
              colorScheme: 'red',
              handleClose: deleteGenre,
            });
          }}
        />
      </HStack>
    );
  };

  if (loading)
    return (
      <Box width="100%" height="100%">
        <Center w="100%" h="100%">
          <LoadingLogo />
        </Center>
      </Box>
    );
  return (
    <>
      <HStack w="100%" justifyContent="space-between">
        <Heading size="xl">Genres</Heading>
        <Button onClick={handleNewGenre}>
          <Iconify icon="mdi:plus" boxSize={6} />
          Add Genre
        </Button>
      </HStack>
      <SimpleGrid
        mt={2}
        spacing={4}
        columns={{
          base: 1,
          sm: 2,
          md: 4,
        }}
        textAlign="center"
      >
        {data?.map((genreItem: GenreType) => (
          <GenreItem
            key={`management-genre-item-${genreItem.id}`}
            {...genreItem}
          />
        ))}
      </SimpleGrid>
      <GenreItemDrawer
        refetch={refetch}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        genreItem={drawerGenreItem}
      />
    </>
  );
}

export default withRole(ManagementGenresMainSection, UserRoleEnum.ADMIN);
