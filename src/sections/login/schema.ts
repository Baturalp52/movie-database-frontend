import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  emailOrUsername: yup.string().required('Email or username is required'),
  password: yup
    .string()
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'Password must contain at least one number')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
