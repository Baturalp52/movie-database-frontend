import PersonsService from '@/services/persons/persons.service';
import { PersonType } from '@/types/person.type';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import PersonForm from './form';
import LoadingLogo from '@/components/loading-logo';

type Props = {
  personId: number | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function PersonDrawer({
  personId,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [person, setPerson] = useState<PersonType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPerson = useCallback(async () => {
    setLoading(true);
    if (!personId) {
      setPerson(null);
    } else {
      const res = await PersonsService.getPerson(personId);
      if (res.success && res.data) {
        res.data.birthDay = new Date(res.data.birthDay)
          .toISOString()
          .split('T')[0] as any;
        setPerson(res.data);
      }
    }
    setLoading(false);
  }, [personId]);

  useEffect(() => {
    if (personId) {
      fetchPerson();
    } else {
      setPerson(null);
    }
  }, [fetchPerson, personId]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>{person?.id ? 'Edit' : 'Create'} Person</Heading>
        </DrawerHeader>
        {loading ? (
          <DrawerBody>
            <Box width="100%" height="100%">
              <LoadingLogo w="fit-content" mx="auto" />
            </Box>
          </DrawerBody>
        ) : (
          <PersonForm
            person={person}
            onClose={() => {
              refetch();
              onClose();
            }}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
