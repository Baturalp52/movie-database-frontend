import BaseService from '../base.service';
import {
  MovieListsGetMovieListResponseType,
  MovieListsPostMovieListRequestType,
  MovieListsPutMovieListRequestType,
} from './movie-lists.type';

class _MovieListsService extends BaseService {
  constructor() {
    super('/movie-lists');
  }

  getMovieList(id: number) {
    return this.get<MovieListsGetMovieListResponseType>(`${id}`);
  }
  postMovieList(data: MovieListsPostMovieListRequestType) {
    return this.post('', data);
  }
  putMovieList(id: number, data: MovieListsPutMovieListRequestType) {
    return this.put(`${id}`, data);
  }
  deleteMovieList(id: number) {
    return this.delete(`${id}`);
  }
}
const MovieListsService = new _MovieListsService();
export default MovieListsService;
