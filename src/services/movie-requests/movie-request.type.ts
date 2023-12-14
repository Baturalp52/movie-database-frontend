import { StatusEnum } from '@/enums/status.enum';
import { MovieType } from '@/types/movie.type';

export type BaseMovieRequestType = Pick<
  MovieType,
  | 'id'
  | 'title'
  | 'summary'
  | 'releaseDate'
  | 'posterPhotoFile'
  | 'originalLanguage'
>;

export type MovieRequestsPostSearchMovieRequestResponseType =
  BaseMovieRequestType[];
export type MovieRequestsPostSearchMovieRequestRequestType = {
  text?: string;
};

export type MovieRequestsGetMovieRequestResponseType = MovieType;

export type MovieRequestsPutMovieRequestRequestType = {
  status: StatusEnum;
};

export type MovieRequestsPostMovieRequestRequestType = {
  posterPhotoId: number;
  bannerPhotoId: number;
} & Partial<MovieType>;
