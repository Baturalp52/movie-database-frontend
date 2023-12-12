import BaseService from '../base.service';
import {
  UsersGetUserResponseType,
  UsersPostSearchUserResponseType,
  UsersPostUserSearchRequestType,
  UsersPutUserRequestType,
} from './users.type';

class _UsersService extends BaseService {
  constructor() {
    super('/users');
  }

  searchAllUser(page = 1, size = 10, data?: UsersPostUserSearchRequestType) {
    return this.post<UsersPostSearchUserResponseType[]>('search', data, {
      params: {
        page,
        size,
      },
    });
  }

  getUser(id: number) {
    return this.get<UsersGetUserResponseType>(`${id}`);
  }

  putUser(id: number, data: UsersPutUserRequestType) {
    return this.put(`${id}`, data);
  }
}
const UsersService = new _UsersService();
export default UsersService;
