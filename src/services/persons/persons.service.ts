import BaseService from '../base.service';
import {
  PersonsPostSearchPersonsResponseType,
  PersonsGetPersonResponseType,
  PersonsPutPersonRequestType,
  PersonsPostPersonSearchRequestType,
} from './person.type';

class _PersonsService extends BaseService {
  constructor() {
    super('/persons');
  }

  postSearchPersons(
    page = 1,
    size = 10,
    data?: PersonsPostPersonSearchRequestType,
  ) {
    return this.post<PersonsPostSearchPersonsResponseType>('search', data, {
      params: {
        page,
        size,
      },
    });
  }
  getPerson(id: number) {
    return this.get<PersonsGetPersonResponseType>(`${id}`);
  }
  postPerson(data: PersonsPutPersonRequestType) {
    return this.post('', data);
  }
  putPerson(id: number, data: PersonsPutPersonRequestType) {
    return this.put(`${id}`, data);
  }
  deletePerson(id: number) {
    return this.delete(`${id}`);
  }
}
const PersonsService = new _PersonsService();
export default PersonsService;
