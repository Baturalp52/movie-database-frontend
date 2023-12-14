import ManagementMoviesMainSection from '@/sections/management/movies/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Movies',
};

export default function ManagementMoviesPage() {
  return (
    <>
      <ManagementMoviesMainSection />
    </>
  );
}
