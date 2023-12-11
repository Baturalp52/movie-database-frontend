import { PersonTypeType } from './person-type.type';
import { PersonType } from './person.type';

export type MoviePersonType = {
  person: PersonType;
  personTypes: PersonTypeType[];
};
