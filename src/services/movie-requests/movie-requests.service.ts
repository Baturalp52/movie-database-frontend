import BaseService from '../base.service';
import {
  MovieRequestsGetMovieRequestResponseType,
  MovieRequestsPostSearchMovieRequestRequestType,
  MovieRequestsPostSearchMovieRequestResponseType,
  MovieRequestsPostMovieRequestRequestType,
  MovieRequestsPutMovieRequestRequestType,
} from './movie-request.type';

class _MovieRequestsService extends BaseService {
  constructor() {
    super('/movie-requests');
  }

  postSearchMovieRequests(
    page = 1,
    size = 10,
    data?: MovieRequestsPostSearchMovieRequestRequestType,
  ) {
    return this.post<MovieRequestsPostSearchMovieRequestResponseType>(
      'search',
      data,
      {
        params: {
          page,
          size,
        },
      },
    );
  }

  getMovieRequest(id: number) {
    return this.get<MovieRequestsGetMovieRequestResponseType>(`${id}`);
  }
  postMovieRequest(data: MovieRequestsPostMovieRequestRequestType) {
    return this.post('', data);
  }
  putMovieRequest(id: number, data: MovieRequestsPutMovieRequestRequestType) {
    return this.put(`${id}`, data);
  }
  deleteMovieRequest(id: number) {
    return this.delete(`${id}`);
  }
}
const MovieRequestsService = new _MovieRequestsService();
export default MovieRequestsService;
