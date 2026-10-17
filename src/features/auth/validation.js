import * as yup from 'yup';

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_PATTERN = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

const email = yup
  .string()
  .trim()
  .required('Email is required')
  .matches(EMAIL_PATTERN, 'Enter a valid email');

const password = yup
  .string()
  .required('Password is required')
  .matches(
    PASSWORD_PATTERN,
    'Password must contain six letters and one number (7 characters total)',
  );

export const loginSchema = yup.object({
  email,
  password,
});

export const registerSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email,
  password,
});
