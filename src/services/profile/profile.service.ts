import BaseService from '../base.service';
import { ProfileGetProfileResponseType } from './profile.type';

class _ProfileService extends BaseService {
  constructor() {
    super('/profile');
  }

  getProfile() {
    return this.get<ProfileGetProfileResponseType>('');
  }
}
const ProfileService = new _ProfileService();
export default ProfileService;
