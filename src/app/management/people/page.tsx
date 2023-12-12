import ManagementPeopleMainSection from '@/sections/management/people/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - People',
};

export default function ManagementPeoplePage() {
  return (
    <>
      <ManagementPeopleMainSection />
    </>
  );
}
