import * as yup from 'yup';

export const movieListSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  public: yup.boolean(),
});
