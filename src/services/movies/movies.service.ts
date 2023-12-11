import BaseService from '../base.service';
import { MoviesGetTrendingMovieResponseType } from './movie.type';

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
}
const MoviesService = new _MoviesService();
export default MoviesService;
