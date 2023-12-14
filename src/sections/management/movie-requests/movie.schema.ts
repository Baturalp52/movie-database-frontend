import { CertificationEnum } from '@/enums/certification.enum';
import * as yup from 'yup';

export const movieSchema = yup.object().shape({
  title: yup.string().required('Title is required!'),
  tagline: yup.string().required('Tag line is required!'),
  certification: yup
    .number()
    .oneOf(
      Object.values(CertificationEnum).filter(
        (v) => typeof v === 'number',
      ) as number[],
    )
    .typeError('Certification is required!'),
  releaseDate: yup.date().required('Release date is required!'),
  releaseCountry: yup.object().required('Release Country is required!'),
  summary: yup.string().required('Summary is required!'),
  runtime: yup.object().shape({
    hours: yup
      .number()
      .transform((v) => (isNaN(v) ? 0 : v))
      .required('Hours is required!'),
    minutes: yup
      .number()
      .transform((v) => (isNaN(v) ? 0 : v))
      .required('Minutes is required!'),
    seconds: yup
      .number()
      .transform((v) => (isNaN(v) ? 0 : v))
      .required('Seconds is required!'),
  }),
  trailer: yup.string(),
  originalLanguage: yup.object().required('Original language is required!'),
  budget: yup.number().transform((v) => (isNaN(v) ? 0 : v)),
  revenue: yup.number().transform((v) => (isNaN(v) ? 0 : v)),
});
