import ProfilePageMainSection from '@/sections/profile/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile',
};

export default function ProfilePage() {
  return (
    <>
      <ProfilePageMainSection />
    </>
  );
}
