import BaseService from '../base.service';
import {
  AuthLoginRequestType,
  AuthLoginResponseType,
  AuthRegisterRequestType,
} from './auth.type';

class _AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  login(data: AuthLoginRequestType) {
    return this.post<AuthLoginResponseType>('/login', data);
  }

  register(data: AuthRegisterRequestType) {
    return this.post<AuthLoginResponseType>('/register', data);
  }
}

const AuthService = new _AuthService();
export default AuthService;
