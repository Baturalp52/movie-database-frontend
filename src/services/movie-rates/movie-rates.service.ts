import BaseService from '../base.service';

class _MovieRatesService extends BaseService {
  constructor() {
    super('/movies');
  }

  postMovieRate(movieId: number, rate: number) {
    return this.post(`${movieId}/rates`, {
      rate,
    });
  }

  putMovieRate(movieId: number, rate: number) {
    return this.put(`${movieId}/rates`, { rate });
  }
  deleteMovieRate(movieId: number) {
    return this.delete(`${movieId}/rates`);
  }
}
const MovieRatesService = new _MovieRatesService();
export default MovieRatesService;
