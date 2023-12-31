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
import RHFCombobox from '@/components/hook-form/combobox';
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
    data.birthPlace = (data as any).birthPlace?.countryCode;

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

          <RHFCombobox<CountryData>
            name="birthPlace"
            label="Birth Place"
            options={allCountries()}
            selectProps={{
              getOptionLabel(item: any) {
                return item.countryNameLocal;
              },
              filterOption: ({ data }: any, inputValue) =>
                data?.countryNameEn
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.countryNameLocal
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.countryCode
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()),
              components: {
                Option: ({ data, innerProps }: any) => (
                  <HStack
                    {...innerProps}
                    key={`country-item-${data?.countryCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />
                    <Text>{data?.countryNameLocal}</Text>
                  </HStack>
                ),
                SingleValue: ({ data }: any) => (
                  <HStack
                    key={`country-item-${data?.countryCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />

                    <Text>{data?.countryNameLocal}</Text>
                  </HStack>
                ),
              },
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
