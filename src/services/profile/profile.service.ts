import BaseService from '../base.service';
import {
  ProfileGetProfileResponseType,
  ProfilePutProfileAuthRequestType,
  ProfilePutProfileRequestType,
} from './profile.type';

class _ProfileService extends BaseService {
  constructor() {
    super('/profile');
  }

  getProfile() {
    return this.get<ProfileGetProfileResponseType>('');
  }
  putProfile(data: ProfilePutProfileRequestType) {
    return this.put('', data);
  }
  putProfileAuth(data: ProfilePutProfileAuthRequestType) {
    return this.put('auth', data);
  }
}
const ProfileService = new _ProfileService();
export default ProfileService;
