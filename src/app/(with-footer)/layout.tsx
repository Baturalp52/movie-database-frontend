import MainFooter from '@/layouts/main-layout/footer';

type Props = { children: React.ReactNode };

export default function WithFooterLayout({ children }: Props) {
  return (
    <>
      {children}
      <MainFooter />
    </>
  );
}
