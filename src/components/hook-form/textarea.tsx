import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  TextareaProps?: TextareaProps;
} & BoxProps;

export default function RHFTextarea({
  name,
  label,
  placeholder,
  TextareaProps,
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
            <Textarea
              id={name}
              isInvalid={fieldState?.invalid}
              color="black"
              placeholder={placeholder}
              {...field}
              {...TextareaProps}
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
