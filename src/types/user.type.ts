import { GenderEnum } from '@/enums/gender.enum';
import { UserRoleEnum } from '@/enums/role.enum';
import { FileType } from './file.type';
import { SocialMediaItemType } from './social-media-item.type';
import { MovieListType } from './movie-list.type';
import { MovieType } from './movie.type';

type UserAuthType = {
  email: string;
  username: string;
};
type UserDetailType = {
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
  avgRating: number;
  createdAt: string;
  role: UserRoleEnum;
  auth: UserAuthType;
  detail?: UserDetailType;
  profilePhotoFile: FileType;
  bannerPhotoFile: FileType;
  socialMediaItems?: UserSocialMediaItemType[];
  movieLists?: MovieListType[];
  requestedMovies?: MovieType[];
};
