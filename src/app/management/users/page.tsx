import ManagementUsersMainSection from '@/sections/management/users/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Users',
};

export default function ManagementUserPage() {
  return (
    <>
      <ManagementUsersMainSection />
    </>
  );
}
