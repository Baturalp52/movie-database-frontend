'use client';

import FormProvider from '@/components/hook-form/form-provider';
import RHFInput from '@/components/hook-form/input';
import useAuth from '@/hooks/use-auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileUpdateSchema } from './profile.schema';
import { ProfilePutProfileRequestType } from '@/services/profile/profile.type';
import { UserType } from '@/types/user.type';
import RHFTextarea from '@/components/hook-form/textarea';
import { Button, Grid, GridItem, VStack, useToast } from '@chakra-ui/react';
import UploadAvatar from '@/components/upload-avatar';
import getCDNPath from '@/utils/get-cdn-path.util';
import UploadImage from '@/components/upload-image';
import { useEffect, useState } from 'react';
import { PROFILE_BANNER_RATIO } from '@/constants/profile-banner-ratio.constant';
import RHFDropdown from '@/components/hook-form/dropdown';
import { GenderEnum } from '@/enums/gender.enum';
import { capitalCase } from 'change-case';
import FilesService from '@/services/files/files.service';
import ProfileService from '@/services/profile/profile.service';

export default function ProfileUpdateForm() {
  const toast = useToast();
  const { user, init: reinitUser } = useAuth();
  const [newBannerPhotoFile, setNewBannerPhotoFile] = useState<File | null>(
    null,
  );
  const [newProfilePhotoFile, setNewProfilePhotoFile] = useState<File | null>(
    null,
  );

  const methods = useForm<UserType>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio,
      gender: user?.gender,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(profileUpdateSchema) as any,
  });

  const { formState, reset } = methods;

  const { isSubmitting, isValid } = formState;

  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio,
      gender: user?.gender,
    });
  }, [reset, user]);

  const handleSubmit = async (data: ProfilePutProfileRequestType) => {
    if (newBannerPhotoFile) {
      const formData = new FormData();
      formData.append('file', newBannerPhotoFile);
      const res = await FilesService.postUsersBanner(formData);
      data.bannerPhotoId = res.data?.id;
    }

    if (newProfilePhotoFile) {
      const formData = new FormData();
      formData.append('file', newProfilePhotoFile);
      const res = await FilesService.postUsersProfile(formData);
      data.profilePhotoId = res.data?.id;
    }

    const res = await ProfileService.putProfile(data);
    if (res.success) {
      toast({
        title: 'Profile updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      reinitUser();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Grid gridTemplateColumns="repeat(3,1fr)" gap={4}>
        <GridItem colSpan={3}>
          <UploadImage
            maxW={'2xl'}
            mx="auto"
            src={getCDNPath(user?.bannerPhotoFile?.path ?? '')}
            onImageSelected={(file) => {
              setNewBannerPhotoFile(file);
            }}
            ratio={PROFILE_BANNER_RATIO}
          />
        </GridItem>
        <GridItem>
          <UploadAvatar
            maxW={'3xs'}
            mx="auto"
            src={getCDNPath(user?.profilePhotoFile?.path ?? '')}
            onImageSelected={(file) => {
              setNewProfilePhotoFile(file);
            }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <VStack spacing={4} align="stretch">
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
            />
          </VStack>
        </GridItem>
        <GridItem colSpan={2} />
        <GridItem>
          <Button
            type="submit"
            w="100%"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Save
          </Button>
        </GridItem>
      </Grid>
    </FormProvider>
  );
}
