import { CertificationEnum } from '@/enums/certification.enum';
import { FileType } from './file.type';
import { GenreType } from './genre.type';
import { MoviePersonType } from './movie-person.type';
import { UserType } from './user.type';

export type MovieType = {
  id: number;
  title: string;
  summary: string;
  releaseDate: string;
  posterPhotoFile: FileType;
  originalLanguage: string;
  tagline?: string;
  certification?: CertificationEnum;
  releaseCountry?: string;
  runtime?: number;
  trailer?: string;
  budget?: number;
  revenue?: number;
  rate?: number;
  bannerPhotoFile?: FileType;
  genres?: GenreType[];
  moviePersons?: MoviePersonType[];
  user?: UserType;
};
