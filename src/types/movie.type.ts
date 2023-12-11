import { CertificationEnum } from '@/enums/certification.enum';
import { FileType } from './file.type';
import { GenreType } from './genre.type';
import { MoviePersonType } from './movie-person.type';

export type MovieType = {
  id: number;
  title: string;
  summary: string;
  releaseDate: string;
  posterPhotoFile: FileType;
  tagline?: string;
  certification?: CertificationEnum;
  releaseCountry?: string;
  runtime?: number;
  trailer?: string;
  originalLanguage?: string;
  budget?: number;
  revenue?: number;
  rate?: number;
  bannerPhotoFile?: FileType;
  genres?: GenreType[];
  moviePersons?: MoviePersonType[];
};
