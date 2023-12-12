import { GenderEnum } from '@/enums/gender.enum';
import { FileType } from './file.type';

export type PersonType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  bio: string;
  birthDay: Date;
  birthPlace: string;
  knownJob: string;
  photoFile: FileType;
};
