import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props<T> = {
  name: string;
  label?: string;
  options?: T[];
  renderOption?: (option: T) => JSX.Element;
  placeholder?: string;
  disableChooseOption?: boolean;
  SelectProps?: SelectProps;
} & BoxProps;

export default function RHFDropdown<T extends Record<string, string> | string>({
  name,
  label,
  options = [],
  renderOption,
  placeholder,
  disableChooseOption = false,
  SelectProps,
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
            <Select {...SelectProps} {...field}>
              {!disableChooseOption && (
                <option value="">{placeholder ?? 'Select'}</option>
              )}
              {options.map((option) =>
                renderOption ? (
                  renderOption(option)
                ) : (
                  <option
                    key={`${name}-option-${option}`}
                    value={option as string}
                  >
                    {option as string}
                  </option>
                ),
              )}
            </Select>
            {fieldState?.error && (
              <FormErrorMessage>{fieldState?.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}
