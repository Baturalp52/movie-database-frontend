import BaseService from '../base.service';
import {
  PersonTypesGetAllPersonTypeResponseType,
  PersonTypesGetPersonTypeResponseType,
  PersonTypesPutPersonTypeRequestType,
} from './person-type.type';

class _PersonTypesService extends BaseService {
  constructor() {
    super('/person-types');
  }

  getAllPersonTypes() {
    return this.get<PersonTypesGetAllPersonTypeResponseType>('');
  }
  getPersonType(id: number) {
    return this.get<PersonTypesGetPersonTypeResponseType>(`${id}`);
  }
  postPersonType(data: PersonTypesPutPersonTypeRequestType) {
    return this.post('', data);
  }
  putPersonType(id: number, data: PersonTypesPutPersonTypeRequestType) {
    return this.put(`${id}`, data);
  }
  deletePersonType(id: number) {
    return this.delete(`${id}`);
  }
}
const PersonTypesService = new _PersonTypesService();
export default PersonTypesService;
