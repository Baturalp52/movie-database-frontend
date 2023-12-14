import ManagementMovieRequestsMainSection from '@/sections/management/movie-requests/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Movie Requests',
};

export default function ManagementMoviesPage() {
  return (
    <>
      <ManagementMovieRequestsMainSection />
    </>
  );
}
