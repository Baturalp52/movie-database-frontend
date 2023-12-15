import { MovieListType } from '@/types/movie-list.type';

export type BaseMovieListType = Pick<MovieListType, 'id' | 'name'>;

export type MovieListsGetMovieListResponseType = MovieListType;

export type MovieListsPutMovieListRequestType = Partial<BaseMovieListType>;

export type MovieListsPostMovieListRequestType = BaseMovieListType;
