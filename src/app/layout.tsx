import type { Metadata } from 'next';
import Providers from './providers';
import { fonts } from './fonts';
import MainLayout from '@/layouts/main-layout';

export const metadata: Metadata = {
  title: {
    template: '%s | Movie Database',
    default: 'Movie Database', // a default is required when creating a template
  },
  description: 'Movie database',
};

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={fonts.rubik.className}>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
