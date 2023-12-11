'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SignUpFormSchema } from './schema';
import RHFInput from '@/components/hook-form/input';
import FormProvider from '@/components/hook-form/form-provider';
import { AuthRegisterRequestType } from '@/services/auth/auth.type';
import { ROUTES } from '@/utils/routes';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import useAuth from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const defaultValues: AuthRegisterRequestType = {
  email: '',
  username: '',
  password: '',
};

export default function SignUpForm() {
  const toast = useToast();

  const { push } = useRouter();

  const { user, isInitialized, register } = useAuth();
  const methods = useForm<AuthRegisterRequestType>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(SignUpFormSchema),
  });

  const { formState } = methods;

  const { isValid, isSubmitting } = formState;

  const handleSubmit = async (data: AuthRegisterRequestType) => {
    const res = await register(data.email, data.username, data.password);

    if (res) {
      toast({
        title: 'Registration success',
        status: 'success',
        isClosable: true,
      });
      push(ROUTES.HOME);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      if (user) {
        push(ROUTES.HOME);
      }
    }
  }, [user, isInitialized, push]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Card bg="orange" color="white">
        <CardHeader>
          <Text fontSize="2xl" textAlign="center">
            Sign Up
          </Text>
        </CardHeader>

        <CardBody>
          <RHFInput name="email" label="Email" />
          <RHFInput name="username" label="Username" />
          <RHFInput name="password" label="Password" type="password" />
        </CardBody>

        <CardFooter textAlign="center" as={Stack}>
          <Button type="submit" isDisabled={!isValid} isLoading={isSubmitting}>
            Sign Up
          </Button>
          <Link href={ROUTES.LOGIN} fontSize="sm">
            Do you have account?
          </Link>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
