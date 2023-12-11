'use client';

import withAuth from '@/hocs/with-auth.hoc';
import ProfileUpdateForm from './form';

function ProfilePageMainSection() {
  return (
    <>
      <ProfileUpdateForm />
    </>
  );
}

export default withAuth(ProfilePageMainSection);
