import BaseService from '../base.service';
import { GenresGetAllGenreResponseType } from './genre.type';

class _GenresService extends BaseService {
  constructor() {
    super('/genres');
  }

  getAllGenres() {
    return this.get<GenresGetAllGenreResponseType>('');
  }
}
const GenresService = new _GenresService();
export default GenresService;
