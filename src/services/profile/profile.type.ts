import { UserType } from '@/types/user.type';
import { BaseMovieListType } from '../movie-lists/movie-lists.type';

export type ProfileGetProfileMovieListsResponseType = BaseMovieListType;
export type ProfileGetProfileResponseType = UserType;

export type ProfilePutProfileResponseType = Omit<
  UserType,
  'role' | 'auth' | 'profilePhotoFile' | 'bannerPhotoFile'
> & {
  profilePhotoId?: number;
  bannerPhotoId?: number;
};

type UserSocialMediaItem = {
  id: number;
  url: string;
};

export type ProfilePutProfileRequestType = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  gender?: number;
  profilePhotoId?: number;
  bannerPhotoId?: number;
  socialMediaItems?: UserSocialMediaItem[];
};
export type ProfilePutProfileAuthRequestType = {
  username?: string;
  email?: string;
  newPassword?: string;
  password: string;
};
