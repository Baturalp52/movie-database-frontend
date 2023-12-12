import ManagementGenresMainSection from '@/sections/management/genres/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Genres',
};

export default function ManagementGenrePage() {
  return (
    <>
      <ManagementGenresMainSection />
    </>
  );
}
