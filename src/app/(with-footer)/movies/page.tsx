import MoviesPageMainSection from '@/sections/movies/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Movies',
  keywords: 'movies',
};

export default function MoviesPage() {
  return <MoviesPageMainSection />;
}
