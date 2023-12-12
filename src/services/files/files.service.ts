import BaseService from '../base.service';
import { FilesPostFileResponseType } from './profile.type';

class _FilesService extends BaseService {
  constructor() {
    super('/files');
  }

  postPersonsPhoto(data: FormData) {
    return this.post<FilesPostFileResponseType>('persons/photo', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postUsersProfile(data: FormData) {
    return this.post<FilesPostFileResponseType>('users/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postUsersBanner(data: FormData) {
    return this.post<FilesPostFileResponseType>('users/banner', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postMoviesBanner(data: FormData) {
    return this.post<FilesPostFileResponseType>('movies/banner', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postMoviesPoster(data: FormData) {
    return this.post<FilesPostFileResponseType>('movies/poster', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
const FilesService = new _FilesService();
export default FilesService;
