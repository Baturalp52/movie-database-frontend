import BaseService from '../base.service';
import {
  GenresGetAllGenreResponseType,
  GenresGetGenreResponseType,
  GenresPutGenreRequestType,
} from './genre.type';

class _GenresService extends BaseService {
  constructor() {
    super('/genres');
  }

  getAllGenres() {
    return this.get<GenresGetAllGenreResponseType>('');
  }
  getGenre(id: number) {
    return this.get<GenresGetGenreResponseType>(`${id}`);
  }
  postGenre(data: GenresPutGenreRequestType) {
    return this.post('', data);
  }
  putGenre(id: number, data: GenresPutGenreRequestType) {
    return this.put(`${id}`, data);
  }
  deleteGenre(id: number) {
    return this.delete(`${id}`);
  }
}
const GenresService = new _GenresService();
export default GenresService;
