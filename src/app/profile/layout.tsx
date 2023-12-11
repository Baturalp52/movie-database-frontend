import MainProfileLayout from '@/layouts/profile-layout/main-layout';

type Props = { children: React.ReactNode };

export default function ProfileLayout({ children }: Props) {
  return <MainProfileLayout>{children}</MainProfileLayout>;
}
