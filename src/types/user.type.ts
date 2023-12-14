import { GenderEnum } from '@/enums/gender.enum';
import { UserRoleEnum } from '@/enums/role.enum';
import { FileType } from './file.type';
import { SocialMediaItemType } from './social-media-item.type';

type UserAuthType = {
  email: string;
  username: string;
};

type UserSocialMediaItemType = {
  url: string;
} & SocialMediaItemType;

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
  socialMediaItems: UserSocialMediaItemType[];
};
