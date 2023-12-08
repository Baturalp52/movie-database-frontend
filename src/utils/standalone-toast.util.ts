import { UseToastOptions, createStandaloneToast } from '@chakra-ui/react';

const { toast: _toast } = createStandaloneToast();

export const standaloneToast = (toastOptions: UseToastOptions) =>
  _toast({
    position: 'top-right',
    duration: TOAST_DURATION,
    isClosable: true,
    ...toastOptions,
  });

const TOAST_DURATION = 2000;
