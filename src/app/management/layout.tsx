import MainManagementLayout from '@/layouts/management-layout/main-layout';

type Props = { children: React.ReactNode };

export default function ProfileLayout({ children }: Props) {
  return <MainManagementLayout>{children}</MainManagementLayout>;
}
