import Iconify from '@/components/iconify';
import Image from '@/components/image';
import useDialog from '@/hooks/use-dialog';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';
import PersonsService from '@/services/persons/persons.service';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

type Props = {
  person: PersonsPostSearchPersonType;
  onEdit: (user: PersonsPostSearchPersonType) => void;
  refetch: () => void;
};

export default function PersonItem({ person, refetch, onEdit }: Props) {
  const deleteDialogOpen = useDialog();
  const toast = useToast();

  const { id, firstName, lastName, photoFile, birthPlace } = person;
  return (
    <VStack
      borderRadius={4}
      border="2px solid"
      borderColor="gray.200"
      p={2}
      color="white"
    >
      <Image src={photoFile?.path ? getCDNPath(photoFile?.path) : ''} />
      <HStack w="100%">
        <HStack flex={1}>
          <Text color="black">
            {firstName} {lastName}
          </Text>
          <Iconify icon={`flag:${birthPlace?.toLowerCase()}-4x3`} boxSize={4} />
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
              <Iconify icon="ant-design:more-outlined" boxSize={6} mx="auto" />
            }
          />
          <MenuList>
            <MenuItem
              color="black"
              onClick={() => {
                onEdit(person);
              }}
            >
              <Iconify icon="mdi:pencil" boxSize={6} />
              Edit
            </MenuItem>
            <MenuItem
              color="red"
              onClick={() => {
                const deletePerson = async () => {
                  const res = await PersonsService.deletePerson(id);
                  if (res.success) {
                    toast({
                      title: 'Delete person',
                      description: `Person ${firstName} ${lastName} deleted successfully`,
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  refetch();
                };
                deleteDialogOpen({
                  title: 'Delete person',
                  description: `Are you sure you want to delete ${firstName} ${lastName}?`,
                  cancelText: 'Cancel',
                  confirmText: 'Delete',
                  colorScheme: 'red',
                  handleClose: deletePerson,
                });
              }}
            >
              <Iconify icon="mdi:delete" boxSize={6} />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
}
