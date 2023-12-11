import * as yup from 'yup';

export const profileSettingsUpdateSchema = yup.object().shape({
  email: yup.string().email('You must enter a valid email!'),
  username: yup
    .string()
    .nullable()
    .trim()
    .test(
      'username-constraint',
      'You can only use letters and numbers',
      (val) => {
        if (!val) {
          return true;
        }
        return /^[a-zA-Z0-9]+$/.test(val);
      },
    ),
  password: yup
    .string()
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'Password must contain at least one number')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  newPassword: yup
    .string()
    .trim()
    .nullable()
    .test(
      'new-password-constraint',
      'Password must be at least 8 characters',
      (val) => {
        if (!val) {
          return true;
        }
        return val.length >= 8;
      },
    )
    .test(
      'new-password-constraint',
      'You can only use letters and numbers',
      (val) => {
        if (!val) {
          return true;
        }
        return /^[a-zA-Z0-9]+$/.test(val);
      },
    ),
  newPasswordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
