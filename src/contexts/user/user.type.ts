import { GenderEnum } from '@/enums/gender.enum';
import { UserRoleEnum } from '@/enums/role.enum';

export type UserType = {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  bio: string;
  role: UserRoleEnum;
  auth: {
    email: string;
    username: string;
  };
  profilePhotoFile: {
    path: string;
  };
  bannerPhotoFile: {
    path: string;
  };
};
