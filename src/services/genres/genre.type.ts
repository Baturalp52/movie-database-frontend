import { GenreType } from '@/types/genre.type';

export type GenresGetAllGenreResponseType = GenreType[];
export type GenresGetGenreResponseType = GenreType;

export type GenresPostGenreRequestType = {
  name: string;
};
export type GenresPutGenreRequestType = {
  name: string;
};
