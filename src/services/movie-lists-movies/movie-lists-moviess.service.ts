import BaseService from '../base.service';

class _MovieListsMoviesService extends BaseService {
  constructor() {
    super('/movie-lists');
  }

  postMovie(movieListId: number, movieId: number) {
    return this.post(`${movieListId}/movies/${movieId}`);
  }

  deleteMovie(movieListId: number, movieId: number) {
    return this.delete(`${movieListId}/movies/${movieId}`);
  }
}
const MovieListsMoviesService = new _MovieListsMoviesService();
export default MovieListsMoviesService;
