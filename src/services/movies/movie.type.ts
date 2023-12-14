import { MovieType } from '@/types/movie.type';

export type BaseMovieType = Pick<
  MovieType,
  | 'id'
  | 'title'
  | 'summary'
  | 'releaseDate'
  | 'posterPhotoFile'
  | 'originalLanguage'
  | 'rate'
>;

export type MoviesGetTrendingMovieResponseType = BaseMovieType[];
export type MoviesPostSearchMovieResponseType = BaseMovieType[];
export type MoviesPostSearchMovieRequestType = {
  text?: string | null;
  releaseYear?: number | null;
  releaseCountry?: string | null;
  originalLanguage?: string | null;
  genres?: number[] | null;
  rate?: number | null;
};

export type MoviesGetMovieResponseType = MovieType;

export type MoviesPutMovieRequestType = {
  posterPhotoId?: number;
  bannerPhotoId?: number;
} & Partial<MovieType>;

export type MoviesPostMovieRequestType = {
  posterPhotoId: number;
  bannerPhotoId: number;
} & Partial<MovieType>;
