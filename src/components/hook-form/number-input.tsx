import {
  Box,
  BoxProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  InputProps?: NumberInputProps;
  FormControlProps?: FormControlProps;
} & BoxProps;

export default function RHFNumberInput({
  name,
  label,
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
            <NumberInput
              id={name}
              placeholder={placeholder}
              isInvalid={fieldState?.invalid}
              color="black"
              {...field}
              {...InputProps}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            {fieldState?.error && (
              <FormErrorMessage>{fieldState?.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}
