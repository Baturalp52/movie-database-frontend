import BaseService from '../base.service';
import {
  MoviesGetMovieResponseType,
  MoviesGetTrendingMovieResponseType,
  MoviesPostSearchMovieRequestType,
  MoviesPostSearchMovieResponseType,
  MoviesPostMovieRequestType,
  MoviesPutMovieRequestType,
} from './movie.type';

class _MoviesService extends BaseService {
  constructor() {
    super('/movies');
  }

  getTrendingMovies(page = 1, size = 10) {
    return this.get<MoviesGetTrendingMovieResponseType>('trending', {
      params: {
        page,
        size,
      },
    });
  }

  postSearchMovies(
    page = 1,
    size = 10,
    data?: MoviesPostSearchMovieRequestType,
  ) {
    return this.post<MoviesPostSearchMovieResponseType>('search', data, {
      params: {
        page,
        size,
      },
    });
  }

  getMovie(id: number) {
    return this.get<MoviesGetMovieResponseType>(`${id}`);
  }
  postMovie(data: MoviesPostMovieRequestType) {
    return this.post('', data);
  }
  putMovie(id: number, data: MoviesPutMovieRequestType) {
    return this.put(`${id}`, data);
  }
  deleteMovie(id: number) {
    return this.delete(`${id}`);
  }
}
const MoviesService = new _MoviesService();
export default MoviesService;
