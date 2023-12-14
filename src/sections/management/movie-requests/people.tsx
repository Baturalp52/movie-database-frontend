import useFetch from '@/hooks/use-fetch';
import PersonTypesService from '@/services/person-types/person-types.service';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useCallback } from 'react';

type Props = {
  persons: PersonsPostSearchPersonType[];
};

export default function People({ persons }: Props) {
  const fetchPersonTypes = useCallback(
    async () => PersonTypesService.getAllPersonTypes(),
    [],
  );

  const { data = [] } = useFetch(fetchPersonTypes);

  return (
    <Box>
      <FormLabel>People</FormLabel>

      <VStack mt={2}>
        {persons.map((person: any) => (
          <Card key={`movie-person-${person.id}`} w="100%">
            <CardBody>
              <HStack alignItems="flex-start">
                <VStack w="100%" alignItems="flex-start" spacing={2}>
                  <Text>
                    {person.firstName} {person.lastName}
                  </Text>
                  <Box position="relative" w="100%">
                    <Select
                      isMulti
                      isReadOnly
                      chakraStyles={{
                        container: () => ({ width: '100%' }),
                      }}
                      options={data ?? []}
                      value={person.personTypes ?? []}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={() => {}}
                    />
                  </Box>
                  <FormControl>
                    <FormLabel>Role Name</FormLabel>
                    <Input
                      isReadOnly
                      value={person.roleName ?? ''}
                      onChange={() => {}}
                    />
                  </FormControl>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}
