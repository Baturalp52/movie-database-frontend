import BaseService from '../base.service';
import { UserRatesGetUserRatesResponseType } from './user-rates.type';

class _UserRatesService extends BaseService {
  constructor() {
    super('/user-rates');
  }

  getAllUserRates(page = 1, size = 10) {
    return this.get<UserRatesGetUserRatesResponseType[]>('', {
      params: {
        page,
        size,
      },
    });
  }
}
const UserRatesService = new _UserRatesService();
export default UserRatesService;
