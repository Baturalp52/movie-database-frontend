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
import useFetch from '@/hooks/use-fetch';
import LoadingLogo from '@/components/loading-logo';
import useDialog from '@/hooks/use-dialog';
import SocialMediaItemDrawer from './drawer';
import SocialMediaItemsService from '@/services/social-media-items/social-media-items.service';
import { SocialMediaItemType } from '@/types/social-media-item.type';

function ManagementSocialLinksMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const deleteDialogOpen = useDialog();
  const toast = useToast();
  const [drawerSocialMediaItem, setDrawerSocialMediaItem] =
    useState<SocialMediaItemType | null>(null);

  const fetchSocialMediaItems = useCallback(
    async () => SocialMediaItemsService.getAllSocialMediaItems(),
    [],
  );

  const { data, loading, refetch } = useFetch(fetchSocialMediaItems);

  const handleNewSocialMediaItem = () => {
    setDrawerSocialMediaItem(null);
    onDrawerOpen();
  };

  const handleEditSocialMediaItem = (socialMediaItem: SocialMediaItemType) => {
    setDrawerSocialMediaItem(socialMediaItem);
    onDrawerOpen();
  };

  const SocialMediaItem = (socialMediaItem: SocialMediaItemType) => {
    const { id, name, icon } = socialMediaItem;
    return (
      <HStack borderRadius={2} background="orange" p={4} color="white">
        <HStack spacing={2} flex={1} alignItems="center">
          <Iconify icon={icon} boxSize={6} />
          <Text textAlign="start">{name}</Text>
        </HStack>
        <IconButton
          aria-label="edit"
          colorScheme="teal"
          variant="ghost"
          isRound
          icon={<Iconify icon="mdi:pencil" boxSize={6} />}
          onClick={() => {
            handleEditSocialMediaItem(socialMediaItem);
          }}
        />
        <IconButton
          aria-label="delete"
          colorScheme="red"
          isRound
          variant="ghost"
          icon={<Iconify icon="mdi:delete" boxSize={6} />}
          onClick={() => {
            const deleteSocialMediaItem = async () => {
              const res =
                await SocialMediaItemsService.deleteSocialMediaItem(id);
              if (res.success) {
                toast({
                  title: 'Delete social link',
                  description: `Social link ${name} deleted successfully`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }
              refetch();
            };
            deleteDialogOpen({
              title: 'Delete social link',
              description: `Are you sure you want to delete ${name}?`,
              cancelText: 'Cancel',
              confirmText: 'Delete',
              colorScheme: 'red',
              handleClose: deleteSocialMediaItem,
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
        <Heading size="xl">Social Links</Heading>
        <Button onClick={handleNewSocialMediaItem}>
          <Iconify icon="mdi:plus" boxSize={6} />
          Add Social Link
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
        {data?.map((socialMediaItem: SocialMediaItemType) => (
          <SocialMediaItem
            key={`management-social-media-item-${socialMediaItem.id}`}
            {...socialMediaItem}
          />
        ))}
      </SimpleGrid>
      <SocialMediaItemDrawer
        refetch={refetch}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        socialMediaItem={drawerSocialMediaItem}
      />
    </>
  );
}

export default withRole(ManagementSocialLinksMainSection, UserRoleEnum.ADMIN);
