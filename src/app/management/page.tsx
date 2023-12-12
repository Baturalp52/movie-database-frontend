import ManagementPageMainSection from '@/sections/management/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management',
};

export default function ManagementPage() {
  return (
    <>
      <ManagementPageMainSection />
    </>
  );
}
