import ProfileSettingsPageMainSection from '@/sections/profile/settings/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile Settings',
};

export default function ProfileSettingsPage() {
  return (
    <>
      <ProfileSettingsPageMainSection />
    </>
  );
}
