import { GenderEnum } from '@/enums/gender.enum';
import { FileType } from '@/types/file.type';
import { PersonType } from '@/types/person.type';

export type PersonsPostSearchPersonType = {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  photoFile: FileType;
  birthPlace: string;
};
export type PersonsPostPersonSearchRequestType = {
  text: string;
};

export type PersonsPostSearchPersonsResponseType =
  PersonsPostSearchPersonType[];

export type PersonsGetPersonResponseType = PersonType;

export type PersonsPostPersonRequestType = {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  bio: string;
  birthDay: Date;
  birthPlace: string;
  knownJob: string;
  photoId: number;
};
export type PersonsPutPersonRequestType = {
  firstName?: string;
  lastName?: string;
  gender?: GenderEnum;
  bio?: string;
  birthDay?: Date;
  birthPlace?: string;
  knownJob?: string;
  photoId?: number;
};
