import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from 'react-hook-form';

type Props = {
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void | Promise<void> | Promise<any> | void;
  children: React.ReactNode;
};

export default function FormProvider({ methods, onSubmit, children }: Props) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFFormProvider>
  );
}
