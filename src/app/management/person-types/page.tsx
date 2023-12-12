import ManagementPersonTypesMainSection from '@/sections/management/person-types/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Person Types',
};

export default function ManagementPersonTypesPage() {
  return (
    <>
      <ManagementPersonTypesMainSection />
    </>
  );
}
