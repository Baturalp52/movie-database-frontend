import { GenderEnum } from '@/enums/gender.enum';
import { UserRoleEnum } from '@/enums/role.enum';
import { FileType } from './file.type';

type UserAuthType = {
  email: string;
  username: string;
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  bio: string;
  role: UserRoleEnum;
  auth: UserAuthType;
  profilePhotoFile: FileType;
  bannerPhotoFile: FileType;
};
