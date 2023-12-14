import Iconify from '@/components/iconify';
import useFetch from '@/hooks/use-fetch';
import PersonTypesService from '@/services/person-types/person-types.service';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';
import PersonsService from '@/services/persons/persons.service';
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  MenuItem,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { AsyncSelect, Select } from 'chakra-react-select';
import debounce from 'lodash.debounce';
import { SetStateAction, useCallback } from 'react';

type Props = {
  persons: PersonsPostSearchPersonType[];
  setPersons: (persons: SetStateAction<PersonsPostSearchPersonType[]>) => void;
};

export default function People({ persons, setPersons }: Props) {
  const fetchPersonTypes = useCallback(
    async () => PersonTypesService.getAllPersonTypes(),
    [],
  );

  const { data = [] } = useFetch(fetchPersonTypes);

  async function search(text: string, resolve: any) {
    const res = await PersonsService.postSearchPersons(1, 10, { text });
    resolve(res.data);
    return res.data;
  }
  const debouncedSearch = debounce(search, 500);
  const handleSearchPeople = (inputValue: string) =>
    new Promise<any[]>(async (resolve) => {
      debouncedSearch(inputValue, resolve);
    });

  return (
    <Box>
      <FormLabel>People</FormLabel>

      <AsyncSelect
        cacheOptions
        loadOptions={handleSearchPeople}
        onChange={(value: PersonsPostSearchPersonType | null) => {
          if (value) {
            setPersons((prev) => [...prev, value]);
          }
        }}
        components={{
          Option: (props: any) => {
            return (
              <MenuItem onClick={props.innerProps.onClick}>
                {props.data.firstName} {props.data.lastName}
              </MenuItem>
            );
          },
        }}
      />
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
                      chakraStyles={{
                        container: () => ({ width: '100%' }),
                      }}
                      options={data ?? []}
                      value={person.personTypes ?? []}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      onChange={(value: any) => {
                        setPersons((prev) =>
                          prev.map((p: any) => {
                            if (p.id === person.id) {
                              p.personTypes = value;
                            }
                            return p;
                          }),
                        );
                      }}
                    />
                  </Box>
                  <FormControl>
                    <FormLabel>Role Name</FormLabel>
                    <Input
                      value={person.roleName ?? ''}
                      onChange={(e) => {
                        setPersons((prev) =>
                          prev.map((p: any) => {
                            if (p.id === person.id) {
                              p.roleName = e.target.value;
                            }
                            return p;
                          }),
                        );
                      }}
                    />
                  </FormControl>
                </VStack>
                <Tooltip label="Remove person">
                  <IconButton
                    colorScheme="red"
                    variant="ghost"
                    color="black"
                    aria-label="Remove person"
                    icon={<Iconify icon="mdi:trash" boxSize={6} />}
                    onClick={() =>
                      setPersons((prev) =>
                        prev.filter((p: any) => p.id !== person.id),
                      )
                    }
                  />
                </Tooltip>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}
