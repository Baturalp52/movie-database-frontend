import { PersonTypeType } from '@/types/person-type.type';

export type PersonTypesGetAllPersonTypeResponseType = PersonTypeType[];
export type PersonTypesGetPersonTypeResponseType = PersonTypeType;

export type PersonTypesPostPersonTypeRequestType = {
  name: string;
};
export type PersonTypesPutPersonTypeRequestType = {
  name: string;
};
