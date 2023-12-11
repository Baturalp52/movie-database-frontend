'use client';

import FormProvider from '@/components/hook-form/form-provider';
import RHFInput from '@/components/hook-form/input';
import useAuth from '@/hooks/use-auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileSettingsUpdateSchema } from './profile-settings.schema';
import { ProfilePutProfileAuthRequestType } from '@/services/profile/profile.type';
import { Button, Divider, VStack, useToast } from '@chakra-ui/react';
import ProfileService from '@/services/profile/profile.service';

type FormValuesType = ProfilePutProfileAuthRequestType & {
  newPasswordConfirm?: string;
};

export default function ProfileSettingsUpdateForm() {
  const toast = useToast();
  const { user, init: reinitUser } = useAuth();

  const methods = useForm<FormValuesType>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(profileSettingsUpdateSchema) as any,
  });

  const { formState } = methods;

  const { isSubmitting, isValid } = formState;

  const handleSubmit = async (data: FormValuesType) => {
    if (!data.email) delete data.email;
    if (!data.username) delete data.username;
    if (!data.newPassword) delete data.newPassword;

    delete data.newPasswordConfirm;
    const res = await ProfileService.putProfileAuth(data);
    if (res.success) {
      toast({
        title: 'Settings updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      reinitUser();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <RHFInput
          name="email"
          label={`Current Email: ${user?.auth.email}`}
          placeholder="New Email"
          InputProps={{
            variant: 'filled',
          }}
        />
        <RHFInput
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          type="password"
          InputProps={{
            variant: 'filled',
          }}
        />
        <RHFInput
          name="newPasswordConfirm"
          label="Confirm New Password"
          placeholder="Confirm New Password"
          type="password"
          InputProps={{
            variant: 'filled',
          }}
        />
        <RHFInput
          name="username"
          label={`Current Username: @${user?.auth.username}`}
          placeholder="New Username"
          InputProps={{
            variant: 'filled',
          }}
        />

        <Divider borderBottomWidth={2} borderBottomColor="gray.400" />

        <RHFInput
          name="password"
          type="password"
          label={`Current Password`}
          placeholder="Current Password"
          FormControlProps={{
            isRequired: true,
          }}
          InputProps={{
            variant: 'filled',
          }}
        />
        <Button
          type="submit"
          w="100%"
          isLoading={isSubmitting}
          isDisabled={!isValid}
        >
          Save
        </Button>
      </VStack>
    </FormProvider>
  );
}
