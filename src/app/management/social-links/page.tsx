import ManagementSocialLinksMainSection from '@/sections/management/social-links/main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Management - Social Links',
};

export default function ManagementSocialLinksPage() {
  return (
    <>
      <ManagementSocialLinksMainSection />
    </>
  );
}
