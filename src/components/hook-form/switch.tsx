import {
  Box,
  BoxProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  HStack,
  Switch,
  SwitchProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  SwitchProps?: SwitchProps;
  FormControlProps?: FormControlProps;
} & BoxProps;

export default function RHFSwitch({
  name,
  label,
  SwitchProps,
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
          <FormControl
            isInvalid={fieldState?.invalid}
            {...FormControlProps}
            as={HStack}
            alignItems="center"
          >
            {label && (
              <FormLabel color={fieldState?.error ? 'red.500' : 'inherit'}>
                {label}
              </FormLabel>
            )}
            <Switch
              id={name}
              isInvalid={fieldState?.invalid}
              {...field}
              isChecked={field.value}
              {...SwitchProps}
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
