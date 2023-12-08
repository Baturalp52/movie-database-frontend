import * as yup from 'yup';

export const SignUpFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'You cam only use letters and numbers')
    .required('Username is required'),
  password: yup
    .string()
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'Password must contain at least one number')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
