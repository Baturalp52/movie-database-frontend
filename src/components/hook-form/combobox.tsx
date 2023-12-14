import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, Props as SelectProps } from 'chakra-react-select';

type Props<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  disableChooseOption?: boolean;
  options: T[];
  selectProps: Omit<SelectProps, 'items' | 'value'>;
} & Omit<BoxProps, 'filter'>;

export default function RHFCombobox<T extends Record<string, string> | string>({
  name,
  label,
  options = [],
  selectProps,
  ...props
}: Props<T>) {
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
            <Select {...field} {...selectProps} options={options} />
            {fieldState?.error && (
              <FormErrorMessage>{fieldState?.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}
