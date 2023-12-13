import { GenderEnum } from '@/enums/gender.enum';
import * as yup from 'yup';

export const personSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  gender: yup
    .number()
    .oneOf(
      Object.values(GenderEnum).filter(
        (v) => typeof v === 'number',
      ) as number[],
    )
    .typeError('Gender is required!'),
  bio: yup.string().required('Bio is required!'),
  birthDay: yup.date().required('Birth day is required!'),
  birthPlace: yup.string().required('Birth place is required!'),
  knownJob: yup.string().required('Known job is required!'),
});
