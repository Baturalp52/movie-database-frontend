'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from './schema';
import RHFInput from '@/components/hook-form/input';
import FormProvider from '@/components/hook-form/form-provider';
import { AuthLoginRequestType } from '@/services/auth/auth.type';
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
import useUser from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const defaultValues: AuthLoginRequestType = {
  emailOrUsername: '',
  password: '',
};

export default function LoginForm() {
  const toast = useToast();

  const { push } = useRouter();

  const { user, isInitialized, login } = useUser();
  const methods = useForm<AuthLoginRequestType>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(LoginFormSchema),
  });

  const { formState } = methods;

  const { isValid, isSubmitting } = formState;

  const handleSubmit = async (data: AuthLoginRequestType) => {
    const res = await login(data.emailOrUsername, data.password);

    if (res) {
      toast({
        title: 'Login success',
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
            Login
          </Text>
        </CardHeader>

        <CardBody>
          <RHFInput name="emailOrUsername" label="Email or Username" />
          <RHFInput name="password" label="Password" type="password" />
        </CardBody>

        <CardFooter textAlign="center" as={Stack}>
          <Button type="submit" isDisabled={!isValid} isLoading={isSubmitting}>
            Login
          </Button>
          <Link href={ROUTES.SIGN_UP} fontSize="sm">
            Don't you have account?
          </Link>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
