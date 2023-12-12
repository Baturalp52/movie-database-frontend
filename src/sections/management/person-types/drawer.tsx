import PersonTypesService from '@/services/person-types/person-types.service';
import { PersonTypeType } from '@/types/person-type.type';
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
  personTypeItem: PersonTypeType | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function PersonTypeItemDrawer({
  personTypeItem,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSave = async () => {
    setLoading(true);
    if (personTypeItem?.id) {
      const res = await PersonTypesService.putPersonType(personTypeItem.id, {
        name,
      });
      if (res.success) {
        toast({
          title: 'Update person type',
          description: `Person type ${name} updated successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    } else {
      const res = await PersonTypesService.postPersonType({ name });
      if (res.success) {
        toast({
          title: 'Create person type',
          description: `Person type ${name} created successfully`,
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
    if (personTypeItem?.id) {
      setName(personTypeItem.name);
    } else {
      setName('');
    }
  }, [personTypeItem]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {personTypeItem?.id ? 'Edit' : 'Create'} Person Type
        </DrawerHeader>

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
