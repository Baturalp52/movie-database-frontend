import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  type?: string;
} & BoxProps;

export default function RHFInput({
  name,
  label,
  type = 'text',
  ...props
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box {...props}>
          <FormControl isInvalid={fieldState?.invalid}>
            {label && (
              <FormLabel color={fieldState?.error ? 'red.500' : 'inherit'}>
                {label}
              </FormLabel>
            )}
            <Input
              id={name}
              type={type}
              isInvalid={fieldState?.invalid}
              color="black"
              {...field}
            />
            {fieldState?.error && (
              <FormErrorMessage>{fieldState?.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}
