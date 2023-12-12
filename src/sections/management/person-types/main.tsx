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
import PersonTypeItemDrawer from './drawer';
import PersonTypesService from '@/services/person-types/person-types.service';
import { PersonTypeType } from '@/types/person-type.type';

function ManagementPersonTypesMainSection() {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();
  const deleteDialogOpen = useDialog();
  const toast = useToast();
  const [drawerPersonType, setDrawerPersonType] =
    useState<PersonTypeType | null>(null);

  const fetchPersonTypes = useCallback(
    async () => PersonTypesService.getAllPersonTypes(),
    [],
  );

  const { data, loading, refetch } = useFetch(fetchPersonTypes);

  const handleNewPersonType = () => {
    setDrawerPersonType(null);
    onDrawerOpen();
  };

  const handleEditPersonType = (personTypeItem: PersonTypeType) => {
    setDrawerPersonType(personTypeItem);
    onDrawerOpen();
  };

  const PersonTypeItem = (personTypeItem: PersonTypeType) => {
    const { id, name } = personTypeItem;
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
            handleEditPersonType(personTypeItem);
          }}
        />
        <IconButton
          aria-label="delete"
          colorScheme="red"
          isRound
          variant="ghost"
          icon={<Iconify icon="mdi:delete" boxSize={6} />}
          onClick={() => {
            const deletePersonType = async () => {
              const res = await PersonTypesService.deletePersonType(id);
              if (res.success) {
                toast({
                  title: 'Delete person type',
                  description: `Person type ${name} deleted successfully`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }
              refetch();
            };
            deleteDialogOpen({
              title: 'Delete person type',
              description: `Are you sure you want to delete ${name}?`,
              cancelText: 'Cancel',
              confirmText: 'Delete',
              colorScheme: 'red',
              handleClose: deletePersonType,
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
        <Heading size="xl">Person Types</Heading>
        <Button onClick={handleNewPersonType}>
          <Iconify icon="mdi:plus" boxSize={6} />
          Add Person Type
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
        {data?.map((personTypeItem: PersonTypeType) => (
          <PersonTypeItem
            key={`management-person-type-item-${personTypeItem.id}`}
            {...personTypeItem}
          />
        ))}
      </SimpleGrid>
      <PersonTypeItemDrawer
        refetch={refetch}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        personTypeItem={drawerPersonType}
      />
    </>
  );
}

export default withRole(ManagementPersonTypesMainSection, UserRoleEnum.ADMIN);
