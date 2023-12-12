import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  SelectProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete, { AutocompleteProps } from '../autocomplete';

type Props<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  disableChooseOption?: boolean;
  SelectProps?: SelectProps;
  options: T[];
  filter?: AutocompleteProps<T>['filter'];
  renderOption?: AutocompleteProps<T>['renderOption'];
} & Omit<BoxProps, 'filter'>;

export default function RHFAutocomplete<
  T extends Record<string, string> | string,
>({ name, label, options = [], renderOption, filter, ...props }: Props<T>) {
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
            <Autocomplete
              {...field}
              options={options}
              filter={filter}
              renderOption={renderOption}
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
