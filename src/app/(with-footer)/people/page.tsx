import PeoplePageMainSection from '@/sections/people/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People',
  description: 'People',
  keywords: 'people',
};

export default function PeoplePage() {
  return <PeoplePageMainSection />;
}
