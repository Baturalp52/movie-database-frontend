import { UserType } from '@/types/user.type';

export type ProfileGetProfileResponseType = UserType;

export type ProfilePutProfileResponseType = Omit<
  UserType,
  'role' | 'auth' | 'profilePhotoFile' | 'bannerPhotoFile'
> & {
  profilePhotoId?: number;
  bannerPhotoId?: number;
};

export type ProfilePutProfileRequestType = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  gender?: number;
  profilePhotoId?: number;
  bannerPhotoId?: number;
};
export type ProfilePutProfileAuthRequestType = {
  username?: string;
  email?: string;
  newPassword?: string;
  password: string;
};
