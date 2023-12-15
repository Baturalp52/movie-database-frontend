import { MovieType } from './movie.type';

export type MovieListType = {
  id: number;
  name: string;
  public?: boolean;
  movies?: MovieType[];
};
