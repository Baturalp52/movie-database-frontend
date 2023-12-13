'use client';

import FormProvider from '@/components/hook-form/form-provider';
import RHFInput from '@/components/hook-form/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextarea from '@/components/hook-form/textarea';
import {
  Button,
  DrawerFooter,
  DrawerBody,
  HStack,
  Text,
  VStack,
  useToast,
  Card,
} from '@chakra-ui/react';
import getCDNPath from '@/utils/get-cdn-path.util';
import UploadImage from '@/components/upload-image';
import { useEffect, useState } from 'react';
import RHFDropdown from '@/components/hook-form/dropdown';
import { GenderEnum } from '@/enums/gender.enum';
import { capitalCase } from 'change-case';
import FilesService from '@/services/files/files.service';
import { PERSON_PHOTO_RATIO } from '@/constants/person-photo-ratio.constant';
import { PersonType } from '@/types/person.type';
import {
  PersonsPostPersonRequestType,
  PersonsPutPersonRequestType,
} from '@/services/persons/person.type';
import PersonsService from '@/services/persons/persons.service';
import { personSchema } from './person.schema';
import RHFAutocomplete from '@/components/hook-form/autocomplete';
import { CountryData, all as allCountries } from 'country-codes-list';
import Iconify from '@/components/iconify';

type Props = {
  person: PersonType | null;
  onClose: () => void;
};

export default function PersonForm({ person, onClose }: Props) {
  const toast = useToast();

  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);

  const methods = useForm<PersonType>({
    defaultValues: person || {},
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(personSchema) as any,
  });

  const { formState, reset, trigger } = methods;

  const { isSubmitting, isValid, errors } = formState;

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (!person) return;
    reset(person);
  }, [person, reset]);

  const handleSubmit = async (
    data: PersonsPutPersonRequestType | PersonsPostPersonRequestType,
  ) => {
    if (newPhotoFile) {
      const formData = new FormData();
      formData.append('file', newPhotoFile);
      const res = await FilesService.postPersonsPhoto(formData);
      data.photoId = res.data?.id;
    }

    if ((data as any).photoFile) delete (data as any).photoFile;

    if (person?.id) {
      delete (data as any).id;
      const res = await PersonsService.putPerson(person?.id, data);
      if (res.success) {
        toast({
          title: 'Person updated.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      const res = await PersonsService.postPerson(data);
      if (res.success) {
        toast({
          title: 'Person created.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    }
    onClose();
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit}
      style={{
        overflowY: 'auto',
      }}
    >
      <DrawerBody>
        <VStack alignItems="stretch">
          <UploadImage
            src={
              person?.photoFile?.path ? getCDNPath(person?.photoFile?.path) : ''
            }
            onImageSelected={(file) => {
              setNewPhotoFile(file);
            }}
            ratio={PERSON_PHOTO_RATIO}
            minH={150}
          />
          <RHFInput
            name="firstName"
            placeholder="First Name"
            label="First Name"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFInput
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFTextarea
            name="bio"
            placeholder="Bio"
            label="Bio"
            TextareaProps={{
              variant: 'filled',
            }}
          />

          <RHFAutocomplete<CountryData>
            name="birthPlace"
            label="Birth Place"
            items={allCountries()}
            autocompleteProps={{
              getItemValue(item) {
                return item.countryCode;
              },
              shouldItemRender: (item, inputValue) =>
                item.countryNameEn
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) ||
                item.countryNameLocal
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) ||
                item.countryCode
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()),
              renderItem: (
                { countryCode, countryNameLocal } = {},
                isHighlighted,
              ) => (
                <Card
                  bgColor={isHighlighted ? 'gray.400' : 'gray.300'}
                  _hover={{
                    cursor: 'pointer',
                  }}
                  height="fit-content !important"
                  my={2}
                  p={1}
                >
                  <HStack key={`country-item-${countryCode}`}>
                    <Iconify
                      icon={`flag:${countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />
                    <Text>{countryNameLocal}</Text>
                  </HStack>
                </Card>
              ),
            }}
          />
          <RHFInput
            name="birthDay"
            placeholder="Birth Date"
            label="Birth Date"
            type="date"
            InputProps={{
              variant: 'filled',
              max: new Date().toISOString().split('T')[0],
            }}
          />
          <RHFDropdown
            name="gender"
            label="Gender"
            disableChooseOption
            options={
              Object.entries(GenderEnum)
                .filter(([, value]) => typeof value === 'number')
                .map(([key, value]) => ({ key, value })) as {
                key: string;
                value: string;
              }[]
            }
            renderOption={({ key, value }) => (
              <option key={key} value={value}>
                {capitalCase(key)}
              </option>
            )}
            SelectProps={{
              variant: 'filled',
            }}
          />
          <RHFInput
            name="knownJob"
            placeholder="Known Job"
            label="Known Job"
            InputProps={{
              variant: 'filled',
            }}
          />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid}>
          Save
        </Button>
      </DrawerFooter>
      <VStack spacing={2} alignItems="flex-end">
        {Object.entries(errors).map(([key, value]) => (
          <Text key={`error-${key}`} color="red">
            {value?.message}
          </Text>
        ))}
      </VStack>
    </FormProvider>
  );
}
