import { UserRoleEnum } from '@/enums/role.enum';
import { FileType } from '@/types/file.type';
import { UserType } from '@/types/user.type';

export type UsersPostSearchUserResponseType = {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  profilePhotoFile: FileType;
  username: string;
};
export type UsersPostUserSearchRequestType = {
  text: string;
};

export type UsersGetUserResponseType = UserType;

export type UsersPutUserRequestType = {
  role: UserRoleEnum;
};
