import { FormHTMLAttributes } from 'react';
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from 'react-hook-form';

type Props = {
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void | Promise<void> | Promise<any> | void;
  children: React.ReactNode;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export default function FormProvider({
  methods,
  onSubmit,
  children,
  ...formProps
}: Props) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
        {children}
      </form>
    </RHFFormProvider>
  );
}
