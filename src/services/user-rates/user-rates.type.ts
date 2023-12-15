import { BaseMovieType } from '../movies/movie.type';

export type UserRatesGetUserRatesResponseType = {
  rate: number;
  updatedAt: string;
  movie: BaseMovieType;
};
