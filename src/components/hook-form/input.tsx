import {
  Box,
  BoxProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  InputProps?: InputProps;
  FormControlProps?: FormControlProps;
} & BoxProps;

export default function RHFInput({
  name,
  label,
  type = 'text',
  placeholder,
  InputProps,
  FormControlProps,
  ...props
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box {...props}>
          <FormControl isInvalid={fieldState?.invalid} {...FormControlProps}>
            {label && (
              <FormLabel color={fieldState?.error ? 'red.500' : 'inherit'}>
                {label}
              </FormLabel>
            )}
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              isInvalid={fieldState?.invalid}
              color="black"
              {...field}
              {...InputProps}
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
