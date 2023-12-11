'use client';

import withAuth from '@/hocs/with-auth.hoc';
import ProfileSettingsUpdateForm from './form';

function ProfileSettingsPageMainSection() {
  return (
    <>
      <ProfileSettingsUpdateForm />
    </>
  );
}

export default withAuth(ProfileSettingsPageMainSection);
